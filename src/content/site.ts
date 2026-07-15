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
} as const;

export const navigation = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Studio', href: '/#studio' },
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
