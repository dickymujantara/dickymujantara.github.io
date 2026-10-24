# Ocean surface opening illustrations

Generated on 2026-10-24 with the built-in image generation tool for the user-approved ocean surface opening. These are painted 2D illustrations, not photographs. The approved [version 2 mockup](../../.taste-skill/previews/surface-opening-mockup-v2.png) supplies composition; the existing `whale.webp` and `turtle.webp` supply the cool navy, slate and icy ivory painted style. The production layers contain no baked-in text or interface.

The [exact generation prompts](../../.taste-skill/prompts/surface-assets.json) record the reference roles and transparency setting for each asset. The original PNGs remain in the generation cache. Self-contained WebP files below are the website assets; no remote image dependency is required.

| Asset | Source dimensions | Delivered dimensions | Bytes |
| --- | --- | --- | ---: |
| `surface.webp` | 1672 × 941 | 1536 × 865 | 180,830 |
| `surface-mobile.webp` | 1024 × 1536 | 768 × 1152 | 120,432 |
| `otter.webp` | 1774 × 887 | 1024 × 512 | 127,228 |
| `seal-rock.webp` | 1536 × 1024 | 768 × 512 | 63,768 |
| `seabird.webp` | 1774 × 887 | 512 × 256 | 25,332 |

Total delivery size for all five files: **517,590 bytes**. Each background is a separate composition. Reusing the gull illustration for two birds does not require a second image file.

## Original generated PNGs

- `surface.webp`: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-2ecbc1bf-0618-4db1-9346-b838cb9242ce.png`
- `surface-mobile.webp`: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-d2594ced-d0df-4293-bd97-6385258625a7.png`
- `otter.webp`: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-8f7644a9-15da-45fc-8c2d-d24b32936a74.png`
- `seal-rock.webp`: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-90cf167e-e1ff-4e6f-ba24-3c8f05786aee.png`
- `seabird.webp`: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-57d25a04-2be3-4901-b6dd-ec881967f998.png`

## Mechanical delivery conversion

The source aspect ratios were retained, with at most integer-pixel rounding. No crop, stretching, color correction, matte removal or creative pixel editing was applied during conversion. Encoding used `cwebp` 1.6.0, RGB quality 82, method 6, and removed metadata. Resized foreground alpha uses lossless alpha quality 100.

```text
cwebp -q 82 -m 6 -metadata none -resize 1536 0 SURFACE_PNG -o surface.webp
cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize 768 0 MOBILE_PNG -o surface-mobile.webp
cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize 1024 0 OTTER_PNG -o otter.webp
cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize 768 0 SEAL_PNG -o seal-rock.webp
cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize 512 0 SEABIRD_PNG -o seabird.webp
```

## Alpha and compositing review

[Machine-readable inspection](../../.taste-skill/qa/surface-assets.json) includes source and delivered dimensions, file sizes, decoded RGBA counts, alpha bounds and the 16 passing checks. Inspection used Chromium `Image.decode()` and an unscaled canvas read of every pixel. [Checkerboard and navy composites](../../.taste-skill/previews/surface-assets-alpha-composite.png) verify visible integration independently of the image viewer's background.

Both scene backgrounds are fully opaque. The three foreground files have genuine alpha with all four delivered corner pixels exactly zero, rather than a painted checkerboard or opaque rectangle.

| Foreground | Fully transparent pixels | Alpha ≥16 bounds, inclusive | Highest outer-edge alpha |
| --- | ---: | --- | ---: |
| Otter | 297,075 / 524,288 (56.66%) | left 20, top 57, right 1012, bottom 471 | 1 / 255 |
| Seal and rock | 266,203 / 393,216 (67.70%) | left 8, top 99, right 759, bottom 429 | 0 / 255 |
| Seabird | 83,212 / 131,072 (63.49%) | left 5, top 9, right 504, bottom 245 | 0 / 255 |

The otter has 33 outer-edge pixels at alpha 1/255 from its faint wake; the visible animal and ripple marks remain within the image. The delivered foregrounds reach alpha 254/255, consistent with the generated art; they appear solid over both review backgrounds. Whiskers, feet, flippers and wings remain visible.

The source seal appeared to have a broad glow against the image viewer's black presentation. Actual RGBA compositing shows no visible halo or rectangular background around the seal and rock. The primary agent reviewed and accepted the browser composite. This is an asset review; responsive layout and animation behavior are checked in the implementation review separately.

A targeted seal extraction candidate was also generated at `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-c03fae0e-db02-445b-880c-95affc0a3bdb.png`. It was rejected for delivery because actual alpha verification had already established that the original composite was clean. That cache-only candidate is not referenced by the site, was not converted, and does not contribute to the delivery size above.
