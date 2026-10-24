# Smiling head implementation verification

All **9 focused check groups pass** in actual Chromium 156.0.8078.4 and Playwright WebKit 26.0. The run used the final `img/ocean/otter-head-smile.webp` asset, responsive placement and gentler ambient profile. QA changed only temporary tooling and saved evidence; application source remained with the primary agent.

## Scope and results

- The new asset decodes through the existing wave loader and appears in the waiting surface scene. The loader is hidden afterward, page scroll remains at zero, and there are no late partial placeholders.
- In both engines, the image and its visible alpha bounds fit all five profiles: 320 × 568, 390 × 844, 844 × 390 short landscape, 768 × 1024 touch tablet and 1440 × 900 fine-pointer desktop. Visible otter/ripple bounds do not overlap the title or entry cue, and the page has no horizontal overflow. The local control remains at least 44 × 44 pixels. The header is fully hidden on the four touch profiles and retains its 73-pixel desktop height.
- Actual scene captures were visually reviewed against the approved smiling-head preview. Only the otter's head and attached waterline ripples are visible; no paws, torso, shell or other held object appears. The head blends with the water without an opaque rectangle or visible halo. The friendly, closed-mouth expression and cool illustrated palette remain.
- The head's transform changes during gentle bobbing. Keyboard activation of Pause freezes the exact pose over the sampled interval, exposes the Play glyph and preserves the button's focus indicator. Play resumes movement.
- Desktop native wheel entry and a synthetic mobile upward swipe trigger the existing surface descent. The opening finishes, restores background inert state, cancels all observed opening-owned Anime.js instances and focuses the hero heading without the blue outline. Hero movement resumes. Subsequent scrolling works through native desktop wheel and programmatic mobile scroll.
- Reduced motion and the saved site-wide pause preference bypass both loader/opening and request no opening artwork.
- An intercepted 404 for the new head alone settles without trapping the loader. A head request stalled for 7 seconds reaches the 4.5-second loading bound, exposes the usable opening, and permits entry. The delayed completion cannot revive the dismissed scene or create a new animation. These intentional failures do not require other scene assets to fail.
- No uncaught JavaScript exceptions occurred. Expected console 404 messages in the intentional missing-head case are not application exceptions.

[Machine-readable check results and geometry](smiling-head.json) retain every assertion, visible-alpha mapping, pose samples, loading timing and final lifecycle state. The first initial WebKit capture required a temporary harness cache-path/require-order correction; the application did not change for that correction. The final nine groups all passed on the frozen implementation.

## Visual evidence

- [Two-engine, five-profile contact sheet](../previews/smiling-head-contact-sheet.png).
- [Desktop final scene](../previews/smiling-head-chromium-1440.png) and [mobile WebKit final scene](../previews/smiling-head-webkit-390.png).
- [Small phone](../previews/smiling-head-webkit-320.png), [touch tablet](../previews/smiling-head-webkit-768.png) and [short landscape](../previews/smiling-head-chromium-844.png).
- [Desktop transition still](../previews/smiling-head-transition-chromium-1440.png) and [mobile transition still](../previews/smiling-head-transition-webkit-390.png).

All final screenshots are named `smiling-head-{chromium,webkit}-{320,390,768,844,1440}.png`. Initial captures used an `initial-` prefix and were reviewed before the final run. No additional look-fix was needed after those initial captures.

## Recordings and limits

[Desktop H.264 MP4](../previews/smiling-head-chromium-1440.mp4) contains 84 actual rendered browser frames, encoded at 15 fps for 5.60 seconds. [Mobile WebKit H.264 MP4](../previews/smiling-head-webkit-390.mp4) contains 85 frames for approximately 5.67 seconds. Both show the loader, waiting smiling head and descent into the whale hero. Encoding uses installed macOS AVFoundation from the captured JPEG frames. Both MP4s decode in WebKit at the correct dimensions with readyState 4 and no media error; decoded frame captures were inspected and display upright. File metadata and playback results are saved in the check JSON.

Encoded FPS is not a device rendering-performance measurement. Mobile swipe is synthetic, mobile follow-up scroll is programmatic, and reduced-motion/pointer flags are browser emulation. There was no physical iPhone, native Simulator, assistive-technology, exhaustive contrast or full-site choreography rerun. Independent native-alpha asset checks are recorded by the asset-delivery task separately. The scope here is the new head's visible composition and immediate loader/motion/hero handoff.

All browser and encoder processes completed. The owned local preview server, exec session 70288, stopped cleanly with exit code 0 after playback validation. `git diff --check` passes.
