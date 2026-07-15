# Homepage Platform CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an immediately visible homepage hero button that navigates to the canonical `/platform` product page.

**Architecture:** Keep the change inside the existing `Hero.astro` component and preserve the managed-pilot link as the primary conversion. Add one Playwright regression test that scopes the new semantic link to `.hero`, then style the link as a secondary outlined button with responsive wrapping.

**Tech Stack:** Astro 7, scoped component CSS, Playwright, Vitest, TypeScript

## Global Constraints

- The new link text is exactly `Explore the platform`.
- The destination is exactly `/platform`.
- The pilot action remains present and unchanged.
- The action is a semantic anchor with visible keyboard focus.
- The hero must not create horizontal overflow at 375, 768, 1440, or 1920 pixels.
- Do not change global navigation, platform-page content, analytics, forms, DNS, mail, or AWS resources.

---

### Task 1: Homepage hero platform CTA

**Files:**
- Modify: `tests/e2e/home.spec.ts`
- Modify: `src/components/Hero.astro`

**Interfaces:**
- Consumes: the existing homepage `.hero` landmark and static `/platform` route
- Produces: a hero-scoped anchor with accessible name `Explore the platform` and `href="/platform"`

- [ ] **Step 1: Write the failing regression test**

Append this test to `tests/e2e/home.spec.ts`:

```ts
test('links the homepage hero to the canonical platform page', async ({
  page,
}) => {
  await page.goto('/');

  const platformCta = page
    .locator('.hero')
    .getByRole('link', { name: 'Explore the platform' });

  await expect(platformCta).toBeVisible();
  await expect(platformCta).toHaveAttribute('href', '/platform');
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts --grep "links the homepage hero"
```

Expected: FAIL because `.hero` does not contain a link named `Explore the platform`.

- [ ] **Step 3: Add the minimal hero action markup**

In `src/components/Hero.astro`, wrap the existing pilot link and the new platform link in:

```astro
<div class="hero-actions">
  <a class="text-link" href={pilotHref}>
    <span>Request a managed pilot</span>
    <svg viewBox="0 0 40 16" aria-hidden="true">
      <path d="M0 8h37M31 2l6 6-6 6"></path>
    </svg>
  </a>
  <a class="platform-cta" href="/platform">Explore the platform</a>
</div>
```

- [ ] **Step 4: Add scoped button and responsive styles**

Add these rules to `Hero.astro`:

```css
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.1rem;
  align-items: center;
}

.platform-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--ink);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition:
    background 180ms var(--ease-out),
    color 180ms var(--ease-out);
}

.platform-cta:hover,
.platform-cta:focus-visible {
  background: var(--ink);
  color: var(--canvas);
}
```

In the existing `@media (max-width: 600px)` block, add:

```css
.hero-actions {
  align-items: stretch;
}

.platform-cta {
  flex: 1 1 100%;
}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts --grep "links the homepage hero"
```

Expected: 1 test passed.

- [ ] **Step 6: Run full verification**

Run each command and require exit code 0:

```bash
npm test
npm run check
npm run build
npm run test:e2e
```

Expected: all unit and end-to-end tests pass, Astro reports zero errors, and the production build succeeds.

- [ ] **Step 7: Review and commit**

Inspect `git diff --check` and the complete diff, then commit:

```bash
git add src/components/Hero.astro tests/e2e/home.spec.ts
git commit -m "feat: add homepage platform CTA"
```

- [ ] **Step 8: Integrate, deploy, and verify production**

Fast-forward `main`, push it, build the final main commit, and deploy `dist` to the existing Cloudflare Pages project `alomattech` as branch `main`. Confirm `https://alomattech.com/` exposes the hero link with text `Explore the platform` and destination `/platform`, then inspect the live desktop and mobile hero in the in-app browser.
