# Agentic Publishing SaaS Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition Alomat LLC's public digital presence around a production-backed managed agentic publishing SaaS and deploy one consistent product narrative across the website, LinkedIn, and GitHub.

**Architecture:** Keep the Astro site static and typed. Expand `src/content/site.ts` into the single factual source for the product modules, publishing workflow, anonymous deployments, managed offer, FAQs, and supporting technical pages; render those records through focused editorial components and a canonical `/platform` page. External LinkedIn and GitHub copy must be derived from the approved specification and verified against the deployed site.

**Tech Stack:** Astro 7, strict TypeScript, Vitest, Playwright, static Cloudflare Pages deployment, GitHub organization profile, LinkedIn company page

## Global Constraints

- Category: `Agentic publishing operations platform`.
- Business model: `Managed SaaS`.
- Initial market: global digital publishers, independent media teams, and publisher-led channels.
- Primary promise: `Turn trusted sources into publish-ready content.`
- The existing publisher customer remains anonymous; public copy may say only `an active digital publisher`.
- Do not claim unverified customer counts, time savings, publication volume, revenue, funding, partnerships, accuracy percentages, or guaranteed outcomes.
- Do not describe Alomat as a news publisher, generic AI writing tool, general software agency, or open-ended custom development studio.
- Do not create a self-service account system, pricing table, billing, analytics tracker, CRM, or automatic-publishing claim.
- Do not open, modify, or submit any AWS account, program, or credit application.
- Preserve tracker-free, form-free static delivery and human approval as an explicit product boundary.
- Preserve the technical-editorial visual system: warm off-white, near-black, coral signal, rigorous rules, oversized typography, and no generic dashboard mockups.

---

### Task 1: Establish the canonical SaaS content contract

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/content/site.ts`

**Interfaces:**
- Produces: `ProductModule`, `DeploymentPattern`, and `ManagedOfferItem` interfaces.
- Produces: `productModules`, `publishingWorkflow`, `deploymentPatterns`, and `managedOffer` readonly exports.
- Produces: updated `site`, `navigation`, and `faqItems` records consumed by all later tasks.

- [ ] **Step 1: Write the failing product-positioning tests**

Add imports for the new exports and replace the old studio-only assertions with these contracts:

```ts
it('publishes the approved managed SaaS positioning', () => {
  expect(site.category).toBe('Agentic publishing operations platform');
  expect(site.tagline).toBe('Turn trusted sources into publish-ready content.');
  expect(site.description).toMatch(/managed agentic publishing platform/i);
  expect(navigation.map(({ label }) => label)).toEqual([
    'Product', 'Workflow', 'Deployments', 'About', 'FAQ',
  ]);
});

it('defines the complete source-to-delivery product loop', () => {
  expect(productModules.map(({ title }) => title)).toEqual([
    'Source Intelligence',
    'Editorial Memory',
    'Agent Workflow',
    'Content Packaging',
    'Human Control',
    'Operations & Evaluation',
  ]);
  expect(publishingWorkflow.map(({ title }) => title)).toEqual([
    'Monitor', 'Verify', 'Understand', 'Produce', 'Review', 'Learn',
  ]);
});

it('uses anonymous factual production evidence', () => {
  const copy = JSON.stringify({ deploymentPatterns, managedOffer });
  expect(copy).toMatch(/active digital publisher/i);
  expect(copy).not.toMatch(/xushnudbek|uzbek|telegram|customer logo/i);
});

it('keeps the SaaS claim boundary intact', () => {
  const copy = JSON.stringify({
    site, productModules, publishingWorkflow, deploymentPatterns, managedOffer,
  });
  expect(copy).not.toMatch(
    /guaranteed|accuracy rate|customers served|revenue|funded by|official partner|fully autonomous publishing/i,
  );
});
```

- [ ] **Step 2: Run the content test and verify RED**

Run: `npm test -- src/content/site.test.ts`

Expected: FAIL because the four new exports and `site.category` do not exist and the old tagline/navigation do not match.

- [ ] **Step 3: Add typed product records and approved copy**

Define the interfaces and records with these exact public titles and boundaries:

```ts
export interface ProductModule {
  readonly index: string;
  readonly title: string;
  readonly statement: string;
  readonly primitives: readonly string[];
}

