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

test('publishes crawl and discovery files', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://alomattech.com/sitemap-index.xml');

  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# Alomat LLC');
  expect(llms).toContain('https://app-staging.alomattech.com/sign-in');

  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.name).toBe('Alomat LLC');
  expect((await request.get('/favicon.svg')).ok()).toBeTruthy();
});

test('sitemap lists only the pages that exist', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  for (const path of ['/', '/privacy/', '/terms/']) {
    expect(sitemap).toContain(`<loc>https://alomattech.com${path}</loc>`);
  }
  for (const gone of ['/platform', '/demo', '/about', '/pilot', '/faq', '/404']) {
    expect(sitemap).not.toContain(`https://alomattech.com${gone}/`);
  }
});

test('redirects every old page to the home page', async ({ request }) => {
  const redirects = await (await request.get('/_redirects')).text();
  for (const path of [
    '/platform',
    '/demo',
    '/about',
    '/pilot',
    '/faq',
    '/agent-systems',
    '/multilingual-ai',
    '/full-stack-ai-products',
    '/case-study/\\*',
  ]) {
    expect(redirects).toMatch(new RegExp(`^${path}\\s+/`, 'm'));
  }
});

test('privacy page says the site has no forms and no tracking', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.getByText(/does not use advertising cookies/i)).toBeVisible();
  await expect(page.locator('main')).toContainText('This website has no forms');
});
