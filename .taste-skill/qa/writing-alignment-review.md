# Writing card alignment verification

All 7 focused checks passed on the final shared `.article-list` animation. No application source was edited by this QA task.

Tested actual Chromium 156.0.8078.4 and Playwright WebKit 26.0 at desktop 1440×1000 and mobile-emulated 390×844. Visits used `#writing` to bypass the opening. Browser geometry was sampled during easing and after settling, moving forward from Writing entry to the native document bottom and then backward. Reduced-motion desktop visits were checked separately.

- Desktop: each engine sampled 54 animated poses and 27 reduced-motion poses. The two card top edges and bottom edges differed by exactly 0px at every sampled instant. Individual cards have no independent transform.
- Shared motion remains active: the row translation changes from approximately 40px near entry to 8.3px at the reachable desktop page bottom. Full timeline completion is not reachable at this viewport height and was not assumed.
- Mobile: each engine sampled 36 poses. The stacked gap remains exactly 16px; left edges and widths match, and document width stays within 390px. The mobile header remains hidden.
- No uncaught JavaScript exceptions occurred. All four direct Writing section crops were inspected; desktop borders align and mobile stacking remains clear.

Evidence:

- [Machine-readable results](writing-alignment.json)
- [Chromium desktop](../previews/writing-alignment-chromium-1440.png)
- [WebKit desktop](../previews/writing-alignment-webkit-1440.png)
- [Chromium mobile](../previews/writing-alignment-chromium-390.png)
- [WebKit mobile](../previews/writing-alignment-webkit-390.png)

Scope: focused scroll/geometry verification, 234 total sampled poses. Mobile is browser device emulation; no physical iPhone, native Simulator, broad page regression or opening-flow rerun was needed. The local preview server and both browser processes were stopped after verification.
