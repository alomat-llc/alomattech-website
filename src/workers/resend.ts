import type { PilotEmail } from './pilot-email';

type Fetcher = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export async function sendWithResend(
  email: PilotEmail,
  requestId: string,
  apiKey: string,
  fetcher: Fetcher = fetch,
): Promise<void> {
  const response = await fetcher('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': requestId,
    },
    body: JSON.stringify({
      from: `${email.from.name} <${email.from.email}>`,
      to: [email.to],
      reply_to: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (!response.ok) {
    throw new Error('resend_delivery_failed');
  }
}
