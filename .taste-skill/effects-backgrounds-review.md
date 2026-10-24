# Moving effect frames and distinct ocean scenes

The user requested automatic movement for all pixel/halftone boxes and different backgrounds after the hero. Both changes are implemented. The primary agent inspected the new source assets, desktop About/Explorations/footer screenshots, mobile About/Explorations screenshots, and browser evidence below.

The subsequent [footer-creatures revision](footer-creatures-review.md) removes the small fish silhouettes and adds jellyfish, a crab and a sea star. Its evidence supersedes the footer-specific screenshots here.

The later [turtle integration review](turtle-blend-review.md) refines the Explorations image and crop lighting while retaining the moving frames and scene backgrounds documented here.

## Changes and reasons

- Each treatment window now has a scroll-position wrapper, an independently animated complete frame, and a separately animated crop. Borders and all four corner handles belong to the moving frame, so the movement is visible without scrolling or hovering.
- Anime.js moves each complete frame by up to 8 pixels horizontally, 11 vertically, and 2 degrees, over alternating 5.2-second cycles with different phase offsets. Crops move by up to 8/5 pixels over 6.5 seconds. These small independent offsets fit the underwater setting.
- The existing pause, reduced-motion and scene visibility controls apply to the new frame animations. Scroll transforms remain on a separate outer wrapper.
- Hero surface water is assigned only to `.hero-art`. About uses open midwater, Explorations a coral/rock ledge, and article thumbnails/footer deep-canyon imagery. Repeated non-hero light-ray overlays were removed to make the locations visibly different.
- Work, Experience and Writing use different quiet navy surface colors, preserving readable technical content between the illustrated scenes.
- New backgrounds retain dark left space, cool navy/slate colors and painted illustration. No extra animals, claims or interface content were introduced. Three optimized WebP scenes add 108,388 bytes; prompts and sources are in `img/ocean/SCENES.md`.
- Mobile treatment windows have more inset at the right edge so their moving frames and handles remain visible.

Design read: the approved editorial ocean portfolio, energy 3 / rhythm 3 / motion 3. This revision follows the explicit request for automatic effect-frame movement and distinct backgrounds.

## Verification

All 11 focused browser checks passed. `qa/boxes-backgrounds.json` records the actual matrices, positions, URLs and results.

- At fixed scroll, all three complete frames change transform and position, all inner crops move, and each frame retains four attached handles. The outer scroll wrappers stay unchanged until scrolling.
- Pause freezes complete frames, inner crops and scroll layers; Play resumes. Reduced-motion starts with all three still and natural section flow.
- Browser-computed background URLs resolve to `about-depth.webp`, `exploration-reef.webp` and `abyss.webp` after the hero. All scene assets return HTTP 200; no element outside the hero uses `water.webp`.
- Work, Experience and Writing have distinct computed background colors.
- Pinned scrolling, graph selection and mobile navigation remain functional. At 390 and 320 pixels there is no page overflow, and the complete frames stay inside their scenes.
- No uncaught JavaScript exceptions occurred. `node --check js/main.js` and `git diff --check` passed.
- `previews/effects-backgrounds.webm` contains 186 actual browser frames at 15 fps. It shows frame/crop movement and the new scenes. Screenshots use the `boxes-*` prefix.

## Delivery gate

The original implementation and scroll-revision gates remain the baseline for unchanged content. This is the primary agent's gate for this revision.

### Hard gate

- R-02 PASS: no visible copy or em dash was added.
- R-03 PASS: 390/320 pixel layouts and complete-frame bounds were checked without overflow.
- R-17 PASS: no invented portfolio statistics; animation ranges and file sizes above are implementation measurements.
- R-18 PASS: no people or testimonials added.
- R-23 PASS: new scenery and frame animation follow the user's explicit request; asset prompts/provenance are recorded.
- R-24 PASS: existing destinations are retained; graph and navigation behavior were rechecked.
- R-25 PASS within reviewed scope: retained ivory/slate text sits over dark left space and scrims in the inspected desktop/mobile scenes. The original solid-color contrast evidence remains applicable to the unchanged text palette. This is not a full animation-frame accessibility certification.
- R-26 PASS: pause/play, graph and navigation remain functional; the moving decorative frames introduce no false control.
- R-27 N/A: no data view or form added; existing library-failure fallback remains intact.
- R-28 PASS: no filler FAQ added.
- R-32 PASS: existing native controls and focus behavior are retained; decorations remain hidden from assistive technology.
- R-33 PASS: application source was patched directly. WebP conversion changes asset encoding, not application source.
- R-34 N/A: one approved dark ocean theme, no theme switch.
- R-35 PASS: actual browser movement was measured and recorded; responsive and fallback checks are retained.
- R-36 PASS: no security, compliance or customer claims added.
- R-37 PASS: the approved design and the user's two requested changes provide the direction.
- R-38 PASS: new assets are documented as generated illustration, not real wildlife photographs or scientific observations.

### Purpose gate

- R-01 PASS: new scene colors follow the approved cool ocean palette; scrims serve text contrast.
- R-04 / R-08 / R-09 PASS: no icons, arrows, capsules or status dots were added.
- R-06 PASS: approved editorial typography is unchanged.
- R-07 PASS: dots and mosaic blocks are the requested illustration treatment, not a decorative page grid.
- R-10 / R-12 / R-13 PASS: no glass, shadow or glow system was added.
- R-14 PASS: substantive section compositions and article hierarchy are retained.
- R-19 PASS: explicit user-requested loops apply only to decorative frames/crops, with shared pause, reduced-motion and visibility handling.
- R-22 PASS: the new backgrounds depict distinct underwater locations matching the portfolio's ocean interest.

### Liveliness and craftsmanship

- PASS: energy, rhythm and motion are declared; complete moving frames and distinct marine environments make the requested changes visible.
- PASS: animals and headings remain focal points, with quiet left space and the existing editorial identity.
- C-1 / R-31 PASS: each major revision has a stated purpose above.
- C-2 / C-4 PASS within browser scope: animation, pause, reduced motion, responsive bounds and core controls were checked.
- C-3 / C-5 / R-05 PASS: no filler sections or fabricated facts were introduced.
- R-11 / R-15 / R-16 PASS: existing component shapes and specific copy remain intact.
- R-20 / R-21 / R-29 / R-30 PASS: distinct ocean scenes strengthen the existing identity while retaining the approved palette and dark theme.

The local preview server was stopped after testing. No deployment was performed, and the existing backup file was not edited.
