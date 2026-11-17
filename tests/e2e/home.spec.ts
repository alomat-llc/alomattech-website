import { expect, test } from '@playwright/test';

const APP_URL = 'https://app-staging.alomattech.com/sign-in?lang=en';

test('shows the product, demo, stage and founder on one page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Alomat/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Uzbek news, picked for you and sent to Telegram.',
  );
  for (const id of ['product', 'demo', 'stage', 'company']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('#product .row')).toHaveCount(4);
  await expect(page.locator('#stage')).toContainText('early access');
  await expect(page.locator('#stage')).toContainText('Channel editor');
  await expect(page.locator('#company')).toContainText('Habib Salim, Founder');
  await expect(
    page.locator('#company').getByRole('link', { name: 'Habib on LinkedIn' }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/habibsalimov/');
});

test('every "Open the app" link goes to the real sign-in page', async ({ page }) => {
  await page.goto('/');

  const links = page.getByRole('link', { name: 'Open the app' });
  expect(await links.count()).toBeGreaterThanOrEqual(2);
  const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  for (const href of hrefs) {
    expect(href).toBe(APP_URL);
  }
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Sign in' }),
  ).toHaveAttribute('href', APP_URL);
});

test('loads every image, the demo video and the self-hosted fonts', async ({ page, request }) => {
  await page.goto('/');

  const sources = await page
    .locator('main img')
    .evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src') ?? ''));
  expect(sources).toHaveLength(6);
  for (const src of sources) {
    expect((await request.get(src)).ok(), src).toBeTruthy();
  }
  const videoSrc = (await page.locator('#demo video source').getAttribute('src')) ?? '';
  const video = await request.get(videoSrc);
  expect(video.ok()).toBeTruthy();
  expect(video.headers()['content-type']).toContain('video/mp4');

  await page.evaluate(async () => {
    await document.fonts.load('800 40px Nunito');
    await document.fonts.load('400 17px Onest');
  });
  expect(await page.evaluate(() => document.fonts.check('800 40px Nunito'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('400 17px Onest'))).toBe(true);
});

for (const width of [375, 768, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}

test('keeps the primary action in the first mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const box = await page.locator('.hero').getByRole('link', { name: 'Open the app' }).boundingBox();
  expect(box).not.toBeNull();
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(812);
});

test('publishes organization, product, video and founder structured data', async ({ page }) => {
  await page.goto('/');
  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? '{}')['@type']));
  expect(types).toEqual(
    expect.arrayContaining(['Organization', 'WebSite', 'SoftwareApplication', 'VideoObject', 'Person']),
  );
});

test('Uzbek home page has the same sections in Uzbek', async ({ page }) => {
  await page.goto('/uz/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'uz-Latn');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Sizga kerakli yangiliklar o‘zbek tilida, Telegramda.',
  );
  for (const id of ['product', 'demo', 'stage', 'company']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator('#product .row')).toHaveCount(4);
  await expect(page.locator('#product')).toContainText('Manbalar');
  await expect(page.locator('#company')).toContainText('Habib Salim, asoschi');
  const hrefs = await page
    .getByRole('link', { name: 'Ilovani ochish' })
    .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThanOrEqual(2);
  for (const href of hrefs) {
    expect(href).toBe('https://app-staging.alomattech.com/sign-in?lang=uz');
  }
});

test('each language links to the other and declares hreflang alternates', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'O‘zbekcha' })).toHaveAttribute('href', '/uz/');
  const alternates = await page
    .locator('link[rel="alternate"][hreflang]')
    .evaluateAll((els) => els.map((el) => `${el.getAttribute('hreflang')} ${el.getAttribute('href')}`));
  expect(alternates).toEqual(
    expect.arrayContaining([
      'en https://alomattech.com/',
      'uz-Latn https://alomattech.com/uz/',
      'x-default https://alomattech.com/',
    ]),
  );

  await page.goto('/uz/');
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/');
});

test('the language switch stays visible on phones', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'O‘zbekcha' })).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});
