# Illustrated otter replacement

Status: rejected by the user and reverted. The opening uses `otter-v2.webp` again. This file records the unused v3 candidate and its historical verification.

`otter-v3.webp` is a generated 2D natural-history illustration. The previous otter's dense hair detail, glossy front-facing face and large symmetrical feet were the visual issues identified after user feedback. This candidate uses a side-facing head, small matte eyes, broad brush shapes, relaxed forepaws and webbed hind flippers. It is intentionally drawn in appearance, not presented as a photograph or human-made artwork.

Created with the **built-in image generation tool**. The actual whale and turtle supplied the navy/slate/ivory palette and illustrative drawing language, with a specific instruction to simplify detail. Neither previous otter image was used as an input. [Full prompt, reference roles and source path](../../.taste-skill/prompts/otter-v3.json).

- Unused candidate: `img/ocean/otter-v3.webp`, 1024 × 512 pixels, 80,332 bytes, genuine generated alpha.
- Source PNG: `/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-ffc9fa99-b434-41fe-bf9c-f0bd58dff8cd.png`.
- Conversion: `cwebp -q 84 -m 6 -alpha_q 100 -metadata none -exact -resize 1024 0 SOURCE -o img/ocean/otter-v3.webp`.

Only proportional resizing and WebP encoding were performed outside image generation. Earlier otter versions remain in the repository. The source switch keeps the same intrinsic aspect ratio, position and Anime.js motion layer; the loading controller and scene choreography are unchanged.

The primary agent inspected the generated illustration, actual desktop/mobile opening captures and checkerboard/navy composite. All five scoped checks pass: native alpha, loader decode and fit in both engines, and ambient movement/Pause/entry handoff in both engines. The image has 64.27% fully transparent pixels, zero-alpha corners and visible bounds (32,49)–(1014,474) inside 1024 × 512. The only nonzero outer-edge wake pixels have alpha 1/255; no visible anatomy is clipped. No uncaught JavaScript errors occurred.

[Scoped results](../../.taste-skill/qa/otter-swap.json), [desktop composition](../../.taste-skill/previews/otter-swap-chromium-1440.png), [phone composition](../../.taste-skill/previews/otter-swap-webkit-390.png), [alpha composite](../../.taste-skill/previews/otter-swap-alpha.png) and [primary delivery review](../../.taste-skill/otter-review.md). Mobile touch is a synthetic integration check; no full opening-suite or physical-phone performance rerun is claimed for this asset-only revision.
