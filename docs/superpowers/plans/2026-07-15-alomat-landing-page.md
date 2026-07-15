# Alomat LLC Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and release a fast, accessible, editorial landing page for Alomat LLC that truthfully presents its agent systems, language technology, and full-stack AI product capabilities.

**Architecture:** Astro generates a fully static three-page site from typed local content. Focused Astro components own each visual section, a single base layout owns metadata/navigation/footer, and progressive client scripts add motion and mobile navigation without making content dependent on JavaScript.

**Tech Stack:** Astro, strict TypeScript, CSS, Vitest, Playwright, Astro Check, Cloudflare Pages static deployment

## Global Constraints

- Use the existing `.alomat` black/off-white/coral brand system and supplied SVG assets.
- Do not claim customers, partnerships, funding, revenue, performance metrics, or completed New Mexico formation.
- Primary conversion is `mailto:hello@alomattech.com`; do not add a backend form, analytics, cookies, CMS, or CRM.
- All content remains accessible without client JavaScript and all motion respects `prefers-reduced-motion`.
- Provide unique metadata for Home, Privacy, and Terms plus canonical URLs, Open Graph data, Organization JSON-LD, robots, sitemap, favicon, and Open Graph image.
- Verify layouts at 375px, 768px, 1440px, and 1920px widths.
- Target Lighthouse scores of at least 95 in Performance, Accessibility, Best Practices, and SEO.

---

### Task 1: Establish the Astro project and testing harness

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/env.d.ts`
- Create: `src/content/site.test.ts`
- Create: `public/brand/alomat-logo.svg`
- Create: `public/brand/alomat-banner.svg`

**Interfaces:**
- Consumes: existing repository README and brand SVGs from the USA LLC workspace
- Produces: `npm test`, `npm run check`, `npm run build`, and `npm run test:e2e` commands used by every later task

- [ ] **Step 1: Write the first failing content test**

Create `src/content/site.test.ts` before `src/content/site.ts` exists:

```ts
import { describe, expect, it } from 'vitest';
import { site } from './site';

