# Writing card alignment

The second Writing card sat below the first because each card had a different initial translation and staggered start in the scroll timeline. The primary agent replaced those two independent translations with one animation on the existing `.article-list`. Borders and text now move together throughout the reveal. The two ocean backgrounds retain their independent ambient motion.

This is a one-file change in `js/main.js`; markup, CSS, article destinations, content and the approved ocean direction remain unchanged. Reading this as the established portfolio, energy 3 / rhythm 3 / motion 3.

## Verification

All **7 focused checks pass** in Chromium 156 and WebKit 26. Across 234 sampled poses, desktop card top/bottom differences are exactly zero during forward/back scrolling, at native bottom and in reduced motion. The row translation still changes, so the requested animation remains active. Mobile keeps the existing 16-pixel stacked gap without horizontal overflow. Native bottom can stop before the animation's endpoint; the check uses reachable positions rather than assuming timeline completion.

The primary agent inspected the Chromium desktop/mobile and WebKit desktop captures. The requested desktop borders and text are level. Browser details and the limits of the focused check are retained in the [QA report](qa/writing-alignment-review.md) and [results](qa/writing-alignment.json). See the [desktop preview](previews/writing-alignment-chromium-1440.png).

`node --check js/main.js` and `git diff --check` pass. Owned browser processes and the preview server were stopped. No native iOS rerun or deployment was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 / R-17 / R-18 / R-36 / R-38 PASS: no copy, metrics, people, endorsements or factual claims were added.
- R-03 PASS: desktop alignment and mobile stacking/overflow were measured in both engines.
- R-23 / R-37 PASS: the fix follows the user's screenshot and preserves the approved direction.
- R-24 / R-26 / R-27 PASS within changed scope: links and controls are untouched; the row remains animated, and reduced motion restores the natural aligned layout.
- R-25 / R-32 PASS within changed scope: colors, semantics and focus treatments are unchanged; no accessibility control was removed.
- R-28 / R-34 N/A: no FAQ or theme control was involved.
- R-33 / R-35 PASS: the source was patched directly and checked with real-browser measurements and inspected screenshots.

### Purpose gate

- R-01 / R-04 / R-06 / R-07 / R-08 / R-09 / R-10 / R-12 / R-13 / R-14 / R-22 PASS: no color, typography, image, icon or component styling was added; the established composition remains intact.
- R-19 PASS: one shared scroll movement preserves the reveal and fixes the visible misalignment; existing pause/reduced-motion behavior remains in the controller.

### Liveliness

- PASS: the two cards retain their illustrated backgrounds and moving ocean layers.
- PASS: the editorial typography, palette and section rhythm remain the approved direction.
- PASS: the pair moves as a coherent row rather than leaving one card behind.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: a shared transform fixes the actual cause without adding compensating spacing.
- C-2 / C-4 PASS within tested scope: reachable forward/back, bottom, reduced-motion and mobile states were checked; no broader native-device certification is claimed.
- C-3 / R-05 / C-5 PASS: no filler, mock content or invented facts were added.
- R-11 / R-15 / R-16 / R-20 / R-21 / R-29 / R-30 PASS: established shapes, labels, copy, identity, theme and palette remain unchanged.
