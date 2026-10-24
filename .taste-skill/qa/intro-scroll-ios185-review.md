# Native iOS 18.5 opening and chapter visual probe

Verified the frozen local implementation in native Mobile Safari on the iPhone 16 Pro Simulator, using the installed iOS 18.5 runtime, build 22F77. This is actual iOS Simulator rendering, separate from Playwright WebKit mobile emulation. No physical iPhone was tested.

The probe booted the previously shut-down device `E49EC1BA-DBDD-4155-9BE1-DDECA660DA93` and served the current repository on the fresh local origin `http://127.0.0.1:4176`. No website source, Safari automation preferences, or installed runtimes were changed.

## Observed results

- PASS: the first visit displays the opening title and three SVG water strokes. Decoded native video frames at 12.8 and 13.3 seconds show the strokes progressing from partial lengths to complete waves.
- PASS: the opening fades into the hero and disappears. The settled native hero capture shows the headline, whale, action links, scroll prompt, and pause icon.
- PASS: the mobile site navigation remains hidden. No hard vertical light-layer seam or clipped hero text is visible in the settled native capture.
- PASS: native URL-anchor navigation displays the About chapter with the orca, two dolphins, and framed halftone detail. The frame border and corner handles remain visible.
- PASS: native URL-anchor navigation displays the Explorations chapter with the blue turtle, halftone frame, and slate-blue canvas mosaic. The mosaic contains distinct blocks and retains its border and corner handles.
- PASS: the chapter captures retain their distinct backgrounds: dark midwater for About, reef for Explorations, and canyon for Contact.
- PASS: Contact displays both jellyfish, the crab, and starfish. No fish silhouettes are visible; footer text and external-link line icons remain legible in the captured state.

## Evidence

- [Native opening clip](../previews/intro-scroll-ios185-opening-clip.mp4)
- [Opening while waves draw](../previews/intro-scroll-ios185-opening-wave-draw.png)
- [Completed opening waves](../previews/intro-scroll-ios185-opening-mid.png)
- [Settled hero](../previews/intro-scroll-ios185-hero.png)
- [About](../previews/intro-scroll-ios185-about.png)
- [Explorations and canvas mosaic](../previews/intro-scroll-ios185-explorations.png)
- [Contact](../previews/intro-scroll-ios185-contact.png)

The native recording began before `simctl openurl` launched Safari. The initial 0.7-second screenshot attempt captured Safari's black launch screen; that file is explicitly labeled `intro-scroll-ios185-safari-launch.png`. The approximately 3-second capture after `openurl` returned shows the opening, and the approximately 6-second capture shows the settled hero. These are launch-relative timings, not measured animation durations.

The raw opening recording is 19.788 seconds long and includes the Simulator home screen before Safari launch. The linked 7-second MP4 clip trims that recording from 12.5 seconds and preserves the native pixels, showing the wave drawing, fade, and settled hero. Apple's media framework successfully decoded the native recording; the limited Playwright FFmpeg binary lacks a QuickTime demuxer, so it was not used to validate this file. The raw opening and chapter recordings remain available as `intro-scroll-ios185-opening-raw.mov` and `intro-scroll-ios185-chapters-raw.mov`.

## Scope and cleanup

Native actions were Simulator boot, `simctl openurl`, `simctl io screenshot`, and `simctl io recordVideo` with graceful SIGINT completion. Chapter navigation used URL anchors, not native touch or swipe gestures. This probe does not claim physical touch scrolling, opening-skip activation, session-once behavior, reduced-motion preference changes, keyboard or VoiceOver coverage, or automated native scroll-progress assertions. The parent cross-engine harness covers the corresponding automated browser behavior separately.

The probe stopped its owned port 4176 preview server and shut down the device it booted. It did not stop the parent agent's port 4173 server. No website source was edited by this probe.
