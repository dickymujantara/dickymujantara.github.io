# Ocean artwork provenance

These assets were generated with the built-in image generation tool for the approved portfolio build. They are painted-style illustrations, not photographs. The visual reference was the approved mockup `exec-3cc709ac-ae07-44fb-bb20-1ca9f1d64da7.png` from the design conversation. No screenshot is used as a website scene.

The whale, orca, dolphin, and turtle are separate transparent layers for independent animation. The reusable backdrop contains no animals, typography, or interface. The workspace ships only the optimized WebP assets listed below; no website asset depends on the generated-images cache. Original PNG source images remain at their generated cache paths recorded at the end of this document. Their dimensions and source sizes are recorded here for provenance.

| Original source image | Dimensions | Source file size | Treatment |
| --- | --- | --- | --- |
| `whale.png` | 1774 × 887 | 1,305,821 bytes | Transparent humpback, facing right |
| `orca.png` | 1774 × 887 | 900,044 bytes | Transparent orca, facing right |
| `dolphin.png` | 1774 × 887 | 1,008,583 bytes | Transparent dolphin, facing right; reusable at two scales |
| `turtle.png` | 1536 × 1024 | 2,250,743 bytes | Transparent turtle; exclusively navy, slate blue, and icy silver |
| `water.png` | 1672 × 941 | 1,800,185 bytes | Opaque painted ocean; surface light at upper right, quiet left |

## Validation

All animals were inspected individually, then rendered in headless Chrome over a checkerboard to verify their actual alpha edges. Each has transparent corners and no rectangular background. The turtle's first output was refined with the tool's background-extraction flow; the final output composites cleanly despite hidden RGB background pixels in some raw-image previews. The full silhouettes are visible and the turtle has no warm green, gold, or tan color cast. Browser inspection image: `/private/tmp/portfolio-marine-alpha-check.png` (temporary QA artifact, not a site dependency).

The animals are single layers. Their whole-layer translation and rotation can be animated directly. Separate fin artwork is not included.

## Web delivery derivatives

Mechanical conversion used `cwebp` 1.6.0, with `-q 82 -m 6 -alpha_q 100 -metadata none`. Dimensions and exact alpha values are preserved; RGB uses WebP quality 82. No cropping, repainting, or other creative changes were made. The lossless-alpha setting keeps thin painted edges intact.

| Web asset | Dimensions | Bytes |
| --- | --- | --- |
| `whale.webp` | 1774 × 887 | 214,644 |
| `orca.webp` | 1774 × 887 | 123,338 |
| `dolphin.webp` | 1774 × 887 | 146,264 |
| `turtle.webp` | 1536 × 1024 | 214,596 |
| `water.webp` | 1672 × 941 | 88,840 |
| **Total** | | **787,682** |

The delivery set is about 89% smaller than the 7,265,376-byte PNG set. The whale exceeds the soft 150 KB target because its lossless alpha channel alone occupies roughly 89 KB; quality 82 was retained to protect its detailed silhouette. All WebP animal layers were rechecked over a checkerboard in Chrome; transparency and painted detail remain intact. The comparison screenshot is `/private/tmp/portfolio-marine-webp-check.png` (temporary QA artifact). The approved WebP assets are used by the site. Duplicate workspace PNGs were removed after integration review; their original generated source paths below remain available independently.

## Generation prompts

### whale.png

Use case: illustration-story. Asset type: individual production marine illustration for a real portfolio website. The attached full-page mockup is a STYLE AND PALETTE reference only. Generate a new isolated illustration, not a screenshot and not UI. Match its refined matte hand-painted natural-history look: gouache/cel-like broad painted planes, subtle ink detail, deep navy shadows, slate blue midtones, cool icy silver highlights. Deliberately 2D illustrated, not photorealistic and not plastic 3D. Actual alpha transparent background. Only the animal, no water, no rays, no particles, no bubbles, no ground, no cast shadow, no text, no border, no logo, no checkerboard painted into the image. Show the COMPLETE animal including all fins and tail with at least 5 percent transparent breathing room around the silhouette. Natural believable anatomy, calm swimming. Subject: one impressive humpback whale facing RIGHT in a broad three-quarter side view, body nearly horizontal; head at far right and tail flowing to the upper left. One long foreground pectoral flipper sweeps down-left below body like the reference hero. Visible accordion-like throat grooves, small nodules on head and edge of long flipper; understated pale mottling across navy/slate back. Whole animal comfortably fits in a wide landscape canvas; roughly 2:1 wide silhouette. Make it strong and beautiful, silhouette legible over dark ocean.

### orca.png

Use case: illustration-story. Asset type: individual production marine illustration for a real portfolio website. The attached full-page mockup is a STYLE AND PALETTE reference only. Generate a new isolated illustration, not a screenshot and not UI. Match its refined matte hand-painted natural-history look: gouache/cel-like broad painted planes, subtle ink detail, deep navy shadows, slate blue midtones, cool icy silver highlights. Deliberately 2D illustrated, not photorealistic and not plastic 3D. Actual alpha transparent background. Only the animal, no water, no rays, no particles, no bubbles, no ground, no cast shadow, no text, no border, no logo, no checkerboard painted into the image. Show the COMPLETE animal including all fins and tail with at least 5 percent transparent breathing room around the silhouette. Natural believable anatomy, calm swimming. Subject: one adult orca facing RIGHT in a flowing three-quarter side view. Body nearly horizontal, tail to left; high dorsal fin, two pectoral fins with foreground fin sweeping gently down-left, clear correct orca white eye patch and underside. Black sections are ink navy; white patches icy blue-white. Whole animal silhouette fits wide landscape frame, roughly 2:1 proportions. Match About-section orca style in reference.

