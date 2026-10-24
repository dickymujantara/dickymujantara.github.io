# Ocean surface movement and otter blending

The original user-selected reclining otter remains `img/ocean/otter.webp`. A static wrapper treatment reduces its bright highlights and saturation, while a bottom-only mask softens the outer wake into the sea. The face, paws and feet retain their original artwork. No raster was generated, repainted or replaced.

The opening now keeps its background stationary and animates a separate water layer with Anime.js. That layer inherits the same decoded desktop/portrait artwork, fades in below the horizon and gently translates/stretches the painted reflections. The coastline and sky stay fixed. Only transforms animate; the mask and color filters remain static. Compact/touch movement is smaller and slower. The existing ambient animation set controls Pause/Play, background-tab suspension and cancellation on entry. The layer only appears after a background successfully decodes.

Design read: the approved illustrated ocean portfolio for visitors assessing Dicky's engineering work; energy 3 / rhythm 3 / motion 3. A localized surface swell reinforces the surface-to-depth opening. The existing direction is retained under the single-section exception; no new design draw is needed.

## Verification

All **20 scoped checks pass** in Chromium 156 and WebKit 26, with no JavaScript errors. [Results](qa/ocean-surface.json) and [methods](qa/ocean-surface-review.md) cover five viewports per engine, exact asset/decode, inherited background, mask support, fit, motion, Pause/Play, visibility suspension, orientation changes, entry/focus/scroll handoff, reduced/saved motion bypass and failed/stalled-background handling. Closing the opening cancels all 15 owned animations; late artwork cannot revive it.

Actual phase-separated captures confirm the unobstructed coast/sky crops remain pixel-identical while the water crops change. The primary agent inspected [desktop](previews/ocean-surface-chromium-1440.png), [small phone](previews/ocean-surface-chromium-320.png), [tablet](previews/ocean-surface-chromium-768.png), the [desktop moving phase](previews/ocean-surface-chromium-1440-01-moving.png), [phone WebKit](previews/ocean-surface-webkit-390-00-ready.png), its [moving phase](previews/ocean-surface-webkit-390-01-moving.png) and [entry phase](previews/ocean-surface-webkit-390-03-entering.png). No visible rectangular water matte or hard mask seam appears; feet and whiskers remain visible.

The [9.6-second motion preview](previews/ocean-surface-motion.mp4) contains actual Chromium browser frames showing seven seconds of surface movement and native-wheel entry into the hero. WebKit decodes it at 1440 × 900, readyState 4, without a media error. [Video metadata and method](qa/ocean-surface-video.json). Encoding at 15 frames per second is an artifact setting, not a rendering-performance benchmark.

`node --check js/opening.js` and `git diff --check` pass. Mobile touch input is synthetic; follow-up mobile scrolling is programmatic. No physical iOS, assistive-technology, frame-performance or full-site audit is claimed. No commit, deployment or publication was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: visible interface copy is unchanged; no em dash was introduced.
- R-03 PASS within scope: ten layout captures retain viewport fit and separation of otter, title and cue.
- R-17 / R-18 PASS: no statistics or testimonials were added.
- R-23 / R-37 PASS: the user's exact otter and approved illustrated direction are retained; water motion and blending were explicitly requested.
- R-24 PASS: navigation destinations are unchanged; the added water div is decorative.
- R-25 PASS within scope: original text colors and contrast scrims are preserved, the bright otter stays clear of text and the moving layer is masked below the phone title. Current inspected captures remain legible; this is not a new full-site contrast audit.
- R-26 PASS: both engines exercise water/animal Pause, resume and entry/handoff.
- R-27 PASS: failed/stalled background tests leave water invisible and controls usable; late callbacks cannot revive a closed opening.
- R-28 / R-34 N/A: no FAQ or theme switch is added.
- R-32 PASS within scope: decorative layers inherit aria-hidden, named controls and keyboard behavior are retained, and entry restores hero focus/background access.
- R-33 PASS: HTML, CSS and JavaScript were edited directly with apply_patch; no source mutation script or creative pixel edit was used.
- R-35 PASS: the current page ran in both engines, with saved control, motion, fallback, screenshot and video evidence.
- R-36 / R-38 PASS: no unsupported portfolio or performance claim was added; generated-art provenance remains documented in the original asset record.

### Purpose gate

- R-01 PASS: the water mask limits motion to the sea; the otter mask softens its wake. Existing navy scrims maintain text hierarchy.
- R-04 / R-06 / R-08 PASS: existing pause glyphs, serif/sans hierarchy and directional entry cue retain their established purposes.
- R-07 / R-09 / R-10 / R-12 / R-13 / R-14 PASS: no ornamental grid, badge, glass, shadow, glow or card system was added.
- R-19 PASS: the requested surface swell explains the setting; restrained otter motion shares Pause, hidden-state suspension and bounded entry cleanup.
- R-22 PASS: the unchanged otter and its own sea reflections directly serve the requested marine opening.

### Liveliness

- PASS: energy 3 / rhythm 3 / motion 3 retain the approved page's identity and surface-to-depth choreography.
- PASS: title and otter remain the focal composition, with supporting water movement beneath them.
- PASS: open water separates the title, animal and entry cue at tested sizes.
- PASS: cool pale marine highlights remain the deliberate accent on navy scenery.
- PASS: painted animals, water and the depth transition retain the site's recurring motif.
- PASS: the existing approved direction preceded implementation; actual static and phase-separated browser captures were inspected afterward.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: muted highlights tie the animal to ambient light; the lower wake fade softens its join; water-only transforms keep the coast anchored.
- C-2 PASS: tested motion controls and opening entry continue to work with the new layer.
- C-3 / C-5 PASS: no filler section or unsupported portfolio fact was added; actual rendered captures substantiate water movement.
- C-4 PASS within scope: orientation, loading failures, motion preferences, lifecycle and five responsive profiles in two engines are covered; native-device and performance limits are explicit.
- R-05 / R-11 PASS: the existing section rhythm and component shapes are retained.
- R-15 / R-16 PASS: no promotional copy or CTA was added.
- R-20 / R-21 / R-29 / R-30 PASS: the selected navy/slate illustration palette, editorial type and ocean setting remain consistent.
