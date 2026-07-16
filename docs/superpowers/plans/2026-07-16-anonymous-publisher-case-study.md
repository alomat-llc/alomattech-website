# Anonymous Publisher Workflow Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a factual, anonymous `/case-study/publisher-workflow` page that explains the real source-to-review workflow, shows sanitized production evidence, and converts qualified visitors toward the managed pilot.

**Architecture:** Keep claim-bearing copy and evidence metadata in one typed content module, then render it through a statically generated Astro page with semantic workflow and architecture components. Link the page from existing production-proof surfaces, expose Article and Breadcrumb structured data, and require three flattened sanitized captures before production deployment.

**Tech Stack:** Astro 7 static output, TypeScript 6, scoped Astro CSS, Vitest 4, Playwright 1.61, Cloudflare Pages, Astro sitemap integration.

## Global Constraints

- The public story is one anonymous digital publisher and one end-to-end operating workflow.
- Do not render customer, project, geography, language, channel, audience, private corpus, infrastructure, credential, or account identifiers.
- Do not claim customer counts, content volume, time saved, cost savings, audience size, accuracy, uptime, revenue, or guaranteed outcomes.
- The workflow order is Monitor → Verify → Remember → Produce → Review → Package.
- Every path into delivery must visibly pass through human review and approval.
- The page must contain three real flattened captures from an actual system or an actual system running sanitized test input before production deployment.
- Redaction must be irreversible; CSS overlays over private images are prohibited.
- The page remains statically rendered and adds no database, authentication, analytics vendor, or third-party widget.
- The primary CTA is `/pilot`; the secondary CTA is `/platform`.
- Do not deploy the case study until `/pilot` exists or the primary CTA has a verified temporary contact fallback.
- Preserve unrelated user files such as `.DS_Store`; never stage them.

---

## File Map

- Create `src/content/publisher-case-study.ts`: typed, independently reviewable public claims, workflow, architecture, proof, and evidence metadata.
- Create `src/content/publisher-case-study.test.ts`: claim-boundary, sequence, evidence, and CTA contract tests.
- Create `src/pages/case-study/publisher-workflow.astro`: canonical case-study route, Article/Breadcrumb data, semantic page structure, and scoped responsive styles.
- Create `tests/e2e/case-study.spec.ts`: route, content, schema, privacy, image, CTA, and responsive browser checks.
- Create `public/case-study/publisher-workflow/source-monitoring.webp`: sanitized 1600×900 real source-intake or monitoring capture.
- Create `public/case-study/publisher-workflow/human-review.webp`: sanitized 1600×900 real approval/edit/reject capture.
- Create `public/case-study/publisher-workflow/publish-ready-package.webp`: sanitized 1600×900 real final package capture.
- Modify `src/components/Studio.astro`: add the homepage production-evidence link.
- Modify `src/pages/platform.astro`: link the platform proof section to the case study.
- Modify `public/llms.txt`: expose the canonical case-study route to answer engines.
- Modify `tests/e2e/home.spec.ts`: require the homepage case-study link.
- Modify `tests/e2e/search-pages.spec.ts`: include the case study in canonical public-page coverage.
- Modify `tests/e2e/legal-and-seo.spec.ts`: require the route in `llms.txt` and the generated sitemap.

---

### Task 1: Typed Case-Study Claim Contract

**Files:**
- Create: `src/content/publisher-case-study.test.ts`
- Create: `src/content/publisher-case-study.ts`

**Interfaces:**
- Produces: `publisherCaseStudy: PublisherCaseStudy`
- Produces types: `CaseStudyStep`, `ArchitectureLayer`, `EvidenceItem`, `PublisherCaseStudy`
- Consumed by: `src/pages/case-study/publisher-workflow.astro`

- [ ] **Step 1: Write the failing content contract test**

