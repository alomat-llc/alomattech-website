# Alomat SEO, GEO and AEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand alomattech.com into a truthful, crawlable, answer-ready company site with focused capability pages, factual entity data, and a documented Search Console release.

**Architecture:** Typed content in `src/content/site.ts` supplies visible copy, metadata, FAQ answers, and JSON-LD. Reusable Astro layouts/components render static routes; Astro's sitemap integration and public crawl files expose the canonical route set. Browser tests validate rendered semantics and generated artifacts before Cloudflare Pages deploys the `main` branch.

**Tech Stack:** Astro 7, strict TypeScript, Vitest, Playwright, JSON-LD, Cloudflare Pages, Google Search Console

## Global Constraints

- Preserve the existing editorial `.alomat` visual language and tracker-free static architecture.
- Target US and global product teams without calling Alomat “US-based” or publishing an unverified address.
- Never invent customers, case studies, partnerships, ratings, prices, metrics, employee counts, or founding dates.
- Aisha and WordExpert may appear only as clearly labelled team experience.
- Keep `hello@alomattech.com` as the primary conversion and add no form or analytics tracker.
- Generate structured data from the same typed records used for visible HTML.
- Complete unit tests, Astro check, production build, browser tests, live HTTPS inspection, sitemap submission, and a permanent release report.

---

### Task 1: Define the search content contract

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/content/site.ts`

**Interfaces:**
- Produces: `servicePages`, `faqItems`, `site.markets`, and typed `ServicePage` / `FaqItem` records.

- [ ] **Step 1: Write failing tests** requiring exactly the slugs `agent-systems`, `multilingual-ai`, and `full-stack-ai-products`; unique titles and descriptions; at least five visible FAQ answers; complete service sections; and absence of prohibited claims.
- [ ] **Step 2: Run `npm test -- src/content/site.test.ts`** and confirm failure because the new exports do not exist.
- [ ] **Step 3: Add the minimal typed records**. Each service record contains `slug`, `eyebrow`, `title`, `seoTitle`, `description`, `definition`, `outcomes`, `deliverables`, `process`, `relatedSlugs`, and `serviceType`. FAQ records contain `question` and a self-contained `answer`.
- [ ] **Step 4: Run `npm test -- src/content/site.test.ts`** and confirm all content-contract tests pass.
- [ ] **Step 5: Commit** with `feat: define search-focused service content`.

### Task 2: Build semantic pages and entity data

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/Capabilities.astro`
- Create: `src/components/Breadcrumbs.astro`
- Create: `src/components/ServicePage.astro`
- Create: `src/pages/agent-systems.astro`
- Create: `src/pages/multilingual-ai.astro`
- Create: `src/pages/full-stack-ai-products.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/faq.astro`
- Create: `src/pages/404.astro`
- Modify: `src/styles/global.css`
- Create: `tests/e2e/search-pages.spec.ts`

**Interfaces:**
- `BaseLayout` gains `structuredData?: Record<string, unknown>[]` and `noindex?: boolean`.
- `ServicePage` consumes one `ServicePage` record and emits visible content plus Service and BreadcrumbList JSON-LD.

- [ ] **Step 1: Write failing browser tests** for every route, one visible H1, unique canonical URLs, descriptive navigation links, parsed JSON-LD types, visible FAQ/schema parity, and a real 404 response.
- [ ] **Step 2: Run `npm run test:e2e -- search-pages.spec.ts`** and confirm missing-route failures.
- [ ] **Step 3: Extend `BaseLayout`** to emit Organization and WebSite entities on home, page-specific structured-data arrays, `robots` directives, image dimensions, locale, and stable entity identifiers.
- [ ] **Step 4: Implement reusable breadcrumbs and service rendering**, then create the three capability routes from typed records.
- [ ] **Step 5: Implement About, FAQ, and 404 routes**. FAQPage JSON-LD must map directly from the visible `faqItems` array; 404 must pass `noindex`.
- [ ] **Step 6: Link the home capability rows and global navigation** to canonical detail pages while preserving no-JavaScript mobile navigation.
- [ ] **Step 7: Add shared responsive editorial styles** for the new page shell, answer blocks, process rows, FAQ rows, and related links.
- [ ] **Step 8: Run targeted browser tests and existing regression tests** until all pass.
- [ ] **Step 9: Commit** with `feat: add semantic service and answer pages`.

### Task 3: Publish crawl and answer-engine discovery files

**Files:**
- Modify: `public/robots.txt`
- Create: `public/llms.txt`
- Create: `public/manifest.webmanifest`
- Modify: `tests/e2e/legal-and-seo.spec.ts`

**Interfaces:**
- Publishes canonical HTTPS discovery URLs without creating an alternative source of company claims.

- [ ] **Step 1: Add failing tests** that fetch and validate `robots.txt`, `sitemap-index.xml`, `llms.txt`, and `manifest.webmanifest`, and assert every canonical public page appears in the generated sitemap files.
- [ ] **Step 2: Run the targeted test** and confirm missing-file or missing-route failures.
- [ ] **Step 3: Add `llms.txt`** with a short factual description and canonical route links; add a minimal web manifest; preserve sitemap declaration in robots.
- [ ] **Step 4: Run the targeted test** and confirm it passes.
- [ ] **Step 5: Commit** with `feat: publish crawl and answer discovery files`.

### Task 4: Verify and deploy the release

**Files:**
- Modify only files required by failures discovered during verification.

- [ ] **Step 1: Run `npm test`** and require zero failures.
- [ ] **Step 2: Run `npm run check`** and require zero Astro/TypeScript errors.
- [ ] **Step 3: Run `npm run build`** and inspect `dist/` for all expected routes and sitemap files.
- [ ] **Step 4: Run `npm run test:e2e`** and require zero failures across configured desktop and mobile projects.
- [ ] **Step 5: Inspect `git diff --check`, status, and generated metadata contracts**, fixing any discovered issues with a new failing regression test first.
- [ ] **Step 6: Merge the reviewed branch into `main` and push `main`** so Cloudflare Pages performs the production deployment.
- [ ] **Step 7: Inspect the Cloudflare deployment and live HTTPS routes**; verify status codes, canonical metadata, JSON-LD, robots, sitemap, and `llms.txt` on `alomattech.com`.

### Task 5: Complete Search Console and permanent reporting

**Files:**
- Create: `docs/seo/2026-07-15-seo-geo-aeo-release-report.md`
- Modify: `README.md`

**Interfaces:**
- Produces a durable audit trail containing scope, commit, tests, deployed URLs, schema types, Search Console actions, and observation-only follow-ups.

- [ ] **Step 1: Submit `https://alomattech.com/sitemap-index.xml`** in the verified domain property and record the resulting status.
- [ ] **Step 2: Request indexing** for home, three service pages, About, and FAQ, respecting Search Console quotas.
- [ ] **Step 3: Write the release report** with exact commands/results, live checks, submitted URLs, current limitations, and a 30/60/90-day observation checklist.
- [ ] **Step 4: Link the report from README** under an operations/SEO section.
- [ ] **Step 5: Run final unit, check, build, and browser verification again**, then commit the report.

