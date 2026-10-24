# Anime.js

`anime.umd.min.js` is the unmodified browser bundle from Anime.js **4.5.0**, distributed under the MIT license in `anime-LICENSE.md`.

Source: https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.umd.min.js

SHA-256: `8d5b3a58a1f64023a04a4cedeef135a2263b18da04b35177ac13438a0bad033b`

Project: https://github.com/juliangarnier/anime

Load the browser bundle before `js/main.js` with ordinary deferred scripts. It exposes `window.anime`, including `animate`, `createTimeline`, `createAnimatable`, and `onScroll`. This avoids ES module restrictions when opening the portfolio directly through `file://`, and also works when served over HTTP.

Navigation, graph selection and readable static content remain available if the animation bundle cannot load.
