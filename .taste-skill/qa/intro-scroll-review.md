# Opening and smoother scroll QA

All 52 focused browser checks passed in WebKit 26.0 and Chromium 156.0.8078.4. Four additional geometry-cache cases and a targeted native-anchor recheck also passed. The separate native iOS 18.5 Simulator Safari probe passed seven visual checks. A physical iPhone and physical touch/swipe performance were not tested.

## Opening and access

- The opening plays for approximately 2.1 seconds, draws the three vector wave paths and fades into the hero. Both automated engine runs measured about 2.07 seconds after DOMContentLoaded. Completion preserves the existing focus and resumes hero motion.
- Focused Skip, Escape, Tab, wheel input, touch intent, pointer intent, hash navigation and backgrounding dismiss it. Clicking outside Skip dismisses the covered opening without activating an invisible underlying CTA. A subsequent normal CTA click works.
- An unseen home reload plays the opening; the next reload and another navigation within the same session skip it. Deep links, reduced motion, saved pause, disabled JavaScript, missing Anime.js and unavailable storage expose usable content immediately.
- Skip remains inside the viewport with a minimum 44-pixel control height. The page is not scroll-locked. Native anchor links and wheel scrolling remain available. Playwright mobile WebKit does not implement mouse-wheel injection, so its native-wheel assertions use desktop WebKit; mobile WebKit uses non-cancelled synthetic touch intent and scripted scroll position changes.
- At 320, 390, 767, 768 and 1440 pixels, there is no horizontal page overflow. Mobile navigation remains hidden through 767 pixels, desktop navigation remains available, and inline SVG icons and the painted canvas mosaic remain intact.

## Scroll behavior and geometry

- A quick scroll produces intermediate turtle transforms before reaching the target, then settles exactly. The dedicated `renderScroll` callback stops scheduling after settlement; the measured callback count remains unchanged during an additional 300-millisecond observation. Ambient animation callbacks are separate and continue only for visible scenes.
- Instrumented wrapper/content geometry reads remain zero during easing in both engines. The snapshot retained under `/private/tmp/portfolio-intro-scroll-before` shows the earlier path reading all chapter/content bounds during scroll updates; this revision uses cached document positions. This is source/runtime-path evidence, not a rendering FPS benchmark.
- Exact Pause now preserves the transforms at the instant the control is activated, keeps them unchanged while waiting or scrolling, and resumes on Play. Saved pause survives reload. The initial run caught forced content completion on Pause; the primary agent removed that jump, and both final engine checks pass.
- Offscreen hero ambient layers remain still while visible footer layers move. A synthetic hidden-document event freezes visible ambient layers, and visibility restoration resumes them. This does not claim operating-system background lifecycle coverage on a physical phone.
- `intro-scroll-cache-addendum.json` checks 390- and 1440-pixel layouts in both engines. A toolbar-only synthetic `innerHeight` change leaves chapter heights unchanged and does not run the main geometry-measurement pass. Mobile performs zero wrapper reads; desktop refreshes two navigation positions without a full scroll-geometry pass.
- Actual viewport resizing adapts chapter heights. Increasing the graph detail's height triggers the content ResizeObserver and updates cached section positions. The Explorations scene then reaches approximately 0.5 rendered progress when scrolled to the newly measured midpoint.
- The final native Chrome anchor recheck waits for smooth scrolling to settle and lands within one pixel of the intended 16-pixel content inset. An initial fixed-delay assertion sampled the anchor in flight after a reload removed the QA-only auto-scroll override; no application change was required for that assertion.
- No uncaught JavaScript exceptions occurred in the final tested views.

## Retained evidence

- `intro-scroll.json`: all 52 final check results, opening timing, exact easing samples and recording details.
- `intro-scroll-cache-addendum.json`: four cache/resize cases and the native-anchor recheck.
- `intro-scroll-ios185-review.md`: seven native Simulator visual results and the precise native actions performed.
- `../previews/intro-scroll-mobile.webm`: 97 actual WebKit browser screenshots encoded at 15 fps, 548,285 bytes, showing the opening followed by scripted scrolling. The encoding frame rate is not a browser rendering-performance measurement.
- `../previews/intro-scroll-ios185-opening-clip.mp4`: a separate native Mobile Safari recording showing the opening drawing and fading into the hero.
- `../previews/intro-scroll-{webkit,chromium}-opening.png` and `intro-scroll-{webkit,chromium}-{390,1440}-{home,about,explorations}.png`: browser visual evidence. Extracted recording frames `intro-scroll-video-opening.png` and `intro-scroll-video-scroll.png` were inspected.

The native Simulator probe used URL anchors and screenshots/recording. It verifies native rendering of the opening, hidden mobile header, hero light bounds, About animals, Explorations effects and footer creatures. It does not claim native swipe scrolling, session-once behavior or a physical-device performance result.

QA changed no website source. Temporary browser tooling remains outside the repository under `/private/tmp/portfolio-browser-qa`. The owned preview server, the native probe's separate server and the temporary Simulator session were stopped after verification. The primary agent owns the final delivery gate.
