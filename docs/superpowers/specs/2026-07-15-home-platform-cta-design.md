# Homepage Platform CTA Design

## Goal

Make the canonical `/platform` product page immediately discoverable from the
homepage hero without weakening the primary managed-pilot conversion path.

## Current behavior and root cause

The homepage already links to `/platform` below the capability modules through
the text link “Explore the complete platform.” The hero only exposes “Request a
managed pilot,” so visitors do not see a clear product-page action above the
fold. The missing behavior is therefore prominence, not routing.

## Approved design

Add a secondary, outlined `Explore the platform` link beside the existing
`Request a managed pilot` action in `Hero.astro`.

- The new action links directly to `/platform`.
- The pilot action remains the primary conversion action.
- The platform action uses button-like visual treatment with a visible border,
  focus state, and hover state consistent with the existing editorial design.
- On narrow viewports, the actions may wrap or stack without horizontal
  overflow or reducing the link target size.
- Existing product-section and footer links remain unchanged.

## Component boundary

The change stays inside the homepage `Hero` component. It does not change site
content contracts, global navigation, the platform page, analytics, forms, or
deployment configuration.

## Accessibility and failure behavior

The action remains a semantic anchor because it performs navigation. Its text
is explicit without relying on decorative icons. Keyboard focus must remain
visible, and the link must work when JavaScript is disabled. If the route is
unavailable, the existing static-hosting 404 behavior applies; no client-side
fallback is added.

## Verification

Add a homepage regression test that requires an `Explore the platform` link in
the hero with the `/platform` destination. Verify the test fails before the
implementation, then passes after it. Run the complete unit, Astro check,
production build, and end-to-end suites. Finally, deploy the verified static
output to the existing Cloudflare Pages project and confirm the action on the
canonical production domain.
