import { handlePilotRequest } from '../src/workers/pilot-handler';
import { buildPilotEmail } from '../src/workers/pilot-email';
import { verifyTurnstile } from '../src/workers/turnstile';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handlePilotRequest(request, {
      allowedOrigins: ['https://alomattech.com'],
      now: () => Date.now(),
      createRequestId: () => `pilot_${crypto.randomUUID()}`,
      verifyTurnstile: (input) =>
        verifyTurnstile(input, env.TURNSTILE_SECRET),
      sendApplication: async (application, requestId) => {
        await env.PILOT_EMAIL.send(buildPilotEmail(application, requestId));
      },
      log: (entry) => console.log(JSON.stringify(entry)),
    });
  },
} satisfies ExportedHandler<Env>;