describe('site content contract', () => {
  it('publishes the canonical Alomat identity', () => {
    expect(site.name).toBe('Alomat LLC');
    expect(site.tagline).toBe('Building signals into systems.');
    expect(site.email).toBe('hello@alomattech.com');
  });
});
```

- [ ] **Step 2: Add package and tool configuration**

Create `package.json` with these scripts and install the current compatible package releases so `package-lock.json` records exact versions:

```json
{
  "name": "alomattech-website",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Run:

```bash
npm install astro @astrojs/sitemap
npm install -D @astrojs/check @playwright/test typescript vitest
```

Create `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alomattech.com',
  output: 'static',
  integrations: [sitemap()],
});
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['src/**/*.test.ts'] },
});
```

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://127.0.0.1:4321' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

- [ ] **Step 3: Copy canonical brand assets**

Copy the existing `alomat-logo-v2.svg` and `alomat-linkedin-banner-v2.svg` files into `public/brand/` as `alomat-logo.svg` and `alomat-banner.svg`. Do not redraw or alter the brand artwork.

- [ ] **Step 4: Run the test and verify RED**

Run: `npm test`

Expected: FAIL because `src/content/site.ts` does not exist.

- [ ] **Step 5: Commit the test harness**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts playwright.config.ts src/env.d.ts src/content/site.test.ts public/brand
git commit -m "test: establish Astro quality harness"
```

---

### Task 2: Define truthful typed site content

**Files:**
- Create: `src/content/site.ts`
- Modify: `src/content/site.test.ts`

**Interfaces:**
- Consumes: no runtime inputs
- Produces: `site`, `capabilities`, `approachSteps`, and `experienceNotes` exports for page components

- [ ] **Step 1: Extend the failing content contract**

Add tests that require the exact pillars, safe external URLs, and prohibited-claim guard:

```ts
import {
  approachSteps,
  capabilities,
  experienceNotes,
  site,
} from './site';

it('defines exactly three canonical capabilities', () => {
  expect(capabilities.map(({ title }) => title)).toEqual([
    'Agent systems',
    'Language technologies',
    'Full-stack AI products',
  ]);
});

it('defines the four-stage engineering approach', () => {
  expect(approachSteps.map(({ title }) => title)).toEqual([
    'Understand the signal',
    'Design the system',
    'Build the harness',
    'Observe and improve',
  ]);
});

it('describes experience without presenting former workplaces as clients', () => {
  const copy = JSON.stringify(experienceNotes).toLowerCase();
  expect(copy).toContain('aisha');
  expect(copy).toContain('wordexpert');
  expect(copy).not.toContain('our client');
  expect(copy).not.toContain('partnered with');
});

it('does not publish unverified formation claims', () => {
  const copy = JSON.stringify({ site, capabilities, approachSteps, experienceNotes });
  expect(copy).not.toMatch(/registered in new mexico|formation approved|incorporated on/i);
});
```

- [ ] **Step 2: Run the content test and verify RED**

Run: `npm test -- src/content/site.test.ts`

Expected: FAIL because the required exports do not exist.

- [ ] **Step 3: Implement the typed content module**

Create interfaces for `Capability`, `ApproachStep`, and `ExperienceNote`, then export immutable arrays containing the approved English copy. Include these exact identity values:

```ts
export const site = {
  name: 'Alomat LLC',
  shortName: '.alomat',
  tagline: 'Building signals into systems.',
  description:
    'Alomat builds agent systems, language technologies, and full-stack AI products.',
  url: 'https://alomattech.com',
  email: 'hello@alomattech.com',
  founderEmail: 'habib@alomattech.com',
  linkedin: 'https://www.linkedin.com/company/alomat-llc/',
  github: 'https://github.com/habibsalimov/alomattech-website',
} as const;
```

Each capability must contain a one-sentence outcome and four primitives. Each approach step must contain one direct sentence. Experience notes must explicitly use the phrase `Our team's experience` and distinguish experience from Alomat engagements.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test`

Expected: all content contract tests PASS.

- [ ] **Step 5: Commit typed content**

```bash
git add src/content/site.ts src/content/site.test.ts
git commit -m "feat: define truthful Alomat site content"
```

---

### Task 3: Build the accessible layout, navigation, and metadata

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/styles/global.css`
- Create: `tests/e2e/navigation.spec.ts`

**Interfaces:**
- Consumes: `site` from `src/content/site.ts`
- Produces: `BaseLayout` props `{ title: string; description: string; pathname: string; image?: string }`, navigation landmarks, and shared style tokens

- [ ] **Step 1: Write failing navigation and metadata tests**

Create `tests/e2e/navigation.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('home exposes canonical metadata and primary navigation', async ({ page }) => {
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
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});
```

- [ ] **Step 2: Run Playwright and verify RED**

Run: `npx playwright install chromium && npm run test:e2e -- navigation.spec.ts`

Expected: FAIL because the home route and layout do not exist.

- [ ] **Step 3: Implement global tokens and layout**

Define global CSS custom properties for off-white `#f1f1ee`, ink `#111118`, coral `#f25f4b`, muted ink, grid gutters, type scale, and timing curves. Add reset, focus-visible, reduced-motion, selection, and responsive container rules.

Implement `BaseLayout.astro` with:

- unique title and description props
- canonical URL resolved from `Astro.site`
- Open Graph and Twitter metadata
- favicon and Open Graph image references
- JSON-LD passed only on the home route
- skip link, `SiteHeader`, `<main id="main-content">`, and `SiteFooter`

Implement `SiteHeader.astro` with anchor links to `#capabilities`, `#approach`, and `#studio`, plus the mail CTA. Use a native button with `aria-controls` and `aria-expanded`; a small inline module toggles the mobile panel and closes it on Escape or link activation.

- [ ] **Step 4: Run navigation tests and verify GREEN**

Run: `npm run test:e2e -- navigation.spec.ts`

Expected: desktop and mobile tests PASS.

- [ ] **Step 5: Commit the shared shell**

```bash
git add src/layouts src/components/SiteHeader.astro src/components/SiteFooter.astro src/styles/global.css tests/e2e/navigation.spec.ts
git commit -m "feat: add accessible site shell"
```

---

### Task 4: Build the landing-page narrative and motion

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/Capabilities.astro`
- Create: `src/components/Approach.astro`
- Create: `src/components/Studio.astro`
- Create: `src/components/FinalCta.astro`
- Create: `src/scripts/signal-field.ts`
- Create: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `site`, `capabilities`, `approachSteps`, and `experienceNotes`
- Produces: the complete home-page content hierarchy and progressive signal-field behavior

- [ ] **Step 1: Write failing home-page behavior tests**

Create `tests/e2e/home.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('communicates the studio promise and all three capabilities', async ({ page }) => {
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
  await expect(links.first()).toHaveAttribute('href', 'mailto:hello@alomattech.com');
});

test('renders a complete reduced-motion experience', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-signal-field]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});
```

- [ ] **Step 2: Run home tests and verify RED**

Run: `npm run test:e2e -- home.spec.ts`

Expected: FAIL because the landing sections and content do not exist.

- [ ] **Step 3: Implement the hero and signal field**

Build a full-viewport hero with the wordmark, headline, one-sentence description, mail CTA, and an SVG signal field. The signal field uses semantic decorative markup (`aria-hidden="true"`) and stable static positions. `signal-field.ts` may shift node transforms from pointer position and update a CSS progress property, but it must exit immediately for reduced-motion users.

Set `document.documentElement.dataset.motion` to `reduced` or `full` before initializing effects so tests and CSS share one state contract.

- [ ] **Step 4: Implement capabilities, approach, studio, and final CTA**

Render capability rows as keyboard-focusable article sections with visible headings and primitive lists. Render the four approach steps beside one sticky SVG line whose progress is driven by an IntersectionObserver and scroll position. Render experience notes as editorial paragraphs that explicitly frame Aisha and WordExpert as team experience. End with the two verified email addresses and no form.

- [ ] **Step 5: Run home tests and verify GREEN**

Run: `npm run test:e2e -- home.spec.ts`

Expected: all desktop and mobile home tests PASS.

- [ ] **Step 6: Commit the landing page**

```bash
git add src/pages/index.astro src/components src/scripts tests/e2e/home.spec.ts
git commit -m "feat: build Alomat landing page narrative"
```

---

### Task 5: Add legal routes, trust assets, and static deployment configuration

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`
- Create: `public/og/alomat-og.svg`
- Create: `public/_headers`
- Create: `tests/e2e/legal-and-seo.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: `BaseLayout` and `site`
- Produces: `/privacy`, `/terms`, crawl directives, security headers, and deployment documentation

- [ ] **Step 1: Write failing legal and SEO tests**

Create `tests/e2e/legal-and-seo.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