Create `src/content/publisher-case-study.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { publisherCaseStudy } from './publisher-case-study';

describe('anonymous publisher case-study content contract', () => {
  it('defines the approved source-to-package workflow', () => {
    expect(publisherCaseStudy.workflow.map(({ title }) => title)).toEqual([
      'Monitor',
      'Verify',
      'Remember',
      'Produce',
      'Review',
      'Package',
    ]);
  });

  it('keeps human approval between agent output and delivery', () => {
    expect(publisherCaseStudy.architecture.map(({ title }) => title)).toEqual([
      'Source layer',
      'Intelligence layer',
      'Agent workflow',
      'Human review and approval',
      'Delivery layer',
    ]);
    expect(publisherCaseStudy.controlStatement).toBe(
      'The agents prepare. Editors decide.',
    );
  });

  it('defines three real-evidence asset contracts', () => {
    expect(publisherCaseStudy.evidence).toHaveLength(3);
    expect(publisherCaseStudy.evidence.map(({ src }) => src)).toEqual([
      '/case-study/publisher-workflow/source-monitoring.webp',
      '/case-study/publisher-workflow/human-review.webp',
      '/case-study/publisher-workflow/publish-ready-package.webp',
    ]);
    for (const item of publisherCaseStudy.evidence) {
      expect(item.width).toBe(1600);
      expect(item.height).toBe(900);
      expect(item.alt.length).toBeGreaterThan(20);
      expect(item.caption.length).toBeGreaterThan(60);
    }
  });

  it('contains only anonymous and non-quantified public claims', () => {
    const copy = JSON.stringify(publisherCaseStudy);
    expect(copy).not.toMatch(
      /xushnudbek|uzbek|uzbekistan|telegram|customer logo|channel name|audience size/i,
    );
    expect(copy).not.toMatch(
      /\b\d+(?:\.\d+)?%|customers served|time saved|cost savings|accuracy rate|uptime|revenue|guaranteed/i,
    );
  });

  it('points conversion to the real product and pilot routes', () => {
    expect(publisherCaseStudy.primaryCta).toEqual({
      label: 'Request a managed pilot',
      href: '/pilot',
    });
    expect(publisherCaseStudy.secondaryCta).toEqual({
      label: 'Explore the platform',
      href: '/platform',
    });
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the import fails**

Run:

```bash
npx vitest run src/content/publisher-case-study.test.ts
```

Expected: FAIL because `./publisher-case-study` does not exist.

- [ ] **Step 3: Add the typed public content module**

Create `src/content/publisher-case-study.ts`:

```ts
export interface CaseStudyStep {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface ArchitectureLayer {
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly kind: 'system' | 'control';
}

export interface EvidenceItem {
  readonly index: string;
  readonly title: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: 1600;
  readonly height: 900;
}

export interface PublisherCaseStudy {
  readonly slug: 'publisher-workflow';
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly privacyNote: string;
  readonly problem: readonly string[];
  readonly workflow: readonly CaseStudyStep[];
  readonly architecture: readonly ArchitectureLayer[];
  readonly evidence: readonly EvidenceItem[];
  readonly proof: readonly string[];
  readonly controlStatement: string;
  readonly controlDescription: string;
  readonly controls: readonly string[];
  readonly primaryCta: { readonly label: string; readonly href: '/pilot' };
  readonly secondaryCta: { readonly label: string; readonly href: '/platform' };
}

export const publisherCaseStudy = {
  slug: 'publisher-workflow',
  eyebrow: 'Anonymous production deployment',
  title: 'From fragmented sources to a controlled publishing workflow.',
  description:
    'How an active digital publisher uses approved-source monitoring, editorial memory, specialist agents, and human approval to prepare publish-ready content packages.',
  privacyNote:
    'The publisher remains anonymous. This case study presents observable workflow evidence while withholding identity, private content, and operational details.',
  problem: [
    'Relevant signals arrive across multiple approved sources and selected URLs.',
    'Related or repeated coverage must be grouped before drafting begins.',
    'Source context, editorial history, and publisher rules must stay available throughout the workflow.',
    'Publication decisions must remain with a human editor, with failures and review state visible.',
  ],
  workflow: [
    { index: '01', title: 'Monitor', description: 'Watch approved sources and accept selected URLs without treating every signal as a story.' },
    { index: '02', title: 'Verify', description: 'Extract primary material, preserve source references, group related coverage, and identify duplicate candidates.' },
    { index: '03', title: 'Remember', description: 'Retrieve archive-backed context, style guidance, topic history, and publisher-specific constraints.' },
    { index: '04', title: 'Produce', description: 'Route the work through the required research, writing, editing, visual, and verification stages.' },
    { index: '05', title: 'Review', description: 'Show the draft, source trace, and workflow state to an editor who can approve, edit, reject, or stop the process.' },
    { index: '06', title: 'Package', description: 'Prepare the reviewed text, summary, and visual direction for the selected publishing surface.' },
  ],
  architecture: [
    { index: '01', title: 'Source layer', description: 'Approved inputs enter one observable workflow.', capabilities: ['Feeds and sites', 'Selected URLs', 'Source health'], kind: 'system' },
    { index: '02', title: 'Intelligence layer', description: 'Material is extracted, traced, grouped, and matched with editorial context.', capabilities: ['Extraction', 'Source trace', 'Story grouping', 'Editorial memory'], kind: 'system' },
    { index: '03', title: 'Agent workflow', description: 'Specialist stages prepare the text and visual package under deterministic routing.', capabilities: ['Research', 'Drafting', 'Editing', 'Verification'], kind: 'system' },
    { index: '04', title: 'Human review and approval', description: 'An editor inspects sources and output before anything can reach delivery.', capabilities: ['Approve', 'Edit', 'Reject', 'Hard stop'], kind: 'control' },
    { index: '05', title: 'Delivery layer', description: 'The approved package and its state move to the selected publishing surface.', capabilities: ['Publish-ready package', 'Delivery state', 'Recorded feedback'], kind: 'system' },
  ],
  evidence: [
    { index: '01', title: 'Approved-source intake', src: '/case-study/publisher-workflow/source-monitoring.webp', alt: 'Sanitized production view showing approved publishing sources entering the workflow', caption: 'A real sanitized workflow view showing approved inputs entering the monitoring and source-processing stage before drafting begins.', width: 1600, height: 900 },
    { index: '02', title: 'Human decision boundary', src: '/case-study/publisher-workflow/human-review.webp', alt: 'Sanitized production view showing human approval, editing, and rejection controls', caption: 'A real sanitized review state where the editor can inspect the prepared output and choose an explicit approve, edit, reject, or stop path.', width: 1600, height: 900 },
    { index: '03', title: 'Publish-ready package', src: '/case-study/publisher-workflow/publish-ready-package.webp', alt: 'Sanitized production view showing a reviewed text and visual content package', caption: 'A real sanitized package prepared by the workflow for delivery, with text and visual direction kept behind the human approval boundary.', width: 1600, height: 900 },
  ],
  proof: [
    'Multiple approved-source inputs feed one observable workflow.',
    'Source references and related-story signals remain available before drafting.',
    'Archive-backed editorial context informs specialist production stages.',
    'Human approval, editing, rejection, and hard-stop paths precede delivery.',
    'Workflow state and review feedback remain part of the operating system.',
  ],
  controlStatement: 'The agents prepare. Editors decide.',
  controlDescription:
    'The system preserves source boundaries, review state, explicit decision paths, escalation, and hard stops. It prepares accountable work for an editor rather than acting as an autonomous newsroom.',
  controls: ['Approved-source boundaries', 'Visible source trace', 'Human approval before delivery', 'Edit, reject, and hard-stop paths'],
  primaryCta: { label: 'Request a managed pilot', href: '/pilot' },
  secondaryCta: { label: 'Explore the platform', href: '/platform' },
} as const satisfies PublisherCaseStudy;
```

- [ ] **Step 4: Run the focused test and confirm it passes**

Run:

```bash
npx vitest run src/content/publisher-case-study.test.ts
```

Expected: 5 tests PASS.

- [ ] **Step 5: Commit the content contract**

```bash
git add src/content/publisher-case-study.ts src/content/publisher-case-study.test.ts
git commit -m "feat: define anonymous publisher case study"
```

---

### Task 2: Semantic Case-Study Route and Structured Data

**Files:**
- Create: `tests/e2e/case-study.spec.ts`
- Create: `src/pages/case-study/publisher-workflow.astro`

**Interfaces:**
- Consumes: `publisherCaseStudy` from `src/content/publisher-case-study.ts`
- Consumes: `site` from `src/content/site.ts`
- Consumes: `BaseLayout` and `Breadcrumbs`
- Produces: static route `/case-study/publisher-workflow`

- [ ] **Step 1: Write failing route, schema, semantics, privacy, CTA, and responsive tests**

Create `tests/e2e/case-study.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('publishes the anonymous production workflow as a canonical case study', async ({ page }) => {
  const response = await page.goto('/case-study/publisher-workflow');
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/Publisher Workflow Case Study/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://alomattech.com/case-study/publisher-workflow',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'From fragmented sources to a controlled publishing workflow.',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('renders the full workflow, architecture, proof, and human control boundary', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(page.locator('[data-case-workflow] > li')).toHaveCount(6);
  await expect(page.locator('[data-architecture-layer]')).toHaveCount(5);
  await expect(page.locator('[data-architecture-control]')).toContainText(
    'Human review and approval',
  );
  await expect(page.locator('[data-case-proof] li')).toHaveCount(5);
  await expect(page.getByText('The agents prepare. Editors decide.')).toBeVisible();
});

test('shows three real evidence assets with captions and intrinsic dimensions', async ({ page, request }) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(page.locator('[data-evidence-gallery] figure')).toHaveCount(3);
  for (const image of await page.locator('[data-evidence-gallery] img').all()) {
    await expect(image).toHaveAttribute('width', '1600');
    await expect(image).toHaveAttribute('height', '900');
    const src = await image.getAttribute('src');
    expect(src).toBeTruthy();
    expect((await request.get(src as string)).ok()).toBeTruthy();
    expect((await image.getAttribute('alt'))?.length).toBeGreaterThan(20);
  }
});

