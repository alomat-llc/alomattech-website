/**
 * Content for the one-page alomattech.com site, in English (/) and Uzbek (/uz/).
 *
 * Everything here must stay true: screenshots come from a working account,
 * no customer, partner or funding claims, and no invented numbers.
 * Uzbek uses Latin script; o‘ and g‘ are written with ‘ (U+2018), which the
 * Nunito headings draw correctly.
 */

export const languages = ['en', 'uz'] as const;
export type Lang = (typeof languages)[number];

export const site = {
  name: 'Alomat LLC',
  shortName: '.alomat',
  url: 'https://alomattech.com',
  email: 'hello@alomattech.com',
  founderEmail: 'habib@alomattech.com',
  linkedin: 'https://www.linkedin.com/company/alomat-llc/',
  founderLinkedin: 'https://www.linkedin.com/in/habibsalimov/',
  github: 'https://github.com/alomat-llc',
  markets: ['Uzbekistan', 'Global'],
} as const;

const APP_SIGN_IN = 'https://app-staging.alomattech.com/sign-in';

/** The app opens in the visitor's language. */
export const appUrl = (lang: Lang) => `${APP_SIGN_IN}?lang=${lang}`;

/** Path of the home page in each language. */
export const homePath: Record<Lang, string> = { en: '/', uz: '/uz/' };

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

export const screenFiles = {
  home: '/screens/home.jpg',
  sources: '/screens/sources.jpg',
  interests: '/screens/interests.jpg',
  delivery: '/screens/delivery.jpg',
  archive: '/screens/archive.jpg',
  signin: '/screens/signin.jpg',
} as const;

export interface ProductScreen {
  readonly id: 'sources' | 'interests' | 'delivery' | 'archive';
  readonly title: string;
  readonly description: string;
  readonly alt: string;
}

export interface PageCopy {
  readonly htmlLang: string;
  readonly ogLocale: string;
  readonly title: string;
  readonly description: string;
  readonly switchTo: { readonly lang: Lang; readonly label: string };
  readonly nav: { readonly product: string; readonly demo: string; readonly stage: string; readonly company: string; readonly signIn: string; readonly primary: string };
  readonly skip: string;
  readonly hero: { readonly title: string; readonly lead: string; readonly open: string; readonly demo: string; readonly note: string; readonly alt: string };
  readonly feed: { readonly title: string; readonly lead: string };
  readonly product: { readonly title: string; readonly lead: string; readonly stepsLabel: string };
  readonly screens: readonly ProductScreen[];
  readonly steps: readonly { readonly title: string; readonly description: string }[];
  readonly demo: { readonly title: string; readonly lead: string; readonly download: string };
  readonly stage: {
    readonly title: string;
    readonly summary: string;
    readonly products: readonly { readonly status: string; readonly live: boolean; readonly title: string; readonly description: string }[];
  };
  readonly join: { readonly title: string; readonly lead: string; readonly alt: string };
  readonly company: {
    readonly title: string;
    readonly founder: string;
    readonly bio: string;
    readonly founderLinkedin: string;
    readonly companyLinkedin: string;
  };
  readonly footer: { readonly label: string; readonly privacy: string; readonly terms: string };
}

