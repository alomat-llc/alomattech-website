import { expect, test } from '@playwright/test';

const publicPages = [
  { path: '/agent-systems', title: /AI Agent Systems Engineering/, h1: /AI agent systems built/ },
  { path: '/multilingual-ai', title: /Multilingual AI and Language Technology/, h1: /Multilingual AI that listens/ },
  { path: '/full-stack-ai-products', title: /Full-Stack AI Product Engineering/, h1: /Full-stack AI products/ },
  { path: '/about', title: /About Alomat LLC/, h1: /About Alomat/ },
  { path: '/faq', title: /AI Engineering FAQ/, h1: /Questions about working with Alomat/ },
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
  expect(entities.find((entity) => entity['@type'] === 'Organization')['@id']).toBe(
    'https://alomattech.com/#organization',
  );
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
