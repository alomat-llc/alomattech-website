# Alomat SEO, GEO and AEO Design

## Objective

Make `alomattech.com` technically crawlable, commercially understandable, and
easy for both search engines and answer engines to cite. The site will target
US and global product teams looking for agent systems, multilingual AI, and
full-stack AI product engineering without inventing customers, metrics,
partnerships, or delivery claims.

## Chosen Strategy

Use a focused hub-and-spoke information architecture. The existing home page
remains the brand and trust hub. Three capability pages provide enough topical
depth to satisfy commercial search intent, while an About page and a concise
FAQ establish entity facts and direct answers. This is preferred to either
metadata-only optimization, which would leave the site too thin, or a large
set of speculative industry pages, which would create unsupported and
duplicated content.

## Audiences and Search Intent

- Product and engineering leaders evaluating an AI engineering partner.
- Teams building dependable AI agents and tool-using workflows.
- Teams integrating speech, translation, retrieval, or multilingual UX.
- Startups and established companies needing full-stack AI product delivery.
- Infrastructure, banking, and startup-program reviewers checking that Alomat
  is a coherent operating technology company.

The primary conversion remains an email conversation at
`hello@alomattech.com`. No form, tracker, CRM, or invented lead magnet is
introduced.

## Information Architecture

- `/` — brand hub, concise capability overview, approach, experience, and CTA.
- `/agent-systems/` — orchestration, context, tool use, evaluation, reliability.
- `/multilingual-ai/` — speech, translation, retrieval, and multilingual UX.
- `/full-stack-ai-products/` — product design, application engineering, cloud
  delivery, observability, and operations.
- `/about/` — factual company identity, operating principles, team experience,
  contact routes, and profile links.
- `/faq/` — direct, self-contained answers to common buyer and reviewer
  questions.
- `/privacy/` and `/terms/` — existing legal pages.

Capability pages must explain what the service is, when it is useful, what
Alomat builds, how delivery works, and how to begin. Pages must not present
Aisha or WordExpert as Alomat customers; they may appear only as clearly
labelled team experience on the About page.

## SEO Design

Every indexable page receives a unique English title, meta description,
canonical URL, Open Graph metadata, Twitter metadata, and one clear H1. The
home page links to every capability and trust page using descriptive anchor
text. Capability pages cross-link only where the relationship helps a reader.

The Astro sitemap integration remains the canonical sitemap generator.
`robots.txt` points to `sitemap-index.xml`. A dedicated `404.astro` returns a
useful not-found page. The site publishes `manifest.webmanifest`, an explicit
favicon set where available, and stable social images. No `keywords` meta tag
or manipulative search text is added.

## GEO and AEO Design

Answer-engine visibility is treated as information quality, not a separate
spam channel:

- Each page opens with a compact definition and outcome statement.
- Headings use the questions and concepts a buyer would actually ask.
- The FAQ contains visible answers; structured data mirrors exactly that copy.
- Organization and WebSite entity data use stable identifiers anchored at
  `https://alomattech.com/#organization` and `#website`.
- Service structured data connects each capability to Alomat through
  `provider`, `serviceType`, `areaServed`, and `audience`.
- Breadcrumb structured data reflects visible navigation hierarchy.
- An AboutPage entity describes factual company identity and same-as profiles.
- `llms.txt` provides a concise, non-exclusive map to canonical public pages;
  it does not override normal crawling rules or claim guaranteed AI citation.
- Copy uses explicit nouns, short answer blocks, and consistent terminology so
  passages remain understandable outside their original page.

Structured data must be generated from the same typed content used for visible
HTML to prevent drift. JSON-LD may not contain reviews, ratings, prices,
addresses, founding dates, employee counts, or customer claims that are not
publicly verified.

## Content Model and Components

`src/content/site.ts` remains the canonical identity source and gains typed
capability-detail and FAQ records. A reusable `ServicePage.astro` component
renders capability pages from those records. `BaseLayout.astro` accepts a list
of JSON-LD objects and controls indexing directives. Focused components render
breadcrumbs, direct-answer introductions, related capabilities, and FAQ rows.

This keeps visible content, metadata, internal links, JSON-LD, sitemap routes,
and `llms.txt` aligned without copying facts across unrelated files.

## Error Handling and Trust Boundaries

All pages are static. Type errors or malformed content fail the build. JSON-LD
is serialized during rendering and tested by parsing it as JSON. External
profile links are limited to the existing LinkedIn and GitHub URLs. Email is
the only conversion endpoint. Unknown routes receive the custom 404 page.

The phrase “US-based” will not be used unless it accurately describes the
operating team. Geographic targeting will instead say that Alomat works with
US and global product teams, and `areaServed` will use the supported market
scope rather than a fabricated local address.

## Measurement and Search Console

The release will submit `https://alomattech.com/sitemap-index.xml` in Google
Search Console and request indexing for the home page and the new canonical
pages. Search Console is the initial measurement source. No third-party
analytics script is added in this phase, preserving the current privacy
statement.

The permanent project report records deployment commit, generated routes,
schema types, Search Console actions, verification commands, remaining
observation windows, and future content opportunities. Search performance
cannot be declared immediately; impressions, queries, indexing, and citations
must be observed over time.

## Testing and Release Gates

- Content tests verify unique titles/descriptions, canonical slugs, prohibited
  claims, FAQ consistency, and service-page completeness.
- Browser tests verify every public route, one H1 per page, canonical links,
  crawlability, internal links, JSON-LD parsing, sitemap entries, robots,
  `llms.txt`, and the custom 404 response.
- `npm test`, `npm run check`, `npm run build`, and `npm run test:e2e` must pass.
- The generated HTML and public files are inspected after build.
- The deployed site is checked over HTTPS before Search Console submission.

## Out of Scope

This release does not create a blog, CMS, localized language versions,
location landing pages, fake case studies, backlink campaigns, paid search,
review markup, analytics tracking, or guaranteed ranking/citation claims.
Those require evidence, ongoing editorial work, or separate privacy decisions.
