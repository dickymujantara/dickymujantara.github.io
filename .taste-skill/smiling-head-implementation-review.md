# Approved smiling otter head implementation

The approved [smiling head-only preview](previews/otter-smile-preview.png) is now applied to the opening. The active animal asset is [otter-head-smile.webp](../img/ocean/otter-head-smile.webp). Only its head, ears and whiskers appear above the waterline: no paws, body, shell or other object is visible. The gentle closed-mouth smile, lifted cheeks and happy eye squint are retained in the existing whale-inspired navy/slate painted style.

Reading this as the established illustrated engineering/ocean portfolio, **energy 3 / rhythm 3 / motion 3**. Implementation follows the approved appearance rather than introducing another visual direction. Existing work in the shared checkout, including the loader, hero-heading focus correction, coast backgrounds, section content and other motion, is preserved.

## Asset and layout decisions

The production image was extracted with the built-in image generation tool using the approved preview for identity/expression and the actual whale for drawing style. It is a true-alpha layer with sparse waterline strokes; the mockup is not used as a website background. Mechanical proportional WebP conversion delivers 1024 × 512 pixels at 128,112 bytes. The previous otter versions remain available. [Source provenance, conversion and exact prompt](../img/ocean/OTTER-HEAD.md).

All **4 decoded-image checks pass** in [the asset results](qa/otter-head-asset.json). Transparent pixels cover 58.62% of the canvas; all corners are alpha zero, and alpha ≥16 bounds remain within (34,67)–(996,459). The maximum outer-edge alpha is 1/255 from faint ripple marks. The primary agent inspected [native checkerboard/navy composites](previews/otter-head-asset-alpha.png): no visible halo, broad filled water plane or rectangular matte appears. Cyan areas shown by the standalone image viewer are hidden RGB outside the actual rendered alpha.

The image keeps its existing 2:1 intrinsic ratio and nested Anime.js layer. Desktop placement uses a 36%-wide canvas in the right-side water. Portrait phones use a centered 78%-wide canvas, and short landscape gets a separate vertical position. These widths include transparent padding and ripples; the head occupies a smaller portion of that canvas. The primary agent inspected actual desktop, phone, small-phone, tablet and short-landscape captures and accepted the scale and waterline blend without a further layout revision.

Otter motion is reduced to ±1.5 px horizontally, ±2.5 px vertically and ±0.25° rotation over the existing 8-second alternating half-cycle. Compact/touch profiles further reduce translation/rotation to 60% and extend duration by 20%. This keeps the head/ripples near the surface instead of visibly swaying a full-body cutout. No new animation framework or articulated rig is introduced. The shared Pause/Play, reduced-motion and hidden-state behavior remain in place.

## Focused verification

All **9 browser check groups pass** in Chromium and WebKit, with no uncaught JavaScript exceptions. [Machine-readable results](qa/smiling-head.json) cover five responsive profiles in each engine, actual loader decode, gentle bobbing, Pause/Play freeze/resume, entry to the whale hero without the blue heading outline, content/inert restoration, subsequent scrolling, reduced/saved-pause bypass and missing/stalled head-image fallback. Delayed art cannot revive a closed opening.

Profiles are 320 × 568, 390 × 844, 768 × 1024, 844 × 390 and 1440 × 900. Desktop uses native wheel; mobile entry uses a synthetic upward touch sequence and follow-up scroll is programmatic. No physical phone, Simulator, assistive-technology or full-site scroll rerun is claimed. The application change is confined to the opening image source, three placement rules, the existing otter motion profile and documentation. `node --check js/opening.js` and `git diff --check` pass.

Primary-inspected actual captures: [desktop](previews/smiling-head-initial-chromium-1440.png), [phone](previews/smiling-head-initial-webkit-390.png), [small phone](previews/smiling-head-webkit-320.png), [touch tablet](previews/smiling-head-webkit-768.png), [short landscape](previews/smiling-head-initial-chromium-844.png). The title/cue and head occupy separate areas. Their text, colors and coast backgrounds are unchanged from the measured loading revision, so no new full-site contrast audit is claimed.

