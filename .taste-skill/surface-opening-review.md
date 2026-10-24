# Surface opening implementation

This revision implements the user-approved [version 2 surface mockup](previews/surface-opening-mockup-v2.png). The page opens above the water with a floating sea otter, a distant seal on a rock and two seabirds, then descends into the existing whale hero after a scroll/swipe. The artwork uses the existing marine illustrations' painted navy, slate and icy ivory style. It is generated illustration, not photography.

Reading this as: the approved engineering/ocean portfolio, **energy 3 / rhythm 3 / motion 3**. The surface introduces the descent; the title and otter remain the focal points. The approved section order, full mobile header hiding, Graphalyze publication link, footer profile link and other scene choreography are retained.

## Implementation and asset decisions

- Production art is split into two responsive coast compositions and three true-alpha foreground files. The gull file is reused at two scales and independent phases. Five optimized WebPs total 517,590 bytes; only the active background composition is requested initially. [Asset provenance and exact prompts](../img/ocean/SURFACE.md), [16 passing decoded-alpha checks](qa/surface-assets.json) and [browser alpha composites](previews/surface-assets-alpha-composite.png) are saved.
- Anime.js moves the inner water/animal layers independently: slow water drift, gentle otter bobbing, very small seal breathing and two bird glides. Compact/touch screens reduce translation/rotation and extend durations. These are moving whole illustrations, with no articulated flipper or wing rig.
- The finite title/cue entrance settles. The opening then waits for input indefinitely; it has no Skip button or automatic advance. Downward wheel travel of 24 CSS pixels or an upward, vertically dominant 40-pixel swipe starts the reveal. Pinch zoom and control-wheel remain available.
- On entry, the title/cue fade, the outer scene slightly zooms and lifts, and a simple curved waterline rises over it. The parent then fades to expose the whale. Desktop duration is approximately 1.05 seconds; compact/touch duration is 0.9 seconds. A 1.8-second fail-safe starts only after entry, so it cannot advance the idle opening.
- The local 44-pixel Pause control stops the ambient layers at their current pose and has consistent inline SVG pause/play shapes. It does not change the saved portfolio preference. Tab reaches/cycles this sole dialog control; Enter/Space on it operates the button. Other entry keys are Enter, Space, Arrow Down, Page Down and End. Escape exposes the hero directly. Background content is inert while covered; closing restores inertness and moves focus into the hero if it was in the opening. Focus ownership is captured before hiding the dialog.
- Art hydration occurs only after eligibility. A ready background remains visible while a rotated viewport loads the alternate composition. Missing/slow assets leave a usable navy/title/cue state and never gate entry. Asset callbacks guard active/entering state. Finishing cancels all opening-owned Anime.js objects and removes input, media and asset listeners; it does not pause the shared Anime.js engine.
- Hidden-document waiting pauses the entrance/ambient layers. Returning continues to wait for input, preserving a local Pause choice. Backgrounding during the reveal closes it. Reduced motion, saved motion pause, deep links, restored navigation and missing dependencies bypass the opening. No JavaScript starts with the opening hidden, leaving ordinary content available.

## Visual corrections and evidence

The primary agent inspected the actual desktop, portrait phone and short landscape browser captures against the approved mockup and existing whale/turtle assets. A bright cloud band initially crossed the mobile title; narrow-screen sky shading corrected it. Glyph/background sampling then identified bright reflections under landscape text, so a left-hand navy scrim and a stronger bottom cue scrim were added. These gradients protect readability while retaining the painted scene, with the foreground otter above the shading layer. A global `.icon-play` rule also hid the local play glyph; an opening-specific visible state fixes it.

Final sampled title minima are **4.20:1 at 320 px**, **4.38:1 at 390 px**, **5.38:1 in short landscape**, and **6.81:1 at desktop width**. All exceed the 3:1 large-text threshold. The smallest sampled cue ratio is **12.08:1**, above the 4.5:1 normal-text threshold. [Scoped contrast results](qa/surface-opening-contrast.json) sample actual glyph interiors against the frozen rendered artwork; they are not a full-site contrast certification.

