export interface ProductDemoScene {
  readonly index: string;
  readonly label: string;
  readonly title: string;
  readonly statement: string;
}

/**
 * The product demo is a screen recording of the real Alomat panel (News feed),
 * made on 17 November 2026 with the founder's own account and real public
 * news sources. Each scene statement is the video's narration, word for word.
 */
export const productDemo = {
  title: 'Alomat News feed product demo',
  description:
    'A two-minute recording of the real Alomat panel: sources, interests, delivery to Telegram, the archive and plans, shown with a working account and real news sources.',
  eyebrow: 'Two-minute product recording',
  durationSeconds: 125,
  durationIso: 'PT2M5S',
  durationLabel: '02:05',
  recordedOn: '2026-11-17',
  recordingNote:
    'Recorded on 17 November 2026 in the Alomat panel with the founder’s own account and real public news sources (UzA, Gazeta.uz and the Kun.uz Telegram channel). Nothing on screen is mocked up. The source checked in the “Add a source” step and the interests picked on screen were not saved.',
  scopeNote:
    'The video shows the News feed, the part of Alomat that runs today. The Channel editor, which drafts posts in a channel owner’s voice for approval, is in development and is not shown.',
  scenes: [
    {
      index: '00',
      label: 'Opening',
      title: 'Only the news you need.',
      statement:
        'Uzbek news is spread across dozens of websites, feeds and Telegram channels. Alomat reads the sources you choose and sends you only the news you need, straight to Telegram.',
    },
    {
      index: '01',
      label: 'Home',
      title: 'Delivery at a glance.',
      statement:
        'This is the Alomat panel, recorded with a real account and real sources. The home screen shows that delivery is running, how many news items were sent today against the daily limit of the plan, and the latest news with a link to the original.',
    },
    {
      index: '02',
      label: 'Sources',
      title: 'Websites, feeds and channels.',
      statement:
        'On the Sources page you follow websites, RSS feeds and public Telegram channels. This account follows three: UzA, Gazeta.uz and the Kun.uz Telegram channel.',
    },
    {
      index: '03',
      label: 'Add a source',
      title: 'Checked before it is added.',
      statement:
        'To add one, type its address and press Check. Alomat reads the source first and shows its latest posts. This site writes in Russian, and Alomat still summarises its news in Uzbek.',
    },
    {
      index: '04',
      label: 'Interests',
      title: 'Topics and keywords.',
      statement:
        'On the Interests page you choose topics and keywords. Wanted words bring news in, unwanted words keep it out. If nothing is chosen, every news item from your sources is sent.',
    },
    {
      index: '05',
      label: 'Delivery',
      title: 'Where and when.',
      statement:
        'Delivery decides where and when. News goes to your private chat, or to a group or channel where you add the bot. Each item can be sent as soon as it is ready, or collected into digests. Quiet hours hold messages overnight.',
    },
    {
      index: '06',
      label: 'Archive',
      title: 'Every item, summarised.',
      statement:
        'Every item is cleaned, checked for duplicates, given a topic and summarised in Uzbek. The archive keeps all of it, with search and filters by topic and source.',
    },
    {
      index: '07',
      label: 'Telegram',
      title: 'Delivered to the chat.',
      statement:
        'In Telegram, each item arrives as a short headline and summary with a link to the source. Two buttons let you save it or mark it as not relevant.',
    },
    {
      index: '08',
      label: 'Plans',
      title: 'Start with a trial.',
      statement:
        'A new account starts with a fourteen day trial, without a card. Paid plans add more sources and more news items per day.',
    },
  ] as const satisfies readonly ProductDemoScene[],
} as const;
