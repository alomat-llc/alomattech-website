import { expect, test } from '@playwright/test';

test('communicates the studio promise and all three capabilities', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Building signals into systems.',
  );
  for (const name of [
    'Agent systems',
    'Language technologies',
    'Full-stack AI products',
  ]) {
    await expect(page.getByRole('heading', { name })).toBeVisible();
  }
});

test('offers a direct, correct email conversion', async ({ page }) => {
  await page.goto('/');

  const links = page.getByRole('link', { name: 'Start a conversation' });
  await expect(links.first()).toHaveAttribute(
    'href',
    'mailto:hello@alomattech.com',
  );
});

test('renders a complete reduced-motion experience', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('[data-signal-field]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});

test('frames Aisha and WordExpert as team experience', async ({ page }) => {
  await page.goto('/');

  const studio = page.locator('#studio');
  await expect(studio).toContainText('Aisha');
  await expect(studio).toContainText('WordExpert');
  await expect(studio).toContainText("Our team's experience");
});
