import { expect, test } from '@playwright/test';

test('publishes the anonymous production workflow as a canonical case study', async ({
  page,
}) => {
  const response = await page.goto('/case-study/publisher-workflow');
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Publisher Workflow Case Study/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://alomattech.com/case-study/publisher-workflow',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'From fragmented sources to a controlled publishing workflow.',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('renders the full workflow, architecture, proof, and human control boundary', async ({
  page,
}) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(page.locator('[data-case-workflow] > li')).toHaveCount(6);
  await expect(page.locator('[data-architecture-layer]')).toHaveCount(5);
  await expect(page.locator('[data-architecture-control]')).toContainText(
    'Human review and approval',
  );
  await expect(page.locator('[data-case-proof] li')).toHaveCount(5);
  await expect(
    page.getByText('The agents prepare. Editors decide.'),
  ).toBeVisible();
});

test('shows three real evidence assets with captions and intrinsic dimensions', async ({
  page,
  request,
}) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(page.locator('[data-evidence-gallery] figure')).toHaveCount(3);
  for (const image of await page.locator('[data-evidence-gallery] img').all()) {
    await expect(image).toHaveAttribute('width', '1600');
    await expect(image).toHaveAttribute('height', '900');
    const src = await image.getAttribute('src');
    expect(src).toBeTruthy();
    expect((await request.get(src as string)).ok()).toBeTruthy();
    expect((await image.getAttribute('alt'))?.length).toBeGreaterThan(20);
  }
});

test('publishes factual Article and BreadcrumbList data', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  const entities = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? '{}')),
    );
  const article = entities.find((entity) => entity['@type'] === 'Article');
  const breadcrumbs = entities.find(
    (entity) => entity['@type'] === 'BreadcrumbList',
  );
  expect(article?.headline).toBe(
    'From fragmented sources to a controlled publishing workflow.',
  );
  expect(article?.publisher['@id']).toBe(
    'https://alomattech.com/#organization',
  );
  expect(article).not.toHaveProperty('aggregateRating');
  expect(breadcrumbs?.itemListElement).toHaveLength(2);
});

test('keeps private identifiers and unsupported metrics out of rendered copy', async ({
  page,
}) => {
  await page.goto('/case-study/publisher-workflow');
  const copy = await page.locator('main').innerText();
  expect(copy).not.toMatch(
    /xushnudbek|uzbek|uzbekistan|telegram|channel name/i,
  );
  expect(copy).not.toMatch(
    /\b\d+(?:\.\d+)?%|time saved|cost savings|accuracy rate|uptime|revenue|guaranteed/i,
  );
});

test('exposes pilot and platform conversion paths', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(
    page.getByRole('link', { name: 'Request a managed pilot' }).last(),
  ).toHaveAttribute('href', '/pilot');
  await expect(
    page.getByRole('link', { name: 'Explore the platform' }).last(),
  ).toHaveAttribute('href', '/platform');
});

for (const width of [375, 768, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({
      width,
      height: width < 800 ? 812 : 1000,
    });
    await page.goto('/case-study/publisher-workflow');
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBe(dimensions.client);
  });
}
