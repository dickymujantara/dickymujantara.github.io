# Safari and mobile compatibility QA

The focused automated suite passed all 45 checks in real Playwright WebKit 26.0 and Chromium 156.0.8078.4. WebKit uses an emulated iPhone touch/mobile context; it is a desktop WebKit build, not native iOS Safari. A separate native Mobile Safari 18.5 visual probe ran successfully in the iOS 18.5 iPhone 16 Pro Simulator and is documented in `safari-mobile-ios185-review.md`. No physical iPhone was tested.

## Automated results

`safari-mobile.json` records measurements at 320, 390, 600, 767, 768, 1024 and 1440 pixels in both engines.

- At widths through 767 pixels, the complete header is hidden, its measured height and the scroll header offset are zero, and the hero starts without reserved navigation space. Navigation remains visible from 768 pixels upward. There is no horizontal page overflow at any tested width.
- All native buttons compute to `appearance: none`. The previous arrow, down, menu and play/pause Unicode glyphs are absent from page text; inline SVG icons are present. Graph selection, experience selection and play/pause remain operable.
- The canvas mosaic paints at every tested width with image smoothing disabled. Both treatment frames remain within the viewport and retain all four corner handles. Both exploration links remain available at their centers. The separate clip tone filter remains in place.
- Turtle, complete treatment frames and crop images continue to animate at fixed scroll. Pause freezes them; Play resumes them. Reduced motion starts still and uses natural section flow with the SVG play icon.
- Pinned mobile scenes have a zero header inset. A simulated toolbar-only `innerHeight` change, while CSS viewport size stays fixed, does not change chapter heights. An actual viewport-height resize adapts the layout without introducing a header gap. This is a synthetic sizing test, not a physical iPhone gesture test.
- The hero's Selected Work link lands at the intended 16-pixel content inset, with no phantom header offset.
- If 2D canvas is unavailable, the existing CSS animal/background treatment remains visible. If the canvas image loader fails while the CSS source remains available, the same fallback remains visible. Opening `index.html` directly also keeps the mosaic and motion control working in both engines.
- No uncaught JavaScript exceptions occurred in the tested engines.

## Final targeted changes

After the full suite, the primary agent corrected missing whitespace around the hidden experience line break and expanded the hero light layer beyond the clip to remove a hard vertical edge. The four targeted final checks in `safari-mobile-final-addendum.json` passed at 320 and 390 pixels in both engines. They confirm no horizontal overflow, zero mobile header height, light-layer side bounds outside the viewport, and the rendered sentence “Building products across different teams and domains.”

The final WebKit and native iOS Simulator hero screenshots were visually inspected: the vertical light-box seam is gone and line SVG icons remain clear. Full motion/control checks were not repeated for these final decorative-bound and whitespace changes.

## Evidence and limits

- Final hero: `../previews/safari-mobile-final-webkit-390-hero.png`, `safari-mobile-final-chromium-390-hero.png` and `safari-mobile-ios185-home-final.png`.
- Final experience: `../previews/safari-mobile-final-webkit-390-experience.png` and `safari-mobile-final-chromium-390-experience.png`.
- Cross-engine scene and control screenshots use `safari-mobile-{webkit,chromium}-*` names. Canvas failure, image-loader failure and direct-file screenshots are retained for WebKit.
- Native iOS evidence and eight visual results are documented separately in `safari-mobile-ios185-review.md`. That probe reproduced the old external arrow as a blue emoji tile and verifies the replacement line SVG. Native iOS screenshots also verify the canvas mosaic and toned turtle artwork.
- Pre-change WebKit captures use `safari-mobile-before-webkit-*`. WebKit 26.0 already rendered the old SVG mosaic, so a missing-mosaic failure was not reproduced in that engine. The native iOS before/after arrow discrepancy was reproduced.

The installed macOS Safari 18.6 driver refused automation because Safari's Allow remote automation setting is disabled. That system setting was left untouched. Playwright's WebKit browser and its required FFmpeg were downloaded only under `/private/tmp/portfolio-browser-qa/browsers`; no repository dependency or package migration was introduced. QA edited no website source. The owned preview services and the temporary Simulator session were stopped after verification. The primary agent owns the final delivery gate.
