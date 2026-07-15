import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440, 1920]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    const height = width < 800 ? 812 : 1000;
    await page.setViewportSize({ width, height });
    await page.goto('/');

    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scroll).toBe(dimensions.client);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('mobile hero keeps its primary conversion in the first viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const heroCta = page
    .locator('.hero')
    .getByRole('link', { name: 'Request a managed pilot' });
  const box = await heroCta.boundingBox();

  expect(box).not.toBeNull();
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(812);
});

test('desktop hero behaves as a single first-viewport poster', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const hero = await page.locator('.hero').boundingBox();
  expect(hero).not.toBeNull();
  expect(hero?.height).toBeLessThanOrEqual(1001);
});

test('reduced motion keeps every approach step at full contrast', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const opacities = await page.locator('[data-approach-step]').evaluateAll((steps) =>
    steps.map((step) => getComputedStyle(step).opacity),
  );

  expect(opacities).toEqual(['1', '1', '1', '1', '1', '1']);
});

test('small labels and approach copy meet WCAG AA contrast', async ({ page }) => {
  await page.goto('/');

  const failingSelectors = await page.evaluate(() => {
    const selectors = [
      '.section-heading > p',
      '.studio-heading > p',
      '.experience-label',
      '.final-cta > p',
      '[data-approach-step] > span',
      '[data-approach-step] p',
    ];

    const channel = (value: number) => {
      const normalized = value / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (color: string) => {
      const values = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
      return 0.2126 * channel(values[0]) + 0.7152 * channel(values[1]) + 0.0722 * channel(values[2]);
    };
    const contrast = (foreground: string, background: string) => {
      const lighter = Math.max(luminance(foreground), luminance(background));
      const darker = Math.min(luminance(foreground), luminance(background));
      return (lighter + 0.05) / (darker + 0.05);
    };

    return selectors.filter((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).some((element) => {
        const style = getComputedStyle(element);
        let background = element.parentElement;
        while (background && getComputedStyle(background).backgroundColor === 'rgba(0, 0, 0, 0)') {
          background = background.parentElement;
        }
        const backgroundColor = background
          ? getComputedStyle(background).backgroundColor
          : getComputedStyle(document.body).backgroundColor;
        let effectiveOpacity = 1;
        let ancestor: HTMLElement | null = element;
        while (ancestor) {
          effectiveOpacity *= Number(getComputedStyle(ancestor).opacity);
          ancestor = ancestor.parentElement;
        }
        const effectiveRatio = contrast(style.color, backgroundColor) * effectiveOpacity;
        return effectiveRatio < 4.5;
      }),
    );
  });

  expect(failingSelectors).toEqual([]);
});
