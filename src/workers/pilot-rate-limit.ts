import type { PilotIntake } from '../lib/pilot-intake';

interface RateLimiterBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface PilotRateLimiters {
  email: RateLimiterBinding;
  ip: RateLimiterBinding;
  duplicate: RateLimiterBinding;
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function commercialFingerprint(application: PilotIntake): string {
  return JSON.stringify({
    companyName: application.companyName,
    publisherType: application.publisherType,
    monthlyVolume: application.monthlyVolume,
    sourceTypes: [...application.sourceTypes].sort(),
    deliveryChannels: [...application.deliveryChannels].sort(),
    humanReview: application.humanReview,
    contactName: application.contactName,
    contactEmail: application.contactEmail,
    website: application.website ?? '',
    workflowSummary: application.workflowSummary,
    otherContext: application.otherContext ?? '',
  });
}

export async function allowPilotSubmission(
  input: { application: PilotIntake; remoteIp?: string },
  limiters: PilotRateLimiters,
): Promise<boolean> {
  const fingerprint = await sha256(commercialFingerprint(input.application));
  const [email, ip, duplicate] = await Promise.all([
    limiters.email.limit({ key: input.application.contactEmail }),
    limiters.ip.limit({ key: input.remoteIp ?? 'missing-ip' }),
    limiters.duplicate.limit({ key: fingerprint }),
  ]);

  return email.success && ip.success && duplicate.success;
}