Primary-inspected captures: [desktop](previews/surface-opening-review-1440.png), [portrait](previews/surface-opening-review-390.png), [small phone](previews/surface-opening-review-320.png) and [short landscape](previews/surface-opening-review-844.png). The original seal appears to have a halo in the image viewer, but native decoded alpha and browser compositing show no visible halo or rectangular background. It remains the shipped asset; the redundant extraction candidate remains only in the generation cache.

## Verification

All **29 focused checks pass** in Chromium 156 and WebKit 26. [Machine-readable results](qa/surface-opening.json) cover actual ambient transforms, local pause/freeze/resume, native desktop wheel entry and subsequent native scrolling, synthetic mobile gesture distinctions, keyboard control/entry, focus/inert restoration, hidden waiting, reduced/saved pause/deep-link/restoration bypasses, missing/slow artwork, late-load cleanup, direct-file operation, missing library and JavaScript-disabled fallbacks. All opening-owned Anime.js objects are cancelled after entry; the hero resumes through the existing event contract. No uncaught JavaScript exceptions were recorded.

The first run passed 26 cases; three harness assertions were corrected without site changes: responsive samples now wait for the later cue entrance, and the WebKit keyboard test uses Tab to focus the Pause button rather than assuming pointer clicks focus it. Only those three cases were repeated, giving the final 29/29 result. Separate asset checks pass 16/16. The primary agent reviewed the code diff, final screenshots and these results. `node --check js/opening.js`, local anchor-target validation and `git diff --check` pass.

Viewport coverage is 320 × 568, 390 × 844, 844 × 390, 768 × 1024 and 1440 × 1000 in both engines. This is focused opening verification; there is no new full-page, physical iPhone, native Simulator or assistive-technology certification. Mobile swipe and visibility cases use synthetic events. The browser recordings show appearance and transition behavior rather than proving device frame rate.

Recordings: [desktop MP4](previews/surface-opening-chromium-1440.mp4), [mobile WebKit MP4](previews/surface-opening-webkit-390.mp4); WebM alternatives share those filenames with `.webm`. They encode actual browser-captured frames at 15 fps, with desktop native wheel and mobile synthetic swipe entry. Both H.264 MP4s decoded upright in WebKit with correct dimensions, readyState 4 and no media error. [Desktop transition still](previews/surface-opening-transition-chromium-1440.png), [mobile transition still](previews/surface-opening-transition-webkit-390.png) and the [two-engine contact sheet](previews/surface-opening-contact-sheet.png) were inspected by the primary agent: the rising waterline crosses the art while the title/cue fade, before the underlying hero is exposed. The [focused QA report](qa/surface-opening-review.md) records the playback method and limits. All browser/encoder work completed; the owned preview server exited cleanly.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: the title, cues and control names contain no em dash.
- R-03 PASS within tested scope: final geometry and captures fit all five viewport profiles in both engines; no horizontal overflow, overlapping text or clipped entry control was found.
- R-17 PASS: this revision adds no statistics or portfolio metrics.
- R-18 PASS: no testimonials, people or endorsements were invented.
- R-23 PASS: production illustration and animation implement the explicitly approved surface mockup; provenance records the built-in generation tool and exact prompts.
- R-24 PASS: no navigation destination changed, and source validation finds no missing local anchor targets.
- R-25 PASS within opening scope: final title samples meet the large-text threshold and cue samples meet normal-text contrast; minimums and limitations are recorded above.
- R-26 PASS: the local Pause/Play control, keyboard paths and gesture entry work in both engines, with normal page scrolling restored after entry.
- R-27 PASS: slow/missing art leaves readable entry text; missing library and no-JavaScript states expose ordinary content; a transition-only fail-safe prevents a stuck reveal.
- R-28 N/A: no FAQ is present in the opening.
- R-32 PASS within tested scope: semantic dialog instructions, inert background, a visible keyboard focus state, named SVG control, Escape exit, hero focus transfer and reduced-motion bypass are exercised; viewport zoom is unrestricted.
- R-33 PASS: HTML, CSS and JavaScript were changed directly with source patches; no generated script rewrote application source.
- R-34 N/A: no theme switch is introduced; the approved ocean theme is retained.
- R-35 PASS: the current implementation ran in both browser engines; saved interactions, screenshots and machine-readable results support the scoped conclusions.
- R-36 PASS: no security, compliance, customer or frame-rate claim is made.
- R-37 PASS: the approved v2 illustration and established portfolio direction governed implementation.
- R-38 PASS: the new content is openly identified as generated illustration; no realistic portfolio facts or ghost links were fabricated.