export interface DeploymentPattern {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly evidence: readonly string[];
}

export interface ManagedOfferItem {
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export const productModules = [
  { index: '01', title: 'Source Intelligence', statement: 'Monitor approved sources, accept URLs, extract primary material, group related coverage, and keep source failures visible.', primitives: ['Monitoring', 'Extraction', 'Grouping', 'Source trace'] },
  { index: '02', title: 'Editorial Memory', statement: 'Retrieve archive-backed style, topic context, duplicate signals, and publisher-specific rules before drafting begins.', primitives: ['Archive retrieval', 'Style memory', 'Context', 'Deduplication'] },
  { index: '03', title: 'Agent Workflow', statement: 'Coordinate research, writing, editing, visual, and verification stages as one observable publishing pipeline.', primitives: ['Orchestration', 'Tool use', 'Routing', 'Traceability'] },
  { index: '04', title: 'Content Packaging', statement: 'Prepare short updates, explainers, digests, summaries, and visual direction for the selected publishing surface.', primitives: ['Formats', 'Summaries', 'Visual briefs', 'Channel adaptation'] },
  { index: '05', title: 'Human Control', statement: 'Keep editors in charge through approval queues, source visibility, edit and reject paths, and explicit hard stops.', primitives: ['Approval', 'Escalation', 'Guardrails', 'Accountability'] },
  { index: '06', title: 'Operations & Evaluation', statement: 'Track delivery state, retries, traces, quality gates, and review feedback so the workflow improves safely.', primitives: ['Observability', 'Evaluation', 'Fallbacks', 'Feedback'] },
] as const satisfies readonly ProductModule[];
```

Define `publishingWorkflow` with Monitor, Verify, Understand, Produce, Review,
and Learn; define three deployment patterns named Always-on signal desk,
URL-to-content package, and Editorial memory system; and define managed offer
records for Configure, Operate, and Improve. Use the approved specification's
descriptions verbatim where possible.

Update `site` to include:

```ts
category: 'Agentic publishing operations platform',
tagline: 'Turn trusted sources into publish-ready content.',
description: 'Alomat is a managed agentic publishing platform for global digital publishers, combining source intelligence, editorial memory, specialist agents, and human approval.',
pilotSubject: 'Managed publishing pilot',
```

Update navigation to Product (`/#product`), Workflow (`/#workflow`), Deployments
(`/#deployments`), About, and FAQ.

- [ ] **Step 4: Run the content test and verify GREEN**

Run: `npm test -- src/content/site.test.ts`

Expected: PASS with all content-contract tests green.

- [ ] **Step 5: Commit the canonical content contract**

```bash
git add src/content/site.ts src/content/site.test.ts
git commit -m "feat: define agentic publishing SaaS content"
```

### Task 2: Rebuild the home page around product, proof, and managed delivery

**Files:**
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/navigation.spec.ts`
- Modify: `tests/e2e/no-js.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/Capabilities.astro`
- Modify: `src/components/Approach.astro`
- Modify: `src/components/Studio.astro`
- Modify: `src/components/FinalCta.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`

**Interfaces:**
- Consumes: canonical records from Task 1.
- Produces: home section anchors `product`, `workflow`, and `deployments`.
- Produces: accessible production-proof block with `data-production-proof`.
- Produces: managed-pilot mail links using `site.pilotSubject`.

- [ ] **Step 1: Write failing home-page browser contracts**

Replace the old studio promise test with:

```ts
test('communicates the publishing SaaS promise and production boundary', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Turn trusted sources into publish-ready content.',
  );
  await expect(page.locator('[data-production-proof]')).toContainText(
    'In production with an active digital publisher.',
  );
  await expect(page.locator('#product').getByRole('article')).toHaveCount(6);
  await expect(page.locator('#workflow').locator('[data-approach-step]')).toHaveCount(6);
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
  const pilot = page.getByRole('link', { name: 'Request a managed pilot' }).first();
  await expect(pilot).toHaveAttribute(
    'href',
    'mailto:hello@alomattech.com?subject=Managed%20publishing%20pilot',
  );
});
```

Update navigation/no-JavaScript expectations to Product, Workflow, Deployments,
and `Request a managed pilot`. Update the responsive hero selector to the new
CTA label and update reduced-motion expectation from four to six workflow steps.

- [ ] **Step 2: Run the home-focused browser tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/navigation.spec.ts tests/e2e/no-js.spec.ts tests/e2e/responsive.spec.ts`

