# Opening loading, artwork and heading focus correction

The user requested removal of the blue hero-title box, opening artwork that matches the existing ocean sections, and a loading animation before the surface scene. This revision changes the opening and the programmatically focused hero heading. Main section layouts, content, footer, navigation, links and scroll choreography are retained.

Reading this as the approved illustrated engineering/ocean portfolio, **energy 3 / rhythm 3 / motion 3**. The existing navy/slate/ivory identity and surface-to-depth sequence govern this component revision.

## Changes and primary visual review

The blue rectangle was the global `:focus-visible` outline on the hero heading after the opening transferred focus to it. `#hero-title:focus` now suppresses that noninteractive heading's outline. Focus still transfers without scrolling, the temporary tabindex is removed after blur, and links/buttons retain their visible keyboard outlines. [Before](previews/opening-loading-before-hero-focus.png), [desktop after](previews/opening-loading-hero-chromium-1440.png), [mobile after](previews/opening-loading-hero-webkit-390.png).

The original coast had dense bright angular reflections and a high-contrast cloud band. The replacement desktop/portrait backgrounds have calmer dark water, soft continuous reflections and atmospheric shorelines. The otter's muzzle and fur highlights are softer slate/ivory. Actual `water.webp`, `about-depth.webp`, `whale.webp` and `turtle.webp` supplied the visual references; the prior opening supplied composition. The small existing seal and gull remain appropriate at their distant scale. The primary agent inspected all three new assets, their browser alpha composite and the final desktop/mobile opening captures against the actual section art. The darker, softer backgrounds now share the sections' lighting and leave quiet areas behind the title. [Desktop opening](previews/opening-loading-opening-chromium-1440.png), [mobile opening](previews/opening-loading-opening-webkit-390.png).

The three new sibling WebPs are `surface-v2.webp`, `surface-mobile-v2.webp` and `otter-v2.webp`; the original files remain. All eight image/alpha checks pass. The active five-file art set, including retained seal and gull, is 355,092 bytes. Only the chosen background loads initially. [Built-in image generation provenance, paths and exact prompts](../img/ocean/SURFACE-V2.md), [decoded-image results](qa/surface-style-v2-assets.json), [alpha composite](previews/surface-style-v2-alpha-composite.png).

A centered three-wave Anime.js line drawing and “Loading the surface” label precede the scene. They indicate actual image loading/decode, with no simulated percentage. The loader remains for at least 650 ms to avoid flashing, waits for every initial background/animal image to decode or fail, and stops waiting after 4.5 seconds if an image stalls. It then fades for 300 ms while the native opening title/cue and prepared art appear together. Successful assets arriving after the deadline can appear while the opening waits; guarded callbacks cannot revive a dismissed scene.

The surface still waits for a fresh scroll/swipe rather than automatically entering the hero. Wheel, touch and entry keys during loading are consumed without queuing entry; a finger that started during loading cannot enter after readiness. Escape can leave either stage. Tab stays in the loading dialog until the local Pause control becomes visible. Existing reduced-motion, saved-pause, deep-link, restoration and missing-dependency bypasses cover the loader too. Hidden loading pauses its drawing and waits for visibility before revealing the scene. Finishing cancels owned Anime.js instances, clears both loading timers and removes pending image callbacks. The title focus transfer and main motion handoff remain intact.

## Verification

All **19 focused checks pass** in Chromium and WebKit. [Results](qa/opening-loading.json) cover minimum display, actual decode delay, timeout, image-error fallback, early gestures, hidden loading, bypasses, Escape/late-art cleanup, local pause, hero focus without an outline, retained interactive focus, direct-file operation and native/programmatic scroll handoff. No uncaught JavaScript exceptions were recorded. The WebKit keyboard/mobile case needed harness corrections for browser link-focus policy and unsupported mobile `mouse.wheel`; only that affected case was repeated. No application change was needed for those corrections.

The primary agent inspected the final loading, opening and hero captures at desktop 1440 × 900 and phone 390 × 844. The loader is centered, the opening fits and the hero no longer has a blue rectangle. Sampled large-title contrast minima are **12.32:1 desktop** and **5.04:1 phone**; cue minima are **16.26:1 desktop** and **16.76:1 phone**. [Scoped glyph/background samples](qa/opening-loading-contrast.json). These exceed the relevant AA thresholds at the sampled poses; they are not an exhaustive full-site contrast certification.

`node --check js/opening.js` and `git diff --check` pass. The responsive and scroll behavior outside the opening was retained by source review rather than rerunning the whole site. Headless mobile gestures/visibility are simulated integration checks, not a physical iPhone, VoiceOver or native Simulator performance certification.

