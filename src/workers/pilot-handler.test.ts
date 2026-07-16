import { describe, expect, it, vi } from 'vitest';

import { handlePilotRequest, type PilotHandlerDependencies } from './pilot-handler';

const now = Date.parse('2026-07-16T12:00:00.000Z');
const validPayload = {
  companyName: 'Example Publishing',
  publisherType: 'digital-publisher',
  monthlyVolume: '101-500',
  sourceTypes: ['rss', 'websites'],
  deliveryChannels: ['web', 'newsletter'],
  humanReview: 'editor-approves',
  contactName: 'Ada Editor',
  contactEmail: 'ada@example.com',
  website: 'https://example.com',
  workflowSummary:
    'Our team monitors trusted sources and requires an editor to approve every publish-ready package.',
  otherContext: '',
  turnstileToken: 'verified-turnstile-token',
  startedAt: now - 15_000,
  faxNumber: '',
};

function request(
  body: unknown = validPayload,
  init: { method?: string; origin?: string; contentType?: string; contentLength?: string } = {},
) {
  return new Request('https://alomattech.com/api/pilot', {
    method: init.method ?? 'POST',
    headers: {
      Origin: init.origin ?? 'https://alomattech.com',
      'Content-Type': init.contentType ?? 'application/json',
      ...(init.contentLength ? { 'Content-Length': init.contentLength } : {}),
      'CF-Connecting-IP': '203.0.113.20',
    },
    body: (init.method ?? 'POST') === 'GET' ? undefined : JSON.stringify(body),
  });
}

function dependencies(): PilotHandlerDependencies {
  return {
    allowedOrigins: ['https://alomattech.com'],
    now: () => now,
    createRequestId: () => 'pilot_01JTEST',
    verifyTurnstile: vi.fn(async () => true),
    sendApplication: vi.fn(async () => undefined),
    log: vi.fn(),
  };
}

describe('handlePilotRequest', () => {
  it('accepts a verified application and sends the normalized payload', async () => {
    const deps = dependencies();
    const response = await handlePilotRequest(request(), deps);

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({
      ok: true,
      requestId: 'pilot_01JTEST',
    });
    expect(deps.verifyTurnstile).toHaveBeenCalledWith({
      token: 'verified-turnstile-token',
      remoteIp: '203.0.113.20',
      requestId: 'pilot_01JTEST',
    });
    expect(deps.sendApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        companyName: 'Example Publishing',
        contactEmail: 'ada@example.com',
        website: 'https://example.com/',
      }),
      'pilot_01JTEST',
    );
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('rejects methods, origins, media types, and declared oversized bodies', async () => {
    const deps = dependencies();

    expect((await handlePilotRequest(request(undefined, { method: 'GET' }), deps)).status).toBe(405);
    expect((await handlePilotRequest(request(validPayload, { origin: 'https://evil.example' }), deps)).status).toBe(403);
    expect((await handlePilotRequest(request(validPayload, { contentType: 'text/plain' }), deps)).status).toBe(415);
    expect((await handlePilotRequest(request(validPayload, { contentLength: '32769' }), deps)).status).toBe(413);
    expect(deps.verifyTurnstile).not.toHaveBeenCalled();
    expect(deps.sendApplication).not.toHaveBeenCalled();
  });

  it('bounds streamed bodies even when content-length is missing', async () => {
    const deps = dependencies();
    const oversized = request({ ...validPayload, workflowSummary: 'x'.repeat(40_000) });

    expect((await handlePilotRequest(oversized, deps)).status).toBe(413);
    expect(deps.verifyTurnstile).not.toHaveBeenCalled();
  });

  it('returns field errors before contacting Turnstile or email', async () => {
    const deps = dependencies();
    const response = await handlePilotRequest(
      request({ ...validPayload, contactEmail: 'invalid' }),
      deps,
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: 'invalid_application',
      fields: { contactEmail: 'Enter a valid contact email.' },
    });
    expect(deps.verifyTurnstile).not.toHaveBeenCalled();
    expect(deps.sendApplication).not.toHaveBeenCalled();
  });

  it('treats honeypot submissions as accepted without sending', async () => {
    const deps = dependencies();
    const response = await handlePilotRequest(
      request({ ...validPayload, faxNumber: '555-0100' }),
      deps,
    );

    expect(response.status).toBe(202);
    expect(deps.verifyTurnstile).not.toHaveBeenCalled();
    expect(deps.sendApplication).not.toHaveBeenCalled();
  });

  it('rejects failed Turnstile verification without sending email', async () => {
    const deps = dependencies();
    vi.mocked(deps.verifyTurnstile).mockResolvedValue(false);

    const response = await handlePilotRequest(request(), deps);

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: 'verification_failed',
    });
    expect(deps.sendApplication).not.toHaveBeenCalled();
  });

  it('fails closed with a generic response when email delivery fails', async () => {
    const deps = dependencies();
    vi.mocked(deps.sendApplication).mockRejectedValue(new Error('SMTP detail'));

    const response = await handlePilotRequest(request(), deps);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: 'temporarily_unavailable',
      requestId: 'pilot_01JTEST',
    });
    expect(deps.log).toHaveBeenCalledWith({
      event: 'pilot_submission_failed',
      requestId: 'pilot_01JTEST',
      reason: 'email_delivery',
    });
  });
});
