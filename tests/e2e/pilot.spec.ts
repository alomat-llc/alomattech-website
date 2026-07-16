import { expect, test, type Page } from '@playwright/test';

async function fillRequiredPilotFields(page: Page) {
  await page.getByLabel('Company or publication name').fill('Example Publishing');
  await page.getByLabel('Publisher or company type').selectOption('digital-publisher');
  await page.getByLabel('Expected monthly content volume').selectOption('101-500');
  await page.getByLabel('Human review model').selectOption('editor-approves');
  await page.getByLabel('Contact name').fill('Ada Editor');
  await page.getByLabel('Work email').fill('ada@example.com');
  await page.getByLabel('Current workflow').fill(
    'Our team monitors approved sources and requires an editor to approve every publish-ready package.',
  );
}

async function addTestTurnstileToken(page: Page) {
  await page.evaluate(() => {
    const form = document.querySelector<HTMLFormElement>('[data-pilot-form]');
    const token = document.createElement('input');
    token.type = 'hidden';
    token.name = 'cf-turnstile-response';
    token.value = 'test-turnstile-token';
    form?.append(token);
  });
}

test('publishes a canonical, buyer-facing managed pilot application', async ({
  page,
}) => {
  const response = await page.goto('/pilot');

  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Managed Publishing Pilot/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://alomattech.com/pilot',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Start with one real publishing workflow.',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByText('The agents prepare. Editors decide.')).toBeVisible();
});

test('collects the complete qualification contract without publishing price', async ({
  page,
}) => {
  await page.goto('/pilot');

  const form = page.getByRole('form', { name: 'Managed pilot application' });
  await expect(form).toHaveAttribute('action', '/api/pilot');
  await expect(form).toHaveAttribute('method', 'post');
  await expect(page.getByLabel('Company or publication name')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Publisher or company type')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Expected monthly content volume')).toHaveAttribute('required', '');
  await expect(page.getByRole('group', { name: 'Source types' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Delivery channels' })).toBeVisible();
  await expect(page.getByLabel('Human review model')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Contact name')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Work email')).toHaveAttribute('required', '');
  await expect(page.getByLabel('Current workflow')).toHaveAttribute('required', '');
  await expect(page.locator('[data-turnstile]')).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/\$|pricing|per month|annual plan/i);
  await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0);
});

test('submits inline and shows a durable success state', async ({ page }) => {
  await page.route('**/api/pilot', async (route) => {
    const request = route.request();
    expect(request.method()).toBe('POST');
    const payload = request.postDataJSON();
    expect(payload.companyName).toBe('Example Publishing');
    expect(payload.sourceTypes).toEqual(['rss', 'websites']);
    expect(payload.deliveryChannels).toEqual(['web', 'newsletter']);
    expect(payload.turnstileToken).toBe('test-turnstile-token');
    await route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, requestId: 'pilot_test' }),
    });
  });
  await page.goto('/pilot');

  await fillRequiredPilotFields(page);
  await page.getByLabel('RSS or Atom feeds').check();
  await page.getByLabel('Approved websites').check();
  await page.getByLabel('Website or CMS').check();
  await page.getByLabel('Newsletter').check();
  await page.evaluate(() => {
    const form = document.querySelector<HTMLFormElement>('[data-pilot-form]');
    const startedAt = form?.querySelector<HTMLInputElement>('[name="startedAt"]');
    if (startedAt) startedAt.value = String(Date.now() - 5_000);
  });
  await addTestTurnstileToken(page);

  await page.getByRole('button', { name: 'Submit pilot application' }).click();

  await expect(page.locator('[data-form-status]')).toContainText(
    'Your workflow is now in our review queue.',
  );
  await expect(page.locator('[data-submit-button]')).toBeDisabled();
});

test('shows and focuses accessible errors for missing checkbox groups', async ({
  page,
}) => {
  let requests = 0;
  await page.route('**/api/pilot', async (route) => {
    requests += 1;
    await route.abort();
  });
  await page.goto('/pilot');
  await fillRequiredPilotFields(page);
  await addTestTurnstileToken(page);

  await page.getByRole('button', { name: 'Submit pilot application' }).click();

  const sourceGroup = page.getByRole('group', { name: 'Source types' });
  await expect(page.locator('[data-field-error="sourceTypes"]')).toContainText(
    'Choose at least one source type.',
  );
  await expect(page.locator('[data-field-error="deliveryChannels"]')).toContainText(
    'Choose at least one delivery channel.',
  );
  await expect(sourceGroup).toHaveAttribute('aria-invalid', 'true');
  await expect(sourceGroup).toBeFocused();
  expect(requests).toBe(0);
});

test('renders server field errors on the matching control', async ({ page }) => {
  await page.route('**/api/pilot', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: false,
        error: 'invalid_application',
        fields: { contactEmail: 'Enter a valid business email.' },
      }),
    });
  });
  await page.goto('/pilot');
  await fillRequiredPilotFields(page);
  await page.getByLabel('RSS or Atom feeds').check();
  await page.getByLabel('Website or CMS').check();
  await addTestTurnstileToken(page);

  await page.getByRole('button', { name: 'Submit pilot application' }).click();

  await expect(page.locator('[data-field-error="contactEmail"]')).toContainText(
    'Enter a valid business email.',
  );
  await expect(page.getByLabel('Work email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Work email')).toBeFocused();
  await expect(page.locator('[data-submit-button]')).toBeEnabled();
});

test('all managed pilot conversion links use the application route', async ({
  page,
}) => {
  for (const path of ['/', '/platform', '/agent-systems', '/case-study/publisher-workflow']) {
    await page.goto(path);
    const links = page.getByRole('link', { name: 'Request a managed pilot' });
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', '/pilot');
    }
  }
});

for (const width of [375, 768, 1440]) {
  test(`pilot form has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 812 : 1000 });
    await page.goto('/pilot');
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBe(dimensions.client);
  });
}