The loading-wave drawing was measured in both engines: all three SVG stroke offsets change while the loader waits, rather than displaying a static symbol. Short recordings show the actual loader → surface → hero sequence: [desktop H.264 MP4](previews/opening-loading-chromium-1440.mp4) and [mobile WebKit H.264 MP4](previews/opening-loading-webkit-390.mp4). Both files decode correctly in WebKit at the expected dimensions with readyState 4 and no media errors. They encode browser screenshots at 15 fps; they do not measure device rendering frame rate. [Detailed QA notes](qa/opening-loading-review.md) retain the motion measurements, recording method and limits. The owned preview server exited cleanly and browser/encoder processes completed.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: new visible loader copy has no em dash.
- R-03 PASS within scope: inspected desktop and phone loading/opening/hero states fit without escaping text or horizontal overflow.
- R-17 PASS: no metrics, percentages or statistics were fabricated in the interface.
- R-18 PASS: no people, testimonials or endorsements were introduced.
- R-23 PASS: the loading animation and replacement illustrations follow the user's explicit request; source prompts and reference roles are recorded.
- R-24 PASS: no navigation destination changed in this revision.
- R-25 PASS within scope: native title/cue glyph samples exceed their AA thresholds; the loader uses the same high-contrast navy/light palette.
- R-26 PASS: real loading, gesture/keyboard entry, local Pause/Play, Escape and focus restoration are exercised in both engines.
- R-27 PASS: decode failure and a stalled image have bounded usable fallbacks; missing JavaScript/library and bypassed starts retain ordinary content.
- R-28 N/A: no FAQ is added.
- R-32 PASS within tested scope: focus transfer remains accessible without a decorative heading outline; interactive outlines, named status/dialog, keyboard exit and motion bypasses remain available.
- R-33 PASS: application HTML/CSS/JavaScript changes were written directly with source patches; no external script rewrote source.
- R-34 N/A: no theme switch exists or is added.
- R-35 PASS: current source ran in both real browser engines; interactions and before/after captures are retained.
- R-36 PASS: no device-frame-rate, security or compliance claim is made.
- R-37 PASS: the existing section artwork and approved surface layout supply the design direction.
- R-38 PASS: generated illustrations are identified as such; no portfolio facts or ghost links were invented.

### Purpose gate

- R-01 PASS: retained navy scrims protect text on imagery; the new loader itself uses a flat background.
- R-04 PASS: wave strokes identify ocean preparation and the existing SVG Pause/Play marks convey actual state.
- R-06 PASS: existing serif title/sans-serif text retain the portfolio's voice; the loading label uses readable 16 px text.
- R-07 PASS: no background grid or repeating interface pattern was added.
- R-08 PASS: the retained down arrow explains the scroll/swipe action.
- R-09 PASS: no fake progress meter, loading percentage, badge or decorative status dot was added.
- R-10 PASS: no glass or backdrop blur was added.
- R-12 PASS: no shadow system was added.
- R-13 PASS: no glow system was added; actual alpha compositing confirms the revised otter's integration.
- R-14 PASS: no cards or filler sections were introduced.
- R-19 PASS: the requested loading loop represents a real bounded wait, pauses while hidden and cleans up on exit; existing optional ambient motion and gesture-driven descent are preserved.
- R-22 PASS: the coast and animals directly support the requested ocean-surface introduction, using actual section art as style references.

### Liveliness

- PASS: energy 3 / rhythm 3 / motion 3 follow the established direction.
- PASS: the short preparation state, surface hold and descent remain distinct moments.
- PASS: the loader mark/status and later title/otter are clear focal points for their respective states.
- PASS: the quiet water/sky areas reserve space for the title and cue; the loader's empty field intentionally isolates temporary loading feedback.
- PASS: cool ivory/cyan highlights remain the deliberate accent over navy/slate.
- PASS: wave movement and the surface-to-depth gesture retain the site's specific ocean motif.
- PASS: the design read and explicit requested corrections preceded asset generation and source changes.

### Craftsmanship and quality locks

- C-1 PASS: the focus rule, decode wait, bounded loader and quieter art each address a concrete reported issue.
- C-2 PASS: the added loading state reflects actual readiness and all controls have tested behavior.
- C-3 PASS: no extra portfolio section or template content was added.
- C-4 PASS within tested scope: normal, cached, delayed, failed, hidden, keyboard and bypass paths are covered; physical-device/assistive-technology limits are explicit.
- C-5 PASS: no portfolio credentials or performance promises were invented.
- R-05 PASS: the existing varied section layout is retained.
- R-11 PASS: no new container or pill system was introduced; loader art is unboxed.
- R-15 PASS: “Loading the surface” names the actual state; entry and motion labels name their actions.
- R-16 PASS: no promotional buzzwords were added.
- R-20 PASS: the surface scene now draws its material/light treatment directly from this portfolio's marine artwork.
- R-21 PASS: the navy theme follows the user's selected direction.
- R-29 PASS: navy, slate and ivory stay within the established palette.
- R-30 PASS: the component was revised around this portfolio's imagery rather than another product's interface.
- R-31 PASS: reasons for the art, loading, focus, typography and motion decisions are stated above with source or browser evidence.
