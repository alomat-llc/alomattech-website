# Anonymous Publisher Workflow Case Study Design

## Purpose

Create a public case study at `/case-study/publisher-workflow` that proves
Alomat is built from a real publishing operation without revealing the
customer, private infrastructure, protected data, or unverifiable performance
claims. The page must help a prospective publisher, technical reviewer, or
startup-program reviewer understand the operational problem, the implemented
workflow, the control boundary, and the evidence behind the product.

This is an evidence page, not a generic product landing page. It extends the
canonical `/platform` narrative with one coherent anonymous deployment story.

## Approved Narrative Direction

The page presents one anonymous digital publisher and one end-to-end operating
story:

> A fragmented source and editorial process was turned into a controlled,
> observable workflow that prepares publish-ready packages while preserving
> human editorial authority.

The public story combines capabilities already proven across Alomat's existing
systems—source monitoring, URL intake, extraction, related-story grouping,
editorial memory, specialist-agent stages, content packaging, approval, and
delivery state—without naming the internal projects or portraying them as
separate products.

The page must not disclose the customer's name, geography, language, channels,
audience size, private corpus, infrastructure addresses, credentials, or any
detail that makes the deployment reasonably identifiable.

## Audience and Conversion Goal

Primary readers are:

- digital publishers and editorial operators evaluating a managed pilot;
- technical decision-makers validating architecture and control boundaries;
- startup and cloud-program reviewers looking for evidence of a real software
  product and production use.

The primary conversion action is `Request a managed pilot`. It links to
`/pilot` when that route is available. During staged development, the case
study and pilot route must ship together or the case-study CTA must use the
existing verified contact path; a broken future route is not acceptable.

The secondary action is `Explore the platform`, linking to `/platform`.

## Information Architecture

### 1. Hero and evidence boundary

The hero uses the label `Anonymous production deployment` and the headline:

> From fragmented sources to a controlled publishing workflow.

The opening paragraph explains that an active digital publisher needed a
repeatable way to turn approved sources into reviewed content packages. A
compact evidence note states that the customer's identity is withheld and that
only observable workflow facts are presented.

### 2. Operational problem

Describe the pre-system constraints without inventing quantitative pain:

- relevant signals arrive across multiple approved sources;
- repeated or related coverage must be grouped before drafting;
- source context and editorial history must remain available;
- different outputs require different preparation stages;
- publication decisions must stay with a human editor;
- failures, retries, and review state must remain visible.

The page does not claim a measured reduction in time, headcount, cost, or error
rate unless a later evidence review provides auditable data.

### 3. Implemented workflow

Show a six-stage horizontal or responsive stacked trace:

1. **Monitor** — watch approved sources and accept selected URLs.
2. **Verify** — extract primary material, retain references, group related
   coverage, and detect duplicate candidates.
3. **Remember** — retrieve archive-backed context, style guidance, topic
   history, and publisher-specific constraints.
4. **Produce** — route work through specialist research, writing, editing,
   visual, and verification stages as appropriate.
5. **Review** — expose the draft, sources, and workflow state to a human who can
   approve, edit, reject, or stop the process.
6. **Package** — prepare the approved text, summary, and visual direction for
   the selected publishing surface.

The visual treatment reuses Alomat's coral trace language. It must remain
understandable without animation or JavaScript.

### 4. Simplified system architecture

The architecture visual has four layers and one explicit control boundary:

1. **Source layer** — approved feeds, sites, channels, and submitted URLs.
2. **Intelligence layer** — extraction, source trace, grouping, relevance,
   duplicate signals, and editorial-memory retrieval.
3. **Agent workflow** — research, drafting, editing, visual direction, and
   verification stages coordinated by deterministic routing and state.
4. **Delivery layer** — review queue, publish-ready package, delivery state,
   and recorded feedback.

The human editor sits between agent output and delivery. The diagram must not
imply autonomous publication. Arrows into delivery pass through `Human review
and approval`.

The initial architecture is rendered with semantic HTML and CSS rather than a
raster diagram so it remains accessible, responsive, searchable, and visually
consistent with the site.

### 5. Evidence gallery

The final page contains three real captures from an actual system or a real
system running sanitized test input:

1. source intake or monitoring state;
2. human review, approval, edit, or rejection state;
3. a publish-ready text and visual package.

Each capture receives a factual caption explaining what is observable. Before
an asset enters the repository, it must be reviewed for:

- customer or project names;
- usernames, channel names, avatars, and profile photos;
- language, geography, or content that can identify the deployment;
- URLs, IP addresses, tokens, message IDs, account IDs, and infrastructure
  details;
- private source text, unpublished drafts, and copyrighted material beyond the
  minimum needed to demonstrate the interface;
- browser chrome, notifications, unrelated tabs, and personal information.

Redaction must be irreversible in the exported file. Cropping or flattening is
required; CSS overlays on an unredacted image are prohibited. Original private
captures remain outside the public repository.

If the three reviewed captures are not available at implementation time, the
page may be developed and tested with explicit `Evidence capture pending`
placeholders, but it must not be deployed publicly as the completed case study
until genuine sanitized captures replace them.

### 6. Verified outcomes

The page uses a section titled `What this deployment proves`, not a metrics
dashboard. Approved claims are limited to facts supported by the inspected
systems:

