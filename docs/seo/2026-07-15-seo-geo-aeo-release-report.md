# SEO, GEO, and AEO Release Report — 2026-07-15

## Outcome

Alomat LLC's public website now has a search-focused information architecture for traditional search engines, answer engines, and AI discovery systems. The release is live on Cloudflare Pages and the canonical domain remains `https://alomattech.com`.

## Published pages

- `/agent-systems` — AI agent systems engineering
- `/multilingual-ai` — multilingual AI and language technology
- `/full-stack-ai-products` — full-stack AI product engineering
- `/about` — company identity, operating principles, and bounded team experience
- `/faq` — seven direct answers aligned with visible FAQ schema
- `/404` — useful, non-indexable not-found page

Existing Home, Privacy, and Terms pages remain public. The original Capabilities, Approach, and Studio navigation anchors were preserved for backward compatibility.

## SEO implementation

- Unique title, description, canonical URL, Open Graph, and Twitter metadata on every public page
- `index, follow, max-image-preview:large` on public pages
- `noindex, nofollow` on the custom 404 page
- Semantic page hierarchy with one visible `h1` per route
- Breadcrumb navigation on editorial and service pages
- XML sitemap containing all canonical public routes and excluding the 404 route
- `robots.txt` pointing to the canonical sitemap index
- Web manifest and complete social image metadata

## GEO and AEO implementation

- Direct-answer introductions on service, About, and FAQ pages
- Explicit service definitions, outcomes, deliverables, and process steps
- Conservative claims: prior Aisha and WordExpert work is identified as team experience, not as Alomat customer work
- Market language limited to United States and global product teams without inventing offices, customers, or local presence
- Machine-readable `llms.txt` with canonical descriptions, pages, contacts, and public profiles
- Internal links connecting capabilities, detailed services, About, FAQ, Privacy, and Terms

## Structured data

- Stable `Organization` entity: `https://alomattech.com/#organization`
- Stable `WebSite` entity: `https://alomattech.com/#website`
- `Service` and `BreadcrumbList` entities on each service page
- `AboutPage` entity on About
- `FAQPage` whose questions match every visible FAQ item

No review ratings, customer counts, awards, funding, partnerships, physical offices, or performance results were added without public evidence.

## Deployment and indexing

- GitHub production branch: `main`
- Released commit: `aab3926`
- Cloudflare Pages deployment: `https://ee955421.alomattech.pages.dev`
- Cloudflare custom domains: `alomattech.com` and `www.alomattech.com`
- Cloudflare zone status: active and protected
- Global DNS verification: Cloudflare and Google resolvers returned `104.21.74.133` and `172.67.203.37`
- Google Search Console domain property: verified for `alomattech.com`
- Submitted sitemap: `https://alomattech.com/sitemap-index.xml`
- Initial Search Console fetch state: `Couldn't fetch` immediately after DNS/deployment changes; submission succeeded and Google will retry periodically

The local Mac resolver retained a temporary negative DNS cache after delegation became globally available. Verification therefore used both public DNS-over-HTTPS resolvers and a TLS request pinned to a current Cloudflare edge address.

## Verification evidence

- `npm test` — 9/9 tests passed
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 9 static pages built and sitemap generated
- `npx playwright test` — 60/60 desktop and mobile tests passed
- Cloudflare deployment URL — service, About, FAQ, robots, sitemap, and `llms.txt` returned HTTP 200
- Canonical domain through Cloudflare edge — root and discovery files returned HTTP 200; extensionless content routes returned the expected HTTP 308 redirect to trailing-slash pages

## Follow-up checklist

- Recheck Search Console sitemap status after DNS caches and Google's fetch queue settle.
- Review Search Console Pages, Performance, and Core Web Vitals after data begins populating.
- Add new case studies only when the relationship and measurable claims can be publicly verified.
- Update `llms.txt`, sitemap tests, visible copy, and structured data together when adding a service or public page.
- Re-run all four quality gates before every production deployment.
