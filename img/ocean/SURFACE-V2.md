# Surface opening style correction

Generated on 2026-10-24 with the **built-in image generation tool** after the user asked for the opening artwork to match the other ocean sections more closely. These are painted illustrations, not photographs.

The first surface artwork used a dense pattern of bright angular water marks, a high-contrast cloud band and a nearly white otter muzzle. The actual section backgrounds use quieter navy water, soft atmospheric depth and selective pale light. This revision keeps the above-water coast, floating otter, distant seal and two birds while bringing the water and lighting toward that existing treatment. It does not change the site’s section artwork.

The actual `water.webp`, `about-depth.webp` and `whale.webp` were the background style references. The old coast was a composition reference only. The otter uses `whale.webp`, `turtle.webp` and `water.webp` for its cool painted form and lighting, while retaining the original floating pose. The small existing `seal-rock.webp` and `seabird.webp` already share the marine animals’ drawing language and are reused.

The primary agent inspected and accepted all three delivered WebPs before wiring them into the opening. The broader, softer water reflections and quieter sky now leave darker areas for the title; the otter has a softer slate muzzle and controlled painted fur highlights. Full opening composition, loading and motion behavior are reviewed by the implementation task separately.

## Delivered files

| File | Source dimensions | Delivered dimensions | Bytes |
| --- | --- | --- | ---: |
| `surface-v2.webp` | 1672 × 941 | 1536 × 865 | 83,722 |
| `surface-mobile-v2.webp` | 1024 × 1536 | 768 × 1152 | 60,780 |
| `otter-v2.webp` | 1774 × 887 | 1024 × 512 | 121,490 |

The three new files total **265,992 bytes**. With the retained seal (63,768 bytes) and gull (25,332 bytes), the active five-file artwork set totals **355,092 bytes**. The two backgrounds are alternatives; only the active composition is needed initially. These file sizes are not a runtime performance benchmark.

The old `surface.webp`, `surface-mobile.webp` and `otter.webp` remain as the earlier versions. All production assets live in the workspace; the site does not depend on generated-image cache paths or a remote image host.

## Prompts and source PNGs

The [exact prompt manifest](../../.taste-skill/prompts/surface-style-v2.json) records the built-in tool, every reference image role, full prompt and transparency setting.

- Desktop: `/Users/dickymujantara/.codex/generated_images/01a16cc0-c787-7ad1-94b8-e15fcad73b6b/exec-a671ace5-1448-422e-b8a5-7a39e051cd65.png`
- Portrait: `/Users/dickymujantara/.codex/generated_images/01a16cc0-c787-7ad1-94b8-e15fcad73b6b/exec-099fbd59-36e1-4104-b28d-351d9e0e0cb9.png`
- Otter: `/Users/dickymujantara/.codex/generated_images/01a16cc0-c787-7ad1-94b8-e15fcad73b6b/exec-ebac6194-3403-4816-b8e7-08235fe42d72.png`

## Conversion and alpha verification

Only mechanical proportional resizing and WebP encoding were applied. No crop, stretching, repainting, color transform, matte removal or synthetic transparency was added outside image generation. `cwebp` 1.6.0 used RGB quality 82 and method 6; the otter retains generated alpha with lossless alpha quality 100. Aspect ratios are preserved within integer-pixel rounding.

```text
cwebp -q 82 -m 6 -metadata none -resize 1536 0 DESKTOP_PNG -o surface-v2.webp
cwebp -q 82 -m 6 -metadata none -resize 768 0 PORTRAIT_PNG -o surface-mobile-v2.webp
cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize 1024 0 OTTER_PNG -o otter-v2.webp
```

All **8 decoded-image checks pass** in the [asset inspection JSON](../../.taste-skill/qa/surface-style-v2-assets.json). Chromium decoded source PNGs and delivered WebPs into an unscaled RGBA canvas for full alpha inspection. Both backdrops are fully opaque. The otter has 306,559 fully transparent pixels of 524,288 (58.47%), all four corners at alpha zero, and visible alpha ≥16 bounds from (16, 62) through (1015, 480), inside the 1024 × 512 image. Seven faint outer-edge pixels are alpha 1/255 from the wake, not clipped anatomy; maximum generated alpha is 254/255, consistent with the original cutouts.

The [checkerboard/navy composite](../../.taste-skill/previews/surface-style-v2-alpha-composite.png) was visually inspected. There is no visible rectangular water patch, opaque background or halo; all whiskers, feet and body remain visible. These are asset checks, not responsive-layout or motion checks. The local browser used for inspection exited after the checks; no preview server was started by the asset task.
