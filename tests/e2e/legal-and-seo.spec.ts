import { expect, test } from '@playwright/test';

for (const path of ['/privacy', '/terms']) {
  test(`${path} is public and uniquely titled`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(new RegExp(path.slice(1), 'i'));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://alomattech.com${path}`,
    );
  });
}

test('publishes crawl and organization trust signals', async ({
  page,
  request,
}) => {
  await page.goto('/');

  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? '{}');
      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );
  const organization = entities.find((entity) => entity['@type'] === 'Organization');
  expect(organization?.email).toBe('hello@alomattech.com');
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/sitemap-index.xml')).ok()).toBeTruthy();
  expect((await request.get('/favicon.svg')).ok()).toBeTruthy();
});

test('publishes crawl and answer-engine discovery files', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://alomattech.com/sitemap-index.xml');

  const llmsResponse = await request.get('/llms.txt');
  expect(llmsResponse.ok()).toBeTruthy();
  const llms = await llmsResponse.text();
  expect(llms).toContain('# Alomat LLC');
  for (const path of ['/platform', '/pilot', '/case-study/publisher-workflow', '/agent-systems', '/multilingual-ai', '/full-stack-ai-products', '/about', '/faq']) {
    expect(llms).toContain(`https://alomattech.com${path}`);
  }

  const manifestResponse = await request.get('/manifest.webmanifest');
  expect(manifestResponse.ok()).toBeTruthy();
  const manifest = await manifestResponse.json();
  expect(manifest.name).toBe('Alomat LLC');
  expect(manifest.start_url).toBe('/');
});

test('generated sitemap contains every canonical public route', async ({ request }) => {
  const index = await (await request.get('/sitemap-index.xml')).text();
  expect(index).toContain('https://alomattech.com/sitemap-0.xml');
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  for (const path of [
    '/',
    '/pilot/',
    '/case-study/publisher-workflow/',
    '/platform/',
    '/agent-systems/',
    '/multilingual-ai/',
    '/full-stack-ai-products/',
    '/about/',
    '/faq/',
    '/privacy/',
    '/terms/',
  ]) {
    expect(sitemap).toContain(`<loc>https://alomattech.com${path}</loc>`);
  }
  expect(sitemap).not.toContain('/404/');
});

test('privacy disclosure explains the pilot form without claiming hidden tracking', async ({ page }) => {
  await page.goto('/privacy');

  await expect(page.getByText(/does not use advertising cookies/i)).toBeVisible();
  await expect(page.locator('main')).toContainText(/managed pilot application/i);
  await expect(page.locator('main')).toContainText(/cloudflare turnstile/i);
});
