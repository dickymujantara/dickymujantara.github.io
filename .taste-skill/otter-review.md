# Otter illustration correction

Status: this candidate was rejected by the user after review. Its image-source change was reverted to `otter-v2.webp`; the loading animation and previous fixes remain. The results below describe the unused v3 candidate.

The user rejected the otter's appearance after the first style adjustment. This revision replaces that image with a more plainly illustrated sea otter: a small profile eye, side-facing head, relaxed forepaws, webbed hind flippers and broader painted body marks. The detailed front-facing face, glassy eyes and symmetrical foot pads are removed. The primary agent selected the new illustration after inspecting it against the actual whale/turtle palette and the previous otter. It is generated illustration, not a photograph or human-made artwork.

Direction remains the approved illustrated ocean portfolio, **energy 3 / rhythm 3 / motion 3**. The new otter supplies a quieter, visibly drawn focal animal. Its palette, placement, intrinsic ratio and Anime.js motion layer are retained. Application changes in this revision are limited to its image source in `index.html`; the existing uncommitted loader, hero-focus and coast corrections are preserved.

The runtime asset is [otter-v3.webp](../img/ocean/otter-v3.webp), 1024 × 512 and 80,332 bytes. Earlier versions remain. [Built-in image generation provenance and exact prompt](../img/ocean/OTTER.md) records reference roles, original PNG and mechanical conversion; no creative pixel edits were performed outside the image tool.

## Visual and functional verification

The primary agent inspected the current [desktop opening](previews/otter-swap-chromium-1440.png), [phone opening](previews/otter-swap-webkit-390.png) and [alpha composite](previews/otter-swap-alpha.png). The pose reads clearly at both sizes, stays clear of the title/cue and has clean transparent edges. The body still has grouped brush texture, but its broad marks and profile face are materially simpler than the rejected individual-hair rendering. The result does not claim to be a flat vector or a real photograph.

All **5 targeted checks pass** in [the browser/alpha results](qa/otter-swap.json). Native canvas decoding confirms genuine alpha, clear corners and no visible clipping. Desktop Chromium and mobile WebKit both decode the new image through the existing loader, display it in the opening and retain ambient movement, Pause, entry, animation cancellation and hero focus transfer. No uncaught errors were recorded. The alpha ratio is 64.27%; visible bounds remain inside the canvas and maximum outer-edge alpha is 1/255 from a faint wake. `git diff --check` passes.

This is a one-asset verification. The full opening suite was not repeated; the controller, CSS and scene paths remain unchanged. Mobile swipe is synthetic, with no new physical-device or frame-rate certification.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: the asset switch adds no interface copy or em dash.
- R-03 PASS within scope: inspected desktop/phone captures keep title, otter and cue inside their intended areas without overlap.
- R-17 / R-18 / R-36 / R-38 PASS: no statistics, testimonials, portfolio facts or performance/security claims were added; the artwork is identified as generated illustration.
- R-23 / R-37 PASS: the replacement follows explicit visual feedback and the established ocean direction; exact generation inputs are retained.
- R-24 / R-26 PASS within scope: no destination changed; the existing Pause and entry paths operate with the new image in both engines.
- R-25 PASS within scope: no text, text color, background or title/cue placement changed from the measured loading revision; the new animal remains outside those text areas.
- R-27 PASS within scope: the new asset successfully decodes through the current loader; existing error and timeout code is unchanged.
- R-28 / R-34 N/A: no FAQ or theme switch is involved.
- R-32 PASS within scope: decorative empty alt and the existing semantic dialog/control/focus behavior remain intact and are exercised during entry.
- R-33 PASS: the source path was changed directly with a patch; asset conversion only resizes/encodes generated pixels.
- R-35 PASS: current asset and interactions ran in real Chromium/WebKit, with inspected captures and saved results.

### Purpose gate

- R-01 / R-07 / R-09 / R-10 / R-12 / R-13 / R-14 PASS: no new gradient, pattern, badge, glass, shadow, glow or component system is added.
- R-04 / R-06 / R-08 PASS: interface icons, typography and entry arrow retain their documented purpose and existing design.
- R-19 PASS: the otter retains the requested gentle motion, existing Pause and bounded opening lifecycle; both engines confirm the behavior.
- R-22 PASS: the replacement directly represents the requested otter in the ocean surface scene rather than adding unrelated decoration.

### Liveliness

- PASS: energy/rhythm/motion dials retain the approved direction and existing choreography.
- PASS: the title and otter remain the focal pair; calm water reserves room for the text and gesture cue.
- PASS: the profile pose and broad cool-blue brush shapes give the animal a visibly drawn character.
- PASS: navy/slate with sparse ivory highlights retains one deliberate light accent and the repeated marine illustration motif.
- PASS: the direction and visual problem were stated before generation; actual browser compositions were inspected before delivery.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: fewer hair details, a profile gaze and natural asymmetric paws directly address the reported visual problem.
- C-2 / C-4 PASS within scope: actual decoding, motion, Pause, entry and fit pass in both browser profiles; broader verification limits are stated above.
- C-3 / C-5 PASS: no filler section or invented portfolio facts were added.
- R-05 / R-11 / R-15 / R-16 PASS: existing layout, shapes and labels remain; no promotional copy is introduced.
- R-20 / R-21 / R-29 / R-30 PASS: the selected navy marine scene and imagery remain specific to the approved portfolio rather than importing another interface's template.