Expected: FAIL on the old hero, missing proof block, old navigation labels, four workflow steps, and missing deployment section.

- [ ] **Step 3: Reframe the hero and product trace**

In `Hero.astro`, render `site.category`, `site.tagline`, `site.description`, and a
`Request a managed pilot` mail link. Relabel the SVG nodes to `SOURCE`, `VERIFY`,
`MEMORY`, `COMPOSE`, `REVIEW`, and `DELIVER`, and change the footer legend to
`Sources · Memory · Agents · Human approval`.

Use this encoded link expression everywhere:

```astro
const pilotHref = `mailto:${site.email}?subject=${encodeURIComponent(site.pilotSubject)}`;
```

- [ ] **Step 4: Turn capabilities into the six-module product section**

Keep the strong full-width row treatment in `Capabilities.astro`, import
`productModules`, set `id="product"`, change the eyebrow to `The platform`, and
use the heading `A publishing operation, not another writing prompt.` Render all
six modules and link the section to `/platform` with the accessible label
`Explore the complete platform`.

- [ ] **Step 5: Turn the approach section into the six-stage workflow**

Import `publishingWorkflow`, set `id="workflow"`, change the eyebrow to
`How it runs`, and use the heading `From source signal to an accountable editorial decision.` Preserve the existing intersection-observer progression and
reduced-motion behavior.

- [ ] **Step 6: Turn the studio section into proof and deployments**

In `Studio.astro`, replace former-workplace cards with:

```astro
<aside class="production-proof" data-production-proof>
  <p>Production evidence</p>
  <h2>In production with an active digital publisher.</h2>
  <ul>
    <li>Live source monitoring</li>
    <li>Archive-backed editorial memory</li>
    <li>Specialist agent workflow</li>
    <li>Human approval before delivery</li>
  </ul>
</aside>
```

Follow it with `<section id="deployments">` rendering the three anonymous
`deploymentPatterns`. Retain the editorial grid and rewrite its local CSS for a
proof strip plus three deployment columns.

- [ ] **Step 7: Add the managed SaaS section and update global conversion copy**

Extend `FinalCta.astro` with a `managed-saas` block that renders Configure,
Operate, and Improve before the final CTA. Use `Your editorial system, operated
with you.` as the heading and `Request a managed pilot` as the CTA. Update the
header and footer conversion labels to the same wording while retaining
`hello@alomattech.com` and `habib@alomattech.com`.

- [ ] **Step 8: Compose the new home page and metadata**

Keep the component order Hero → Capabilities → Approach → Studio → FinalCta.
Change the home title to `Agentic Publishing Operations Platform — Alomat LLC`
and preserve Organization structured data.

