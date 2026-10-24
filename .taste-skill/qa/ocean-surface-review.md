# Moving ocean surface and otter blending checks

All **20 scoped checks pass** in [the machine-readable results](ocean-surface.json). Chromium 156.0.8078.4 and WebKit 26.0 load the unchanged `img/ocean/otter.webp`, apply the quieter wrapper filter and lower-edge mask, and render the inherited ocean background through the separate masked water layer. Both the standard and WebKit mask properties compute correctly.

## Composition

Each engine was captured at 1440 × 900 desktop, 390 × 844 and 320 × 568 phones, 844 × 390 touch landscape and 768 × 1024 touch tablet. All ten layouts keep the original otter, title and entry cue within the viewport without horizontal overflow or animal/text collision. The pause control remains 44 × 44 pixels. The alpha-region collision check is approximate for the small image rotation; actual screenshot inspection remains the composition check.

Screenshots are `../previews/ocean-surface-{chromium,webkit}-{1440,390,320,844,768}.png`. The QA reviewer visually inspected the [desktop moving phase](../previews/ocean-surface-chromium-1440-01-moving.png), [WebKit phone moving phase](../previews/ocean-surface-webkit-390-01-moving.png) and [WebKit landscape](../previews/ocean-surface-webkit-844.png). The illustrated face remains solid, the wake is quieter against the water, and the moving water shows no exposed rectangular edges. Root performs the delivery review separately.

## Motion and lifecycle

Actual rendered frame sequences cover ready, water moving, resumed motion, entry and hero on desktop Chromium and phone WebKit. The paths are `../previews/ocean-surface-chromium-1440-{00-ready,01-moving,02-resumed,03-entering,04-hero}.png` and the same phases under `ocean-surface-webkit-390-`. Their capture times are retained in the results. These are browser-rendered frames, not generated mockups or a performance benchmark.

Transform samples show changing water and otter matrices while the environment's transform remains `none`. Actual frame comparisons also confirm **zero changed pixels** in unobstructed coast/sky crops: 211,650 desktop pixels and 66,300 phone pixels. In clean water crops, 48.10% of 149,500 desktop pixels and 95.31% of 37,000 phone pixels change between the captured ready/moving phases. This confirms that the surface moves while the coast stays stationary.

Pause/Play and document visibility freeze/resume both water and animal motion. Entry cancels all 15 owned opening animations, restores inert content, focuses the hero, resumes its motion and permits page scrolling. Portrait-to-landscape and back switches both inherited background URLs without adding duplicate animations. Reduced motion and a saved pause bypass the opening and request no opening artwork.

Failed backgrounds leave the water at opacity zero with no image. A background stalled seven seconds reaches the existing loading deadline at approximately 4.5 seconds and also leaves water invisible. After entering, the late background cannot revive the opening or add animations. No uncaught JavaScript exceptions were recorded.

## Methods and limits

Desktop entry and subsequent scrolling use native wheel events. Phone entry uses synthetic upward touch events; subsequent mobile scrolling is programmatic. No physical iPhone, Simulator, assistive-technology, measured frame performance or full-site regression claim is made. Cached local browsers were used; no browser or dependency installation was needed. All browser processes completed and closed. Root owns the local HTTP server. This QA task changed only evidence files and temporary scripts, with no application edits.
