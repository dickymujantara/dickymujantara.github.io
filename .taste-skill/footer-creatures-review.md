# Footer creatures revision

The later [footer integration review](footer-blend-review.md) supersedes the sizes, styling and scene placement recorded here. Asset provenance and the removal of small fish remain current.

The small SVG fish silhouettes are removed from the hero and footer, including their SVG symbol, CSS and motion profile. The footer now contains two illustrated jellyfish, a crab and a sea star. The previously approved whale, dolphins, orca and turtle remain in their scenes.

Reading this as: the approved editorial ocean portfolio for collaborators and hiring teams, energy 3 / rhythm 3 / motion 3. This bounded revision follows the user's explicit request to remove the small fish and add footer invertebrates.

## Decisions

- Painted navy, slate and icy blue creatures match the existing animals and avoid introducing warm colors or mismatched pictograms. Exact generation prompts and source paths are in `img/ocean/INVERTEBRATES.md`.
- Genuine transparent cutouts preserve the canyon scenery. The primary agent inspected the browser checkerboard/navy composite and final desktop/mobile footer screenshots; no rectangular background or diffuse halo is visible.
- Two jellyfish at different sizes and phases create depth. Anime.js gives them gentle vertical drift, moves the crab sideways, and gives the sea star a barely perceptible tilt. These are whole-illustration movements, not articulated swimming rigs.
- The existing pause, reduced-motion and visibility controls govern every creature. The illustrations have empty alt text, an `aria-hidden` ancestor and no pointer interaction.
- At widths up to 1000 pixels, the creatures occupy their own area below the contact content. A 24-pixel gap accommodates upward drift. The crab is inset to clear the fixed motion button.
- Typography, contact destinations and substantive portfolio content remain as approved. Three optimized WebP assets add 221,322 bytes.

## Verification

All 13 focused browser checks passed. The primary agent reviewed the measurements in `qa/footer-creatures.json` and visually inspected `previews/creatures-alpha-composite.png`, `creatures-footer-desktop.png`, `creatures-footer-mobile.png` and `creatures-hero-desktop.png`.

- Exact fish symbol, school classes, SVG uses and `data-motion="fish"` nodes are absent.
- All four footer images load with useful alpha transparency and belong to the hidden decorative layer.
- At fixed scroll, all four creature matrices change. Pause freezes every creature; Play resumes them. Reduced motion starts still.
- At 1440, 1024, 768, 390 and 320 pixels, page width fits the viewport, creatures clear actual text bounds, and contact links remain unobstructed.
- No uncaught JavaScript exceptions occurred. `node --check js/main.js` and `git diff --check` passed.
- `previews/footer-creatures.webm` records 101 actual browser frames at 15 fps (634,905 bytes).

The [original implementation](implementation-review.md), [scroll revision](scroll-motion-review.md) and [scene/frame revision](effects-backgrounds-review.md) retain evidence for unchanged features. Validation is local Chromium with emulated mobile sizes, not a claim about every browser or a formal accessibility certification. The owned preview server was stopped. Nothing was deployed; the pre-existing backup was untouched.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: no visible copy or em dash was introduced.
- R-03 PASS: five viewport checks show no overflow or creature/text collision.
- R-17 PASS: no portfolio metrics were added; file sizes and motion measurements above are implementation evidence.
- R-18 PASS: no people or testimonials were added.
- R-23 PASS: the new creatures follow the explicit user request and have recorded provenance.
- R-24 PASS: existing navigation and destinations are retained; footer links pass hit-target checks at all five widths.
- R-25 PASS within reviewed scope: unchanged ivory/slate text retains the dark left scrim and prior contrast palette; measured creature bounds clear text. Final desktop/mobile views were inspected. No new text colors were added.
- R-26 PASS: existing controls remain functional, pause/resume was exercised, and decorations introduce no false control.
- R-27 N/A: no form or live-data view was introduced; the existing static fallback is retained.
- R-28 PASS: no FAQ was added.
- R-32 PASS: native contact links remain unobstructed and existing focus behavior is retained; new artwork is hidden from assistive technology.
- R-33 PASS: application source was edited directly with patches; asset encoding only changed delivery format and size.
- R-34 N/A: the approved fixed ocean theme has no theme switch.
- R-35 PASS: real-browser checks, screenshots and a motion recording are retained; the primary agent inspected their results.
- R-36 PASS: no security, compliance or customer claims were added.
- R-37 PASS: the approved composition and explicit species request supply the direction.
- R-38 PASS: the new artwork is documented as generated illustration, with no fabricated portfolio facts.

### Purpose gate

- R-01 PASS: retained gradients serve ocean depth and text contrast; no new glow system was introduced.
- R-04 PASS: the sea star depicts an expressly requested footer animal, not a generic feature icon.
- R-06 PASS: approved editorial serif and restrained sans-serif typography are retained.
- R-07 PASS: no new grid or dot pattern was added; existing halftone crops remain part of the approved treatment.
- R-08 PASS: no arrows were added.
- R-09 PASS: no capsules or status indicators were added.
- R-10 PASS: no glass components were introduced.
- R-12 PASS: no component shadow system was added.
- R-13 PASS: browser alpha composites show isolated creatures without a backdrop halo.
- R-14 PASS: existing section hierarchy is retained; fauna use an asymmetric scene rather than repeated cards.
- R-19 PASS: user-requested marine loops use bounded independent layers with shared pause and reduced-motion handling.
- R-22 PASS: jellyfish, crab and sea star directly match the user's requested footer subjects.

### Liveliness

- PASS: energy, rhythm and motion are declared above and continue the approved composition.
- PASS: the contact heading remains the footer focal point; smaller marine illustrations support it on the right or below.
- PASS: a separate mobile scene and measured drift gap make whitespace structural.
- PASS: icy blue remains the deliberate marine accent; no extra palette was introduced.
- PASS: painted creatures and editorial headings retain the portfolio's identity motif.
- PASS: the design read and decisions derive from the user's approved direction.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: reasons for palette, subjects, motion and spacing are recorded above.
- C-2 PASS: new artwork is decorative; motion controls were exercised and links remain clickable.
- C-3 / R-05 PASS: no filler content or sections were added.
- C-4 PASS within tested scope: five sizes, alpha loading, pause/resume and reduced motion passed.
- C-5 PASS: no facts, metrics or testimonials were invented.
- R-11 PASS: no component shapes or radius conventions changed.
- R-15 PASS: existing specific CTAs and contact labels remain intact.
- R-16 PASS: no marketing buzzwords or new promotional copy were introduced.
- R-20 PASS: the approved marine illustration identity remains consistent in the final inspected views.
- R-21 PASS: the fixed dark ocean palette follows the user's explicit direction.
- R-29 PASS: ink navy, slate, icy blue and ivory remain the active palette.
- R-30 PASS: changes follow the user's portfolio reference and requested subjects, with no unrelated product imitation.
