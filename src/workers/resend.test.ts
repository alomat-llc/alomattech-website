import { describe, expect, it, vi } from 'vitest';

import type { PilotEmail } from './pilot-email';
import { sendWithResend } from './resend';

const email: PilotEmail = {
  to: 'hello@alomattech.com',
  from: { email: 'pilot@notify.alomattech.com', name: 'Alomat Pilot' },
  replyTo: 'editor@example.com',
  subject: '[Managed Pilot] Example Publishing',
  html: '<main>Application</main>',
  text: 'Application',
};

describe('sendWithResend', () => {
  it('sends the rendered application through Resend with an idempotency key', async () => {
    const fetcher = vi.fn(async (_input: string | URL | Request, _init?: RequestInit) =>
      new Response(JSON.stringify({ id: 'email_01JTEST' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    await sendWithResend(email, 'pilot_01JTEST', 're_secret', fetcher);

    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, init] = fetcher.mock.calls[0]!;
    if (!init) throw new Error('Expected Resend request options');
    expect(url).toBe('https://api.resend.com/emails');
    expect(init).toMatchObject({
      method: 'POST',
      headers: {
        Authorization: 'Bearer re_secret',
        'Content-Type': 'application/json',
        'Idempotency-Key': 'pilot_01JTEST',
      },
    });
    expect(JSON.parse(String(init.body))).toEqual({
      from: 'Alomat Pilot <pilot@notify.alomattech.com>',
      to: ['hello@alomattech.com'],
      reply_to: 'editor@example.com',
      subject: '[Managed Pilot] Example Publishing',
      html: '<main>Application</main>',
      text: 'Application',
    });
    expect(String(init.body)).not.toContain('re_secret');
  });

  it('fails closed when Resend rejects the request', async () => {
    const fetcher = vi.fn(async (_input: string | URL | Request, _init?: RequestInit) =>
      new Response(JSON.stringify({ message: 'rejected' }), { status: 422 }),
    );

    await expect(
      sendWithResend(email, 'pilot_01JTEST', 're_secret', fetcher),
    ).rejects.toThrow('resend_delivery_failed');
  });
});
