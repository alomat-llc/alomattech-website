# Alomat LLC Landing Page Design

## Purpose

Build a credible, polished public website for Alomat LLC that explains the
company's real capabilities, supports startup-program and banking diligence,
and gives prospective collaborators a clear way to start a conversation.

The website must present Alomat as an intelligent systems studio rather than
as a generic software agency or an unlaunched SaaS product. It must not claim
unverified customers, revenue, funding, incorporation approval, performance
metrics, or partnerships.

## Positioning

**Category:** Intelligent systems studio

**Primary promise:** Alomat turns language, context, and operational signals
into production-ready software systems.

**Brand line:** Building signals into systems.

**Capability pillars:**

1. Agent systems
2. Language technologies
3. Full-stack AI products

The supporting story draws only from genuine team experience: conversational
and speech workflows at Aisha, translation and full-stack product work at
WordExpert, and agent-oriented product development at Alomat.

## Audience and Conversion

The primary audiences are startup-program reviewers, banking and infrastructure
partners, potential product collaborators, and prospective clients.

The single primary conversion is an email conversation at
`hello@alomattech.com`. The first release does not include a database-backed
contact form, calendar integration, newsletter signup, analytics tracker, or
CRM integration. This keeps the site reliable, privacy-conscious, and easy to
host while the company infrastructure is still being established.

## Visual Thesis

The site should feel like a technical editorial object: quiet, exact, and
confident. It uses the existing `.alomat` identity rather than inventing a new
brand system.

- Canvas: warm off-white
- Type and rules: near-black
- Signal accent: coral
- Type: one expressive grotesk for display and one restrained sans-serif for
  body copy, with robust system fallbacks
- Layout: edge-to-edge compositions with rigorous internal alignment
- UI treatment: cardless sections, thin rules, oversized typography, sparse
  copy, and generous negative space
- Imagery: the visual anchor is a bespoke signal-field composition built from
  lines, nodes, words, and motion; it must not resemble a generic dashboard,
  stock photograph, or decorative gradient

The existing SVG logo and banner provide the canonical proportions, wordmark,
and color cues. The logo is shown as a wordmark in navigation and as a large
typographic brand moment in the hero.

## Content Architecture

### 1. Global navigation

The header contains the `.alomat` wordmark, links to Capabilities, Approach,
and Studio, plus one `Start a conversation` email action. On mobile, the links
collapse into an accessible menu without hiding the email action permanently.

### 2. Hero — establish the brand

The first viewport behaves like a poster. It contains:

- `.alomat` as the loudest element
- `Building signals into systems.` as the headline
- one short explanation: Alomat builds agent systems, language technologies,
  and full-stack AI products
- a `Start a conversation` mail link
- a dominant signal-field visual that responds subtly to pointer movement and
  degrades to a static composition for reduced-motion users

No customer-logo cloud, metric strip, floating product cards, or speculative
product screenshot appears in the hero.

### 3. Capabilities — explain what Alomat builds

Three full-width capability rows replace a card grid:

- **Agent systems:** orchestration, context, tool use, evaluation, and reliable
  execution loops
- **Language technologies:** speech, transcription, translation, retrieval,
  and multilingual interfaces
- **Full-stack AI products:** product design, application engineering, cloud
  delivery, and operational tooling

Each row has a concise outcome statement and a compact list of technical
primitives. Hover and focus reveal a restrained coral signal line.

### 4. Approach — show engineering depth

A scroll-led sequence explains Alomat's working model:

1. Understand the signal
2. Design the system
3. Build the harness
4. Observe and improve

The section uses one continuous line that advances with scroll. Copy explains
that models are components inside tested, observable systems—not the whole
product.

### 5. Studio — establish credible experience

The studio section provides a concise narrative rather than client logos or
case-study claims:

- conversational and speech-data work informed the team's voice-system
  experience
- translation-product work informed multilingual model integration and
  full-stack delivery
- current agent work focuses on context, orchestration, harnesses, and usable
  product surfaces

The section names Aisha and WordExpert only as team experience and never
implies that these organizations are Alomat customers or partners.

