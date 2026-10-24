# Focused footer integration QA

All 13 focused browser checks passed after the footer scale, contrast, background crop and placement changes. The complete measurements are in `footer-blend.json`. Tests used the installed Chrome for Testing browser with Playwright at 1440, 1024, 768, 390 and 320 pixels wide.

- The footer contains two jellyfish, one crab and one sea star. Their existing WebP images load with genuine alpha transparency; the small fish silhouettes remain absent elsewhere in the page.
- All four footer creatures change transform automatically through Anime.js at fixed scroll. Pause freezes their transforms, Play resumes movement, and reduced-motion starts paused with still creatures.
- At all five widths, there is no horizontal page overflow. Creature bounds stay clear of contact copy and link bounds. Actual heading glyph bounds were measured with a Range instead of treating empty space in the heading block as text. All four contact link centers remain available to pointer hit testing.
- Final direct footer crops at 1440, 1024, 768 and 390 pixels were visually inspected. Reduced size, opacity, brightness and saturation fit the canyon palette. The lower crab position brings its feet onto the foreground ledge; the mobile sea star shares the foreground area while staying clear of the crab. An initial 768-pixel pause-control overlap was corrected by the final tablet placement adjustment; the targeted addendum below verifies the result.
- No uncaught JavaScript exceptions occurred in the tested views.

The changed background crop also received a separate footer-only text contrast measurement at all five widths. `footer-blend-contrast.json` records text-line background samples in a reduced-motion still frame. No line failed: the minimum heading contrast was 15.84:1 and the minimum other-text contrast was 9.95:1. This measures the sampled still frame rather than every animation frame.

Retained artifacts in `../previews/`:

- `footer-blend-desktop.png` and `footer-blend-mobile.png`: final direct footer element crops.
- `footer-blend-1440.png`, `footer-blend-1024.png`, `footer-blend-768.png`, `footer-blend-390.png` and `footer-blend-320.png`: final direct footer crops at each tested width.
- `footer-blend.webm`: 92 live browser footer screenshots encoded at 15 fps as VP9 WebM, 156,712 bytes. The recording crops to the footer itself so its animal movement can be judged directly.

Harnesses reside outside application source at `/private/tmp/portfolio-browser-qa/footer-blend.cjs` and `image-contrast.cjs`. QA edited no website source. The primary agent owns the delivery gate. This is a focused local browser review, not a full accessibility or cross-browser certification.

## Final tablet placement addendum

The final `right: calc(18% + 3rem)` tablet adjustment received targeted geometry and contact-link checks at 601, 768 and 1000 pixels. All three passed. The crab was forced through all four combinations of its horizontal drift extremes (minus/plus 9 pixels) and rotation extremes (minus/plus 0.8 degrees). Both the full image box and its alpha-derived painted bounds stay clear of the fixed pause control at every tested extreme. Minimum painted horizontal clearances were 6.72, 36.78 and 78.55 pixels respectively.

There is no horizontal page overflow at those widths, crab bounds stay clear of contact copy, every contact link center remains available to pointer hit testing, and no uncaught JavaScript exceptions occurred. The refreshed direct footer crop is `../previews/footer-blend-768-final.png`; exact geometry and source alpha bounds are in `footer-blend-tablet-addendum.json`. Motion, contrast and video were not repeated because the final change affects only tablet crab placement. The owned local preview server was stopped after the targeted checks.