test('publishes factual Article and BreadcrumbList data', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  const entities = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) => scripts.map((script) => JSON.parse(script.textContent ?? '{}')),
  );
  const article = entities.find((entity) => entity['@type'] === 'Article');
  const breadcrumbs = entities.find((entity) => entity['@type'] === 'BreadcrumbList');
  expect(article?.headline).toBe(
    'From fragmented sources to a controlled publishing workflow.',
  );
  expect(article?.publisher['@id']).toBe('https://alomattech.com/#organization');
  expect(article).not.toHaveProperty('aggregateRating');
  expect(breadcrumbs?.itemListElement).toHaveLength(2);
});

test('keeps private identifiers and unsupported metrics out of rendered copy', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  const copy = await page.locator('main').innerText();
  expect(copy).not.toMatch(/xushnudbek|uzbek|uzbekistan|telegram|channel name/i);
  expect(copy).not.toMatch(/\b\d+(?:\.\d+)?%|time saved|cost savings|accuracy rate|uptime|revenue|guaranteed/i);
});

test('exposes pilot and platform conversion paths', async ({ page }) => {
  await page.goto('/case-study/publisher-workflow');
  await expect(page.getByRole('link', { name: 'Request a managed pilot' }).last()).toHaveAttribute('href', '/pilot');
  await expect(page.getByRole('link', { name: 'Explore the platform' }).last()).toHaveAttribute('href', '/platform');
});

