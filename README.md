# Dicky Mujantara's portfolio

A buildless HTML, CSS, and JavaScript portfolio with illustrated ocean scenes and locally bundled Anime.js 4.5.0.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. You can also open `index.html` directly: scripts use ordinary deferred loading so the locally bundled animation library works with `file://` previews. No package installation or build step is needed.

## Structure

- `index.html`: sections, portfolio content, navigation, and accessible process-graph controls.
- `css/style.css`: ocean palette, responsive layouts, image treatments, and focus states.
- `css/opening.css` and `js/opening.js`: the ocean opening and scroll-to-enter transition.
- `js/main.js`: scroll-driven Anime.js timelines, ambient scene animation, hero pointer response, motion preferences, graph selection, and section navigation state.
- `js/pixel-detail.js`: responsive canvas mosaic with a native image fallback.
- `js/vendor/`: pinned Anime.js module and MIT license.
- `img/ocean/`: optimized illustrated WebP layers and asset provenance.
- `img/favicon.svg`: original wave favicon in the portfolio palette. `favicon.ico` contains 16, 32 and 48 pixel versions; `img/favicon-32.png` is the PNG fallback and `img/apple-touch-icon.png` is the opaque 180 pixel touch icon.

The hero, About, and Explorations hold their scenes while scrolling advances and reverses Anime.js timelines. The whale dives and scales, the dolphins and orca cross at different depths, and the turtle and treatment windows follow separate paths. The process graph draws into view, experience entries arrive with a drawing timeline, and later sections reveal as you descend. A thin navigation line shows page progress. Native wheel, touch, anchor, and keyboard scrolling remain available.

On each eligible home-page load or reload, Anime.js draws three ocean ripples beneath “A little deeper.” and holds the opening until you scroll down or swipe up. There is no Skip button or automatic advance. The cue says “Scroll to enter” on desktop and “Swipe up to enter” on touch devices. The first vertical gesture reveals the hero with a 560 ms fade; ordinary page scrolling resumes afterward. Enter, Space, Arrow Down, Page Down or End also enter, while Escape and Tab provide immediate keyboard exits. Content behind the opening is temporarily inert and becomes available as it closes. The opening uses no body overflow lock; vertical input is consumed only while the opening is visible, and pinch zoom remains available.

A page opened in a background tab waits until visible. Backgrounding while the opening waits pauses its entrance; returning keeps it waiting for input. Deep links, restored pages, reduced motion, a saved pause setting or a missing animation library bypass it. Browser storage is optional; the old session marker no longer suppresses the opening. A 1.2-second fail-safe applies only after the reveal starts, so it cannot automatically open the hero while waiting.

Scroll artwork follows the current position with time-based easing: a 75 ms response on compact/touch layouts and 110 ms on desktop. Its update loop stops when the pose settles. Document geometry is cached after layout changes, including content resizing, instead of measured on every scroll frame. Mobile scenes use shorter pinned travel, smaller zoom/rotation ranges and gentler ambient movement. The page itself keeps native scrolling.

The hero also responds to pointer movement or touch. Other marine scenes swim automatically while visible. Scroll, pointer, and ambient transforms use separate nested layers. Pause motion freezes the current scroll choreography and ambient movement and remembers the choice. Play eases from the frozen pose toward the current scroll position. A saved paused startup presents complete ordinary content. Reduced motion removes pinned travel and restores the complete still layout; tall content also bypasses pinning so enlarged text remains readable. Animal movement uses independent whole-illustration layers rather than articulated fin rigs. Scene and pointer motion wait until the opening finishes.

All three image-treatment windows move as complete frames, including their borders and corner handles, with separately moving crops inside. Their automatic motion is independent of their scroll paths and uses the same pause and reduced-motion settings.

The bright surface-water background is reserved for the hero. About uses a midwater scene, Explorations a coral/rock ledge, and Writing/Contact deep-canyon imagery. The engineering sections use separate quiet navy backgrounds. Background generation details are in `img/ocean/SCENES.md`.

The Explorations turtle uses softer highlights and muted blue tones to match the reef. Its halftone and mosaic samples receive a matching treatment on their clipping layer. The mosaic is painted into a canvas with roughly 8 CSS pixel cells at the current device pixel ratio, preserving independent Anime.js movement. Its original background image remains available if canvas rendering fails.

The navigation header is hidden at widths of 767 pixels and below, with no reserved header space in the scroll scenes. Desktop navigation remains visible from 768 pixels. Arrow and motion icons use inline SVG for consistent shapes across platforms. Custom buttons reset native appearance, text size adjustment is explicit, and viewport/overflow declarations include fallbacks. Pinned chapter dimensions use the CSS viewport measurement so toolbar-only changes to the visible viewport do not alter chapter travel.

The small fish silhouettes have been removed throughout the site. The footer instead contains illustrated jellyfish, a crab, and a starfish, using the shared motion controls. Smaller scale and muted blue highlights blend the creatures into the canyon, with the crab and sea star near the foreground rocks. On smaller screens the creatures have a compact area below the contact content. Their artwork provenance is in `img/ocean/INVERTEBRATES.md`.

The Graphalyze comparison is an interactive illustration, with a link to the original project screenshot. The external profile, article, and exploration links retain their existing destinations.

The site remains compatible with static hosting such as GitHub Pages. Local development does not publish changes.
