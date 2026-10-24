# Loading, opening artwork and focus verification

All **19 focused checks passed** in Chromium 156.0.8078.4 and WebKit 26.0 on the frozen implementation. QA changed temporary browser tooling and retained evidence only; application source remained with the primary agent.

The reported blue box was reproduced before the fix: the programmatically focused `#hero-title` matched `:focus-visible` and received a 2-pixel blue outline with a 6-pixel offset. The [before capture](../previews/opening-loading-before-hero-focus.png) records it. Final desktop and mobile hero captures show no heading outline, while the actual Pause button and hero link retain visible focus styling.

## Focused behavior

- The status-labelled loader is visible before the scene, title, cue or local Pause control. `aria-busy` changes from true during loading to false in the waiting opening. Five image-decode calls are observed for the current background, otter, seal and two gull instances.
- The short minimum loading presentation is retained. Artificially delaying image decode by 1.4 seconds keeps the opening hidden until decoding settles. The underlying hero remains still while covered.
- Missing resources settle without trapping the loader. Requests delayed by 5.5 seconds reach the configured 4.5-second fallback, expose readable entry controls, and allow entry. Late completions cannot revive a dismissed opening.
- Initial wheel/swipe input during loading is consumed and does not skip the waiting scene. A finger begun before readiness cannot enter merely by continuing its move after readiness; a fresh upward swipe enters normally.
- The opening continues to wait rather than automatically opening the hero. Ambient art moves independently and local Pause freezes it; native Space activation resumes the control without entering. The Play glyph remains visible in its paused state.
- Entry restores the covered content, focuses the hero without the blue box, cancels all observed opening-owned Anime.js objects and resumes hero movement. Ordinary subsequent scrolling works. Desktop uses native wheel; mobile WebKit uses a synthetic touch sequence and programmatic follow-up scroll.
- Loading movement pauses in a simulated hidden document. Decoded art stays covered while hidden and is exposed when the document becomes visible. Escape during loading cancels its loop and prevents late callback reactivation.
- Reduced motion, a saved motion pause, deep links, missing Anime.js and JavaScript-disabled visits bypass both loading and opening and request no opening artwork. Direct-file loading also works at the alternate mobile/desktop composition. Phone headers remain hidden.

The initial run passed 18 of 19 groups. The remaining mobile WebKit group required two harness corrections, with no application change: the test explicitly focuses the real hero link instead of assuming WebKit's native Tab policy moves to it, and uses programmatic follow-up scroll because Playwright mobile WebKit does not support `mouse.wheel`. Only this group was repeated; it now passes. No uncaught JavaScript exception was recorded.

## Artwork readability and movement evidence

The current loader/opening/hero states were inspected at 1440 × 900 and 390 × 844 in both engine profiles, including direct-file alternate compositions. [Contact sheet](../previews/opening-loading-contact-sheet.png) compares the stages. The revised coastline has softer, darker water and clouds; the otter uses quieter highlights. Both compositions retain clear titles and entry cues.

Scoped contrast sampling compares actual native glyph interiors against the paused rendered imagery beneath them:

| View | Large title minimum | Cue minimum |
| --- | ---: | ---: |
| 390 × 844 | 5.04:1 | 16.76:1 |
| 1440 × 900 | 12.32:1 | 16.26:1 |

The title samples exceed the 3:1 large-text threshold; cues exceed the 4.5:1 normal-text threshold. [Machine-readable contrast evidence](opening-loading-contrast.json) records the method and sampled pixels. This is a focused opening check, not exhaustive site-wide contrast certification.

The short recordings also verify the visible Anime.js loader actually changes: over approximately 350 milliseconds, the first wave's dash offset changes from 75.47 to 43.50 pixels in Chromium and 75.54 to 35.84 pixels in WebKit, with corresponding opacity changes. The other two wave paths change as well. This is native rendered movement, not a static loader graphic or fake percentage.

## Retained evidence and limits

- [19 checks, phase/decode/cancellation observations and recording metadata](opening-loading.json)
- [Desktop H.264 MP4](../previews/opening-loading-chromium-1440.mp4): 95 actual browser frames, encoded at 15 fps, approximately 6.33 seconds.
- [Mobile WebKit H.264 MP4](../previews/opening-loading-webkit-390.mp4): 98 actual browser frames, encoded at 15 fps, approximately 6.53 seconds.
- [Desktop loader](../previews/opening-loading-chromium-1440.png), [opening](../previews/opening-loading-opening-chromium-1440.png) and [hero](../previews/opening-loading-hero-chromium-1440.png).
- [Mobile loader](../previews/opening-loading-webkit-390.png), [opening](../previews/opening-loading-opening-webkit-390.png) and [hero](../previews/opening-loading-hero-webkit-390.png).
- [Desktop transition still](../previews/opening-loading-transition-chromium-1440.png) and [mobile transition still](../previews/opening-loading-transition-webkit-390.png).

Both MP4s were encoded from the actual captured JPEG frames using installed macOS AVFoundation H.264. They decode in WebKit at correct dimensions with `readyState` 4 and no media error. Encoded FPS is not a device rendering-performance benchmark.

Mobile swipe and document visibility are synthetic integration events. There was no physical iPhone, native Simulator, VoiceOver or full-site choreography rerun. All browser and encoder processes completed, and the owned preview server session 99454 exited cleanly after playback validation. `git diff --check` passes.