The primary agent also inspected the [10-view contact sheet](previews/smiling-head-contact-sheet.png) and [mobile transition still](previews/smiling-head-transition-webkit-390.png). Short H.264 recordings show the actual loader → smiling head → whale sequence: [desktop](previews/smiling-head-chromium-1440.mp4) and [mobile WebKit](previews/smiling-head-webkit-390.mp4). Both decode in WebKit at the expected dimensions, readyState 4 and no media error. They contain actual browser-captured frames encoded at 15 fps; this is appearance/interaction evidence rather than a rendering-frame-rate benchmark.

[Detailed focused QA notes](qa/smiling-head-review.md) record methods and limits. The owned preview server exited cleanly; all browser/encoder work completed. No deployment or commit was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: no new visible interface copy or em dash was added.
- R-03 PASS within tested scope: five profiles in both engines fit the head/title/cue without overflow or overlap; primary captures were inspected.
- R-17 / R-18 PASS: no statistics or testimonials were introduced.
- R-23 / R-37 PASS: implementation follows the user-approved smiling, head-only mockup and explicit whale-art direction.
- R-24 PASS: no navigation destination changed; the only HTML edit is the decorative image source.
- R-25 PASS within scope: text/background/placement remain unchanged from prior measured contrast and the new head stays outside the text areas; current captures are legible.
- R-26 PASS: existing loader, local Pause/Play, entry and scroll handoff work with the new asset in both engines.
- R-27 PASS: missing/stalled head art has a bounded usable fallback and cannot revive the dismissed opening.
- R-28 / R-34 N/A: no FAQ or theme switch is added.
- R-32 PASS within tested scope: decorative empty alt, named controls, focus transfer without the blue heading outline and motion-preference bypass are retained and exercised.
- R-33 PASS: HTML/CSS/JavaScript were patched directly; only mechanical resize/encoding was performed outside the image tool.
- R-35 PASS: current source ran in both browser engines with saved interaction results and inspected responsive captures.
- R-36 / R-38 PASS: no portfolio, security or frame-rate claim was invented; generated artwork and verification limits are explicit.

### Purpose gate

- R-01 PASS: retained navy scrims protect text on scenery; no new gradient is introduced by this revision.
- R-04 / R-06 / R-08 PASS: existing control glyphs, serif/sans hierarchy and entry arrow retain their documented roles.
- R-07 / R-09 / R-10 / R-12 / R-13 / R-14 PASS: no pattern, badge, glass, shadow, glow or card system was added.
- R-19 PASS: requested ambient motion is restrained to explain a head floating at the surface, supports Pause/Play and stops through the existing lifecycle; observed movement is tested.
- R-22 PASS: the otter head and thin waterline ripples directly represent the approved marine subject and pose.

### Liveliness

- PASS: energy/rhythm/motion dials follow the approved identity rather than suggesting a new page design.
- PASS: the title and smiling head remain the focal pair, with open water preserving hierarchy.
- PASS: the cool light highlights are the deliberate accent over navy/slate scenery.
- PASS: marine illustration, quiet bobbing and the surface-to-depth transition retain the site's motif.
- PASS: the approved design and production-layer requirements preceded generation; actual desktop/mobile output was inspected afterward.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: transparent ripples, smaller head-specific placement and reduced movement each support surface immersion and the approved composition.
- C-2 PASS: tested loader, motion controls and entry remain functional with the new source.
- C-3 / C-5 PASS: no filler section or unsupported portfolio fact was added.
- C-4 PASS within tested scope: responsive fit, motion/preferences and asset-failure paths are covered; native-device limits are explicit.
- R-05 / R-11 PASS: existing section rhythm and component shapes are retained.
- R-15 / R-16 PASS: no new CTA or promotional copy was added.
- R-20 / R-21 / R-29 / R-30 PASS: the dark illustrated ocean identity and selected palette remain specific to the user's portfolio.
