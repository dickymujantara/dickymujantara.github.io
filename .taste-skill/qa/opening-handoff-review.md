# Opening to portfolio handoff

Both focused browser checks pass: Chromium1440×900 and touch-emulated WebKit390×844. The capture used the current1650ms desktop and1450ms compact transition.

The requestAnimationFrame log contains87desktop samples and131phone samples. The hero’s bounds, heading transform and whale outer transform remain unchanged throughout entry and at the first frame after the opening hides. Scroll remains0; viewport dimensions remain fixed. Entry causes no navigation. Main controls change from hidden/inert to available only after the opening finishes. No page errors were recorded.

Actual before, early, middle, late, handoff and after screenshots show a continuous ocean crossfade. None of the captured screenshots is a flat blank frame. Minimum sampled luminance standard deviation is39.4/255 on desktop and17.8/255 on phone. This statistic supports the screenshot review; it does not establish that every rendered frame was captured.

Evidence: `opening-handoff.json`, `../previews/opening-handoff-chromium-1440.png`, and `../previews/opening-handoff-webkit-390.png`. The complete PNG capture streams remain under `/private/tmp/portfolio-browser-qa/opening-handoff-*`.

Limits: Chromium entry used a native wheel event. WebKit entry used a synthetic upward touch sequence because the browser API exposes no native swipe command. This validates actual WebKit rendering and touch-handler behavior, not a physical iOS gesture or browser-toolbar transition. Screenshot cadence and rAF sample counts are not animation-performance measurements. Audible sound was outside this pass. All browser contexts were closed; the root-owned server remains running.
