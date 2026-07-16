import type { TurnstileVerificationInput } from './pilot-handler';

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

interface TurnstileResult {
  success?: boolean;
  hostname?: string;
  action?: string;
}

function isTurnstileResult(input: unknown): input is TurnstileResult {
  return typeof input === 'object' && input !== null;
}

export async function verifyTurnstile(
  input: TurnstileVerificationInput,
  secret: string,
  fetcher: Fetcher = fetch,
): Promise<boolean> {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', input.token);
  body.set('idempotency_key', input.requestId);
  if (input.remoteIp) body.set('remoteip', input.remoteIp);

  const response = await fetcher(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body },
  );
  if (!response.ok) return false;

  const result: unknown = await response.json();
  return (
    isTurnstileResult(result) &&
    result.success === true &&
    result.hostname === 'alomattech.com' &&
    result.action === 'managed-pilot'
  );
}
