# Original reclining otter restoration checks

All **13 scoped checks pass** in [the results](otter-restored.json). The current opening hydrates `img/ocean/otter.webp`, the original full-body illustration matching the user's attachment. Both browsers decode its existing 1024 × 512 asset through the loading controller.

Chromium 156 and WebKit 26 were exercised at 1440 × 900 desktop, 390 × 844 and 320 × 568 phones, 844 × 390 touch landscape, and 768 × 1024 touch tablet. All ten captures fit the viewport without horizontal overflow or visible-otter overlap with the title/entry cue. The overlap check maps alpha ≥32 asset pixels into the displayed bounds; root's visual screenshot review covers the small rotation and actual composition. The pause target remains 44 × 44 pixels.

On desktop Chromium and phone WebKit, sampled transforms confirm movement, a stable paused pose and resumed motion. The existing scroll-to-enter lifecycle still completes, cancels all 14 owned opening animations, restores the page's inert state, focuses the hero and allows further page scrolling. No uncaught JavaScript exceptions were recorded.

Desktop input uses native wheel entry and subsequent scrolling. Phone entry uses a synthetic upward touch sequence; its subsequent page scroll is programmatic. These checks do not represent physical iOS Safari, Simulator, assistive-technology, measured frame performance or a full-site regression run. The browser processes completed and closed. Root owns the local HTTP server.

The first harness run compared the hydrated absolute image URL against a relative string and therefore failed only that harness assertion. The comparison was corrected to an exact path suffix and all checks were rerun; the linked JSON and screenshots describe the clean final run. No application code was modified by this QA task.

Screenshots use `../previews/otter-restored-{chromium,webkit}-{1440,390,320,844,768}.png`. Representative [desktop](../previews/otter-restored-chromium-1440.png), [phone](../previews/otter-restored-webkit-390.png), [small phone](../previews/otter-restored-webkit-320.png), [landscape](../previews/otter-restored-webkit-844.png) and [tablet](../previews/otter-restored-webkit-768.png) captures are ready for review.
