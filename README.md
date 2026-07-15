# Alomat LLC Website

The official public website for Alomat LLC, an intelligent systems studio focused on agent systems, language technologies, and full-stack AI products.

## Content principles

- Describe real team experience without presenting former workplaces as Alomat clients.
- Do not publish unverified formation, customer, partnership, funding, or performance claims.
- Keep the initial release tracker-free and form-free.
- Use `hello@alomattech.com` as the primary conversation channel.

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
npm run build
npm run test:e2e
```

Playwright uses the locally installed Google Chrome channel. The E2E configuration builds the static site and serves `dist/` on `127.0.0.1:4321`.

## Deployment

The project produces a fully static site and is ready for Cloudflare Pages:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22.12` or newer

After the Pages deployment is healthy, attach `alomattech.com` as a custom domain. Preserve the existing MX, SPF, DKIM, and DMARC records when changing web DNS records.

## Project structure

- `src/content/site.ts` — canonical public copy and company links
- `src/components/` — focused editorial page sections
- `src/layouts/BaseLayout.astro` — metadata and global site shell
- `src/pages/` — Home, Privacy, and Terms routes
- `public/` — brand, crawl, social, and hosting assets
- `tests/e2e/` — browser-level behavior and release contracts
