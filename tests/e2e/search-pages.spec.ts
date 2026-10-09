import { expect, test } from '@playwright/test';

const publicPages = [
  { path: '/pilot', title: /Managed Publishing Pilot/, h1: /Start with one real publishing workflow/ },
  { path: '/case-study/publisher-workflow', title: /Publisher Workflow Case Study/, h1: /From fragmented sources to a controlled publishing workflow/ },
  { path: '/demo', title: /Product Demo/, h1: /See the publishing workflow move from signal to decision/ },
  { path: '/platform', title: /Agentic Publishing Platform/, h1: /One operating layer for modern publishing/ },
  { path: '/agent-systems', title: /Agent Workflow Layer/, h1: /AI agent systems built/ },
  { path: '/multilingual-ai', title: /Multilingual Publishing Intelligence/, h1: /Multilingual AI that listens/ },
  { path: '/full-stack-ai-products', title: /Publishing Product Infrastructure/, h1: /Full-stack AI products/ },
  { path: '/about', title: /About Alomat LLC/, h1: /About Alomat/ },
  { path: '/faq', title: /Agentic Publishing Platform FAQ/, h1: /Questions about the Alomat publishing platform/ },
] as const;

for (const entry of publicPages) {
  test(`${entry.path} is a canonical, semantic public page`, async ({ page }) => {
    const response = await page.goto(entry.path);
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(entry.title);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(entry.h1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://alomattech.com${entry.path}`,
    );
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(80);
  });
}

test('home publishes stable Organization and WebSite entities', async ({ page }) => {
  await page.goto('/');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? '{}');
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );

  expect(entities.map((entity) => entity['@type'])).toEqual(
    expect.arrayContaining(['Organization', 'WebSite']),
  );
  const organization = entities.find((entity) => entity['@type'] === 'Organization');
  expect(organization['@id']).toBe(
    'https://alomattech.com/#organization',
  );
  expect(organization.sameAs).toEqual([
    'https://www.linkedin.com/company/alomat-llc/',
    'https://github.com/alomat-llc',
  ]);
});

test('platform page publishes visible SoftwareApplication data', async ({ page }) => {
  await page.goto('/platform');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')),
  );
  const product = entities.find((entity) => entity['@type'] === 'SoftwareApplication');

  expect(product?.name).toBe('Alomat Agentic Publishing Platform');
  expect(product?.applicationCategory).toBe('BusinessApplication');
  expect(product).not.toHaveProperty('aggregateRating');
  expect(product).not.toHaveProperty('offers');
});

test('platform page links its production proof to the case study', async ({ page }) => {
  await page.goto('/platform');
  await expect(
    page
      .locator('.platform-proof')
      .getByRole('link', { name: 'Read the production case study' }),
  ).toHaveAttribute('href', '/case-study/publisher-workflow');
});

test('service pages connect visible content to Service and BreadcrumbList data', async ({ page }) => {
  await page.goto('/agent-systems');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? '{}');
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );

  expect(entities.map((entity) => entity['@type'])).toEqual(
    expect.arrayContaining(['Service', 'BreadcrumbList']),
  );
  expect(entities.find((entity) => entity['@type'] === 'Service').provider['@id']).toBe(
    'https://alomattech.com/#organization',
  );
  await expect(page.getByRole('link', { name: 'See the publishing platform' })).toHaveAttribute(
    'href',
    '/platform',
  );
});

test('about presents Alomat as a production-backed product company', async ({ page }) => {
  await page.goto('/about');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'About Alomat: publishing operations built around editorial judgment.',
  );
  await expect(page.locator('main')).toContainText(/managed agentic publishing platform/i);
  await expect(page.locator('main')).toContainText(/active digital publisher/i);
});

test('FAQ schema mirrors every visible question and answer', async ({ page }) => {
  await page.goto('/faq');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? '{}');
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );
  const faq = entities.find((entity) => entity['@type'] === 'FAQPage');
  const visibleQuestions = await page.locator('[data-faq-item] h2').allTextContents();
  const schemaQuestions = faq.mainEntity.map((item: { name: string }) => item.name);

  expect(schemaQuestions).toEqual(visibleQuestions);
  expect(faq.mainEntity).toHaveLength(visibleQuestions.length);
});

test('unknown routes return a useful noindex 404 page', async ({ page }) => {
  const response = await page.goto('/not-a-real-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not found');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
});
