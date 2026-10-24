# Dicky Mujantara's portfolio

A buildless HTML, CSS, and JavaScript portfolio with illustrated ocean scenes and locally bundled Anime.js 4.5.0.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. You can also open `index.html` directly: both scripts use ordinary deferred loading so the locally bundled animation library works with `file://` previews. No package installation or build step is needed.

## Structure

- `index.html`: sections, portfolio content, navigation, and accessible process-graph controls.
- `css/style.css`: ocean palette, responsive layouts, image treatments, and focus states.
- `js/main.js`: scroll-driven Anime.js timelines, ambient scene animation, hero pointer response, motion preferences, graph selection, and mobile navigation.
- `js/vendor/`: pinned Anime.js module and MIT license.
- `img/ocean/`: optimized illustrated WebP layers and asset provenance.

The hero, About, and Explorations hold their scenes while scrolling advances and reverses Anime.js timelines. The whale dives and scales, the dolphins and orca cross at different depths, and the turtle and treatment windows follow separate paths. The process graph draws into view, experience entries arrive with a drawing timeline, and later sections reveal as you descend. A thin navigation line shows page progress. Native wheel, touch, anchor, and keyboard scrolling remain available.

The hero also responds to pointer movement or touch. Other marine scenes swim automatically while visible. Scroll, pointer, and ambient transforms use separate nested layers. Pause motion freezes both the scroll choreography and ambient movement, remembers the choice, and keeps content readable. Play catches up to the current scroll position. Reduced motion removes pinned travel and restores the complete still layout; tall content also bypasses pinning so enlarged text remains readable. Animal movement uses independent whole-illustration layers rather than articulated fin rigs.

All three image-treatment windows move as complete frames, including their borders and corner handles, with separately moving crops inside. Their automatic motion is independent of their scroll paths and uses the same pause and reduced-motion settings.

The bright surface-water background is reserved for the hero. About uses a midwater scene, Explorations a coral/rock ledge, and Writing/Contact deep-canyon imagery. The engineering sections use separate quiet navy backgrounds. Background generation details are in `img/ocean/SCENES.md`.

The Explorations turtle uses softer highlights and muted blue tones to match the reef. Its halftone and mosaic samples receive a matching treatment on their clipping layer, preserving the existing pixelation filter and independent Anime.js movement.

The small fish silhouettes have been removed throughout the site. The footer instead contains illustrated jellyfish, a crab, and a starfish, using the shared motion controls. Smaller scale and muted blue highlights blend the creatures into the canyon, with the crab and sea star near the foreground rocks. On smaller screens the creatures have a compact area below the contact content. Their artwork provenance is in `img/ocean/INVERTEBRATES.md`.

The Graphalyze comparison is an interactive illustration, with a link to the original project screenshot. The external profile, article, and exploration links retain their existing destinations.

The site remains compatible with static hosting such as GitHub Pages. Local development does not publish changes.
