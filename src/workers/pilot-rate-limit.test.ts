import { describe, expect, it, vi } from 'vitest';

import type { PilotIntake } from '../lib/pilot-intake';
import { allowPilotSubmission } from './pilot-rate-limit';

const application: PilotIntake = {
  companyName: 'Example Publishing',
  publisherType: 'digital-publisher',
  monthlyVolume: '101-500',
  sourceTypes: ['rss'],
  deliveryChannels: ['web'],
  humanReview: 'editor-approves',
  contactName: 'Ada Editor',
  contactEmail: 'ada@example.com',
  workflowSummary:
    'Our team monitors approved sources and reviews every publish-ready package.',
  turnstileToken: 'verified-turnstile-token',
};

function rateLimiter(success = true) {
  return {
    limit: vi.fn(async (_options: { key: string }) => ({ success })),
  };
}

describe('allowPilotSubmission', () => {
  it('checks email, network, and a deterministic content fingerprint', async () => {
    const email = rateLimiter();
    const ip = rateLimiter();
    const duplicate = rateLimiter();

    const allowed = await allowPilotSubmission(
      { application, remoteIp: '203.0.113.20' },
      { email, ip, duplicate },
    );

    expect(allowed).toBe(true);
    expect(email.limit).toHaveBeenCalledWith({ key: 'ada@example.com' });
    expect(ip.limit).toHaveBeenCalledWith({ key: '203.0.113.20' });
    expect(duplicate.limit).toHaveBeenCalledOnce();
    expect(vi.mocked(duplicate.limit).mock.calls[0]?.[0].key).toMatch(
      /^[a-f0-9]{64}$/,
    );
  });

  it('rejects when any individual limit is exhausted', async () => {
    const allowed = await allowPilotSubmission(
      { application, remoteIp: undefined },
      {
        email: rateLimiter(),
        ip: rateLimiter(false),
        duplicate: rateLimiter(),
      },
    );

    expect(allowed).toBe(false);
  });

  it('uses the same fingerprint for the same commercial application', async () => {
    const firstDuplicate = rateLimiter();
    const secondDuplicate = rateLimiter();

    await allowPilotSubmission(
      { application, remoteIp: '203.0.113.20' },
      { email: rateLimiter(), ip: rateLimiter(), duplicate: firstDuplicate },
    );
    await allowPilotSubmission(
      {
        application: { ...application, turnstileToken: 'different-valid-token' },
        remoteIp: '198.51.100.9',
      },
      { email: rateLimiter(), ip: rateLimiter(), duplicate: secondDuplicate },
    );

    expect(vi.mocked(firstDuplicate.limit).mock.calls[0]?.[0].key).toBe(
      vi.mocked(secondDuplicate.limit).mock.calls[0]?.[0].key,
    );
  });
});
