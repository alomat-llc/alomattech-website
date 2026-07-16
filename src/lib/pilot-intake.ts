export const publisherTypes = [
  'digital-publisher',
  'newsroom',
  'newsletter',
  'brand-media',
  'other',
] as const;

export const monthlyVolumes = [
  'under-25',
  '25-100',
  '101-500',
  'over-500',
] as const;

export const sourceTypes = [
  'rss',
  'websites',
  'social',
  'first-party',
  'submitted-urls',
  'other',
] as const;

export const deliveryChannels = [
  'web',
  'social',
  'newsletter',
  'messaging',
  'mobile',
  'other',
] as const;

export const humanReviewModels = [
  'editor-approves',
  'editor-reviews-exceptions',
  'needs-design',
] as const;

type Choice<T extends readonly string[]> = T[number];

export interface PilotIntake {
  companyName: string;
  publisherType: Choice<typeof publisherTypes>;
  monthlyVolume: Choice<typeof monthlyVolumes>;
  sourceTypes: Choice<typeof sourceTypes>[];
  deliveryChannels: Choice<typeof deliveryChannels>[];
  humanReview: Choice<typeof humanReviewModels>;
  contactName: string;
  contactEmail: string;
  website?: string;
  workflowSummary: string;
  otherContext?: string;
  turnstileToken: string;
  startedAt: number;
  faxNumber?: undefined;
}

export type PilotIntakeResult =
  | { ok: true; value: PilotIntake }
  | { ok: false; errors: Record<string, string> }
  | { ok: false; abuse: true };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
}

function cleanString(
  input: unknown,
  minimum: number,
  maximum: number,
): string | undefined {
  if (typeof input !== 'string') return undefined;
  const value = input.trim();
  if (value.length < minimum || value.length > maximum) return undefined;
  return value;
}

function cleanChoice<const T extends readonly string[]>(
  input: unknown,
  choices: T,
): Choice<T> | undefined {
  return typeof input === 'string' && choices.includes(input as Choice<T>)
    ? (input as Choice<T>)
    : undefined;
}

function cleanChoiceList<const T extends readonly string[]>(
  input: unknown,
  choices: T,
): Choice<T>[] | undefined {
  if (!Array.isArray(input) || input.length < 1 || input.length > choices.length) {
    return undefined;
  }
  if (!input.every((item) => cleanChoice(item, choices))) return undefined;
  const unique = [...new Set(input as Choice<T>[])];
  return unique.length === input.length ? unique : undefined;
}

function cleanWebsite(input: unknown): string | undefined | null {
  if (input === undefined || input === null || input === '') return undefined;
  const value = cleanString(input, 4, 500);
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function validatePilotIntake(
  input: unknown,
  now = Date.now(),
): PilotIntakeResult {
  if (!isRecord(input)) {
    return { ok: false, errors: { form: 'Invalid application payload.' } };
  }

  if (typeof input.faxNumber === 'string' && input.faxNumber.trim()) {
    return { ok: false, abuse: true };
  }

  if (
    typeof input.startedAt !== 'number' ||
    !Number.isFinite(input.startedAt) ||
    now - input.startedAt < 2_500 ||
    now - input.startedAt > 7_200_000
  ) {
    return { ok: false, abuse: true };
  }

  const companyName = cleanString(input.companyName, 2, 120);
  const publisherType = cleanChoice(input.publisherType, publisherTypes);
  const monthlyVolume = cleanChoice(input.monthlyVolume, monthlyVolumes);
  const selectedSources = cleanChoiceList(input.sourceTypes, sourceTypes);
  const selectedChannels = cleanChoiceList(
    input.deliveryChannels,
    deliveryChannels,
  );
  const humanReview = cleanChoice(input.humanReview, humanReviewModels);
  const contactName = cleanString(input.contactName, 2, 100);
  const contactEmail = cleanString(input.contactEmail, 6, 254)?.toLowerCase();
  const website = cleanWebsite(input.website);
  const workflowSummary = cleanString(input.workflowSummary, 30, 2_000);
  const otherContext = cleanString(input.otherContext, 1, 1_000);
  const turnstileToken = cleanString(input.turnstileToken, 10, 4_096);

  const errors: Record<string, string> = {};
  if (!companyName) errors.companyName = 'Enter the company or publication name.';
  if (!publisherType) errors.publisherType = 'Choose a publisher or company type.';
  if (!monthlyVolume) errors.monthlyVolume = 'Choose an expected monthly volume.';
  if (!selectedSources) errors.sourceTypes = 'Choose at least one source type.';
  if (!selectedChannels) errors.deliveryChannels = 'Choose at least one delivery channel.';
  if (!humanReview) errors.humanReview = 'Choose a human review model.';
  if (!contactName) errors.contactName = 'Enter a contact name.';
  if (!contactEmail || !emailPattern.test(contactEmail)) {
    errors.contactEmail = 'Enter a valid contact email.';
  }
  if (website === null) errors.website = 'Enter an http or https website URL.';
  if (!workflowSummary) {
    errors.workflowSummary = 'Describe the workflow in 30 to 2,000 characters.';
  }
  if (input.otherContext && !otherContext) {
    errors.otherContext = 'Keep additional context under 1,000 characters.';
  }
  if (!turnstileToken) errors.turnstileToken = 'Complete the verification step.';

  if (Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      companyName: companyName!,
      publisherType: publisherType!,
      monthlyVolume: monthlyVolume!,
      sourceTypes: selectedSources!,
      deliveryChannels: selectedChannels!,
      humanReview: humanReview!,
      contactName: contactName!,
      contactEmail: contactEmail!,
      website: website ?? undefined,
      workflowSummary: workflowSummary!,
      otherContext,
      turnstileToken: turnstileToken!,
      startedAt: input.startedAt,
      faxNumber: undefined,
    },
  };
}
