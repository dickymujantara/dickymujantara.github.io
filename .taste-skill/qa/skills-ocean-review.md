# Skills marine scene checks

All **6 focused checks pass**, with no JavaScript errors, in [the results](skills-ocean.json).

Actual Chromium was exercised at 1440 × 900 and 768 × 1024. Actual WebKit used emulated touch viewports of 390 × 844 and 320 × 568. All 26 technologies appear exactly once across seven plain definition-list rows. The reef background is loaded, both existing jellyfish decode at 512 × 768, and the animals remain decorative with empty alt text and an aria-hidden container.

Desktop and tablet place the art strictly to the right of the content column. Phone art follows the list with no image/text overlap. Bounds checks cover image containment, no horizontal overflow, Skills/Work separation and access to every row by scrolling. The four actual captures were inspected: the transparent illustrations blend into the reef without an opaque rectangle or hard seam, their appendages remain intact, and the text stays on the quiet dark part of the scene.

In both engines, sampled transforms confirm movement of the water and both jellyfish, a stable pose under Pause, and resumed motion after Play. These tests exercise the existing shared ambient lifecycle, not a separate new animation controller.

Screenshots: [desktop](../previews/skills-ocean-chromium-1440.png), [tablet](../previews/skills-ocean-chromium-768.png), [phone](../previews/skills-ocean-webkit-390.png) and [small phone](../previews/skills-ocean-webkit-320.png).

Mobile input and row reachability use programmatic scrolling. No physical-device, measured frame-performance, assistive-technology or full-site audit is claimed. Browser processes exited cleanly; the root-owned preview server was left untouched. This QA task changed no application source.