### 6. Final call to action

The page ends with one direct invitation and two addresses:

- `hello@alomattech.com` for general conversations
- `habib@alomattech.com` for founder contact

The footer includes links to Privacy and Terms, the LinkedIn company page, the
GitHub repository, and a factual copyright line. It does not claim a New Mexico
registration date or approved formation until official state documents arrive.

### 7. Legal pages

Privacy and Terms are plain-language static pages. Privacy states that the
initial site does not set advertising cookies, run behavioral analytics, or
collect data through forms. Terms describe the content as general company
information, protect the site's intellectual property, disclaim warranties,
and provide the company email for questions. Neither page invents a registered
office address or legal status that has not yet been confirmed.

## Interaction Thesis

Motion should make the site feel alive without becoming ornamental.

1. **Hero entrance:** wordmark, headline, and signal field enter in a short,
   staggered sequence.
2. **Signal progression:** a single coral line advances through the approach
   sequence as the user scrolls.
3. **Capability response:** hover and keyboard focus shift the row's line,
   index, and supporting primitives with a fast shared transition.

All motion respects `prefers-reduced-motion`. Content and navigation remain
fully usable when JavaScript is unavailable.

## Technical Architecture

The project uses Astro with strict TypeScript and static output.

- `src/pages/index.astro` composes the landing page
- `src/pages/privacy.astro` and `src/pages/terms.astro` provide legal pages
- `src/layouts/BaseLayout.astro` owns metadata, fonts, global navigation, and
  footer composition
- focused components own Hero, Capabilities, Approach, Studio, and Final CTA
- `src/content/site.ts` is the canonical source for navigation, capabilities,
  experience statements, and contact links
- global CSS tokens define color, type, spacing, and motion; component styles
  stay colocated when they are unique to that component
- small client scripts use browser APIs only for progressive enhancement

The static build can deploy to Cloudflare Pages immediately and can later move
to AWS S3/CloudFront without rewriting the application.

## Data Flow and Failure Handling

There is no runtime API in the first release. All public content is imported
from typed local data at build time. A failed build prevents deployment rather
than producing a partially rendered site.

Email calls to action use explicit `mailto:` links. Legal and navigation links
are first-party routes. External links use safe target and relationship
attributes. If motion or pointer APIs are unavailable, the static visual state
remains complete.

## SEO and Trust

Every page includes a unique title, description, canonical URL, Open Graph
metadata, Twitter card metadata, and a crawlable HTML content hierarchy. The
home page includes Organization structured data limited to factual information:
name, URL, logo, email, and LinkedIn/GitHub profiles.

The project also provides `robots.txt`, `sitemap-index.xml` through Astro's
sitemap integration, a favicon derived from the `.a` mark, and an Open Graph
image based on the established banner system.

## Accessibility and Responsive Behavior

- Semantic landmarks and ordered heading levels
- Keyboard-operable navigation and interactive rows
- Visible focus states in the coral accent
- WCAG AA text contrast
- Minimum 44px touch targets for primary controls
- No information conveyed by color alone
- Responsive layouts verified at 375px, 768px, 1440px, and 1920px widths
- Reduced-motion behavior verified explicitly

## Testing and Quality Gates

Development follows test-first cycles for behavior and content contracts.

- Unit/content tests verify canonical navigation, contact addresses, capability
  pillars, legal metadata, and the absence of prohibited claims
- Component tests verify accessible names, landmarks, and primary calls to
  action
- Playwright tests verify primary navigation, mail links, mobile menu behavior,
  legal routes, and reduced-motion rendering
- `astro check` validates templates and TypeScript
- the production build must complete without warnings or broken internal links
- Lighthouse checks target at least 95 for Performance, Accessibility, Best
  Practices, and SEO on the landing page under a production build
- visual inspection covers desktop and mobile screenshots before release

## Release Scope

Version one includes the home page, Privacy, Terms, responsive navigation,
motion with reduced-motion support, SEO assets, automated tests, and deployment
configuration. It excludes a CMS, blog, authenticated product, contact-form
backend, analytics, localization, customer portal, and speculative case studies.

