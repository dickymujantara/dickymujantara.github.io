# Skills manta scene and About introduction

The later [Skills collage and audio revision](skills-collage-audio-review.md) supersedes the two-window composition and motion details below. This file retains the original asset delivery and About-copy evidence.

Skills now has its own illustrated sand-bank environment, with a manta ray on the left and the user's preferred plain category list on the right. All 26 technologies remain, grouped by Web development, Backend development, Mobile development, Data & analysis, Databases & caching, DevOps & infrastructure and Integrations. Phones place the illustration below the list.

The scene includes two detail windows matching the supplied turtle reference: a halftone close-up and a pixelated crop of the manta. The outline, corner handles, dot treatment and mosaic reuse the existing site components. Frames and crops keep their gentle ambient motion through the shared Anime.js profiles. The Skills background is static: it has neither an ambient animation flag nor a scroll transform.

Only the manta responds to scroll progress within Skills. Its outer layer glides, rotates and scales with the existing scroll timeline, while its inner image retains the slow floating movement. The heading, skill values and outer detail positions have no scroll parallax. The scene uses the same chapter controller as the other ocean sections, holds only when it fits the viewport and reverses with upward scrolling. Skills uses a one-pixel overflow tolerance so taller phone content scrolls normally; other chapters retain their existing threshold. Existing Pause, reduced-motion and visibility handling applies to both motion layers, with smaller travel on compact screens.

The mosaic renderer accepts optional crop zoom and position for the manta. Existing windows keep the previous defaults of zoom 3.5, horizontal position .7 and vertical position .35. The new crop settings stay in markup; no extra controls or implementation copy appear on the page.

## Artwork delivery

Both assets were created with the **built-in image generation tool**, using the actual whale/turtle illustrations as style and palette references. They are painted illustrations, not photographs. The background is a new sand-dune/seamount composition, rather than a reused reef, surface or canyon scene. No fish silhouettes or additional animals are baked into it.

- [skills-manta.webp](../img/ocean/skills-manta.webp): 1200 × 600, 52,822 bytes, native transparent alpha.
- [skills-sandscape.webp](../img/ocean/skills-sandscape.webp): 1536 × 865, 51,854 bytes, fully opaque background.
- [Exact prompts, reference roles and original source paths](prompts/skills-manta-assets.json).
- [Artwork provenance and mechanical WebP conversion](../img/ocean/SKILLS-MANTA.md).

The primary agent inspected both delivered images. All **4 decoded-asset checks pass** in [the asset results](qa/skills-manta-assets.json). The manta has 83.65% fully transparent pixels, clear corners and visible alpha ≥16 bounds of (197,96)–(1013,508), leaving more than 15% visible margins. Only faint alpha 1/255 reaches an outer edge. The [decoded alpha composite](previews/skills-manta-alpha.png) shows no visible rectangular matte; wings, cephalic fins and tail remain intact. Only proportional resizing and WebP encoding were performed outside the image tool.

## About copy

The introduction remains in About and now contains five sentences:

> I'm Dicky Mujantara, a software engineer based in Bandung, Indonesia. I build full-stack applications, from user interfaces to the services and databases behind them. I work with web and mobile technologies, service integrations, and deployment tools. I also explore machine learning and process mining to understand how systems and processes behave. Outside software, I'm curious about oceanography and marine life, which inspired this portfolio's ocean theme.

The source facts come from the existing portfolio and the user's supplied skills/interests. No experience level, client result or proficiency score was added. The primary agent inspected the desktop/phone copy and [final tablet view](previews/about-copy-chromium-768.png). A 24rem desktop paragraph measure and tablet-only foreground scrim keep the animals clear of the letters. [Three structural checks and the visual review pass](qa/about-copy.json).