for (const width of [375, 768, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 800 ? 812 : 1000 });
    await page.goto('/case-study/publisher-workflow');
    const dimensions = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scroll).toBe(dimensions.client);
  });
}
```

- [ ] **Step 2: Run the focused browser test and confirm the route fails**

Run:

```bash
npx playwright test tests/e2e/case-study.spec.ts
```

Expected: FAIL because `/case-study/publisher-workflow` does not exist.

- [ ] **Step 3: Implement the static page and scoped visual system**

Create `src/pages/case-study/publisher-workflow.astro`. The page must:

```astro
---
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import { publisherCaseStudy as study } from '../../content/publisher-case-study';
import { site } from '../../content/site';
import BaseLayout from '../../layouts/BaseLayout.astro';

const pathname = '/case-study/publisher-workflow';
const articleData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${site.url}${pathname}/#article`,
  headline: study.title,
  description: study.description,
  url: `${site.url}${pathname}`,
  author: { '@id': `${site.url}/#organization` },
  publisher: { '@id': `${site.url}/#organization` },
  image: `${site.url}/og/alomat-og.png`,
  mainEntityOfPage: `${site.url}${pathname}`,
};
const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Publisher Workflow', item: `${site.url}${pathname}` },
  ],
};
---

<BaseLayout
  title="Publisher Workflow Case Study — Alomat LLC"
  description={study.description}
  pathname={pathname}
  structuredData={[articleData, breadcrumbData]}
