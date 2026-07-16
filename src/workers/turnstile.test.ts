import { describe, expect, it, vi } from 'vitest';

import { verifyTurnstile } from './turnstile';

describe('verifyTurnstile', () => {
  it('verifies token, hostname, and action with Cloudflare', async () => {
    const fetcher = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = init?.body as FormData;
      expect(body.get('secret')).toBe('turnstile-secret');
      expect(body.get('response')).toBe('visitor-token');
      expect(body.get('remoteip')).toBe('203.0.113.20');
      expect(body.get('idempotency_key')).toBe('pilot_01JTEST');
      return Response.json({
        success: true,
        hostname: 'alomattech.com',
        action: 'managed-pilot',
      });
    });

    await expect(
      verifyTurnstile(
        {
          token: 'visitor-token',
          remoteIp: '203.0.113.20',
          requestId: 'pilot_01JTEST',
        },
        'turnstile-secret',
        fetcher,
      ),
    ).resolves.toBe(true);
  });

  it.each([
    [{ success: false }, false],
    [{ success: true, hostname: 'evil.example', action: 'managed-pilot' }, false],
    [{ success: true, hostname: 'alomattech.com', action: 'other' }, false],
  ])('fails closed for invalid verification metadata', async (result, expected) => {
    const fetcher = vi.fn(async () => Response.json(result));

    await expect(
      verifyTurnstile(
        { token: 'visitor-token', requestId: 'pilot_01JTEST' },
        'turnstile-secret',
        fetcher,
      ),
    ).resolves.toBe(expected);
  });

  it('fails closed on a non-success HTTP response', async () => {
    const fetcher = vi.fn(async () => new Response('unavailable', { status: 503 }));

    await expect(
      verifyTurnstile(
        { token: 'visitor-token', requestId: 'pilot_01JTEST' },
        'turnstile-secret',
        fetcher,
      ),
    ).resolves.toBe(false);
  });
});