- [ ] **Step 9: Run the home-focused browser tests and verify GREEN**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/navigation.spec.ts tests/e2e/no-js.spec.ts tests/e2e/responsive.spec.ts`

Expected: PASS across desktop and mobile projects with six workflow steps, no
horizontal overflow, and a usable no-JavaScript navigation.

- [ ] **Step 10: Commit the home-page repositioning**

```bash
git add src/pages/index.astro src/components tests/e2e/home.spec.ts tests/e2e/navigation.spec.ts tests/e2e/no-js.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: reposition home around publishing SaaS"
```

### Task 3: Publish the canonical platform page and product metadata

**Files:**
- Modify: `tests/e2e/search-pages.spec.ts`
- Modify: `tests/e2e/legal-and-seo.spec.ts`
- Create: `src/pages/platform.astro`
- Modify: `public/llms.txt`
- Modify: `README.md`

**Interfaces:**
- Consumes: `productModules`, `publishingWorkflow`, `deploymentPatterns`,
  `managedOffer`, and `site`.
- Produces: canonical `/platform` route and factual SoftwareApplication schema.

- [ ] **Step 1: Write failing platform-page and discovery tests**

Add `/platform` to `publicPages` with title
`Agentic Publishing Platform — Alomat LLC` and H1
`One operating layer for modern publishing.` Add `/platform/` to the generated
sitemap expectations and `https://alomattech.com/platform` to `llms.txt`
expectations.

Add this schema contract:

```ts
test('platform page publishes visible SoftwareApplication data', async ({ page }) => {
  await page.goto('/platform');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')),
  );
  const product = entities.find((entity) => entity['@type'] === 'SoftwareApplication');
  expect(product?.name).toBe('Alomat Agentic Publishing Platform');
  expect(product?.applicationCategory).toBe('BusinessApplication');
  expect(product).not.toHaveProperty('aggregateRating');
  expect(product).not.toHaveProperty('offers');
});
```

- [ ] **Step 2: Run the focused search tests and verify RED**

Run: `npm run test:e2e -- tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts`

Expected: FAIL because `/platform` does not exist and is absent from sitemap and
`llms.txt`.

- [ ] **Step 3: Build the detailed platform page**

Create `src/pages/platform.astro` with:

- Breadcrumbs: Home → Platform
- Eyebrow: `Product / Managed SaaS`
- H1: `One operating layer for modern publishing.`
- Direct answer explaining trusted sources, editorial memory, specialist agents,
  and human approval
- sections for six modules, six workflow stages, three deployment patterns,
  managed onboarding, recurring operation, and control boundaries
- a final `Request a managed pilot` mail link
- SoftwareApplication and BreadcrumbList structured data that mirror visible
  copy and contain no price, rating, operating-system, or unsupported feature
  claims

Use the existing editorial page classes so the route remains visually cohesive
without adding a new global design system.

- [ ] **Step 4: Update discovery and repository documentation**

Rewrite the first paragraph of `README.md` to describe the managed agentic
publishing platform. Add `/platform` to `public/llms.txt`, make it the first
product link, and replace studio language with the approved category and proof
boundary.

- [ ] **Step 5: Run the focused search tests and verify GREEN**

Run: `npm run test:e2e -- tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts`

Expected: PASS with the new route in page, schema, sitemap, and answer-engine
discovery contracts.

- [ ] **Step 6: Commit the platform page**

```bash
git add src/pages/platform.astro tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts public/llms.txt README.md
git commit -m "feat: add detailed publishing platform page"
```

### Task 4: Align About, FAQ, and technical capability pages

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/content/site.ts`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/faq.astro`
- Modify: `src/components/ServicePage.astro`
- Modify: `src/pages/agent-systems.astro`
- Modify: `src/pages/multilingual-ai.astro`
- Modify: `src/pages/full-stack-ai-products.astro`
- Modify: `tests/e2e/search-pages.spec.ts`

**Interfaces:**
- Consumes: the Task 1 product narrative.
- Produces: supporting pages that point back to `/platform` and never compete as
  separate consulting offers.

- [ ] **Step 1: Add failing supporting-copy contracts**

Assert that:

