# Desktop opening verification

All 19 targeted checks passed in Chromium 156.0.8078.4 and WebKit 26.0. These checks cover the desktop opening correction and a small mobile regression scope; the previous full scroll suite was not repeated.

The original opening script was copied before the patch to `/private/tmp/portfolio-browser-qa/opening-before-desktop.js`. Browser route overrides loaded that exact baseline without changing website source. Both engines reproduced the old behavior: a fresh desktop visit played the opening and set `portfolio-opening-seen`; a same-tab reload then skipped it. A synthetic initially hidden page also skipped permanently, even after activation.

With the final script:

- A fresh 1440-pixel desktop visit plays the opening even if the old session marker is already present. Reload plays it again. Focused Skip dismisses the opening and returns focus to the hero title.
- An initially hidden page keeps the opening hidden, then starts it when visibility changes to visible. Hero scene transforms remain frozen during the opening and resume after dismissal.
- At 390 pixels, both the first visit and reload play the opening, the mobile header remains hidden and there is no horizontal overflow.
- Reduced motion, a saved paused state and a deep link still bypass the opening.
- Unavailable browser storage allows the opening without an uncaught exception in both engines.
- No uncaught JavaScript exceptions occurred in the focused visits.

The two-page headless background-tab probe reported `document.hidden === false` in both engines, so it did not reproduce a real operating-system background tab. The hidden-to-visible case therefore uses a deterministic `document.hidden` override and a real `visibilitychange` event. This verifies the guard/event integration rather than physical OS tab behavior. No new native iOS or physical-device run was performed for this correction.

Evidence:

- `desktop-opening.json`: baseline reproductions, final check results and headless visibility observations.
- `../previews/desktop-opening-chromium-1440.png` and `../previews/desktop-opening-webkit-1440.png`: final desktop opening screenshots, visually inspected.

The previous once-per-session and unavailable-storage-bypass assertions are superseded by this report. Back/forward restoration and other unchanged opening paths were not rerun in this targeted correction. QA edited no website source. The owned preview server was stopped after verification; the primary agent owns the delivery gate.