### dolphin.png

Use case: illustration-story. Asset type: individual production marine illustration for a real portfolio website. The attached full-page mockup is a STYLE AND PALETTE reference only. Generate a new isolated illustration, not a screenshot and not UI. Match its refined matte hand-painted natural-history look: gouache/cel-like broad painted planes, subtle ink detail, deep navy shadows, slate blue midtones, cool icy silver highlights. Deliberately 2D illustrated, not photorealistic and not plastic 3D. Actual alpha transparent background. Only the animal, no water, no rays, no particles, no bubbles, no ground, no cast shadow, no text, no border, no logo, no checkerboard painted into the image. Show the COMPLETE animal including all fins and tail with at least 5 percent transparent breathing room around the silhouette. Natural believable anatomy, calm swimming. Subject: one bottlenose dolphin facing RIGHT in a graceful three-quarter side view. Nearly horizontal, tail at left slightly lower, gently arched back, short correct dolphin beak, curved dorsal fin, subtle pleasant natural expression. Slate-blue body with icy blue underside. Whole animal silhouette fills a wide landscape canvas with margins. Match the dolphins in the About section of reference.

### turtle.png

Use case: illustration-story. Asset type: individual production marine illustration for a real portfolio website. The attached full-page mockup is a STYLE AND PALETTE reference only. Generate a new isolated illustration, not a screenshot and not UI. Match its refined matte hand-painted natural-history look: gouache/cel-like broad painted planes, subtle ink detail, deep navy shadows, slate blue midtones, cool icy silver highlights. Deliberately 2D illustrated, not photorealistic and not plastic 3D. Actual alpha transparent background. Only the animal, no water, no rays, no particles, no bubbles, no ground, no cast shadow, no text, no border, no logo, no checkerboard painted into the image. Show the COMPLETE animal including all fins and tail with at least 5 percent transparent breathing room around the silhouette. Natural believable anatomy, calm swimming. Subject: one elegant sea turtle swimming RIGHT and slightly upward, seen from three-quarter top/front, head in upper right, full shell visible, front flippers sweeping down-left and down-right, rear flippers and tiny tail visible. Fin and face scale outlines, subtly geometric shell plates. Palette strictly navy #071925, slate steel blue #315974, cool pale blue #96bfd2 and icy silver #d6e7ed. NO green, NO yellow, NO brown, NO gold, NO warm tan. Whole animal unclipped, beautifully drawn. Match corrected blue turtle in lower reference section.

### water.png

Use case: illustration-story. Asset type: wide reusable underwater backdrop for a real portfolio, 16:9 landscape composition. Attached full-page mockup is a STYLE AND PALETTE reference only. Generate a new illustration BACKGROUND with no UI and NO animals. Refined matte painted 2D natural-history ocean scenery matching the reference: deep midnight navy and ink-blue water, cool slate blues, icy blue-white surface reflections concentrated across the top RIGHT half, broad elegant blue shafts of underwater light descending from upper right, deepest shadow and very quiet clean negative space on the entire left 40 percent to allow white headline overlay. A low subtle distant blue coral/rock silhouette along the bottom right, not a busy reef. A beautiful luminous rippled underwater surface in upper right without oversaturated cyan. Soft painted shapes and delicate ink accents, not photorealistic plastic water, no glossy CGI. Only ocean scenery. No whale, fish, dolphin, orca, turtle, animal, text, letters, graphics, dots, frames, logos or interface. Palette #06141f #0b2637 #1d4b66 #709bb4 #c6e1ec. Avoid warm hues and turquoise greens.

### Turtle transparency refinement

Use case: background-extraction. The attached image is the exact edit target. Keep the illustrated BLUE SEA TURTLE absolutely unchanged in pose, anatomy, painted shell and scales, navy/slate/icy blue palette. Remove ALL the dark background AND the entire soft glowing blue halo around it. The result must contain ONLY the opaque turtle, with a clean sharply bounded silhouette and true transparent alpha everywhere else. Preserve soft edge antialiasing only at the immediate outer edge. No aura, shadow, background, scene, checkerboard or particles. Add transparent canvas margins of 5 percent around the full animal so no flipper or head touches the canvas. Output an isolated sea turtle cutout with genuine transparency.

## Original generated files

- `whale.png`: `/Users/dickymujantara/.codex/generated_images/01a16b59-5d09-7282-b7fe-9a9de95855ac/exec-b65a1bd1-5467-4d48-9e81-157bd907f74e.png`
- `orca.png`: `/Users/dickymujantara/.codex/generated_images/01a16b59-5d09-7282-b7fe-9a9de95855ac/exec-87bea6b2-9240-4838-a048-0ca63a8c2761.png`
- `dolphin.png`: `/Users/dickymujantara/.codex/generated_images/01a16b59-5d09-7282-b7fe-9a9de95855ac/exec-139bb0ea-96e9-4ac3-ac17-35ac87c1ef07.png`
- `turtle.png`: `/Users/dickymujantara/.codex/generated_images/01a16b59-5d09-7282-b7fe-9a9de95855ac/exec-cde54af2-21f6-49b2-9564-823a4c570507.png`
- `water.png`: `/Users/dickymujantara/.codex/generated_images/01a16b59-5d09-7282-b7fe-9a9de95855ac/exec-dec30077-66de-4111-a271-cea2740b154a.png`