```ts
it('answers managed publishing buyer questions', () => {
  const questions = faqItems.map(({ question }) => question);
  expect(questions).toEqual(expect.arrayContaining([
    'What does the Alomat publishing platform do?',
    'What does managed SaaS mean at Alomat?',
    'Does a human approve content before delivery?',
    'How does editorial memory work?',
    'How does a managed pilot begin?',
  ]));
});

it('positions technical pages as platform foundations', () => {
  const copy = JSON.stringify(servicePages);
  expect(copy).toMatch(/publishing platform/i);
  expect(copy).not.toMatch(/general software agency|custom software for any industry/i);
});
```

Update browser assertions so About identifies Alomat as a managed agentic
publishing platform and each technical page contains a visible link named
`See the publishing platform`.

- [ ] **Step 2: Run supporting content tests and verify RED**

Run: `npm test -- src/content/site.test.ts`

Run: `npm run test:e2e -- tests/e2e/search-pages.spec.ts`

Expected: FAIL on the old FAQ questions, old About studio identity, and missing
platform links.

- [ ] **Step 3: Rewrite the supporting public copy**

Update `faqItems` to cover product operation, managed onboarding, approved
sources, editorial memory, human approval, output formats, managed pilot, and
global delivery. Keep every answer longer than 70 characters and factual.

Update the three technical pages' content records so:

- Agent systems support orchestration, verification, review, and evaluation.
- Multilingual AI supports cross-language source handling and editorial memory.
- Full-stack AI supports the application, data, operations, and delivery layer.

Retain the existing routes and metadata uniqueness. Replace `What Alomat can
build` with `How this supports the platform`, add a prominent `/platform` link,
and use `Request a managed pilot` in the page CTA.

- [ ] **Step 4: Reframe About as a product company**

Use H1 `About Alomat: publishing operations built around editorial judgment.`
The direct answer must say Alomat LLC builds and operates a managed agentic
publishing platform for global digital publishers. Keep Aisha and WordExpert
only in the experience section, and add a factual production paragraph that
refers only to an active digital publisher.

- [ ] **Step 5: Run supporting content tests and verify GREEN**

Run: `npm test -- src/content/site.test.ts`

Run: `npm run test:e2e -- tests/e2e/search-pages.spec.ts`

Expected: PASS with supporting pages aligned to one product category.

- [ ] **Step 6: Commit supporting-page alignment**

```bash
git add src/content/site.ts src/content/site.test.ts src/pages src/components/ServicePage.astro tests/e2e/search-pages.spec.ts
git commit -m "feat: align public pages to publishing platform"
```

### Task 5: Complete visual, accessibility, SEO, and build verification

**Files:**
- Modify if a failing test requires it: `src/styles/global.css`
- Modify if a failing test requires it: component-local style blocks
- Create: `docs/seo/2026-07-15-agentic-publishing-saas-release-report.md`

**Interfaces:**
- Produces: a verified static build and release evidence.

- [ ] **Step 1: Run the full automated quality gate**

Run each command independently and record its complete result:

```bash
npm test
npm run check
npm run build
npm run test:e2e
```

Expected: Vitest reports zero failures, Astro check reports zero errors, the
production build exits 0, and Playwright passes both desktop and mobile
projects.

- [ ] **Step 2: Fix any discovered regression through a fresh RED-GREEN cycle**

For each failure, add or tighten the smallest test reproducing it, run that test
to confirm the expected failure, implement only the required CSS/template fix,
then rerun the focused test and the full affected suite. Do not weaken content,
accessibility, overflow, reduced-motion, metadata, or anonymity assertions to
make a failure disappear.

- [ ] **Step 3: Inspect desktop and mobile renderings**

Start `npm run dev -- --host 127.0.0.1 --port 4321`, open the local site in the
in-app browser, and capture home and `/platform` at 1440×1000 and 375×812.
Confirm:

- the first viewport communicates category, promise, and pilot CTA
- the coral route reads as source-to-delivery rather than a generic graph
- all six modules and workflow stages are legible
- production proof is visible but does not resemble a fake metric strip
- deployment cards remain anonymous
- no horizontal clipping or overlapping navigation exists
- reduced-motion content remains complete

