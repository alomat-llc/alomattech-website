import { expect, test } from '@playwright/test';

test('home exposes canonical metadata and primary navigation', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Alomat LLC/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://alomattech.com/',
  );
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
});

test('mobile navigation is keyboard and pointer operable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();

  await expect(page.getByRole('link', { name: 'Capabilities' })).toBeVisible();
  const closeToggle = page.getByRole('button', { name: 'Close navigation' });
  await expect(closeToggle).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Open navigation' }),
  ).toHaveAttribute('aria-expanded', 'false');
});
