import { expect, test } from '@playwright/test';

test('publishes a canonical anonymous product demo', async ({ page }) => {
  const response = await page.goto('/demo');
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Product Demo/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://alomattech.com/demo',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'See the publishing workflow move from signal to decision.',
  );
});

test('serves a playable 60-second video and a complete transcript', async ({
  page,
  request,
}) => {
  await page.goto('/demo');
  const video = page.locator('video[data-product-demo]');
  await expect(video).toHaveAttribute(
    'src',
    '/demo/alomat-agentic-publishing-demo.mp4',
  );
  const asset = await request.get('/demo/alomat-agentic-publishing-demo.mp4');
  expect(asset.ok()).toBeTruthy();
  expect(Number(asset.headers()['content-length'] ?? 0)).toBeGreaterThan(100_000);
  await expect(page.locator('[data-demo-transcript] li')).toHaveCount(8);
});

test('publishes factual VideoObject data and the human control boundary', async ({
  page,
}) => {
  await page.goto('/demo');
  const entities = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? '{}')),
    );
  const video = entities.find((entity) => entity['@type'] === 'VideoObject');
  expect(video?.duration).toBe('PT1M');
  expect(video?.contentUrl).toBe(
    'https://alomattech.com/demo/alomat-agentic-publishing-demo.mp4',
  );
  await expect(page.getByText('Agents prepare. Editors decide.')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Request a managed pilot' }).last(),
  ).toHaveAttribute('href', '/pilot');
});

test('keeps private identifiers and unsupported claims out of the demo', async ({
  page,
}) => {
  await page.goto('/demo');
  const copy = await page.locator('main').innerText();
  expect(copy).not.toMatch(/xushnudbek|uzbek|telegram|customer name/i);
  expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|time saved|accuracy rate|guaranteed/i);
});

test('is discoverable from the homepage, platform, and case study', async ({
  page,
}) => {
  for (const path of ['/', '/platform', '/case-study/publisher-workflow']) {
    await page.goto(path);
    await expect(
      page.getByRole('link', { name: 'Watch the 60-second product demo' }),
    ).toHaveAttribute('href', '/demo');
  }
});

for (const width of [375, 768, 1440]) {
  test(`demo has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 812 : 1000 });
    await page.goto('/demo');
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBe(dimensions.client);
  });
}