for (const path of ['/privacy', '/terms']) {
  test(`${path} is public and uniquely titled`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(new RegExp(path.slice(1), 'i'));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('publishes crawl and organization trust signals', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('script[type="application/ld+json"]')).toContainText(
    'hello@alomattech.com',
  );
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  expect((await request.get('/sitemap-index.xml')).ok()).toBeTruthy();
});
```

- [ ] **Step 2: Run legal tests and verify RED**

Run: `npm run test:e2e -- legal-and-seo.spec.ts`

Expected: FAIL because legal routes and trust assets do not exist.

- [ ] **Step 3: Implement legal pages and public assets**

Write plain-language Privacy and Terms pages using only factual site behavior. Create a favicon using the `.a` mark and an Open Graph SVG using the canonical banner proportions. Add this `robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://alomattech.com/sitemap-index.xml
```

Add Cloudflare-compatible `_headers` with `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive Permissions Policy, and a Content Security Policy that permits only first-party assets plus required inline Astro styles/scripts.

- [ ] **Step 4: Document local and deployment workflows**

Rewrite `README.md` with project purpose, content principles, prerequisites, commands, test commands, Cloudflare Pages settings (`npm run build`, output `dist`), and domain setup notes.

- [ ] **Step 5: Run legal tests and verify GREEN**