### Purpose gate

- R-01 PASS: the left/sky and bottom navy gradients protect title/cue contrast against bright water and cloud marks; their effect was measured.
- R-04 PASS: inline pause/play shapes explain the real motion state and avoid platform-dependent icon glyphs.
- R-06 PASS: the existing ivory serif title and plain sans-serif cue preserve the approved editorial/ocean voice.
- R-07 PASS: no grid, blueprint or repeating UI pattern was added.
- R-08 PASS: the single down arrow explains the scroll/swipe entry action.
- R-09 PASS: no capsule, status dot, fake loading badge or counter was added.
- R-10 PASS: no glass or backdrop-blur treatment was added.
- R-12 PASS: no component shadow system was added.
- R-13 PASS: no glow system was added; native alpha compositing verifies the animal edges.
- R-14 PASS: no feature-card system or filler section was added.
- R-19 PASS: the requested ambient loops establish surface life, support local pause and stop while hidden; the bounded waterline transition explains the move below water. This explicit motion request governs the skill's generic preference against decorative loops.
- R-22 PASS: the otter, seal, gulls and coast directly serve the requested ocean-surface introduction and match the actual marine artwork.

### Liveliness

- PASS: energy 3 / rhythm 3 / motion 3 are declared from the existing approved direction.
- PASS: the surface waiting state and underwater reveal provide distinct moments consistent with those dials.
- PASS: the title and otter form the clear focal pair on desktop and mobile.
- PASS: clear water on desktop and sky on phones reserve room for the title; the lower water holds the entry cue.
- PASS: icy ivory highlights are the deliberate accent against blue/navy scenery.
- PASS: painted marine life, the serif voice and downward movement repeat the portfolio's established motif.
- PASS: the design read and mockup approval preceded production asset generation and implementation.

### Craftsmanship and quality locks

- C-1 PASS: asset layering, coast placement, text shading and transition timings have concrete purposes documented above.
- C-2 PASS: all added interaction paths are exercised; the Pause control's play state is visible after the CSS correction.
- C-3 PASS: the introduction supplies the requested starting point for the descent rather than adding template portfolio content.
- C-4 PASS within tested scope: five viewport profiles, both engines, keyboard, visibility and failure states are covered; physical-device and assistive-technology limits are explicit.
- C-5 PASS: no portfolio credentials, customer facts or performance guarantees were invented.
- R-05 PASS: the surface composition implements the approved opening while retaining the varied existing section layout.
- R-11 PASS: only the small circular motion control is added, matching the existing control language; no pill-shaped container system is introduced.
- R-15 PASS: “Scroll to enter”, “Swipe up to enter” and Pause/Play labels name actual actions.
- R-16 PASS: no promotional buzzwords were added.
- R-20 PASS: the coastal animals and descent retain this portfolio's specific illustrated ocean identity.
- R-21 PASS: the navy theme follows the user's selected palette; no requested theme mode is deferred.
- R-29 PASS: navy, slate blue and icy ivory match the actual whale/turtle art and approved mockup.
- R-30 PASS: this implements the approved portfolio composition rather than cloning another product's interface.
- R-31 PASS: the major art, layout, typography and motion decisions each have a concise reason above, backed by screenshots or interaction evidence.