- [ ] **Step 4: Write the release report**

Create `docs/seo/2026-07-15-agentic-publishing-saas-release-report.md` recording:

- approved positioning and claim boundary
- changed canonical routes and metadata
- exact test/build commands and pass counts
- desktop/mobile visual-review findings
- LinkedIn and GitHub copy that must be mirrored in Task 6
- deployment commit and live URL once available

- [ ] **Step 5: Commit the verified release state**

```bash
git add src docs/seo tests public README.md
git commit -m "chore: verify publishing SaaS release"
```

### Task 6: Publish the consistent GitHub and LinkedIn identity

**Files:**
- External create/update: GitHub repository `alomat-llc/.github`, file `profile/README.md`
- External update: GitHub organization profile description, website, and email
- External update: LinkedIn company page tagline, overview, website, industry,
  and specialties

**Interfaces:**
- Consumes: exact approved copy from the specification and deployed website.
- Produces: externally visible profiles consistent with `alomattech.com`.

- [ ] **Step 1: Verify the website branch and deployment before profile writes**

Confirm the final commit is pushed, Cloudflare Pages reports a successful
production deployment, and these URLs return HTTP 200:

```text
https://alomattech.com/
https://alomattech.com/platform
https://alomattech.com/about
https://alomattech.com/faq
```

- [ ] **Step 2: Publish the GitHub organization identity**

Set the organization description to:

```text
Agentic publishing infrastructure for source intelligence, editorial memory, human review, and publish-ready delivery.
```

Set the organization website to `https://alomattech.com` and public email to
`hello@alomattech.com`. Create or update `alomat-llc/.github` with
`profile/README.md` containing the primary promise, six-module architecture,
anonymous production statement, managed SaaS delivery model, claim boundary,
and website/LinkedIn links. Do not list private repositories or infrastructure.

- [ ] **Step 3: Publish the LinkedIn company identity in the in-app browser**

Use the exact tagline:

```text
Managed agentic publishing operations—from trusted sources to publish-ready content.
```

Use the exact overview from the approved design specification. Keep the company
industry as Software Development or IT Services and IT Consulting according to
LinkedIn's available taxonomy; use Software Development when both remain
available. Set website to `https://alomattech.com` and specialties to:

```text
Agentic publishing, Source intelligence, Editorial memory, Multi-agent systems, Human-in-the-loop AI, Content operations, Multilingual AI, Workflow evaluation
```

- [ ] **Step 4: Verify public profile consistency**

View LinkedIn as a member and GitHub while signed out or through public URLs.
Compare the category, promise, anonymous evidence, managed SaaS wording,
website, and email against the release report. Confirm no customer identity,
country/language clue, unsupported metric, AWS activity, or custom-agency-first
language is visible.

- [ ] **Step 5: Record final external-state evidence**

Append final LinkedIn and GitHub public URLs plus the verification date to the
release report, commit the report update, push it, and verify the Cloudflare
deployment generated from that commit.

## Self-Review

- Spec coverage: Tasks 1–4 implement the product, proof, managed SaaS, domain,
  website, About/FAQ, and technical-page requirements; Task 5 covers quality and
  visual release gates; Task 6 covers LinkedIn, GitHub, and live consistency.
- Claim coverage: unit and browser tests explicitly protect anonymity, human
  approval, managed SaaS, and prohibited commercial claims.
- Route coverage: `/platform` is added to navigation, structured data,
  `llms.txt`, sitemap tests, and public-page browser tests.
- Type consistency: all page components consume the readonly records introduced
  in Task 1; no later task invents parallel product data.
- Scope boundary: no account system, pricing, analytics, AWS, or program
  application work is included.
- Placeholder scan: the plan contains no deferred implementation placeholders;
  every task names exact files, contracts, commands, and expected outcomes.
