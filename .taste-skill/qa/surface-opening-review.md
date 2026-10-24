# Surface opening verification

All **29 focused checks passed** in actual Chromium 156.0.8078.4 and Playwright WebKit 26.0. QA edited only temporary tooling and retained evidence; application changes remain owned by the implementation agents.

The responsive checks covered 320×568 and 390×844 phones, 844×390 landscape, 768×1024 touch tablet, and 1440×1000 fine-pointer desktop in both engines. Native title, cue, Pause control and separate animal layers remain visible without horizontal overflow. Mobile/coarse-pointer headers remain fully hidden; desktop retains its header.

Verified behavior:

- No Skip control or automatic advance. The opening continues waiting after the entrance settles while water, otter, seal and both birds move independently. The underlying hero remains frozen until entry.
- Local Pause freezes ambient transforms, exposes its Play icon, and resumes through native keyboard activation without entering. It does not save a site-wide paused preference. Tab reaches the exposed Pause control; Escape exits; keyboard entry restores hero focus and removes the temporary heading tabindex after blur.
- Desktop native wheel and a mobile upward touch sequence produce the waterline transition, restore inert state and permit ordinary page scrolling afterward. Pre-existing header inert state is preserved. Hero animation resumes after the opening closes.
- Every opening-created Anime.js instance observed through route-local instrumentation is canceled at finish. Dismissed layers stop changing, and art delayed by 2.6 seconds cannot revive a closed opening.
- Initial hidden activation, active hidden ambient pause/resume, and a locally paused state across hide/show work. Reduced motion, saved site pause, deep links and native back navigation bypass the opening.
- Missing art leaves readable native text and a working entry. Direct-file art loading and controls work. Missing Anime.js and JavaScript-disabled visits expose ordinary page content. No uncaught JavaScript exceptions occurred; HTTP404 console messages in the deliberate missing-art case are expected.

The first run exposed three harness assumptions, then only those checks were repeated: captures now wait for the cue’s later entrance, and WebKit keyboard activation explicitly focuses the Pause button through Tab because a pointer click need not focus a native button. No application changes were required for those reruns.

## Text on imagery

Scoped background screenshots were taken with ambient motion paused, then compared beneath high-coverage native text glyph interiors. Sampled minima after the contrast correction:

| Viewport | Large title | Scroll/swipe cue |
| --- | --- | --- |
| 320×568 | 4.20:1 | 13.74:1 |
| 390×844 | 4.38:1 | 14.92:1 |
| 844×390 | 5.38:1 | 12.08:1 |
| 1440×900 | 6.81:1 | 16.29:1 |

These exceed the 3:1 large-text and 4.5:1 ordinary-text thresholds at the sampled poses. This is a focused imagery check, not a claim of exhaustive site-wide contrast certification.

## Retained evidence

- [Machine-readable checks and playback metadata](surface-opening.json)
- [Scoped contrast samples](surface-opening-contrast.json)
- [Final two-engine contact sheet](../previews/surface-opening-contact-sheet.png)
- [Chromium desktop H.264 MP4](../previews/surface-opening-chromium-1440.mp4) and [WebM](../previews/surface-opening-chromium-1440.webm)
- [WebKit mobile H.264 MP4](../previews/surface-opening-webkit-390.mp4) and [WebM](../previews/surface-opening-webkit-390.webm)
- [Desktop waterline transition](../previews/surface-opening-transition-chromium-1440.png) and [mobile transition](../previews/surface-opening-transition-webkit-390.png)

Individual final screenshots use `previews/surface-opening-{chromium,webkit}-{320,390,768,844,1440}.png`. Initial and contrast-review captures are retained separately; the contact sheet uses the final current implementation.

The recordings contain actual browser screenshots encoded at 15fps: 97 desktop frames and 95 mobile frames. Identical JPEG frames were encoded to H.264 through installed macOS AVFoundation; both MP4 files decoded upright in WebKit with correct dimensions, readyState4 and no media error. Encoded FPS is not a browser rendering-performance measurement. Chromium entry/scroll uses native wheel input; the WebKit mobile swipe is a synthetic touch sequence and subsequent scroll is programmatic.

Scope limits: no physical phone or native Simulator rerun, and document visibility is simulated in the headless integration checks. Full-site scroll choreography was not retested; this task verifies the new opening and the immediate hero/native-scroll handoff. All browser and encoder processes completed, and owned preview server43455 was stopped cleanly after evidence validation.
