# Alomat LLC Website

The official public website for Alomat LLC. Since 2026-11-17 it is one page (`/`) that shows the product with real panel screenshots, the narrated demo video, the development stage and the founder, and sends visitors to the app sign-in page (`https://app-staging.alomattech.com/sign-in`). The design follows the Zakovat Sıcak direction; fonts (Nunito, Onest) are self-hosted in `public/fonts` because the CSP allows fonts only from the site itself.

## Content principles

- Every screenshot and number comes from a working account; no mock-ups, invented metrics, customer names, partner or funding claims.
- State the stage plainly: the News feed runs (open sign-up), the Channel editor is in development.
- Keep the site tracker-free. It has no forms; contact is by email.

## Pages

- `/` — product, demo (`#demo`), stage (`#stage`), founder and contact (`#company`)
- `/privacy`, `/terms`, `/404`
- Old pages (`/platform`, `/demo`, `/about`, `/pilot`, `/faq`, service and case-study pages) redirect to `/` sections through `public/_redirects`.

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

The old managed pilot endpoint is a separate Cloudflare Worker (no page uses it since the one-page site; it can be retired separately) configured in `wrangler.pilot.jsonc` and routed only at `alomattech.com/api/pilot`. It verifies Cloudflare Turnstile, validates the application, enforces IP/email/duplicate rate limits, and delivers the application through Resend. The Worker requires the `TURNSTILE_SECRET` and `RESEND_API_KEY` secrets.

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
- `src/components/` — site header and footer
- `src/layouts/BaseLayout.astro` — metadata and global site shell
- `src/pages/` — the home page and legal routes
- `src/workers/` — shared pilot validation, delivery, and security modules
- `workers/pilot.ts` — Cloudflare Worker entry point for pilot intake
- `public/demo/` — product demo video and poster (made in `~/Projects/alomat-demo-video`)
- `public/screens/` — real panel screenshots used on the home page
- `public/` — brand, crawl, social, and hosting assets
- `tests/e2e/` — browser-level behavior and release contracts
