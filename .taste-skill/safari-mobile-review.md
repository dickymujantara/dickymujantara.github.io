# Safari and mobile navigation revision

The user reported inconsistent styles and icons in iOS Safari and requested hidden mobile navigation. The primary agent inspected the source, WebKit/Chromium captures, actual iOS Simulator Safari before/after captures, and recorded QA results below.

Reading this as: the approved illustrated ocean portfolio, energy 3 / rhythm 3 / motion 3. This revision improves rendering consistency while retaining the marine art direction and Anime.js behavior.

## Changes and reasons

- The entire navigation header is hidden at widths of 767 pixels and below. Desktop navigation remains visible from 768 pixels. The unused mobile menu button and handlers were removed. Pinned sections measure a zero header height on mobile, preventing a reserved gap.
- Twelve existing arrow/motion icons now use inline SVG paths. Actual iOS 18.5 Safari showed the old diagonal arrow as a blue emoji tile; the same view now shows the intended line arrow. Decorative SVGs have `aria-hidden` and are not focusable; existing link/control names remain intact.
- Custom buttons reset native appearance and border radius before component-specific shapes are applied. Explicit text size adjustment keeps iOS automatic text scaling predictable without disabling viewport zoom. Apple's [Safari text-sizing documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html) describes this behavior and the percentage control.
- The mosaic uses a small canvas buffer, scaled without smoothing to the current device pixel ratio, producing roughly 8 CSS pixel cells. This replaces the referenced SVG filter while retaining the original crop and all existing parent animation transforms. Canvas failure retains the original image/grid treatment. The new helper runs through an ordinary deferred script and works with direct-file previews.
- Referenced SVG filters with animated descendants have a [documented WebKit issue](https://bugs.webkit.org/show_bug.cgi?id=219729). This was a compatibility risk identified in the source, not a claimed reproduction of a missing-mosaic defect: the pre-change mosaic rendered in the newer WebKit engine used for comparison.
- Pinned scene declarations include `vh` fallbacks before `svh`; section clipping has a hidden-overflow fallback without changing sticky ancestors. WebKit documents that [small viewport units shipped in Safari 15.4](https://webkit.org/blog/12669/new-webkit-features-in-safari-15-5/). Older Safari versions are not certified by these newer-engine tests.
- Chapter travel derives from the computed CSS viewport measurement instead of toolbar-dependent `innerHeight`, keeping chapter dimensions stable when only the visible toolbar area changes. Actual viewport resizing still updates the layout.
- The light overlay extends beyond the clipped hero bounds. This removes its visible vertical side edge while preserving the light origin and automatic motion.
- A literal space before the Experience line break prevents joined words when mobile styling hides that break. The actual iOS final capture verifies the correction.

## Verification

- All **45 automated checks pass** in real desktop WebKit 26.0 with iPhone touch/mobile emulation and Chromium. Widths: 320, 390, 600, 767, 768, 1024 and 1440 pixels. Evidence: `qa/safari-mobile.json` and `qa/safari-mobile-cross-engine-review.md`.
- Mobile headers are absent, sticky insets are zero, desktop navigation remains visible, controls use neutral styling, SVG icons render, the canvas mosaic contains painted pixels, and exploration links remain available without overflow.
- Graph and experience selection, hero CTA alignment, turtle/complete-frame motion, pause/resume and reduced-motion states pass in both engines. Simulated toolbar-only height changes preserve chapter geometry; actual viewport resizing adapts.
- Canvas-unavailable, pixel-image-failure and direct-file cases retain usable content and working motion controls in both engines.
- All **four targeted final checks pass** at 320/390 pixels in both engines after the light and spacing adjustments. The light's side bounds lie beyond the scene, the header remains zero-height, and rendered Experience text includes its space. Evidence: `qa/safari-mobile-final-addendum.json`.
- **Eight visual results pass in Apple's actual Mobile Safari 18.5**, running in the iPhone 16 Pro Simulator with iOS 18.5 (22F77). The primary agent inspected the before hero, final hero, Explorations/mosaic and final Experience captures. Evidence: `qa/safari-mobile-ios185-review.md` and `previews/safari-mobile-ios185-*.png`.
- No uncaught JavaScript exceptions occurred in the automated suite. Both application scripts pass `node --check`, and `git diff --check` passes.

The native iOS probe used section anchors and screenshot inspection. It does not claim a full native touch/swipe, VoiceOver or link-activation suite. Physical iPhone testing was not performed. Native macOS Safari automation remained disabled; no system automation preference was changed. The temporary browser tools stayed outside the repository. Owned servers and the Simulator were stopped. No deployment was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: visible copy adds no em dash; the only wording change is a necessary space.
- R-03 PASS: both engines pass seven responsive widths; actual iOS section captures remain readable and fit the screen.
- R-17 PASS: no portfolio metrics were added; test counts and dimensions above are recorded implementation evidence.
- R-18 PASS: no people or testimonials were added.
- R-23 PASS: navigation hiding and icon consistency follow the explicit user request; no new brand assets were created.
- R-24 PASS: existing destinations remain intact; desktop navigation, hero CTA and exploration link behavior were checked.
- R-25 PASS within reviewed scope: the approved ivory/slate palette and text scrims remain in place; new SVG paths inherit those colors. Final native and emulated captures were inspected. No new numerical contrast audit is claimed.
- R-26 PASS: graph, experience, motion and CTA behavior pass; hidden mobile menu controls and their handlers were removed.
- R-27 PASS: canvas failure retains a usable fallback; existing animation-dependency fallback is retained.
- R-28 PASS: no FAQ was added.
- R-32 PASS: native links/buttons and existing focus styling remain intact; SVG/canvas decorations are hidden from assistive technology. No viewport zoom restriction was added.
- R-33 PASS: application source was edited directly with patches; runtime canvas drawing implements the requested visual treatment rather than rewriting source.
- R-34 N/A: the approved fixed ocean theme has no theme toggle.
- R-35 PASS: source ran in two automated engines and actual iOS Simulator Safari; interaction records, measurements and screenshots are retained above.
- R-36 PASS: no security, compliance or customer claims were added.
- R-37 PASS: the approved composition remains the direction; the user explicitly requested this compatibility work.
- R-38 PASS: no portfolio facts or realistic factual content were invented; simulation and test limitations are stated.

### Purpose gate

- R-01 PASS: existing marine gradients retain their depth/contrast purpose; expanded light bounds remove a rendering seam.
- R-04 PASS: SVG icons replace existing functional arrows and play/pause marks, with recorded iOS rendering evidence.
- R-06 PASS: approved heading/body typography remains unchanged.
- R-07 PASS: the mosaic and halftone remain the user's requested image treatments; no page-wide pattern was added.
- R-08 PASS: existing destination arrows retain their purpose and placement.
- R-09 PASS: no capsules or status indicators were added.
- R-10 PASS: no glass effect was added.
- R-12 PASS: no shadow system was added.
- R-13 PASS: no new glow system was added.
- R-14 PASS: substantive section composition remains intact.
- R-19 PASS: explicit user-requested marine motion retains bounded layers, pause and reduced-motion handling, verified in both automated engines.
- R-22 PASS: approved marine illustrations remain intact; no unrelated illustration was added.

### Liveliness

- PASS: declared energy, rhythm and motion remain consistent with the approved portfolio.
- PASS: the hero headline/whale and supporting section focal points remain intact in the inspected captures.
- PASS: removing the mobile header and its reserved offset gives the content the requested space.
- PASS: icy blue remains the restrained accent within navy, slate and ivory.
- PASS: marine illustration, editorial typography and moving crop windows remain the identity motif.
- PASS: the design read follows the existing direction and explicit compatibility request.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: icon, canvas, viewport, control and clipping decisions have written purposes above.
- C-2 PASS: changed behavior and core controls were exercised, including failure states.
- C-3 / R-05 PASS: no filler sections or template content were introduced.
- C-4 PASS within tested scope: responsive states, real iOS rendering, automated interactions, reduced motion and fallbacks were checked; physical-device and native interaction limitations are explicit.
- C-5 PASS: no facts or testimonials were invented.
- R-11 PASS: component-specific shapes still override the neutral button reset; graph nodes and mobile motion control remain circular.
- R-15 PASS: specific existing CTA labels remain intact.
- R-16 PASS: no promotional copy or buzzwords were added.
- R-20 PASS: platform consistency improves while the approved visual identity remains intact.
- R-21 PASS: the fixed dark ocean theme follows the user's direction.
- R-29 PASS: the approved palette is unchanged.
- R-30 PASS: changes address this portfolio's rendering and navigation rather than adopting another site's design.
