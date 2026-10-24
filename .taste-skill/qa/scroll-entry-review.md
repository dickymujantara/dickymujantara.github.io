# Scroll-gated opening QA

All 23 focused checks passed across Chromium 156.0.8078.4 and WebKit 26.0: 19 main checks, two waiting/visibility checks and two early-input continuity checks. Exact observations are in `scroll-gated-opening.json`.

## Verified behavior

- Desktop at 1440 pixels and mobile at 390 pixels have no Skip button. After 3.4 seconds of idle time, the opening is still visible, hero transforms remain frozen and every wave's stroke offset has settled at zero. The cue reads “Scroll to enter” or “Swipe up to enter” in the inspected screenshots. There is no horizontal overflow, and the mobile header remains hidden.
- Main, header and motion control are inert while waiting. Desktop wheel input enters the hero, consumes that first scroll and restores the main content. The next native wheel input scrolls the document by 320 pixels in both engines. A ctrl-wheel event is not cancelled by the gate.
- A mobile tap and downward movement leave the opening waiting. An upward touch sequence enters, the hero's motion resumes and subsequent document scrolling remains possible. The upward swipe sequence is synthetic event integration, not a native physical swipe test.
- Arrow Down enters and moves focus to the hero heading. Page Down and Enter also entered in the targeted hidden-state cases, leaving no focus inside the hidden opening.
- Reduced motion, saved pause and deep links still bypass the opening.
- An initially hidden page starts its waiting opening when activated. If the active waiting page becomes hidden during the finite wave drawing, drawing pauses; visibility restoration resumes it, it settles and the opening keeps waiting. No absent-input dismissal occurred.
- No uncaught JavaScript exceptions occurred in the main focused visits.

## Final early-input refinement

The 19 main checks and two visibility checks ran before the primary agent changed three exit-animation targets from explicit start/end arrays to numeric endpoints that start at the current pose. Those changes preserve settled endpoints and do not change the waiting state, input rules or durations by source review.

The final script received two specific early-input checks: native desktop wheel in Chromium and a synthetic upward mobile gesture in WebKit. In both, input arrives while the cue is still nearly transparent; repeated samples confirm its opacity never jumps upward, and the hero is successfully revealed with the main content no longer inert. No full-suite rerun was performed for those three endpoint-only changes.

## Evidence and scope

- `scroll-gated-opening.json`: 23 passing check records, including wave offsets, idle states, native wheel positions and early cue-opacity samples.
- `../previews/scroll-gated-opening-chromium-1440.png` and `scroll-gated-opening-webkit-1440.png`: desktop waiting state.
- `../previews/scroll-gated-opening-chromium-390.png` and `scroll-gated-opening-webkit-390.png`: mobile waiting state.

Desktop Chromium and mobile WebKit screenshots were visually inspected. The waiting pose is unchanged by the final exit refinement, so those screenshots remain applicable.

Visibility activation uses a `document.hidden` override and `visibilitychange`. Mobile upward/downward gestures use synthetic touch sequences; the tap uses Playwright touchscreen input. There was no new Simulator run, physical iPhone swipe test or full page scroll-suite rerun in this revision. Earlier timed-opening and Skip-button assertions are superseded. QA edited no website source. The owned local server was stopped after verification; the primary agent owns the delivery gate.
