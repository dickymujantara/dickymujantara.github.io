# Full mobile header verification

All 7 focused checks passed in actual Chromium 156.0.8078.4 and Playwright WebKit 26.0. QA made no application source edits.

Each engine covered these viewport/pointer combinations:

| Viewport | Pointer | Expected and observed header |
| --- | --- | --- |
| 390×844 | Coarse | Entire header hidden |
| 844×390 | Coarse | Entire header hidden |
| 1024×768 | Coarse | Entire header hidden |
| 1440×1000 | Fine | Desktop header visible, 73px tall |
| 768×1000 | Fine | Desktop header visible, 73px tall |
| 767×1000 | Fine | Entire header hidden |

Hidden cases have `display:none`, zero header height, no rendered boxes for the header, nav, nav links, Contact, or progress bar, and `--header-size:0px`. Main starts at document y=0 with no header gap. Sticky scenes use a zero inset; short landscape scenes may correctly switch to the existing static layout. No horizontal overflow occurred.

In each engine a coarse-pointer page was resized from portrait to landscape to 1440px desktop width. Header and scene offsets stayed zero throughout. A JavaScript-disabled 844×390 coarse-pointer visit also hid the complete header without reserving space. No uncaught JavaScript errors occurred.

Screenshots use reduced motion at settled `#home`, with opening state `done` and scroll y=0, so the overlay cannot conceal the header. The geometry suite separately exercised ordinary animated pages. Desktop captures show the complete navigation and Contact; portrait and landscape show content starting without a header.

- [Detailed results](mobile-full-header.json)
- [Chromium portrait](../previews/mobile-full-header-chromium-portrait.png), [landscape](../previews/mobile-full-header-chromium-landscape.png), [desktop](../previews/mobile-full-header-chromium-desktop.png)
- [WebKit portrait](../previews/mobile-full-header-webkit-portrait.png), [landscape](../previews/mobile-full-header-webkit-landscape.png), [desktop](../previews/mobile-full-header-webkit-desktop.png)

Scope: viewport and pointer emulation in two browser engines, including the 767/768 boundary, resize, and CSS-only behavior. No physical device, native Simulator, opening-flow or broad page regression rerun. Gap assertions use document coordinates so native hash/scroll adjustments do not count as reserved header space. Browsers and the owned local preview server were stopped after verification.
