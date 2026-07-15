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

  const organizationData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(organizationData).toContain('hello@alomattech.com');
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/sitemap-index.xml')).ok()).toBeTruthy();
  expect((await request.get('/favicon.svg')).ok()).toBeTruthy();
});

test('privacy disclosure matches the tracker-free release', async ({ page }) => {
  await page.goto('/privacy');

  await expect(page.getByText(/does not use advertising cookies/i)).toBeVisible();
  await expect(page.getByText(/does not collect information through forms/i)).toBeVisible();
});
