/**
 * Content for the one-page alomattech.com site.
 *
 * Everything here must stay true: screenshots come from a working account,
 * no customer, partner or funding claims, and no invented numbers.
 */

export const site = {
  name: 'Alomat LLC',
  shortName: '.alomat',
  url: 'https://alomattech.com',
  appUrl: 'https://app-staging.alomattech.com/sign-in',
  email: 'hello@alomattech.com',
  founderEmail: 'habib@alomattech.com',
  linkedin: 'https://www.linkedin.com/company/alomat-llc/',
  github: 'https://github.com/alomat-llc',
  markets: ['Uzbekistan', 'Global'],
  title: 'Alomat — Uzbek news, summarised and sent to Telegram',
  description:
    'Alomat reads the websites, RSS feeds and public Telegram channels you choose, summarises each news item in Uzbek and sends the ones that match your interests to your Telegram chat, group or channel.',
} as const;

export const navigation = [
  { label: 'Product', href: '/#product' },
  { label: 'Demo', href: '/#demo' },
  { label: 'Stage', href: '/#stage' },
  { label: 'Company', href: '/#company' },
] as const;

export interface FeedItem {
  readonly source: string;
  readonly date: string;
  readonly headline: string;
}

/** Real items from the founder's feed on 17 November 2026 (see screens/home.jpg). */
export const feedSample: readonly FeedItem[] = [
  { source: 'UzA', date: '17-noyabr', headline: 'Azizaxon Ismatullayeva PhD dissertatsiyasini himoya qiladi' },
  { source: 'UzA', date: '17-noyabr', headline: 'Shahmat: qizlar Rossiya, yigitlar BAA bilan o‘ynaydi' },
];

export interface ProductScreen {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly src: string;
  readonly alt: string;
}

export const productScreens: readonly ProductScreen[] = [
  {
    id: 'sources',
    title: 'Sources',
    description:
      'Websites, RSS feeds and public Telegram channels. Alomat checks a source and shows its latest posts before you add it, in any language.',
    src: '/screens/sources.jpg',
    alt: 'Sources page following UzA, Gazeta.uz and the Kun.uz Telegram channel',
  },
  {
    id: 'interests',
    title: 'Interests',
    description:
      'Topics and keywords. Wanted words bring news in, unwanted words keep it out. Leave it empty to get everything.',
    src: '/screens/interests.jpg',
    alt: 'Interests page with topics and keyword fields',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    description:
      'To your private chat, a group or a channel. Instantly or in digests, with quiet hours at night.',
    src: '/screens/delivery.jpg',
    alt: 'Delivery settings with private chat, instant delivery and quiet hours',
  },
  {
    id: 'archive',
    title: 'Archive',
    description:
      'Every item is cleaned, checked for duplicates, tagged and summarised in Uzbek. Search it by topic and source.',
    src: '/screens/archive.jpg',
    alt: 'Archive of Uzbek news summaries with topic and source filters',
  },
];

export const steps = [
  { title: 'Choose', description: 'Pick your sources.' },
  { title: 'Filter', description: 'Set topics and words.' },
  { title: 'Summarise', description: 'Alomat writes in Uzbek.' },
  { title: 'Read', description: 'News arrives in Telegram.' },
] as const;

export const stage = {
  label: 'Early access',
  summary:
    'Anyone can sign up today. We are improving Alomat with our first users before a wider launch.',
  products: [
    {
      status: 'Running',
      live: true,
      title: 'News feed',
      description: 'The panel and Telegram bot on this page, open to everyone.',
    },
    {
      status: 'In development',
      live: false,
      title: 'Channel editor',
      description:
        'Drafts posts for a channel in its owner’s voice. Nothing is published without the owner’s approval.',
    },
  ],
} as const;

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly linkedin: string;
}

export const team: readonly TeamMember[] = [
  {
    name: 'Habib Salim',
    role: 'Founder',
    bio: 'Habib founded Alomat LLC and leads product and engineering: the news pipeline, Telegram delivery and the panel.',
    linkedin: 'https://www.linkedin.com/in/habibsalimov/',
  },
];