- multiple approved-source inputs can feed one workflow;
- extracted material and source references are carried into processing;
- related-story grouping and duplicate signals exist before drafting;
- archive-backed context and editorial guidance can inform agent stages;
- specialist stages can prepare text, summaries, and visual direction;
- a human approval/edit/reject boundary exists before delivery;
- workflow state, retries, feedback, or evaluation paths are represented in
  the implementation.

The page may state `In production with an active digital publisher` because
that boundary is already approved in the platform design. It must not publish
customer counts, content volume, time saved, cost savings, audience size,
accuracy, uptime, revenue, or guaranteed outcomes without a separate auditable
evidence record.

### 7. Control boundary

Use a visually distinct section with the statement:

> The agents prepare. Editors decide.

Explain approved-source boundaries, visible source references, review state,
edit and reject paths, escalation, and explicit hard stops. Do not describe the
system as an autonomous newsroom.

### 8. Final conversion

Close with a managed-pilot invitation focused on one real workflow rather than
an open-ended sales promise. The primary CTA points to `/pilot`; the secondary
CTA points to `/platform`.

## Content and Claim Source

Public copy must be derived from observable code, configuration, tests, or
sanitized captures from the existing systems. Internal design expectations are
not production metrics. Old estimates such as expected draft volume must not be
presented as achieved results.

The implementation should keep claim-bearing case-study content in a typed
content module so claims can be reviewed independently from layout. Each
evidence item records a short public statement and an internal source note in
code comments or the project evidence checklist; private repository paths must
not render in the page.

## Metadata and Discoverability

The route uses a unique title and description centered on `agentic publishing
workflow`, `human-in-the-loop publishing`, and `editorial operations`, without
keyword repetition.

Structured data uses `Article` with Alomat LLC as author and publisher. The
article does not claim a named customer, rating, award, or quantified result.
Breadcrumb structured data represents Home → Case Study → Publisher Workflow.

The page must appear in the generated sitemap, be linked from the platform's
production-evidence section and at least one homepage deployment surface, and
be discoverable in global navigation only if adding a dedicated Case Studies
item does not overload the current navigation.

Social metadata uses a dedicated case-study image only after approved evidence
assets exist; until then, the current factual Alomat social image is used.

## Component Boundaries

The implementation may introduce:

- `src/pages/case-study/publisher-workflow.astro` for the route;
- a typed case-study content export in `src/content/site.ts` or a dedicated
  `src/content/case-studies.ts` when that improves claim review;
- small presentational components for the workflow trace, architecture, and
  evidence gallery when they reduce duplication or improve testing;
- sanitized assets under `public/case-study/publisher-workflow/`;
- links from the homepage and platform page;
- structured data passed through the existing `BaseLayout` contract.

The page remains statically rendered. It does not introduce a database,
authentication, client-side dashboard, analytics vendor, or third-party widget.

## Responsive and Accessibility Requirements

- The workflow and architecture retain a logical reading order at all widths.
- Meaning is not encoded by coral color alone; labels and sequence numbers stay
  visible.
- Architecture groups use headings or list semantics rather than decorative
  boxes alone.
- Evidence images have concise alternative text; captions provide the detailed
  explanation.
- Images declare intrinsic dimensions and use efficient public formats.
- All links have explicit labels, visible keyboard focus, and adequate target
  size.
- The page must not cause horizontal scrolling at the supported mobile width.
- Reduced-motion users receive a static trace if motion is later introduced.

## Failure and Privacy Behavior

- A missing evidence asset must fail the build or test rather than silently
  render a broken image.
- No customer-specific fallback text is embedded in source or alternative text.
- If an evidence claim cannot be mapped to observable support, it is removed or
  rewritten as a product capability rather than a deployment result.
- If redaction cannot make a capture safely anonymous, that capture is not
  published.
- The case study never sends data and does not depend on the future pilot form
  to render.

## Verification

Before public deployment:

1. Add route/content tests covering the hero, the complete six-stage workflow,
   architecture layers, control-boundary language, evidence captions, and both
   CTAs.
2. Add claim-boundary tests that reject prohibited public identifiers and
   unsupported metric patterns in case-study content.
3. Verify every committed evidence file opens, contains no recoverable private
   layer, and matches its caption.
4. Run the complete unit suite, `astro check`, production build, and Playwright
   suite.
5. Inspect desktop and mobile renders for reading order, overflow, image
   legibility, focus states, and broken links.
6. Confirm the generated sitemap contains
   `/case-study/publisher-workflow` and structured data parses as an `Article`
   and `BreadcrumbList`.
7. Deploy to the existing Cloudflare Pages project and verify the canonical
   route, platform link, homepage link, metadata, and assets on
   `https://alomattech.com`.

## Follow-on Subprojects

The following objective items are intentionally designed and implemented after
this page contract is accepted:

1. the `/pilot` intake form and its delivery/security model;
2. the 60–90 second anonymous demo and its capture/editing workflow;
3. the public `agentic-publishing-reference` repository;
4. Search Console submission and URL inspection;
5. the three-post LinkedIn release sequence.

They remain part of the overall goal. Separating their design prevents the case
study from implicitly choosing form infrastructure, video tooling, public-repo
scope, or publishing permissions.
