# Full mobile header hiding

The user requested hiding the complete header on mobile. The previous rule already hid the parent at widths up to 767 pixels, but wider touch viewports could show it. The primary agent extended that parent-level rule to coarse primary pointers, covering landscape phones and touch tablets as well as narrow layouts.

`display: none` applies to `.site-header`, removing its navigation, Contact button, border and progress line together. CSS header spacing and anchor padding use the same condition. The navigation controller shares that media query, and the existing ResizeObserver now watches header dimensions so scroll geometry updates when its visibility changes. Fine-pointer desktop navigation remains available from 768 pixels. The user's current navigation order is preserved.

Reading this as: the approved illustrated ocean portfolio, energy 3 / rhythm 3 / motion 3. This revision changes header visibility and its layout measurements; it adds no visual theme or content.

## Verification

All **7 focused checks pass** in Chromium and WebKit, covering portrait phone, landscape phone, touch tablet, fine-pointer breakpoints, coarse-pointer resizing and JavaScript-disabled landscape. Hidden headers and their descendants have no rendered boxes; header height and the reserved scroll offset are zero. Desktop headers remain visible. Short landscape scenes can use the existing static-frame fallback without a sticky header inset.

The QA gap assertion uses document coordinates, `main.top + scrollY`, so a native hash-scroll adjustment cannot be mistaken for empty header space. The primary agent inspected all six final portrait, landscape and desktop captures. They use reduced motion and bypass the opening so the header state is visible directly; ordinary animated pages were exercised separately in the geometry checks. Evidence: [QA report](qa/mobile-full-header-review.md), [results](qa/mobile-full-header.json) and [mobile preview](previews/mobile-full-header-webkit-portrait.png).

`node --check js/main.js` and `git diff --check` pass. No uncaught JavaScript errors were recorded, and owned browsers and the preview server were stopped. These are browser emulation checks, not a new native iOS certification or full-site regression run. No deployment was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 / R-17 / R-18 / R-36 / R-38 PASS: no page copy, metrics, people or claims were added.
- R-03 PASS within changed scope: full-header visibility, zero spacing and responsive bounds were checked across narrow, landscape, tablet and desktop cases.
- R-23 / R-37 PASS: hiding the whole header follows the explicit request and approved direction.
- R-24 / R-26 PASS: existing destinations remain intact; hidden header links have no rendered boxes and desktop navigation remains available.
- R-25 / R-32 PASS within changed scope: colors and focus styles are untouched; parent-level hiding also removes the mobile header from keyboard layout.
- R-27 PASS: the hiding rule works with JavaScript disabled; live header measurements update enabled scroll scenes.
- R-28 / R-34 N/A: no FAQ or theme toggle was involved.
- R-33 / R-35 PASS: source was patched directly and run in both engines with retained geometry results and screenshots.

### Purpose gate

- R-01 / R-04 / R-06 / R-07 / R-08 / R-09 / R-10 / R-12 / R-13 / R-14 / R-22 PASS: no new color, icon, type, pattern, badge, surface or illustration treatment was introduced.
- R-19 PASS: scene animation remains in place; zero header offset and refreshed geometry support its existing mobile behavior.

### Liveliness

- PASS: the established energy, rhythm and motion dials remain intact.
- PASS: removing the mobile header gives the approved marine scenes their requested viewport space.
- PASS: focal points, structural spacing, icy accent and ocean motif remain the established direction.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: one shared media condition aligns rendering, navigation work and scroll spacing; the observer handles actual header dimension changes.
- C-2 / C-4 PASS within tested scope: touch/fine-pointer, breakpoint, resize and no-JavaScript states were exercised.
- C-3 / R-05 / C-5 PASS: no filler, template section or invented fact was added.
- R-11 / R-15 / R-16 / R-20 / R-21 / R-29 / R-30 PASS: established shapes, labels, copy, identity, palette and theme remain unchanged.
