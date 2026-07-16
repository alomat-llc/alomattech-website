import { describe, expect, it } from 'vitest';

import type { PilotIntake } from '../lib/pilot-intake';
import { buildPilotEmail } from './pilot-email';

const application: PilotIntake = {
  companyName: '<Example & Publishing>',
  publisherType: 'digital-publisher',
  monthlyVolume: '101-500',
  sourceTypes: ['rss', 'websites'],
  deliveryChannels: ['web', 'newsletter'],
  humanReview: 'editor-approves',
  contactName: 'Ada Editor',
  contactEmail: 'ada@example.com',
  website: 'https://example.com/',
  workflowSummary: 'An editor reviews every <publish-ready> package.',
  otherContext: 'Begin with the daily desk.',
  turnstileToken: 'secret-turnstile-token',
  startedAt: 1_784_203_185_000,
  faxNumber: undefined,
};

describe('buildPilotEmail', () => {
  it('builds a fixed-destination transactional email with reply-to', () => {
    const email = buildPilotEmail(application, 'pilot_01JTEST');

    expect(email.to).toBe('hello@alomattech.com');
    expect(email.from).toEqual({
      email: 'pilot@notify.alomattech.com',
      name: 'Alomat Pilot',
    });
    expect(email.replyTo).toBe('ada@example.com');
    expect(email.subject).toBe(
      '[Managed Pilot] <Example & Publishing> · Digital publisher',
    );
  });

  it('escapes applicant input and excludes verification internals', () => {
    const email = buildPilotEmail(application, 'pilot_01JTEST');

    expect(email.html).toContain('&lt;Example &amp; Publishing&gt;');
    expect(email.html).toContain('&lt;publish-ready&gt;');
    expect(email.html).not.toContain('<Example & Publishing>');
    expect(email.text).toContain('Request ID: pilot_01JTEST');
    expect(email.text).toContain('Source types: RSS or Atom feeds, Approved websites');
    expect(JSON.stringify(email)).not.toContain('secret-turnstile-token');
    expect(JSON.stringify(email)).not.toContain('1784203185000');
  });
});
