import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('mobile navigation remains fully usable without JavaScript', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeHidden();
  await expect(
    page.getByRole('link', { name: 'Product', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Workflow', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Deployments', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
      name: 'Request a managed pilot',
    }),
  ).toBeVisible();
});
