export type DemoVisual =
  | 'signals'
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
  readonly signals: readonly string[];
}

export const productDemo = {
  title: 'Alomat agentic publishing workflow',
  description:
    'A representative product walkthrough showing how approved source signals become a traceable, human-approved publishing package.',
  eyebrow: '60-second product walkthrough',
  durationSeconds: 60,
  privacyNote:
    'This is a representative product walkthrough based on an implemented publishing workflow. Customer identity, source names, private interfaces, and operational data are intentionally excluded.',
  controlStatement: 'Agents prepare. Editors decide.',
  scenes: [
    {
      index: '00',
      title: 'Signals arrive fragmented.',
      statement:
        'Important updates appear across feeds, sites, channels, and submitted URLs before an editorial team can connect them.',
      label: 'The operating problem',
      durationSeconds: 6,
      visual: 'signals',
      signals: ['Feed', 'Site', 'Channel', 'URL'],
    },
    {
      index: '01',
      title: 'Monitor approved sources.',
      statement:
        'Alomat watches only the sources and intake paths defined with the publishing team.',
      label: 'Source intelligence',
      durationSeconds: 8,
      visual: 'monitor',
      signals: ['Approved boundary', 'Live status', 'Visible failures'],
    },
    {
      index: '02',
      title: 'Verify before drafting.',
      statement:
        'Related coverage is grouped, duplicates are surfaced, and primary references stay attached to the story trace.',
      label: 'Verification',
      durationSeconds: 8,
      visual: 'verify',
      signals: ['Source trace', 'Story group', 'Duplicate signal'],
    },
    {
      index: '03',
      title: 'Bring editorial memory forward.',
      statement:
        'Archive context, style guidance, topic history, and format rules shape the next decision.',
      label: 'Editorial memory',
      durationSeconds: 8,
      visual: 'memory',
      signals: ['Archive', 'Style', 'Topic context', 'Rules'],
    },
    {
      index: '04',
      title: 'Coordinate specialist agents.',
      statement:
        'Research, writing, editing, visual direction, and verification run as observable stages rather than one opaque prompt.',
      label: 'Agent workflow',
      durationSeconds: 8,
      visual: 'agents',
      signals: ['Research', 'Write', 'Edit', 'Verify'],
    },
    {
      index: '05',
      title: 'Prepare one review package.',
      statement:
        'The workflow assembles the chosen format, concise summary, visual brief, references, and delivery state.',
      label: 'Content packaging',
      durationSeconds: 8,
      visual: 'package',
      signals: ['Draft', 'Summary', 'Visual brief', 'References'],
    },
    {
      index: '06',
      title: 'Keep the decision human.',
      statement:
        'An editor can approve, edit, reject, or escalate. Delivery stops until an accountable decision exists.',
      label: 'Human control',
      durationSeconds: 8,
      visual: 'review',
      signals: ['Approve', 'Edit', 'Reject', 'Escalate'],
    },
    {
      index: '07',
      title: 'Start with one real workflow.',
      statement:
        'We configure a managed pilot around your sources, editorial rules, review roles, and delivery boundary.',
      label: 'Managed pilot',
      durationSeconds: 6,
      visual: 'pilot',
      signals: ['Configure', 'Operate', 'Evaluate'],
    },
  ] as const satisfies readonly ProductDemoScene[],
} as const;

