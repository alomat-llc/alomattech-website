import { describe, expect, it } from 'vitest';

import { validatePilotIntake } from './pilot-intake';

const now = Date.parse('2026-07-16T12:00:00.000Z');

const validPayload = {
  companyName: 'Example Publishing',
  publisherType: 'digital-publisher',
  monthlyVolume: '101-500',
  sourceTypes: ['rss', 'websites', 'submitted-urls'],
  deliveryChannels: ['web', 'newsletter'],
  humanReview: 'editor-approves',
  contactName: 'Ada Editor',
  contactEmail: 'ada@example.com',
  website: 'https://example.com',
  workflowSummary:
    'Our team monitors trusted sources, prepares daily coverage, and requires an editor to approve every package.',
  otherContext: 'We want to begin with one recurring editorial desk.',
  turnstileToken: 'verified-turnstile-token',
  startedAt: now - 15_000,
  faxNumber: '',
};

describe('validatePilotIntake', () => {
  it('normalizes a complete managed pilot application', () => {
    const result = validatePilotIntake(validPayload, now);

    expect(result).toEqual({
      ok: true,
      value: {
        ...validPayload,
        companyName: 'Example Publishing',
        contactName: 'Ada Editor',
        contactEmail: 'ada@example.com',
        website: 'https://example.com/',
        faxNumber: undefined,
      },
    });
  });

  it.each([
    ['companyName', ''],
    ['publisherType', 'agency'],
    ['monthlyVolume', 'unlimited'],
    ['sourceTypes', []],
    ['deliveryChannels', []],
    ['humanReview', 'none'],
    ['contactName', ''],
    ['contactEmail', 'not-an-email'],
    ['workflowSummary', 'Too short'],
    ['turnstileToken', ''],
  ])('rejects invalid %s', (field, value) => {
    const result = validatePilotIntake(
      { ...validPayload, [field]: value },
      now,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toHaveProperty(field);
  });

  it('rejects unknown list choices and oversized lists', () => {
    const unknown = validatePilotIntake(
      { ...validPayload, sourceTypes: ['rss', 'private-database'] },
      now,
    );
    const oversized = validatePilotIntake(
      {
        ...validPayload,
        deliveryChannels: [
          'web',
          'social',
          'newsletter',
          'messaging',
          'mobile',
          'other',
          'extra',
        ],
      },
      now,
    );

    expect(unknown.ok).toBe(false);
    expect(oversized.ok).toBe(false);
  });

  it('only accepts http or https websites', () => {
    const result = validatePilotIntake(
      { ...validPayload, website: 'javascript:alert(1)' },
      now,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toHaveProperty('website');
  });

  it('rejects the honeypot and implausible submission timing', () => {
    const honeypot = validatePilotIntake(
      { ...validPayload, faxNumber: '555-0100' },
      now,
    );
    const tooFast = validatePilotIntake(
      { ...validPayload, startedAt: now - 500 },
      now,
    );
    const expired = validatePilotIntake(
      { ...validPayload, startedAt: now - 7_200_001 },
      now,
    );

    expect(honeypot).toEqual({ ok: false, abuse: true });
    expect(tooFast).toEqual({ ok: false, abuse: true });
    expect(expired).toEqual({ ok: false, abuse: true });
  });

  it('rejects non-object and excessively long input', () => {
    expect(validatePilotIntake(null, now).ok).toBe(false);
    const result = validatePilotIntake(
      { ...validPayload, workflowSummary: 'x'.repeat(2_001) },
      now,
    );
    expect(result.ok).toBe(false);
  });
});
