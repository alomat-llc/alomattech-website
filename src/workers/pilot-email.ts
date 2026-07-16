import type { PilotIntake } from '../lib/pilot-intake';

export interface PilotEmail {
  to: string;
  from: { email: string; name: string };
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

const publisherLabels: Record<PilotIntake['publisherType'], string> = {
  'digital-publisher': 'Digital publisher',
  newsroom: 'Newsroom or editorial desk',
  newsletter: 'Newsletter business',
  'brand-media': 'Brand or company media',
  other: 'Other content operation',
};

const volumeLabels: Record<PilotIntake['monthlyVolume'], string> = {
  'under-25': 'Fewer than 25 packages',
  '25-100': '25–100 packages',
  '101-500': '101–500 packages',
  'over-500': 'More than 500 packages',
};

const sourceLabels: Record<PilotIntake['sourceTypes'][number], string> = {
  rss: 'RSS or Atom feeds',
  websites: 'Approved websites',
  social: 'Approved social sources',
  'first-party': 'First-party material',
  'submitted-urls': 'Editor-submitted URLs',
  other: 'Other approved sources',
};

const channelLabels: Record<PilotIntake['deliveryChannels'][number], string> = {
  web: 'Website or CMS',
  social: 'Social publishing',
  newsletter: 'Newsletter',
  messaging: 'Messaging channels',
  mobile: 'Mobile application',
  other: 'Other delivery surface',
};

const reviewLabels: Record<PilotIntake['humanReview'], string> = {
  'editor-approves': 'An editor approves every package',
  'editor-reviews-exceptions': 'An editor reviews exceptions and escalations',
  'needs-design': 'The review boundary needs to be designed',
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!,
  );
}

function subjectSafe(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

export function buildPilotEmail(
  application: PilotIntake,
  requestId: string,
): PilotEmail {
  const rows = [
    ['Request ID', requestId],
    ['Company', application.companyName],
    ['Publisher type', publisherLabels[application.publisherType]],
    ['Monthly volume', volumeLabels[application.monthlyVolume]],
    ['Source types', application.sourceTypes.map((item) => sourceLabels[item]).join(', ')],
    ['Delivery channels', application.deliveryChannels.map((item) => channelLabels[item]).join(', ')],
    ['Human review', reviewLabels[application.humanReview]],
    ['Contact', application.contactName],
    ['Work email', application.contactEmail],
    ['Website', application.website ?? 'Not provided'],
    ['Current workflow', application.workflowSummary],
    ['Additional context', application.otherContext ?? 'Not provided'],
  ] as const;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:12px;border-bottom:1px solid #ddd;font-family:Arial,sans-serif;font-size:12px;letter-spacing:.06em;text-transform:uppercase">${escapeHtml(label)}</th><td style="padding:12px;border-bottom:1px solid #ddd;font-family:Arial,sans-serif;font-size:15px;line-height:1.5;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('');

  return {
    to: 'hello@alomattech.com',
    from: {
      email: 'pilot@notify.alomattech.com',
      name: 'Alomat Pilot',
    },
    replyTo: application.contactEmail,
    subject: `[Managed Pilot] ${subjectSafe(application.companyName)} · ${publisherLabels[application.publisherType]}`,
    html: `<main><h1 style="font-family:Arial,sans-serif">New managed pilot application</h1><table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse">${htmlRows}</table></main>`,
    text,
  };
}
