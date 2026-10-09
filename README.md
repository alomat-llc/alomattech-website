# Alomat LLC Website

The official public website for Alomat LLC, a managed agentic publishing platform that turns trusted sources into publish-ready content through source intelligence, editorial memory, specialist agents, and human approval.

## Content principles

- Describe real team experience without presenting former workplaces as Alomat clients.
- Keep the active publisher customer anonymous and do not publish unverified customer counts, partnership, funding, or performance claims.
- Keep the public site tracker-free and collect only the operational context required to evaluate a managed pilot.
- Use the managed pilot application as the primary product inquiry path and `hello@alomattech.com` for general contact.

## Public product surfaces

- `/platform` — product model, operating boundary, and deployment patterns
- `/case-study/publisher-workflow` — anonymized production workflow case study
- `/demo` — caption-led walkthrough of one representative example story
- `/pilot` — managed pilot application
- `/about` and `/faq` — company context and buyer questions

## Local development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The local Astro server is available at `http://localhost:4321` by default.

## Quality gates

```bash
npm test
npm run check
npm run check:worker-types
npm run check:worker
npm run build
npm run test:e2e
```

Playwright uses the locally installed Google Chrome channel. The E2E configuration builds the static site and serves `dist/` on `127.0.0.1:4321`.

## Deployment architecture

The public site is a static Astro build deployed to Cloudflare Pages:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22.12` or newer

The managed pilot endpoint is a separate Cloudflare Worker configured in `wrangler.pilot.jsonc` and routed only at `alomattech.com/api/pilot`. It verifies Cloudflare Turnstile, validates the application, enforces IP/email/duplicate rate limits, and delivers the application through Resend. The Worker requires the `TURNSTILE_SECRET` and `RESEND_API_KEY` secrets.

For a controlled release:

```bash
npm run build
npx wrangler pages deploy dist --project-name alomattech --branch main
npx wrangler deploy --config wrangler.pilot.jsonc
```

Preserve the domain's MX, SPF, DKIM, and DMARC records when changing web DNS records. Never commit production credentials or applicant data.

## Release records

- [2026-07-15 SEO, GEO, and AEO release](docs/seo/2026-07-15-seo-geo-aeo-release-report.md)

## Project structure

- `src/content/site.ts` — canonical public copy and company links
- `src/components/` — focused editorial page sections
- `src/layouts/BaseLayout.astro` — metadata and global site shell
- `src/pages/` — product, company, legal, demo, case study, and pilot routes
- `src/workers/` — shared pilot validation, delivery, and security modules
- `workers/pilot.ts` — Cloudflare Worker entry point for pilot intake
- `video/` — Remotion source for the product demo
- `public/` — brand, crawl, social, and hosting assets
- `tests/e2e/` — browser-level behavior and release contracts
