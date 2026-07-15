import { expect, test } from '@playwright/test';

test('communicates the publishing SaaS promise and production boundary', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Turn trusted sources into publish-ready content.',
  );
  await expect(page.locator('[data-production-proof]')).toContainText(
    'In production with an active digital publisher.',
  );
  await expect(page.locator('#product').getByRole('article')).toHaveCount(6);
  await expect(
    page.locator('#workflow').locator('[data-approach-step]'),
  ).toHaveCount(6);
});

test('presents three anonymous deployment patterns', async ({ page }) => {
  await page.goto('/');

  const deployments = page.locator('#deployments');
  await expect(deployments.getByRole('article')).toHaveCount(3);
  await expect(deployments).toContainText('Always-on signal desk');
  await expect(deployments).not.toContainText(/Xushnudbek|Uzbek|Telegram/i);
});

test('offers the managed pilot conversion', async ({ page }) => {
  await page.goto('/');

  const pilot = page
    .getByRole('link', { name: 'Request a managed pilot' })
    .first();
  await expect(pilot).toHaveAttribute(
    'href',
    'mailto:hello@alomattech.com?subject=Managed%20publishing%20pilot',
  );
});

test('renders a complete reduced-motion experience', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('[data-signal-field]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});

test('describes managed operation without removing human approval', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('#managed-saas')).toBeVisible();
  await expect(page.getByText('Your editorial system, operated with you.')).toBeVisible();
  await expect(page.locator('main')).toContainText(/human approval/i);
  await expect(page.locator('main')).not.toContainText(/fully autonomous publishing/i);
});
