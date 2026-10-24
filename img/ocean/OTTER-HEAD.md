# Smiling otter head production layer

The user approved the [smiling, head-only opening preview](../../.taste-skill/previews/otter-smile-preview.png). This production layer extracts that otter's head and close waterline ripples for the website. It keeps the gentle closed-mouth smile, lifted cheeks, happy eye squint, cool navy/slate/ivory painted fur and inked contours. Only the head, ears and whiskers appear above the waterline: there is no shell, prop, paw, shoulder, chest or other exposed body.

Created with the **built-in image generation tool**. The approved preview supplied the character, expression and pose; the actual `whale.webp` supplied the existing marine illustration's rendering language. The [exact prompt and reference roles](../../.taste-skill/prompts/otter-head-production.json) are retained. This is generated illustration, not a photograph or human-made artwork.

## Delivered asset

- Website file: `img/ocean/otter-head-smile.webp`.
- Source PNG: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-859c8e59-ddeb-4686-97d1-5ef25fbae6a2.png`.
- Source dimensions: 1774 × 887 pixels.
- Delivered dimensions: 1024 × 512 pixels.
- Delivered size: 128,112 bytes.

Conversion used `cwebp` 1.6.0 with proportional resizing, RGB quality 84, method 6 and lossless alpha quality 100. No crop, stretching, repainting, matte removal, alpha synthesis or creative pixel editing was performed outside image generation. The source remains in its generation cache; the self-contained WebP lives in the workspace and requires no remote image host.

```text
cwebp -q 84 -m 6 -alpha_q 100 -metadata none -exact -resize 1024 0 SOURCE_PNG -o img/ocean/otter-head-smile.webp
```

## Decoded-alpha verification

All **4 asset checks pass** in [the machine-readable results](../../.taste-skill/qa/otter-head-asset.json). Chromium decoded both source and delivered images into unscaled RGBA canvases. Checks cover retained aspect ratio, genuine transparency, transparent corners and visible marks remaining inside the canvas.

- Fully transparent delivered pixels: 307,348 of 524,288 (58.62%).
- All four corner alpha values: 0.
- Alpha ≥16 visible bounds, inclusive: (34,67) through (996,459).
- Maximum alpha at any outer image edge: 1/255, from faint ripple marks; no visible head, whisker or ripple is clipped.
- Maximum generated alpha: 254/255, consistent with the previous generated cutouts; the head appears solid over both review backgrounds.

The [checkerboard and navy composite](../../.taste-skill/previews/otter-head-asset-alpha.png) was visually inspected. Outside the head and sparse thin ripple strokes there is actual transparent alpha, with no opaque water rectangle, broad colored plane or visible halo. Cyan-looking areas in the image viewer are not visible in decoded browser compositing. The smiling expression and head-only silhouette match the approved preview.

These checks cover the standalone asset, not the website's responsive layout or animation. The implementation's own browser review checks composition, loading and motion separately. The local inspection browser completed and closed; no preview server was started by this asset-delivery task.