export const copy: Record<Lang, PageCopy> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: 'Alomat — Uzbek news, summarised and sent to Telegram',
    description:
      'Alomat reads the websites, RSS feeds and public Telegram channels you choose, summarises each news item in Uzbek and sends the ones that match your interests to your Telegram chat, group or channel.',
    switchTo: { lang: 'uz', label: 'O‘zbekcha' },
    nav: { product: 'Product', demo: 'Demo', stage: 'Stage', company: 'Company', signIn: 'Sign in', primary: 'Primary' },
    skip: 'Skip to content',
    hero: {
      title: 'Uzbek news, picked for you and sent to Telegram.',
      lead: 'Choose the websites, feeds and Telegram channels you trust. Alomat reads them, writes a short summary in Uzbek and sends you only the news that matters to you.',
      open: 'Open the app',
      demo: 'Watch the demo',
      note: 'Sign in with Google or Telegram · 14-day trial, no card',
      alt: 'Alomat panel home: delivery running, 47 of 50 news items sent today, latest news from UzA',
    },
    feed: {
      title: 'This morning in the founder’s feed.',
      lead: 'Real items from UzA on 17 November 2026, as they appear in the panel.',
    },
    product: {
      title: 'The panel, screen by screen.',
      lead: 'Taken with a working account and real public sources. Nothing here is a mock-up.',
      stepsLabel: 'How Alomat works',
    },
    screens: [
      {
        id: 'sources',
        title: 'Sources',
        description:
          'Websites, RSS feeds and public Telegram channels. Alomat checks a source and shows its latest posts before you add it, in any language.',
        alt: 'Sources page following UzA, Gazeta.uz and the Kun.uz Telegram channel',
      },
      {
        id: 'interests',
        title: 'Interests',
        description:
          'Topics and keywords. Wanted words bring news in, unwanted words keep it out. Leave it empty to get everything.',
        alt: 'Interests page with topics and keyword fields',
      },
      {
        id: 'delivery',
        title: 'Delivery',
        description: 'To your private chat, a group or a channel. Instantly or in digests, with quiet hours at night.',
        alt: 'Delivery settings with private chat, instant delivery and quiet hours',
      },
      {
        id: 'archive',
        title: 'Archive',
        description:
          'Every item is cleaned, checked for duplicates, tagged and summarised in Uzbek. Search it by topic and source.',
        alt: 'Archive of Uzbek news summaries with topic and source filters',
      },
    ],
    steps: [
      { title: 'Choose', description: 'Pick your sources.' },
      { title: 'Filter', description: 'Set topics and words.' },
      { title: 'Summarise', description: 'Alomat writes in Uzbek.' },
      { title: 'Read', description: 'News arrives in Telegram.' },
    ],
    demo: {
      title: 'Watch it work · 2 minutes',
      lead: 'A narrated recording of the real panel, with captions.',
      download: 'Download the product demo video',
    },
    stage: {
      title: 'Where we are: early access.',
      summary: 'Anyone can sign up today. We are improving Alomat with our first users before a wider launch.',
      products: [
        { status: 'Running', live: true, title: 'News feed', description: 'The panel and Telegram bot on this page, open to everyone.' },
        {
          status: 'In development',
          live: false,
          title: 'Channel editor',
          description: 'Drafts posts for a channel in its owner’s voice. Nothing is published without the owner’s approval.',
        },
      ],
    },
    join: {
      title: 'Try Alomat now.',
      lead: 'No password. Your account opens the first time you sign in.',
      alt: 'Alomat sign-in card with Google and Telegram buttons',
    },
    company: {
      title: 'Made by Alomat LLC.',
      founder: 'Habib Salim, Founder',
      bio: 'Habib founded Alomat LLC and leads product and engineering: the news pipeline, Telegram delivery and the panel.',
      founderLinkedin: 'Habib on LinkedIn',
      companyLinkedin: 'Alomat LLC on LinkedIn',
    },
    footer: { label: 'Footer', privacy: 'Privacy', terms: 'Terms' },
  },
  uz: {
    htmlLang: 'uz-Latn',
    ogLocale: 'uz_UZ',
    title: 'Alomat — kerakli yangiliklar o‘zbek tilida, Telegramda',
    description:
      'Alomat siz tanlagan saytlar, RSS lentalar va ochiq Telegram kanallarni o‘qiydi, har bir yangilikning qisqa mazmunini o‘zbek tilida yozadi va qiziqishlaringizga mosini Telegram chat, guruh yoki kanalingizga yuboradi.',
    switchTo: { lang: 'en', label: 'English' },
    nav: { product: 'Mahsulot', demo: 'Demo', stage: 'Bosqich', company: 'Kompaniya', signIn: 'Kirish', primary: 'Asosiy menyu' },
    skip: 'Asosiy qismga o‘tish',
    hero: {
      title: 'Sizga kerakli yangiliklar o‘zbek tilida, Telegramda.',
      lead: 'Ishonchli saytlar, lentalar va Telegram kanallarni tanlang. Alomat ularni o‘qiydi, qisqa mazmunini o‘zbek tilida yozadi va faqat sizga kerakli yangiliklarni yuboradi.',
      open: 'Ilovani ochish',
      demo: 'Demoni ko‘rish',
      note: 'Google yoki Telegram orqali kirish · 14 kunlik sinov, karta kerak emas',
      alt: 'Alomat paneli bosh sahifasi: yetkazish ishlayapti, bugun 50 tadan 47 ta yangilik yuborilgan, UzA’dan so‘nggi yangiliklar',
    },
    feed: {
      title: 'Bugun ertalab asoschining lentasida.',
      lead: 'UzA’dan 2026-yil 17-noyabrdagi haqiqiy yangiliklar, panelda qanday ko‘rinsa, shunday.',
    },
    product: {
      title: 'Panel, ekranma-ekran.',
      lead: 'Ishlayotgan hisob va haqiqiy ochiq manbalar bilan olingan. Bu yerda hech narsa namuna uchun chizilmagan.',
      stepsLabel: 'Alomat qanday ishlaydi',
    },
    screens: [
      {
        id: 'sources',
        title: 'Manbalar',
        description:
          'Saytlar, RSS lentalar va ochiq Telegram kanallar. Alomat manbani qo‘shishdan oldin tekshiradi va so‘nggi postlarini ko‘rsatadi. Manba istalgan tilda bo‘lishi mumkin.',
        alt: 'UzA, Gazeta.uz va Kun.uz Telegram kanali kuzatilayotgan Manbalar sahifasi',
      },
      {
        id: 'interests',
        title: 'Qiziqishlar',
        description:
          'Mavzular va kalit so‘zlar. Kerakli so‘zlar yangilikni olib keladi, keraksiz so‘zlar uni o‘tkazmaydi. Hech narsa tanlanmasa, hammasi keladi.',
        alt: 'Mavzular va kalit so‘zlar maydonlari bilan Qiziqishlar sahifasi',
      },
      {
        id: 'delivery',
        title: 'Yetkazish',
        description: 'Shaxsiy chatingizga, guruhga yoki kanalga. Darhol yoki dayjest ko‘rinishida, tunda esa sokin soatlar bilan.',
        alt: 'Shaxsiy chat, darhol yetkazish va sokin soatlar sozlamalari',
      },
      {
        id: 'archive',
        title: 'Arxiv',
        description:
          'Har bir yangilik tozalanadi, takrorlari olib tashlanadi, mavzusi belgilanadi va o‘zbek tilida qisqa mazmuni yoziladi. Mavzu va manba bo‘yicha qidirish mumkin.',
        alt: 'Mavzu va manba filtrlari bilan o‘zbekcha qisqa mazmunlar arxivi',
      },
    ],
    steps: [
      { title: 'Tanlang', description: 'Manbalarni tanlang.' },
      { title: 'Saralang', description: 'Mavzu va so‘zlarni belgilang.' },
      { title: 'Qisqartiring', description: 'Alomat o‘zbek tilida yozadi.' },
      { title: 'O‘qing', description: 'Yangiliklar Telegramga keladi.' },
    ],
    demo: {
      title: 'Qanday ishlashini ko‘ring · 2 daqiqa',
      lead: 'Haqiqiy panelning ovozli yozuvi, subtitrlar bilan. Video ingliz tilida.',
      download: 'Demo videoni yuklab olish',
    },
    stage: {
      title: 'Hozirgi bosqich: erta kirish.',
      summary:
        'Bugun istalgan kishi ro‘yxatdan o‘tishi mumkin. Kengroq ishga tushirishdan oldin Alomatni birinchi foydalanuvchilarimiz bilan birga yaxshilayapmiz.',
      products: [
        { status: 'Ishlayapti', live: true, title: 'Yangiliklar lentasi', description: 'Shu sahifadagi panel va Telegram bot, hamma uchun ochiq.' },
        {
          status: 'Ishlab chiqilmoqda',
          live: false,
          title: 'Kanal muharriri',
          description: 'Kanal egasining uslubida postlar tayyorlaydi. Egasi tasdiqlamaguncha hech narsa e’lon qilinmaydi.',
        },
      ],
    },
    join: {
      title: 'Alomatni hozir sinab ko‘ring.',
      lead: 'Parol kerak emas. Birinchi marta kirganingizda hisobingiz o‘zi ochiladi.',
      alt: 'Google va Telegram tugmalari bilan Alomatga kirish oynasi',
    },
    company: {
      title: 'Alomat LLC tomonidan yaratilgan.',
      founder: 'Habib Salim, asoschi',
      bio: 'Habib Alomat LLC kompaniyasini tashkil etgan va mahsulot hamda muhandislikka rahbarlik qiladi: yangiliklarni qayta ishlash, Telegram orqali yetkazish va panel.',
      founderLinkedin: 'Habib LinkedIn’da',
      companyLinkedin: 'Alomat LLC LinkedIn’da',
    },
    footer: { label: 'Pastki menyu', privacy: 'Maxfiylik', terms: 'Shartlar' },
  },
};
