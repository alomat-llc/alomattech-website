# Managed Pilot Intake Design

## Outcome

Replace every pilot `mailto:` link with a real `/pilot` application experience. A qualified editorial team can describe its workflow, submit without leaving the site, and produce one transactional notification to `hello@alomattech.com`. No public price is shown.

## User journey

1. A visitor opens `/pilot` from the homepage, platform page, case study, or primary navigation.
2. The page explains that the pilot starts with one real publishing workflow and keeps human approval explicit.
3. The visitor provides publisher/company type, expected volume, source types, delivery channels, human-review model, and contact details.
4. Cloudflare Turnstile proves the request is human. A hidden honeypot and bounded request parser reject obvious automation and oversized payloads.
5. A dedicated Worker validates the request and uses Cloudflare Email Sending to deliver a transactional application notice to the fixed, verified destination `hello@alomattech.com`.
6. The page shows an inline success state and preserves a useful error state without exposing infrastructure details.

## Architecture

- Static Astro page: `/pilot`
- Client enhancement: progressive form submission to `/api/pilot`
- Edge endpoint: dedicated Cloudflare Worker routed only to `alomattech.com/api/pilot`
- Abuse control: strict origin, JSON/content-size bounds, honeypot, elapsed-time check, Turnstile server verification
- Delivery: restricted `send_email` binding; sender `pilot@notify.alomattech.com`; fixed destination `hello@alomattech.com`; applicant address used only as `replyTo`
- Observability: structured logs containing request ID and outcome, never the application body

Using a dedicated Worker avoids changing the existing static Pages deployment and keeps the dynamic surface limited to a single endpoint. Cloudflare Email Sending can deliver to a verified destination on the free plan; the sending subdomain is isolated from Zoho's existing inbound MX records.

## Data contract

Required:

- `companyName`
- `publisherType`
- `monthlyVolume`
- at least one `sourceType`
- at least one `deliveryChannel`
- `humanReview`
- `contactName`
- `contactEmail`
- `workflowSummary`
- `turnstileToken`
- `startedAt`

Optional:

- `website`
- `otherContext`

No form submission is stored in a database. The email is the system of record for this first pilot intake version.

## Public claims boundary

- Do not state acceptance rates, response times, savings, accuracy, revenue, or guaranteed outcomes.
- Do not display pricing.
- Describe the pilot as a fit conversation around one real workflow, not as automatic admission.

## Verification

- Unit tests for validation, abuse checks, email rendering, and safe failures
- Browser tests for semantic fields, accessibility, mobile layout, progressive submission states, and removal of `mailto:` pilot links
- Worker dry run and generated binding types
- Production smoke test with a controlled application sent to the verified company inbox