Run: `npm run test:e2e -- legal-and-seo.spec.ts`

Expected: all tests PASS.

- [ ] **Step 6: Commit legal and deployment readiness**

```bash
git add src/pages/privacy.astro src/pages/terms.astro public README.md tests/e2e/legal-and-seo.spec.ts
git commit -m "feat: add legal and deployment trust assets"
```

---

### Task 6: Complete responsive, accessibility, and production verification

**Files:**
- Modify: any implementation file implicated by verification
- Create: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: the complete static site
- Produces: release evidence for all promised viewports, tests, and production output

- [ ] **Step 1: Write failing responsive assertions**

Create `tests/e2e/responsive.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440, 1920]) {
  test(`home has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 812 : 1000 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBe(dimensions.client);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}
```

- [ ] **Step 2: Run responsive tests and verify RED or existing behavior**

Run: `npm run test:e2e -- responsive.spec.ts`

Expected: any overflow or layout defect fails with the affected viewport width. If all assertions already pass, add a viewport-specific assertion for hero/header fit that fails before the final responsive adjustment.

- [ ] **Step 3: Fix only evidenced responsive and accessibility defects**

Adjust type clamps, grid columns, touch targets, and overflow containment based on test and screenshot evidence. Preserve the approved composition and do not replace it with a generic stacked card layout.

- [ ] **Step 4: Run the complete automated gate**

Run:

```bash
npm test
npm run check
npm run build
npm run test:e2e
```

Expected: all commands exit 0 with no warnings or broken routes.

- [ ] **Step 5: Inspect real desktop and mobile renders**

Run the production preview and capture full-page screenshots at 375x812 and 1440x1000. Inspect brand hierarchy, clipping, line wrapping, focus state, motion state, section rhythm, footer links, and legal pages. Correct every observed defect and rerun the full gate.

- [ ] **Step 6: Run Lighthouse release checks**

Run Lighthouse against the production preview for Performance, Accessibility, Best Practices, and SEO. Each score must be at least 95. Fix any lower category and rerun it.

- [ ] **Step 7: Commit release verification fixes**

```bash
git add src tests public README.md
git commit -m "fix: complete responsive and release quality pass"
```

---

### Task 7: Review, publish, and connect hosting

**Files:**
- Modify: only files required by review findings

**Interfaces:**
- Consumes: all committed implementation and verification evidence
- Produces: reviewed `main` branch on GitHub and a deployable Cloudflare Pages project

- [ ] **Step 1: Request an independent code review**

Use `superpowers:requesting-code-review` against the complete diff from the design commit. Address all valid high- and medium-priority findings with test-first fixes.

- [ ] **Step 2: Re-run verification after review fixes**

Run:

```bash
npm test
npm run check
npm run build
npm run test:e2e
git status --short
```

Expected: tests and build pass; working tree is clean after the final review commit.

- [ ] **Step 3: Push the reviewed main branch**

Run: `git push origin main`

Expected: GitHub `habibsalimov/alomattech-website` shows the complete site on `main`.

- [ ] **Step 4: Create the Cloudflare Pages deployment**

Connect the GitHub repository, set build command `npm run build`, output directory `dist`, and production branch `main`. Verify the generated `pages.dev` URL loads Home, Privacy, and Terms successfully.

- [ ] **Step 5: Attach `alomattech.com`**

Add `alomattech.com` as the production custom domain in Cloudflare Pages. Apply the exact DNS record shown by Cloudflare in Northwest's DNS manager, wait for certificate issuance, and verify HTTPS, canonical URLs, mail MX/SPF/DKIM/DMARC preservation, and the three public routes.

- [ ] **Step 6: Final completion audit**

Verify every requirement in the design specification using repository files, test output, production screenshots, the live HTTPS site, and DNS/email records. Only then mark the landing-page goal complete.

