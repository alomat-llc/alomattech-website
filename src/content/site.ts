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
  tagline: 'Building signals into systems.',
  description:
    'Alomat builds agent systems, language technologies, and full-stack AI products.',
  url: 'https://alomattech.com',
  email: 'hello@alomattech.com',
  founderEmail: 'habib@alomattech.com',
  linkedin: 'https://www.linkedin.com/company/alomat-llc/',
  github: 'https://github.com/habibsalimov/alomattech-website',
  markets: ['United States', 'Global'],
} as const;

export const navigation = [
  { label: 'Services', href: '/#capabilities' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;

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
      'Alomat designs AI agent systems with orchestration, context, tool use, evaluations, and observability for US and global product teams.',
    definition:
      'An AI agent system combines models with tools, context, deterministic software, evaluation, and operational controls so it can complete useful work reliably rather than only generate a response.',
    serviceType: 'AI agent systems engineering',
    outcomes: [
      'Turn a multi-step operational workflow into a controlled execution loop.',
      'Make model behavior observable through traces, evaluations, and explicit failure paths.',
      'Connect models to approved tools and data without treating the model as the whole product.',
    ],
    deliverables: [
      'Agent architecture and workflow boundaries',
      'Tool interfaces and context pipelines',
      'Evaluation sets and reliability checks',
      'Observability, fallback, and human-review paths',
    ],
    process: [
      { title: 'Map the work', description: 'Define the decisions, tools, data, and boundaries involved in the real workflow.' },
      { title: 'Design the loop', description: 'Choose where models reason, where deterministic code leads, and where review is required.' },
      { title: 'Build the harness', description: 'Implement tools, context, evaluations, traces, and recovery paths around the model.' },
      { title: 'Operate and improve', description: 'Observe real behavior, investigate failures, and refine the system with evidence.' },
    ],
    relatedSlugs: ['multilingual-ai', 'full-stack-ai-products'],
  },
  {
    slug: 'multilingual-ai',
    eyebrow: 'Capability / 02',
    title: 'Multilingual AI that listens, retrieves, translates, and responds.',
    seoTitle: 'Multilingual AI and Language Technology — Alomat LLC',
    description:
      'Alomat builds multilingual AI products using speech, translation, retrieval, language models, and practical user interfaces for global workflows.',
    definition:
      'Multilingual AI connects speech, translation, retrieval, language models, and product interfaces so people can work with information across languages without losing the surrounding task or intent.',
    serviceType: 'Multilingual AI product engineering',
    outcomes: [
      'Create language-aware product experiences for users and operational teams.',
      'Combine speech, translation, retrieval, and language models inside one coherent workflow.',
      'Evaluate quality by language, task, and failure mode instead of relying on a single average score.',
    ],
    deliverables: [
      'Multilingual workflow and data design',
      'Speech-to-text and translation integration',
      'Retrieval and language-model pipelines',
      'Language-specific evaluation and review tooling',
    ],
    process: [
      { title: 'Define language needs', description: 'Identify the languages, tasks, source material, quality thresholds, and review responsibilities.' },
      { title: 'Choose the pipeline', description: 'Select the appropriate speech, translation, retrieval, and language-model components.' },
      { title: 'Integrate the product', description: 'Build interfaces and services that preserve context across the complete user workflow.' },
      { title: 'Evaluate by language', description: 'Measure real examples, surface weak cases, and improve the system with targeted evidence.' },
    ],
    relatedSlugs: ['agent-systems', 'full-stack-ai-products'],
  },
  {
    slug: 'full-stack-ai-products',
    eyebrow: 'Capability / 03',
    title: 'Full-stack AI products from operational question to production.',
    seoTitle: 'Full-Stack AI Product Engineering — Alomat LLC',
    description:
      'Alomat develops production-ready AI products across product design, application engineering, cloud delivery, observability, and operations.',
    definition:
      'Full-stack AI product engineering connects the model layer to durable application software, user experience, data flows, cloud infrastructure, monitoring, and the operating process required to keep the product useful.',
    serviceType: 'Full-stack AI product engineering',
    outcomes: [
      'Move from an operational problem to a usable, production-ready product surface.',
      'Integrate model capabilities with dependable application and cloud architecture.',
      'Create an observable delivery path that supports iteration after the first release.',
    ],
    deliverables: [
      'Product scope and technical architecture',
      'Frontend and backend application engineering',
      'Model, data, and service integration',
      'Cloud delivery, monitoring, and operational tooling',
    ],
    process: [
      { title: 'Frame the product', description: 'Translate the operational question into users, decisions, constraints, and a testable release scope.' },
      { title: 'Design the architecture', description: 'Define application, model, data, and infrastructure boundaries before implementation.' },
      { title: 'Build the product', description: 'Deliver the user surface, services, integrations, evaluations, and deployment path together.' },
      { title: 'Learn from operation', description: 'Use product behavior and system traces to prioritize the next improvements.' },
    ],
    relatedSlugs: ['agent-systems', 'multilingual-ai'],
  },
] as const satisfies readonly ServicePage[];

export const faqItems = [
  {
    question: 'What does Alomat LLC build?',
    answer: 'Alomat builds AI agent systems, multilingual language technologies, and full-stack AI products. The work connects models to software, tools, context, evaluations, cloud infrastructure, and usable product interfaces.',
  },
  {
    question: 'What is an AI agent system?',
    answer: 'An AI agent system is a controlled software workflow in which models can reason with context and use approved tools. Reliable systems also include deterministic logic, evaluations, traces, fallback behavior, and human review where needed.',
  },
  {
    question: 'Does Alomat work with multilingual and voice products?',
    answer: 'Yes. Alomat focuses on multilingual workflows that may combine speech-to-text, translation, retrieval, language models, and language-aware user interfaces. The exact pipeline depends on the languages, task, data, and quality requirements.',
  },
  {
    question: 'Can Alomat build both the AI layer and the application?',
    answer: 'Yes. Full-stack AI product engineering covers the user interface, backend services, model and data integrations, cloud delivery, monitoring, and operational tooling required to turn a model capability into a usable product.',
  },
  {
    question: 'How does an Alomat engagement begin?',
    answer: 'Work begins by defining the operational problem, users, decisions, available data, tools, risks, and success conditions. That discovery produces a bounded architecture and delivery plan before implementation expands.',
  },
  {
    question: 'Which markets does Alomat serve?',
    answer: 'Alomat works with product teams serving the United States and global markets. Delivery is remote and the company does not present a local office, customer footprint, or geographic presence that has not been publicly verified.',
  },
  {
    question: 'How can a team contact Alomat?',
    answer: 'Product, engineering, infrastructure, and collaboration conversations can start by emailing hello@alomattech.com. Founder-specific messages can be sent to habib@alomattech.com.',
  },
] as const satisfies readonly FaqItem[];
