export interface Capability {
  readonly index: string;
  readonly title: string;
  readonly statement: string;
  readonly primitives: readonly string[];
}

export interface ApproachStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface ProductModule {
  readonly index: string;
  readonly title: string;
  readonly statement: string;
  readonly primitives: readonly string[];
}

export interface DeploymentPattern {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly evidence: readonly string[];
}

export interface ManagedOfferItem {
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface ExperienceNote {
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface ServiceProcessStep {
  readonly title: string;
  readonly description: string;
}

export interface ServicePage {
  readonly slug: 'agent-systems' | 'multilingual-ai' | 'full-stack-ai-products';
  readonly eyebrow: string;
  readonly title: string;
  readonly seoTitle: string;
  readonly description: string;
  readonly definition: string;
  readonly serviceType: string;
  readonly outcomes: readonly string[];
  readonly deliverables: readonly string[];
  readonly process: readonly ServiceProcessStep[];
  readonly relatedSlugs: readonly ServicePage['slug'][];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const site = {
  name: 'Alomat LLC',
  shortName: '.alomat',
  category: 'Agentic publishing operations platform',
  tagline: 'Turn trusted sources into publish-ready content.',
  description:
    'Alomat is a managed agentic publishing platform for global digital publishers, combining source intelligence, editorial memory, specialist agents, and human approval.',
  url: 'https://alomattech.com',
  email: 'hello@alomattech.com',
  founderEmail: 'habib@alomattech.com',
  pilotSubject: 'Managed publishing pilot',
  linkedin: 'https://www.linkedin.com/company/alomat-llc/',
  github: 'https://github.com/alomat-llc/alomattech-website',
  markets: ['United States', 'Global'],
} as const;

export const navigation = [
  { label: 'Product', href: '/#product' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Deployments', href: '/#deployments' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;

export const productModules = [
  {
    index: '01',
    title: 'Source Intelligence',
    statement:
      'Monitor approved sources, accept URLs, extract primary material, group related coverage, and keep source failures visible.',
    primitives: ['Monitoring', 'Extraction', 'Grouping', 'Source trace'],
  },
  {
    index: '02',
    title: 'Editorial Memory',
    statement:
      'Retrieve archive-backed style, topic context, duplicate signals, and publisher-specific rules before drafting begins.',
    primitives: ['Archive retrieval', 'Style memory', 'Context', 'Deduplication'],
  },
  {
    index: '03',
    title: 'Agent Workflow',
    statement:
      'Coordinate research, writing, editing, visual, and verification stages as one observable publishing pipeline.',
    primitives: ['Orchestration', 'Tool use', 'Routing', 'Traceability'],
  },
  {
    index: '04',
    title: 'Content Packaging',
    statement:
      'Prepare short updates, explainers, digests, summaries, and visual direction for the selected publishing surface.',
    primitives: ['Formats', 'Summaries', 'Visual briefs', 'Channel adaptation'],
  },
  {
    index: '05',
    title: 'Human Control',
    statement:
      'Keep editors in charge through approval queues, source visibility, edit and reject paths, and explicit hard stops.',
    primitives: ['Approval', 'Escalation', 'Guardrails', 'Accountability'],
  },
  {
    index: '06',
    title: 'Operations & Evaluation',
    statement:
      'Track delivery state, retries, traces, quality gates, and review feedback so the workflow improves safely.',
    primitives: ['Observability', 'Evaluation', 'Fallbacks', 'Feedback'],
  },
] as const satisfies readonly ProductModule[];

export const publishingWorkflow = [
  {
    index: '01',
    title: 'Monitor',
    description:
      'Watch approved feeds, sites, channels, and submitted URLs without turning every signal into a story.',
  },
  {
    index: '02',
    title: 'Verify',
    description:
      'Extract primary material, group related coverage, detect duplicates, and preserve source references.',
  },
  {
    index: '03',
    title: 'Understand',
    description:
      'Score relevance, retrieve editorial memory, choose the right format, and apply publisher-specific rules.',
  },
  {
    index: '04',
    title: 'Produce',
    description:
      'Coordinate specialist agents to draft text, summaries, visual direction, and channel-ready packages.',
  },
  {
    index: '05',
    title: 'Review',
    description:
      'Present traceable output to a human editor for approval, editing, rejection, or escalation.',
  },
  {
    index: '06',
    title: 'Learn',
    description:
      'Record decisions and outcomes so evaluations and workflow rules can improve without bypassing people.',
  },
] as const satisfies readonly ApproachStep[];

export const deploymentPatterns = [
  {
    label: 'Production pattern / 01',
    title: 'Always-on signal desk',
    description:
      'In production with an active digital publisher: the system monitors multiple approved sources, groups related stories, prepares the appropriate format, and waits for owner approval.',
    evidence: ['Continuous monitoring', 'Story grouping', 'Format routing', 'Owner approval'],
  },
  {
    label: 'Production pattern / 02',
    title: 'URL-to-content package',
    description:
      'An editor submits an approved article URL and receives a concise summary plus visual direction prepared for review and delivery.',
    evidence: ['Secure URL intake', 'Article extraction', 'Concise summary', 'Visual package'],
  },
  {
    label: 'Production pattern / 03',
    title: 'Editorial memory system',
    description:
      'Historical style and topic context guide specialist research, writing, editing, and verification stages before a human decision.',
    evidence: ['Archive retrieval', 'Style guidance', 'Specialist agents', 'Quality gates'],
  },
] as const satisfies readonly DeploymentPattern[];

export const managedOffer = [
  {
    label: 'Managed SaaS / 01',
    title: 'Configure',
    description:
      'We set up approved sources, archive-backed editorial memory, output formats, review roles, and delivery boundaries.',
  },
  {
    label: 'Managed SaaS / 02',
    title: 'Operate',
    description:
      'We run and observe the agent workflow while your editors remain responsible for approval and publication decisions.',
  },
  {
    label: 'Managed SaaS / 03',
    title: 'Improve',
    description:
      'We use review feedback, traces, and evaluation examples to refine the workflow without weakening its controls.',
  },
] as const satisfies readonly ManagedOfferItem[];

export const capabilities = [
  {
    index: '01',
    title: 'Agent systems',
    statement:
      'We shape models, tools, and context into dependable execution loops that can do useful work.',
    primitives: ['Orchestration', 'Context', 'Tool use', 'Evaluation'],
  },
  {
    index: '02',
    title: 'Language technologies',
    statement:
      'We build multilingual interfaces that can listen, retrieve, translate, and respond with intent.',
    primitives: ['Speech', 'Translation', 'Retrieval', 'Multilingual UX'],
  },
  {
    index: '03',
    title: 'Full-stack AI products',
    statement:
      'We carry intelligent products from an operational question to a production-ready surface.',
    primitives: ['Product design', 'Applications', 'Cloud delivery', 'Operations'],
  },
] as const satisfies readonly Capability[];

export const approachSteps = [
  {
    index: '01',
    title: 'Understand the signal',
    description:
      'We begin with the decisions, language, and operational events the system must understand.',
  },
  {
    index: '02',
    title: 'Design the system',
    description:
      'We define where models help, where deterministic software leads, and how the parts communicate.',
  },
  {
    index: '03',
    title: 'Build the harness',
    description:
      'We surround intelligence with tools, context, evaluations, observability, and clear interfaces.',
  },
  {
    index: '04',
    title: 'Observe and improve',
    description:
      'We measure real behavior, trace failures, and refine the system as its environment changes.',
  },
] as const satisfies readonly ApproachStep[];

export const experienceNotes = [
  {
    label: 'Voice systems',
    title: 'From speech data to conversational behavior.',
    description:
      "Our team's experience at Aisha included preparing conversational voice data and working with speech-to-text model adaptation. It informs how we think about listening systems today.",
  },
  {
    label: 'Multilingual products',
    title: 'Language models inside real product workflows.',
    description:
      "Our team's work at WordExpert spans full-stack product development and the integration of translation models and language models into practical multilingual experiences.",
  },
  {
    label: 'Agent engineering',
    title: 'Models are components. The system is the product.',
    description:
      "Our team's current Alomat work focuses on agent orchestration, context engineering, harnesses, and the product surfaces that make intelligent systems usable.",
  },
] as const satisfies readonly ExperienceNote[];

export const servicePages = [
  {
    slug: 'agent-systems',
    eyebrow: 'Capability / 01',
    title: 'AI agent systems built for dependable work.',
    seoTitle: 'AI Agent Systems Engineering — Alomat LLC',
    description:
      'Agent systems form the controlled workflow layer of the Alomat publishing platform, coordinating source verification, editorial context, production, human review, and evaluation.',
    definition:
      'Inside the Alomat publishing platform, agent systems combine models with tools, editorial context, deterministic controls, evaluation, and human review so each publishing stage remains observable and accountable.',
    serviceType: 'Agent workflow infrastructure',
    outcomes: [
      'Coordinate research, writing, editing, visual, and verification stages inside one controlled publishing loop.',
      'Keep model behavior visible through traces, evaluations, review state, and explicit failure paths.',
      'Connect models to approved sources and tools without treating the model as the whole product.',
    ],
    deliverables: [
      'Publishing-stage architecture and workflow boundaries',
      'Source, tool, and editorial-context interfaces',
      'Evaluation examples and quality gates',
      'Observability, fallback, escalation, and review paths',
    ],
    process: [
      { title: 'Map the editorial work', description: 'Define sources, decisions, formats, tools, review roles, and publication boundaries.' },
      { title: 'Design the agent loop', description: 'Choose where models reason, where deterministic code leads, and where human review is required.' },
      { title: 'Build the controls', description: 'Implement tools, context, evaluations, traces, hard stops, and recovery paths.' },
      { title: 'Operate and improve', description: 'Observe live workflow behavior, investigate failures, and refine the system with evidence.' },
    ],
    relatedSlugs: ['multilingual-ai', 'full-stack-ai-products'],
  },
  {
    slug: 'multilingual-ai',
    eyebrow: 'Capability / 02',
    title: 'Multilingual AI that listens, retrieves, translates, and responds.',
    seoTitle: 'Multilingual AI and Language Technology — Alomat LLC',
    description:
      'Multilingual retrieval, translation, and language-aware evaluation help the Alomat publishing platform work across global source and editorial contexts.',
    definition:
      'Within the Alomat publishing platform, multilingual AI connects source extraction, retrieval, translation, editorial memory, language models, and review interfaces without losing the surrounding publishing task or intent.',
    serviceType: 'Multilingual publishing intelligence',
    outcomes: [
      'Monitor and understand approved source material across the languages a publishing workflow requires.',
      'Combine translation, retrieval, editorial memory, and language models inside one coherent pipeline.',
      'Evaluate output by language, format, source, and failure mode instead of relying on one average score.',
    ],
    deliverables: [
      'Multilingual source and editorial-workflow design',
      'Translation and language-model integration',
      'Cross-language retrieval and editorial memory',
      'Language-specific evaluation and review controls',
    ],
    process: [
      { title: 'Define language needs', description: 'Identify source languages, output formats, editorial rules, quality thresholds, and review responsibilities.' },
      { title: 'Choose the pipeline', description: 'Select the appropriate extraction, translation, retrieval, and language-model components.' },
      { title: 'Connect editorial memory', description: 'Preserve relevant context, style, and review rules across the complete publishing workflow.' },
      { title: 'Evaluate by language', description: 'Measure real publishing examples, surface weak cases, and improve the system with targeted evidence.' },
    ],
    relatedSlugs: ['agent-systems', 'full-stack-ai-products'],
  },
  {
    slug: 'full-stack-ai-products',
    eyebrow: 'Capability / 03',
    title: 'Full-stack AI products from operational question to production.',
    seoTitle: 'Full-Stack AI Product Engineering — Alomat LLC',
    description:
      'The Alomat publishing platform connects agent workflows to durable application software, data, review interfaces, cloud delivery, and observable operations.',
    definition:
      'Full-stack product engineering gives the Alomat publishing platform the interfaces, services, data flows, monitoring, and operating process required to turn model capabilities into a dependable managed SaaS product.',
    serviceType: 'Publishing product infrastructure',
    outcomes: [
      'Give editors a usable surface for sources, draft state, review, and delivery decisions.',
      'Integrate agent and model capabilities with dependable application, data, and cloud architecture.',
      'Create an observable publishing path that supports measured iteration after the first release.',
    ],
    deliverables: [
      'Managed SaaS scope and technical architecture',
      'Editorial frontend and backend application engineering',
      'Agent, model, source, data, and service integration',
      'Delivery state, monitoring, and operational tooling',
    ],
    process: [
      { title: 'Frame the workflow', description: 'Translate the publishing operation into users, decisions, constraints, and a testable managed release.' },
      { title: 'Design the architecture', description: 'Define application, agent, model, source, data, and infrastructure boundaries before implementation.' },
      { title: 'Build the product', description: 'Deliver the editor surface, services, integrations, evaluations, and deployment path together.' },
      { title: 'Learn from operation', description: 'Use review behavior and system traces to prioritize the next platform improvements.' },
    ],
    relatedSlugs: ['agent-systems', 'multilingual-ai'],
  },
] as const satisfies readonly ServicePage[];

export const faqItems = [
  {
    question: 'What does the Alomat publishing platform do?',
    answer: 'Alomat monitors approved sources, verifies and groups material, retrieves editorial context, coordinates specialist agents, prepares text and visual packages, and routes the result to a human editor for review.',
  },
  {
    question: 'What does managed SaaS mean at Alomat?',
    answer: 'Alomat configures and operates the publishing workflow as recurring software: sources, editorial memory, agent stages, review boundaries, delivery state, evaluation, and operational improvement are managed with the customer.',
  },
  {
    question: 'Does a human approve content before delivery?',
    answer: 'Yes. Human review is an explicit product boundary. Editors can inspect source context, edit, approve, reject, or escalate output; Alomat does not describe the platform as an unaccountable autonomous newsroom.',
  },
  {
    question: 'How does editorial memory work?',
    answer: 'Editorial memory retrieves relevant archive examples, topic context, duplicate signals, style guidance, and publisher-specific rules before production begins. The exact archive and retention boundaries are defined during onboarding.',
  },
  {
    question: 'Which sources and output formats can the platform support?',
    answer: 'A managed setup can combine approved feeds, sites, channels, and submitted URLs with formats such as short updates, explainers, digests, summaries, and visual direction. Final connectors depend on source access and review requirements.',
  },
  {
    question: 'Is the Alomat platform already used in production?',
    answer: 'Yes. The operating system is used in a live workflow with an active digital publisher. The customer remains anonymous, and Alomat does not publish unsupported adoption, performance, or volume metrics.',
  },
  {
    question: 'How does a managed pilot begin?',
    answer: 'A pilot begins with one bounded publishing workflow: approved sources, desired formats, archive context, review roles, delivery boundary, and acceptance examples. Email hello@alomattech.com to define that initial scope.',
  },
  {
    question: 'Which markets does Alomat serve?',
    answer: 'Alomat is designed for global digital publishers and remote editorial teams. Public materials do not claim an office, customer footprint, language specialization, or geographic presence that has not been verified.',
  },
] as const satisfies readonly FaqItem[];
