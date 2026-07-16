import { handlePilotRequest } from '../src/workers/pilot-handler';
import { buildPilotEmail } from '../src/workers/pilot-email';
import { allowPilotSubmission } from '../src/workers/pilot-rate-limit';
import { sendWithResend } from '../src/workers/resend';
import { verifyTurnstile } from '../src/workers/turnstile';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handlePilotRequest(request, {
      allowedOrigins: ['https://alomattech.com'],
      now: () => Date.now(),
      createRequestId: () => `pilot_${crypto.randomUUID()}`,
      verifyTurnstile: (input) =>
        verifyTurnstile(input, env.TURNSTILE_SECRET),
      allowSubmission: ({ application, remoteIp }) =>
        allowPilotSubmission(
          { application, remoteIp },
          {
            email: env.PILOT_EMAIL_RATE_LIMITER,
            ip: env.PILOT_IP_RATE_LIMITER,
            duplicate: env.PILOT_DUPLICATE_RATE_LIMITER,
          },
        ),
      sendApplication: async (application, requestId) => {
        await sendWithResend(
          buildPilotEmail(application, requestId),
          requestId,
          env.RESEND_API_KEY,
        );
      },
      log: (entry) => console.log(JSON.stringify(entry)),
    });
  },
} satisfies ExportedHandler<Env>;
