export interface CaseStudyStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface ArchitectureLayer {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly kind: 'system' | 'control';
}

export interface EvidenceItem {
  readonly index: string;
  readonly title: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: 1600;
  readonly height: 900;
}

export interface PublisherCaseStudy {
  readonly slug: 'publisher-workflow';
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly privacyNote: string;
  readonly problem: readonly string[];
  readonly workflow: readonly CaseStudyStep[];
  readonly architecture: readonly ArchitectureLayer[];
  readonly evidence: readonly EvidenceItem[];
  readonly proof: readonly string[];
  readonly controlStatement: string;
  readonly controlDescription: string;
  readonly controls: readonly string[];
  readonly primaryCta: {
    readonly label: string;
    readonly href: '/pilot';
  };
  readonly secondaryCta: {
    readonly label: string;
    readonly href: '/platform';
  };
}

export const publisherCaseStudy = {
  slug: 'publisher-workflow',
  eyebrow: 'Anonymous production deployment',
  title: 'From fragmented sources to a controlled publishing workflow.',
  description:
    'How an active digital publisher uses approved-source monitoring, editorial memory, specialist agents, and human approval to prepare publish-ready content packages.',
  privacyNote:
    'The publisher remains anonymous. This case study presents observable workflow evidence while withholding identity, private content, and operational details.',
  problem: [
    'Relevant signals arrive across multiple approved sources and selected URLs.',
    'Related or repeated coverage must be grouped before drafting begins.',
    'Source context, editorial history, and publisher rules must stay available throughout the workflow.',
    'Publication decisions must remain with a human editor, with failures and review state visible.',
  ],
  workflow: [
    {
      index: '01',
      title: 'Monitor',
      description:
        'Watch approved sources and accept selected URLs without treating every signal as a story.',
    },
    {
      index: '02',
      title: 'Verify',
      description:
        'Extract primary material, preserve source references, group related coverage, and identify duplicate candidates.',
    },
    {
      index: '03',
      title: 'Remember',
      description:
        'Retrieve archive-backed context, style guidance, topic history, and publisher-specific constraints.',
    },
    {
      index: '04',
      title: 'Produce',
      description:
        'Route the work through the required research, writing, editing, visual, and verification stages.',
    },
    {
      index: '05',
      title: 'Review',
      description:
        'Show the draft, source trace, and workflow state to an editor who can approve, edit, reject, or stop the process.',
    },
    {
      index: '06',
      title: 'Package',
      description:
        'Prepare the reviewed text, summary, and visual direction for the selected publishing surface.',
    },
  ],
  architecture: [
    {
      index: '01',
      title: 'Source layer',
      description: 'Approved inputs enter one observable workflow.',
      capabilities: ['Feeds and sites', 'Selected URLs', 'Source health'],
      kind: 'system',
    },
    {
      index: '02',
      title: 'Intelligence layer',
      description:
        'Material is extracted, traced, grouped, and matched with editorial context.',
      capabilities: [
        'Extraction',
        'Source trace',
        'Story grouping',
        'Editorial memory',
      ],
      kind: 'system',
    },
    {
      index: '03',
      title: 'Agent workflow',
      description:
        'Specialist stages prepare the text and visual package under deterministic routing.',
      capabilities: ['Research', 'Drafting', 'Editing', 'Verification'],
      kind: 'system',
    },
    {
      index: '04',
      title: 'Human review and approval',
      description:
        'An editor inspects sources and output before anything can reach delivery.',
      capabilities: ['Approve', 'Edit', 'Reject', 'Hard stop'],
      kind: 'control',
    },
    {
      index: '05',
      title: 'Delivery layer',
      description:
        'The approved package and its state move to the selected publishing surface.',
      capabilities: [
        'Publish-ready package',
        'Delivery state',
        'Recorded feedback',
      ],
      kind: 'system',
    },
  ],
  evidence: [
    {
      index: '01',
      title: 'Approved-source intake',
      src: '/case-study/publisher-workflow/source-monitoring.webp',
      alt: 'Sanitized trace from a real pipeline run showing approved publishing sources entering the workflow',
      caption:
        'A sanitized trace captured from a real pipeline run, showing approved inputs entering monitoring and source processing before drafting begins.',
      width: 1600,
      height: 900,
    },
    {
      index: '02',
      title: 'Human decision boundary',
      src: '/case-study/publisher-workflow/human-review.webp',
      alt: 'Sanitized trace from a real workflow run showing human approval, editing, and rejection controls',
      caption:
        'A sanitized trace captured from a real workflow run, where an editor receives explicit approve, edit, reject, and hard-stop decision paths.',
      width: 1600,
      height: 900,
    },
    {
      index: '03',
      title: 'Publish-ready package',
      src: '/case-study/publisher-workflow/publish-ready-package.webp',
      alt: 'Sanitized trace from a real pipeline run showing a text and visual content package ready for review',
      caption:
        'A sanitized trace captured from a real pipeline run, showing text, attached visual material, and source context held behind human approval.',
      width: 1600,
      height: 900,
    },
  ],
  proof: [
    'Multiple approved-source inputs feed one observable workflow.',
    'Source references and related-story signals remain available before drafting.',
    'Archive-backed editorial context informs specialist production stages.',
    'Human approval, editing, rejection, and hard-stop paths precede delivery.',
    'Workflow state and review feedback remain part of the operating system.',
  ],
  controlStatement: 'The agents prepare. Editors decide.',
  controlDescription:
    'The system preserves source boundaries, review state, explicit decision paths, escalation, and hard stops. It prepares accountable work for an editor rather than acting as an autonomous newsroom.',
  controls: [
    'Approved-source boundaries',
    'Visible source trace',
    'Human approval before delivery',
    'Edit, reject, and hard-stop paths',
  ],
  primaryCta: { label: 'Request a managed pilot', href: '/pilot' },
  secondaryCta: { label: 'Explore the platform', href: '/platform' },
} as const satisfies PublisherCaseStudy;
