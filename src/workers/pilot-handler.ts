import {
  validatePilotIntake,
  type PilotIntake,
} from '../lib/pilot-intake';

const maximumBodyBytes = 32_768;

export interface TurnstileVerificationInput {
  token: string;
  remoteIp?: string;
  requestId: string;
}

export interface PilotLogEntry {
  event:
    | 'pilot_submission_accepted'
    | 'pilot_submission_rejected'
    | 'pilot_submission_failed';
  requestId: string;
  reason?: string;
}

export interface PilotHandlerDependencies {
  allowedOrigins: readonly string[];
  now: () => number;
  createRequestId: () => string;
  verifyTurnstile: (input: TurnstileVerificationInput) => Promise<boolean>;
  sendApplication: (
    application: PilotIntake,
    requestId: string,
  ) => Promise<void>;
  log: (entry: PilotLogEntry) => void;
}

function json(body: unknown, status: number, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'",
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

async function readBoundedJson(request: Request): Promise<unknown> {
  if (!request.body) throw new Error('empty_body');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBodyBytes) {
      await reader.cancel('body_too_large');
      throw new RangeError('body_too_large');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handlePilotRequest(
  request: Request,
  dependencies: PilotHandlerDependencies,
): Promise<Response> {
  if (request.method !== 'POST') {
    return json(
      { ok: false, error: 'method_not_allowed' },
      405,
      { Allow: 'POST' },
    );
  }

  const origin = request.headers.get('Origin');
  if (!origin || !dependencies.allowedOrigins.includes(origin)) {
    return json({ ok: false, error: 'forbidden_origin' }, 403);
  }

  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0];
  if (contentType !== 'application/json') {
    return json({ ok: false, error: 'unsupported_media_type' }, 415);
  }

  const declaredLength = Number(request.headers.get('Content-Length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) {
    return json({ ok: false, error: 'body_too_large' }, 413);
  }

  let payload: unknown;
  try {
    payload = await readBoundedJson(request);
  } catch (error) {
    return error instanceof RangeError
      ? json({ ok: false, error: 'body_too_large' }, 413)
      : json({ ok: false, error: 'invalid_json' }, 400);
  }

  const requestId = dependencies.createRequestId();
  const validation = validatePilotIntake(payload, dependencies.now());
  if (!validation.ok && 'abuse' in validation) {
    dependencies.log({
      event: 'pilot_submission_rejected',
      requestId,
      reason: 'abuse_signal',
    });
    return json({ ok: true, requestId }, 202);
  }
  if (!validation.ok) {
    return json(
      {
        ok: false,
        error: 'invalid_application',
        fields: validation.errors,
      },
      400,
    );
  }

  let verified = false;
  try {
    verified = await dependencies.verifyTurnstile({
      token: validation.value.turnstileToken,
      remoteIp: request.headers.get('CF-Connecting-IP') ?? undefined,
      requestId,
    });
  } catch {
    dependencies.log({
      event: 'pilot_submission_failed',
      requestId,
      reason: 'verification_service',
    });
    return json(
      { ok: false, error: 'temporarily_unavailable', requestId },
      503,
    );
  }

  if (!verified) {
    dependencies.log({
      event: 'pilot_submission_rejected',
      requestId,
      reason: 'turnstile',
    });
    return json({ ok: false, error: 'verification_failed' }, 403);
  }

  try {
    await dependencies.sendApplication(validation.value, requestId);
  } catch {
    dependencies.log({
      event: 'pilot_submission_failed',
      requestId,
      reason: 'email_delivery',
    });
    return json(
      { ok: false, error: 'temporarily_unavailable', requestId },
      503,
    );
  }

  dependencies.log({ event: 'pilot_submission_accepted', requestId });
  return json({ ok: true, requestId }, 202);
}
