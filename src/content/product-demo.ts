export type DemoVisual =
  | 'sources'
  | 'monitor'
  | 'verify'
  | 'memory'
  | 'agents'
  | 'package'
  | 'review'
  | 'pilot';

export interface ProductDemoScene {
  readonly index: string;
  readonly title: string;
  readonly statement: string;
  readonly label: string;
  readonly durationSeconds: number;
  readonly visual: DemoVisual;
}

export interface DemoRow {
  readonly name: string;
  readonly note: string;
  readonly muted?: boolean;
}

export const productDemo = {
  title: 'Alomat agentic publishing workflow',
  description:
    'A representative product walkthrough that follows one example story from approved sources to a draft in the publisher’s own voice and a human approval decision.',
  eyebrow: '60-second product walkthrough',
  durationSeconds: 60,
  privacyNote:
    'This is a representative product walkthrough based on an implemented publishing workflow. The story, sources, and screens are illustrative examples. Customer identity, source names, private interfaces, and operational data are intentionally excluded.',
  controlStatement: 'Agents prepare. Editors decide.',
  exampleNote: 'Representative example. Not customer data.',
  scenes: [
    {
      index: '00',
      title: 'One story, several sources.',
      statement:
        'The same update reaches a publisher as a press release, a news article, and a link someone sends in.',
      label: 'The starting point',
      durationSeconds: 6,
      visual: 'sources',
    },
    {
      index: '01',
      title: 'Only approved sources count.',
      statement:
        'Alomat watches the sources and intake paths the publisher has approved, and ignores everything else.',
      label: 'Source intelligence',
      durationSeconds: 8,
      visual: 'monitor',
    },
    {
      index: '02',
      title: 'Grouped and traced before drafting.',
      statement:
        'Related coverage becomes one story group, duplicates are merged, and references stay attached.',
      label: 'Verification',
      durationSeconds: 8,
      visual: 'verify',
    },
    {
      index: '03',
      title: 'Your voice, remembered.',
      statement:
        'Style notes and earlier posts from the archive tell the workflow how this publisher writes.',
      label: 'Editorial memory',
      durationSeconds: 8,
      visual: 'memory',
    },
    {
      index: '04',
      title: 'Drafted in visible stages.',
      statement:
        'Research, writing, editing, and verification run as separate, observable stages rather than one opaque prompt.',
      label: 'Agent workflow',
      durationSeconds: 8,
      visual: 'agents',
    },
    {
      index: '05',
      title: 'One package to review.',
      statement:
        'The draft arrives with its summary, visual brief, and references in a single review package.',
      label: 'Content packaging',
      durationSeconds: 8,
      visual: 'package',
    },
    {
      index: '06',
      title: 'The decision stays human.',
      statement:
        'An editor can approve, edit, reject, or escalate. Nothing is delivered before that decision.',
      label: 'Human control',
      durationSeconds: 8,
      visual: 'review',
    },
    {
      index: '07',
      title: 'Start with one real workflow.',
      statement:
        'A pilot connects your own approved sources, editorial rules, and review roles to the platform.',
      label: 'Managed pilot',
      durationSeconds: 6,
      visual: 'pilot',
    },
  ] as const satisfies readonly ProductDemoScene[],
  example: {
    incoming: [
      { name: 'Press release', note: 'Council approves Harbor Street bike lanes' },
      { name: 'News site', note: 'Harbor Street to get protected bike lanes' },
      { name: 'Submitted link', note: 'Bike lanes vote passes' },
    ],
    sources: [
      { name: 'City press office', note: 'Approved · live' },
      { name: 'Regional daily', note: 'Approved · live' },
      { name: 'Submitted links', note: 'Approved · checked on arrival' },
      { name: 'Unlisted blog', note: 'Not approved · ignored', muted: true },
    ],
    storyGroup: {
      title: 'Harbor Street bike lanes',
      rows: [
        { name: 'Press release', note: 'Primary source' },
        { name: 'Regional daily', note: 'Related coverage' },
        { name: 'Submitted link', note: 'Duplicate · merged', muted: true },
      ],
      footer: 'References stay attached to the story',
    },
    memory: {
      heading: 'Style notes from the archive',
      notes: [
        'Short sentences.',
        'Lead with what changes for readers.',
        'Plain words, no jargon.',
      ],
      earlierLabel: 'Earlier post on this topic',
      earlierPost: 'Road works on Harbor Street start in spring.',
    },
    stages: [
      { name: 'Research', note: 'Reads the primary source' },
      { name: 'Write', note: 'Drafts in the stored style' },
      { name: 'Edit', note: 'Tightens wording and length' },
      { name: 'Verify', note: 'Checks each claim against the sources' },
    ],
    draft: {
      headline: 'Harbor Street is getting protected bike lanes',
      body: 'The council voted yes last night. Work starts in spring. Here is what changes if you drive, ride, or walk there.',
      extras: [
        { name: 'Summary', note: 'One line for the channel preview' },
        { name: 'Visual brief', note: 'Street map with the new lanes' },
        { name: 'References', note: 'Press release, regional daily' },
      ],
    },
    review: {
      actions: ['Approve', 'Edit', 'Reject', 'Escalate'],
      waiting: 'Waiting for the editor · nothing is delivered yet',
      approved: 'Approved by the editor · sent to delivery',
    },
    pilot: {
      link: 'alomattech.com/pilot',
    },
  },
} as const;
