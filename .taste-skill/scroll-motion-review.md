# Scroll animation revision

The first implementation had small idle movement and an entrance-triggered timeline. This revision adds visibly scroll-driven Anime.js choreography, following the user's reference at https://irrrgi.dev/ while retaining the approved ocean artwork, palette, content, and navigation without a name. The later [effect-frame and background revision](effects-backgrounds-review.md) adds automatic complete-frame movement and distinct scenery after the hero.

## Implemented behavior and reasons

- Hero, About and Explorations use bounded sticky chapters because the reference's defining behavior is a held scene that changes with scroll progress.
- The whale translates, rotates and scales as the hero title shrinks. The dolphins, orca, turtle and treatment windows follow different paths to express depth.
- Scrolling upward reverses the same timelines. Native wheel, touch, keyboard and anchor scrolling remain in control.
- Graph connections draw into view, experience entries arrive along a drawing rail, and writing/contact content moves into place. Text is not hidden behind an animation completion requirement.
- A thin header line reports actual page progress; Scroll to dive gives the hero a visible continuation cue.
- Ambient swimming continues on nested image layers. Scroll wrappers, hero pointer wrappers and ambient images have separate transform ownership.
- Pause freezes scene choreography and ambient movement, while completing readable process/timeline content. Play catches up to the current scroll position.
- Reduced motion restores the complete still layout and removes extra chapter travel. Content taller than the viewport also bypasses pinning so enlarged text remains reachable.
- The local Anime.js 4.5.0 UMD bundle uses ordinary deferred scripts so both `file://` and HTTP previews animate. The previous module-only loader could not animate a directly opened HTML file.
- No new visual assets, external profile destinations or portfolio claims were introduced. The turtle remains cool blue; Graphalyze remains the sole project, followed by Experience.

Design read: an editorial ocean portfolio for collaborators and hiring teams, energy 3 / rhythm 3 / motion 3. The explicit request for animated marine scenes and the supplied scroll reference determine the motion direction.

## Browser evidence

All 23 functional checks passed in Chromium. The retained report is `qa/scroll-motion.json`.

- At fixed scroll positions, outer scene transforms stay unchanged while ambient images can keep swimming. Moving from 15% to 75% chapter progress substantially changes the scene transforms; scrolling back restores the earlier state.
- The hero, About and Explorations frames stay at 73 pixels from the viewport top during desktop chapter travel.
- For example, the whale's scroll wrapper moves from approximately x=2/y=4 to x=89/y=-52 between tested positions, independently of its idle image motion.
- Native wheel input drives the effect. Native mobile touch scrolling advances and releases the compact pinned hero.
- Pause freezes both transform layers and persists after reload; Play restores scroll choreography.
- Work/About anchors, Explorations navigation state, hero pointer response, graph keyboard/touch selection, menu/Escape and focus restoration remain functional.
- Desktop width 1440 and mobile widths 390/320 have no horizontal overflow. Desktop total height is approximately 6423 pixels at a 1000-pixel viewport, with finite chapter travel.
- At 200% mobile text size, all three tall chapters use normal relative positioning, with no text outside the viewport.
- Reduced-motion, unavailable-library and no-JavaScript cases retain readable natural flow without blank chapter travel. Manual Play does not reinstate pinned travel under a reduced-motion preference.
- Directly opening `index.html` loads Anime.js and the whale image and enables motion.
- No uncaught browser exceptions occurred in the tested application states. JavaScript syntax and Git whitespace checks passed.

An actual runtime animation recording is saved at `previews/scroll-animation.webm`. Representative screenshots include `scroll-hero-start.png`, `scroll-hero-progress.png`, `scroll-about-progress.png`, `scroll-turtle-progress.png` and `scroll-mobile-top.png`. The primary agent inspected the hero at multiple scroll phases, the About and turtle scenes, and the mobile layout.

## Delivery gate

This is the primary agent's revision gate. The original full visual/content gate in `implementation-review.md` remains applicable to unchanged artwork and portfolio facts; the following results cover the new motion and loader behavior.

### Hard gate

- R-02 PASS: no em dash was added to visible UI copy.
- R-03 PASS: 1440/390/320 pixel layouts and 200% mobile text have no measured overflow; tall content bypasses sticky positioning.
- R-17 PASS: no fabricated statistics or achievement claims were added; progress derives from document scroll position.
- R-18 PASS: no testimonials or people were introduced.
- R-23 PASS: the user explicitly requested Anime.js scroll animation using the supplied reference; existing artwork and navigation identity are retained.
- R-24 PASS: anchor navigation reaches real content, including the newly wrapped chapters.
- R-25 PASS within reviewed scope: the approved light-on-navy palette and dark text scrims are retained; inspected start/mid/end hero and supporting scene states remain readable. Original measured solid-color contrast evidence remains in `qa/accessibility.json`. This is not a full animation-frame contrast certification.
- R-26 PASS: pause/play, hero pointer input, graph controls and mobile navigation work in browser tests; no library-load dependency breaks those native controls.
- R-27 N/A for live data: no network-data view or form was added. The unavailable-animation state retains readable static content.
- R-28 PASS: no FAQ or filler sections were added.
- R-32 PASS: keyboard graph operation, menu/Escape focus restoration and normal anchor navigation were verified.
- R-33 PASS: application HTML/CSS/JS were patched directly; the third-party browser bundle is an unmodified pinned distribution with its MIT license.
- R-34 N/A: there is one approved dark theme, with no theme switch.
- R-35 PASS: the actual page was exercised in a browser, including native wheel/touch input and direct-file loading. Scroll-dependent behavior was measured independently of elapsed animation time and recorded.
- R-36 PASS: no security, compliance or customer claims were added.
- R-37 PASS: the approved ocean design and explicit scroll reference supply the direction.
- R-38 PASS: no new realistically styled facts, ghost destinations or product claims were introduced.

### Purpose gate

- R-01 / R-06 / R-22 PASS: the approved ocean palette, editorial type and marine artwork remain tied to the user's direction.
- R-04 / R-08 / R-09 PASS: the new down arrow indicates continuation; there are no added generic feature icons, capsule badges or false status dots.
- R-07 / R-10 / R-12 / R-13 PASS: no decorative technical grid, glass system, card shadows or widespread glows were added.
- R-14 PASS: the existing project, timeline and article compositions are retained.
- R-19 PASS: scroll progress controls deliberate reversible timelines; user-requested ambient motion has pause, reduced-motion and visibility handling. Native scrolling is preserved.

### Liveliness and craftsmanship

- PASS: all three dials are explicit, and pinned scenes, distinct marine paths and quieter technical reveals make the motion visible.
- PASS: each chapter retains a clear focal point, readable text and the existing marine identity. Added travel is bounded rather than filled with blank interludes.
- C-1 / R-31 PASS: major changes have concrete purposes recorded above.
- C-2 / C-4 PASS within browser scope: playback, native scrolling, responsive layouts, enlarged text, keyboard/touch and fallbacks were exercised.
- C-3 / C-5 / R-05 PASS: no filler content or fabricated proof was introduced.
- R-11 / R-15 / R-16 PASS: existing control shapes and specific link copy are retained; Scroll to dive describes the page action.
- R-20 / R-21 / R-29 / R-30 PASS: motion follows the supplied reference while preserving this portfolio's approved marine identity and restrained dark palette.

The work remains local; no deployment was performed. The pre-existing backup file was not modified.
