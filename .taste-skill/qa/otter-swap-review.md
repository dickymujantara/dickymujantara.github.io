# Revised illustrated otter verification

All **five focused checks pass** for the replacement `img/ocean/otter-v3.webp`. Only this asset replacement and its immediate opening integration were checked; the full opening suite was not repeated.

Chromium 156 and WebKit 26 rendered the current opening at desktop 1440 × 900 and mobile 390 × 844. The new asset decodes through the existing loader, reaches full opacity, fits the scene without horizontal overflow, and retains the otter's Anime.js movement. Local Pause freezes that transform and Play resumes it. Native desktop wheel and a synthetic mobile upward swipe enter the hero, restore covered content, cancel the observed opening animations and leave the hero without a blue heading outline. No uncaught JavaScript exceptions were recorded.

Native decoded RGBA canvas inspection confirms a genuine transparent cutout: **64.27%** of pixels are fully transparent, all four corner alphas are zero, and visible alpha ≥16 bounds are (32, 49) through (1014, 474) inside the 1024 × 512 image. Highest outer-edge alpha is only 1/255 from the faint wake; there is no visibly clipped anatomy. Maximum alpha is 254/255, consistent with the generated asset. File size is 80,332 bytes.

The reviewed scene captures show a clearer profile face, relaxed forepaws and broad painted body shapes. The old front-facing face, large symmetric foot pads and dense white fur strokes are absent. The new artwork remains painted illustration rather than photography; final design acceptance belongs to the primary agent and user.

Evidence:

- [Machine-readable results](otter-swap.json)
- [Desktop scene](../previews/otter-swap-chromium-1440.png)
- [Mobile WebKit scene](../previews/otter-swap-webkit-390.png)
- [Actual checkerboard and navy alpha composite](../previews/otter-swap-alpha.png)

The mobile gesture is synthetic integration input; no physical iPhone, native Simulator or assistive-technology certification was performed. No site source was edited by QA. All browser processes completed, and the owned preview server session 66273 was stopped cleanly after the checks.
