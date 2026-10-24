# Scroll animation verification

The implementation passed 23 browser behavior checks. A separate successful runtime recording adds a twenty-fourth check. Detailed assertions and sampled transform matrices are in `scroll-motion.json`.

## Motion evidence

- Anime.js loads locally over HTTP and direct `file://` preview.
- Hero, About, and Explorations each hold a pinned frame while outer animal layers change with scroll position. Frame top remained 73 px at desktop chapter progress 15% and 75%.
- Those outer transforms stayed identical during a 350 ms idle sample, changed after scrolling, and returned exactly to the earlier values when scrolling back. Ambient swimming is nested separately.
- A native mouse wheel drives the scene. Pointer movement still changes the hero layers.
- Global pause freezes scroll and ambient transforms, persists after reload, and Play restores scroll motion.
- Work and About anchors land at their content. The current navigation follows Explorations. Keyboard and touch graph selection, mobile menu navigation, Escape, and focus restoration pass.

## Layout and fallback evidence

- Desktop document is 6,423 px tall at a 1,000 px viewport, with three finite chapters and no horizontal overflow.
- 390 px and 320 px layouts have bounded compact chapter travel and no horizontal overflow. A native touch gesture scrolls the page; the hero releases after its travel.
- At 390 px and 200% root text sizing, all three tall scenes switch to normal flow. Text stays within the viewport and there is no horizontal overflow.
- Reduced motion removes pinned travel, keeps content visible, and starts still. Manually playing ambient motion does not restore pinned scroll travel under that preference.
- Blocked Anime.js and disabled JavaScript each leave readable content in natural document flow. The graph works when Anime.js is blocked.
- No uncaught page exceptions occurred in the tested states.

## Preview artifacts

`../previews/scroll-animation.webm` contains actual Playwright full-viewport browser captures of the hero, About, and turtle chapters, followed by graph selection. It is VP9 WebM, 1152 × 800, 160 frames at 15 fps (about 10.7 seconds), 1.40 MB. An extracted frame was decoded and visually checked; the final video has no gray padding strip. The capture uses the existing cached video encoder, without installing dependencies or modifying website source.

Still screenshots include `scroll-hero-0.png`, `scroll-hero-50.png`, `scroll-hero-90.png`, `scroll-about-progress.png`, `scroll-turtle-progress.png`, and `scroll-mobile-top.png` in `../previews/`. The hero, About, and turtle states were visually reviewed for composition, copy legibility, and palette.

This is local Chromium verification. It does not establish cross-browser Safari or Firefox behavior or production deployment status.
