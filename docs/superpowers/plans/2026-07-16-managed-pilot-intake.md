# Managed Pilot Intake Implementation Plan

> Execute with test-driven development. Keep the existing static Pages project intact and deploy the form endpoint as a narrowly routed Worker.

## Task 1: Define and validate the intake contract

- Add failing tests for valid payloads, required fields, enum boundaries, list bounds, URLs, emails, honeypot, and elapsed time.
- Implement a dependency-free validator and normalized application type.
- Run focused and full unit tests.

## Task 2: Build the pilot page

- Add failing Playwright tests for canonical metadata, required controls, no price, no `mailto:`, human-control copy, and responsive layout.
- Implement `/pilot` and the progressively enhanced form.
- Update all managed-pilot links to `/pilot`.
- Run focused browser tests.

## Task 3: Build the restricted Worker endpoint

- Add failing tests for origin, method, content type, body size, Turnstile result, email delivery, and error responses.
- Implement `/api/pilot` Worker handler with dependency injection around Turnstile and email delivery.
- Add `wrangler.pilot.jsonc`, a narrow custom route, generated binding types, and structured observability.
- Run type generation, unit tests, and `wrangler deploy --dry-run`.

## Task 4: Configure Cloudflare services

- Verify `hello@alomattech.com` as the allowed destination.
- Onboard `notify.alomattech.com` for Email Sending without replacing Zoho MX records.
- Create a Turnstile widget for `alomattech.com` and attach its secret to the Worker.
- Deploy the Worker and static site.

## Task 5: Prove the production path

- Submit one controlled test application through the live form.
- Confirm the success UI, Worker response, email delivery, sender authentication, and reply-to behavior.
- Run full regression and live URL checks.