>
  <article class="editorial-page case-study">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Publisher workflow' }]} />
    <header class="editorial-hero case-hero">
      <p>{study.eyebrow}</p>
      <h1>{study.title}</h1>
      <p class="direct-answer">{study.description}</p>
    </header>

    <aside class="privacy-note" aria-label="Evidence boundary">
      <strong>Evidence boundary</strong>
      <p>{study.privacyNote}</p>
    </aside>

    <section class="case-section problem" aria-labelledby="problem-title">
      <header><p>01 / Operating problem</p><h2 id="problem-title">Signals were available. The operating path was fragmented.</h2></header>
      <ul>{study.problem.map((item) => <li>{item}</li>)}</ul>
    </section>

    <section class="case-section workflow" aria-labelledby="case-workflow-title">
      <header><p>02 / Implemented workflow</p><h2 id="case-workflow-title">One trace from source to editorial decision.</h2></header>
      <ol data-case-workflow>{study.workflow.map((step) => <li><span>{step.index}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
    </section>

    <section class="case-section architecture" aria-labelledby="architecture-title">
      <header><p>03 / Architecture</p><h2 id="architecture-title">Human authority is part of the system design.</h2></header>
      <ol>{study.architecture.map((layer) => <li class:list={{ control: layer.kind === 'control' }} data-architecture-layer data-architecture-control={layer.kind === 'control' ? '' : undefined}><span>{layer.index}</span><div><h3>{layer.title}</h3><p>{layer.description}</p><ul>{layer.capabilities.map((capability) => <li>{capability}</li>)}</ul></div></li>)}</ol>
    </section>

    <section class="case-section evidence" aria-labelledby="evidence-title">
      <header><p>04 / Production evidence</p><h2 id="evidence-title">Observable stages from a real workflow.</h2></header>
      <div class="evidence-grid" data-evidence-gallery>{study.evidence.map((item) => <figure><span>{item.index}</span><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" /><figcaption><strong>{item.title}</strong><p>{item.caption}</p></figcaption></figure>)}</div>
    </section>

    <section class="case-section proof" aria-labelledby="proof-title">
      <header><p>05 / Verified outcome</p><h2 id="proof-title">What this deployment proves.</h2></header>
      <ul data-case-proof>{study.proof.map((item) => <li>{item}</li>)}</ul>
    </section>

    <section class="control-boundary" aria-labelledby="control-title">
      <p>Control boundary</p><h2 id="control-title">{study.controlStatement}</h2>
      <div><p>{study.controlDescription}</p><ul>{study.controls.map((item) => <li>{item}</li>)}</ul></div>
    </section>

    <section class="page-cta" aria-labelledby="case-cta-title">
      <p>Start with one real workflow.</p><h2 id="case-cta-title">Build the operating path around your editorial judgment.</h2>
      <div class="case-actions"><a class="primary-action" href={study.primaryCta.href}>{study.primaryCta.label}</a><a class="secondary-action" href={study.secondaryCta.href}>{study.secondaryCta.label}</a></div>
    </section>
  </article>
</BaseLayout>
```

Add scoped styles in the same file with these exact layout rules:

```astro
<style>
  .case-study { overflow: clip; }
  .privacy-note { display: grid; grid-template-columns: minmax(10rem, .45fr) 1.55fr; gap: 2rem; margin-top: 2rem; padding: 1.5rem 0; border-bottom: 1px solid var(--line); color: var(--muted); }
  .privacy-note strong, .case-section header > p, .control-boundary > p { color: var(--signal-dark); font-size: .7rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
  .privacy-note p { max-width: 52rem; margin: 0; }
  .case-section { display: grid; grid-template-columns: minmax(14rem, .55fr) 1.45fr; gap: 2rem clamp(3rem, 8vw, 10rem); padding: clamp(4rem, 8vw, 8rem) 0; border-bottom: 1px solid var(--line); }
  .case-section header > p { margin: 0 0 1rem; }
  .case-section h2 { max-width: 12ch; margin: 0; font-size: clamp(2.3rem, 5vw, 5.5rem); font-weight: 550; letter-spacing: -.06em; line-height: .94; }
  .problem > ul, .proof > ul, .architecture > ol, .workflow > ol { margin: 0; padding: 0; list-style: none; }
  .problem > ul li, .proof > ul li { padding: 1.4rem 0; border-top: 1px solid var(--line); color: var(--muted); }
  .workflow > ol { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--ink); }
  .workflow > ol > li { min-height: 21rem; padding: 1.25rem; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .workflow > ol > li:nth-child(3n) { border-right: 0; }
  .workflow span, .architecture > ol > li > span, figure > span { color: var(--signal-dark); font-size: .7rem; font-weight: 800; }
  .workflow h3, .architecture h3 { margin: 3rem 0 1rem; font-size: clamp(1.8rem, 3vw, 3.2rem); font-weight: 550; letter-spacing: -.05em; line-height: .96; }
  .workflow p, .architecture p, figcaption p, .control-boundary div > p { color: var(--muted); }
  .architecture > ol { display: grid; gap: .75rem; }
  .architecture > ol > li { display: grid; grid-template-columns: 3.5rem 1fr; gap: 1.25rem; padding: 1.5rem; border: 1px solid var(--line); }
  .architecture > ol > li.control { border-color: var(--ink); background: var(--signal); }
  .architecture h3 { margin: 0 0 .75rem; }
  .architecture ul, .control-boundary ul { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.5rem 0 0; padding: 0; list-style: none; }
  .architecture ul li, .control-boundary li { padding: .45rem .65rem; border: 1px solid color-mix(in srgb, var(--ink) 35%, transparent); font-size: .68rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  .evidence { grid-template-columns: 1fr; }
  .evidence header { display: grid; grid-template-columns: minmax(14rem, .55fr) 1.45fr; gap: 2rem clamp(3rem, 8vw, 10rem); }
  .evidence-grid { display: grid; gap: clamp(2rem, 6vw, 6rem); }
  figure { margin: 0; }
  figure > span { display: block; margin-bottom: .75rem; }
  figure img { width: 100%; height: auto; border: 1px solid var(--ink); background: #fff; }
  figcaption { display: grid; grid-template-columns: minmax(12rem, .45fr) 1.55fr; gap: 1.5rem; padding-top: 1rem; }
  figcaption p { max-width: 50rem; margin: 0; }
  .control-boundary { display: grid; grid-template-columns: .45fr 1fr .85fr; gap: clamp(1.5rem, 4vw, 5rem); margin-top: clamp(4rem, 8vw, 8rem); padding: clamp(2rem, 4vw, 4rem); border: 1px solid var(--ink); }
  .control-boundary h2 { max-width: 12ch; margin: 0; font-size: clamp(2.25rem, 4.7vw, 5rem); font-weight: 550; letter-spacing: -.06em; line-height: .92; }
  .control-boundary div > p { margin: 0; }
  .case-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
  .primary-action, .secondary-action { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: .8rem 1rem; border: 1px solid var(--ink); font-size: .72rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  .primary-action { background: var(--ink); color: var(--canvas); }
  .secondary-action:hover, .secondary-action:focus-visible { background: var(--ink); color: var(--canvas); }
  @media (max-width: 900px) {
    .privacy-note, .case-section, .evidence header, figcaption, .control-boundary { grid-template-columns: 1fr; }
    .workflow > ol { grid-template-columns: 1fr; }
    .workflow > ol > li, .workflow > ol > li:nth-child(3n) { min-height: 17rem; border-right: 0; }
  }
</style>
```

- [ ] **Step 4: Run non-image case-study tests and inspect the expected asset failures**

Run:

```bash
npx playwright test tests/e2e/case-study.spec.ts --grep-invert "real evidence assets"
```

Expected: all selected tests PASS. The omitted image test remains intentionally red until Task 3 supplies verified files.

- [ ] **Step 5: Commit the semantic route**

```bash
git add src/pages/case-study/publisher-workflow.astro tests/e2e/case-study.spec.ts
git commit -m "feat: add anonymous publisher case study"
```

---

### Task 3: Real Sanitized Evidence Captures

**Files:**
- Create: `public/case-study/publisher-workflow/source-monitoring.webp`
- Create: `public/case-study/publisher-workflow/human-review.webp`
- Create: `public/case-study/publisher-workflow/publish-ready-package.webp`

**Interfaces:**
- Consumes: the exact evidence paths, captions, 1600×900 dimensions, and alt text from `publisherCaseStudy.evidence`
- Produces: three public, flattened, privacy-reviewed WebP assets

- [ ] **Step 1: Capture only sanitized test input in the real workflow**

Open the actual workflow surface using in-app browser or its existing client.
Use neutral English test content that contains no customer name, channel,
geography, language identity, personal account, unpublished material, or
private infrastructure. Capture these observable states:

```text
Capture 01: approved source or URL intake before drafting
Capture 02: approve / edit / reject / stop decision controls
Capture 03: reviewed text plus visual-direction package
```

If any of these states cannot be produced by the real system, stop this task and
do not substitute a designed mockup.

- [ ] **Step 2: Export flattened 1600×900 public files**

Crop browser chrome, unrelated tabs, notifications, avatars, identifiers, and
all personal data before export. Export the flattened results at the three
exact paths listed above. Do not commit the private originals.

- [ ] **Step 3: Run the mechanical asset audit**

Run:

```bash
file public/case-study/publisher-workflow/*.webp
sips -g pixelWidth -g pixelHeight public/case-study/publisher-workflow/*.webp
```

Expected: all three files report WebP image data and exactly `pixelWidth: 1600`
and `pixelHeight: 900`.

- [ ] **Step 4: Perform the manual privacy audit at original resolution**

Open each exported file at original resolution and check every item below:

```text
[ ] no customer or internal project name
[ ] no username, channel, avatar, profile photo, or message identifier
[ ] no geographic or language clue that identifies the deployment
[ ] no URL, IP, token, account ID, source credential, or infrastructure detail
[ ] no private or unpublished text
[ ] no browser chrome, notification, or unrelated tab
[ ] caption accurately describes only what is visible
[ ] the exported file is flattened and contains no recoverable private layer
```

Any failed item rejects the asset; recapture from sanitized input instead of
covering private pixels with a web overlay.

- [ ] **Step 5: Run the evidence browser test**

Run:

```bash
npx playwright test tests/e2e/case-study.spec.ts --grep "real evidence assets"
```

Expected: PASS with three reachable images, non-empty alt text, and 1600×900
intrinsic dimensions.

- [ ] **Step 6: Commit only the approved public assets**

```bash
git add public/case-study/publisher-workflow/source-monitoring.webp public/case-study/publisher-workflow/human-review.webp public/case-study/publisher-workflow/publish-ready-package.webp
git commit -m "docs: add sanitized publisher workflow evidence"
```

---

### Task 4: Internal Discovery, Sitemap, and Answer-Engine Links

**Files:**
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/search-pages.spec.ts`
- Modify: `tests/e2e/legal-and-seo.spec.ts`
- Modify: `src/components/Studio.astro`
- Modify: `src/pages/platform.astro`
- Modify: `public/llms.txt`

**Interfaces:**
- Consumes: `/case-study/publisher-workflow`
- Produces: homepage and platform discovery links plus crawl/answer-engine discovery

- [ ] **Step 1: Add failing discovery and sitemap expectations**

Append to `tests/e2e/home.spec.ts`:

```ts
test('links production evidence to the anonymous case study', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('[data-production-proof]').getByRole('link', { name: 'Read the production case study' }),
  ).toHaveAttribute('href', '/case-study/publisher-workflow');
});
```

Add this entry to `publicPages` in `tests/e2e/search-pages.spec.ts`:

```ts
{
  path: '/case-study/publisher-workflow',
  title: /Publisher Workflow Case Study/,
  h1: /From fragmented sources to a controlled publishing workflow/,
},
```

In `tests/e2e/legal-and-seo.spec.ts`, include
`/case-study/publisher-workflow` in the `llms.txt` path list and include
`/case-study/publisher-workflow/` in the generated sitemap path list.

Add a platform-link assertion to `tests/e2e/case-study.spec.ts`:

```ts
test('is discoverable from the platform production proof', async ({ page }) => {
  await page.goto('/platform');
  await expect(page.getByRole('link', { name: 'Read the production case study' })).toHaveAttribute(
    'href',
    '/case-study/publisher-workflow',
  );
});
```

- [ ] **Step 2: Run the focused tests and confirm link/discovery failures**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts tests/e2e/case-study.spec.ts
```

Expected: FAIL for the missing homepage link, platform link, `llms.txt` entry,
and sitemap expectation.

- [ ] **Step 3: Add the homepage and platform proof links**

Inside the `production-proof` aside in `src/components/Studio.astro`, after the
evidence list, add:

```astro
<a class="proof-link" href="/case-study/publisher-workflow">
  Read the production case study
</a>
```

Add this scoped style:

```css
.proof-link {
  align-self: end;
  justify-self: start;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--ink);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

In the `.platform-proof` section of `src/pages/platform.astro`, add after the
descriptive paragraph:

```astro
<a href="/case-study/publisher-workflow">Read the production case study</a>
```

Extend the `.platform-proof` grid to four columns at desktop and add a matching
uppercase underlined link style. Preserve the existing one-column mobile media
rule.

- [ ] **Step 4: Add the answer-engine discovery entry**

Under the product/page list in `public/llms.txt`, add exactly:

```text
- [Anonymous publisher workflow case study](https://alomattech.com/case-study/publisher-workflow): Production evidence for source monitoring, editorial memory, specialist agents, and human approval.
```

- [ ] **Step 5: Run the focused discovery tests**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts tests/e2e/case-study.spec.ts
```

Expected: all focused tests PASS and the Astro-generated sitemap includes the
new static route automatically.

- [ ] **Step 6: Commit discovery changes**

```bash
git add src/components/Studio.astro src/pages/platform.astro public/llms.txt tests/e2e/home.spec.ts tests/e2e/search-pages.spec.ts tests/e2e/legal-and-seo.spec.ts tests/e2e/case-study.spec.ts
git commit -m "feat: surface publisher workflow evidence"
```

---

### Task 5: Full Verification and Production Gate

**Files:**
- Verify: all files changed in Tasks 1–4
- Update only if verification exposes a scoped defect

**Interfaces:**
- Consumes: complete anonymous case-study implementation and approved evidence assets
- Produces: a verified, deployment-ready release; deployment remains gated on `/pilot`

- [ ] **Step 1: Run the complete unit suite**

Run:

```bash
npm test
```

Expected: all Vitest tests PASS.

- [ ] **Step 2: Run Astro type and content checks**

Run:

```bash
npm run check
```

Expected: `0 errors`, `0 warnings`, `0 hints`.

- [ ] **Step 3: Build the static production output**

Run:

```bash
npm run build
```

Expected: successful static build containing
`dist/case-study/publisher-workflow/index.html` and all three WebP files.

- [ ] **Step 4: Run the complete Playwright suite**

Run:

```bash
npm run test:e2e
```

Expected: all browser tests PASS in Chromium.

- [ ] **Step 5: Audit the built page and sitemap**

Run:

```bash
rg -n "From fragmented sources|The agents prepare|Request a managed pilot" dist/case-study/publisher-workflow/index.html
rg -n "case-study/publisher-workflow" dist/sitemap-0.xml public/llms.txt
rg -ni "xushnudbek|uzbek|uzbekistan|telegram|time saved|cost savings|accuracy rate|uptime|revenue|guaranteed" dist/case-study/publisher-workflow/index.html
```

Expected: the first two commands find the required content; the final command
returns no matches.

- [ ] **Step 6: Inspect desktop and mobile renders**

Use Playwright screenshots or the existing local preview to inspect 1440×1000
and 375×812 renders. Confirm workflow order, architecture reading order, image
legibility, focus states, captions, and absence of horizontal overflow.

- [ ] **Step 7: Enforce the production gate**

Confirm one of these is true before any Cloudflare deployment:

```text
A. `/pilot` exists, its submission path has been verified, and the case-study CTA resolves successfully.
B. The case-study CTA has been deliberately changed to the verified existing contact path and its regression test matches that temporary behavior.
```

If neither condition is true, do not deploy. Continue with the separate Managed
Pilot subproject while keeping the verified case-study commits local and
undeployed.

- [ ] **Step 8: Commit any verification-only correction**

If verification required a scoped correction, stage only the corrected files
and commit:

```bash
git commit -m "fix: verify publisher case study release"
```

If no correction was required, do not create an empty commit.

---

## Completion Evidence

This subproject is complete only when:

- the typed claim contract and all related tests pass;
- the canonical page renders its six workflow stages and five architecture
  layers with human approval before delivery;
- three genuine, sanitized, flattened evidence captures are committed and
  manually privacy-reviewed;
- homepage, platform, `llms.txt`, and sitemap expose the route;
- unit, Astro check, build, and complete Playwright suites pass;
- the built artifact contains no prohibited identifiers or unsupported metric
  language;
- the CTA production gate is satisfied before Cloudflare deployment.
