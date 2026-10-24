# Beneath the surface integration

The user requested that the turtle image blend into its reef background. This revision changes only the Explorations artwork styling in `css/style.css`. Original artwork, section geometry, copy, links and Anime.js timelines remain intact.

Reading this as: the approved editorial marine portfolio, energy 3 / rhythm 3 / motion 3. The turtle remains the illustrated focal point, with lighting closer to the surrounding reef.

## Decisions

- The turtle wrapper uses .9 opacity. Its image uses `brightness(.78) saturate(.72) contrast(.88)` to soften luminous scale outlines, throat and flipper highlights while retaining the eye and shell detail.
- Both detail crops receive `brightness(.82) saturate(.72) contrast(.9)` on their clipping containers. This matches the turtle's tone while preserving the separate halftone and SVG pixelation filters on the inner images.
- Frame borders and handles use muted blue-gray colors that remain legible within the illustrated scene.
- Existing size and placement preserve the approved composition. Styling introduces no new transform, so scroll wrappers, automatic animal movement, complete frames and inner crops retain separate animation ownership.
- The same treatment applies at all responsive sizes. No new image assets, downloads, gradients, shadows or blur effects were introduced.

## Verification

All 18 focused checks pass in `qa/turtle-blend.json`.

- At 1440 and 390 pixels, the turtle, both complete frames and both inner crops move automatically at fixed scroll. The nine recorded scene layers freeze with Pause; Play resumes motion.
- Pinned scrolling still changes the turtle and frame outer transforms independently.
- At 1440, 1024, 768, 390 and 320 pixels, mid-scroll and reduced-motion still layouts fit the viewport. Frame handles remain attached, both exploration links remain unobstructed, and reduced-motion scenes remain still.
- Computed styles confirm the new tone values, the retained halftone filter and the intact `url(#pixelate)` filter.
- No uncaught JavaScript exceptions occurred. `git diff --check` passes.
- `previews/turtle-blend.webm` records 72 actual browser frames at 15 fps, 577,011 bytes.

The primary agent inspected the before/after desktop and mobile crops, plus the final 768-pixel mid-scroll and 320-pixel still crops. The muted turtle now fits the reef while its anatomy and crop treatments remain clear. Browser captures use the `previews/turtle-blend-*` prefix. The scoped supporting report is `qa/turtle-blend-review.md`.

Validation is local Chromium with emulated viewport sizes. Text, text colors, backgrounds and geometry did not change, so no new contrast measurement or broader page regression claim is made. The original implementation and scene/frame reviews retain evidence for unchanged features. The owned preview server was stopped. Nothing was deployed; the existing backup was untouched.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: no visible copy or em dash was added.
- R-03 PASS: all five tested widths fit without page overflow in both mid-scroll and reduced-motion states.
- R-17 PASS: no portfolio statistics were added; numbers above describe measured implementation evidence.
- R-18 PASS: no people or testimonials were added.
- R-23 PASS: existing authorized artwork was refined in direct response to the user's blending request; no assets were created.
- R-24 PASS: existing navigation and destinations are retained; both exploration links pass hit-target checks.
- R-25 PASS within reviewed scope: text colors and background/scrim styling are unchanged; final views remain readable. No new numerical contrast result is claimed.
- R-26 PASS: pause/resume and scroll behavior were exercised; no new controls were introduced.
- R-27 N/A: no form or data view was added; the existing dependency fallback remains intact.
- R-28 PASS: no FAQ was added.
- R-32 PASS: native links and focus rules remain unchanged; artwork retains its hidden decorative semantics and pointer behavior.
- R-33 PASS: CSS was edited directly with a patch, without source rewriting scripts.
- R-34 N/A: the approved fixed dark ocean theme has no theme switch.
- R-35 PASS: the real section was run, visually inspected and recorded; browser measurements are retained above.
- R-36 PASS: no security, compliance or customer claims were added.
- R-37 PASS: the approved composition and explicit blending request supply the design direction.
- R-38 PASS: no factual content or new realistic assets were fabricated; existing illustration provenance remains intact.

### Purpose gate

- R-01 PASS: the scoped tone adjustment matches the reef's subdued lighting; existing gradients retain their depth/contrast purpose.
- R-04 PASS: no icons were added.
- R-06 PASS: approved typography is unchanged.
- R-07 PASS: existing dots and blocks remain the requested image treatments; no page-wide pattern was added.
- R-08 PASS: no arrows were added.
- R-09 PASS: no capsules or status indicators were added.
- R-10 PASS: no glass effect was introduced.
- R-12 PASS: no shadow system was introduced.
- R-13 PASS: the new styling softens highlights without adding glow.
- R-14 PASS: existing content-led section composition remains intact.
- R-19 PASS: explicit user-requested marine motion retains shared pause, reduced-motion and scene handling, verified in the browser.
- R-22 PASS: the turtle remains the user's requested marine illustration.

### Liveliness

- PASS: energy, rhythm and motion are declared and retained.
- PASS: the turtle remains the local illustrated focal point in the inspected captures.
- PASS: existing spacing and section composition are retained at responsive sizes.
- PASS: navy, slate, icy blue and ivory remain the palette, with restrained blue interface emphasis.
- PASS: editorial typography, marine illustration and moving crop windows remain the identity motif.
- PASS: the design read follows the approved direction and current request.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: tone, filter placement and frame color choices have written reasons above.
- C-2 PASS: motion and native links remain functional in the tested states.
- C-3 / R-05 PASS: no content or filler sections were added.
- C-4 PASS within tested scope: responsive states, loaded artwork, pause/resume, reduced motion and scroll motion passed.
- C-5 PASS: no facts, statistics or testimonials were invented.
- R-11 PASS: component shapes and radius conventions are unchanged.
- R-15 PASS: specific existing link labels remain intact.
- R-16 PASS: no promotional copy or buzzwords were added.
- R-20 PASS: the approved marine identity is retained with more coherent scene lighting.
- R-21 PASS: the fixed ocean theme follows the user's explicit direction.
- R-29 PASS: the existing cool palette is retained.
- R-30 PASS: changes refine the user's approved composition without introducing another product's design.
