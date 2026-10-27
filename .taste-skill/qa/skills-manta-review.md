# Final manta Skills scene checks

All **7 focused checks pass**, with no JavaScript errors, in [the results](skills-manta.json).

Actual Chromium was exercised at 1440 × 900 and 768 × 1024; WebKit used emulated touch profiles of 390 × 844 and 320 × 568. Every profile retains all 26 technologies exactly once across seven plain definition-list rows. The five-sentence introduction appears once in About and is absent from Skills. Every skills row remains reachable by scrolling.

The actual computed Skills background resolves to `skills-sandscape.webp`, distinct from every other water-layer background. The single decorative manta decodes as `skills-manta.webp`, with no jellyfish remaining in this section. Desktop and tablet place visible manta artwork left of the text; phone artwork follows the list. Bounds checks cover no horizontal overflow, visible-anatomy containment, no image/text overlap and Skills/Work separation.

Chromium and WebKit independently decode native image alpha through an unscaled canvas. The 1200 × 600 delivery is 83.65% fully transparent, has zero-alpha corners and a maximum outer-edge alpha of 1/255. Visible alpha ≥16 bounds are (197,96)–(1013,508); maximum alpha is 254/255. This matches the asset agent's independent results. Intentional CSS canvas overscan does not clip the visible wings, cephalic fins or tail. Layout checks map the actual alpha bounds into displayed bounds and are supplemented by visual review because the image rotates slightly.

All four captures were visually inspected. The manta blends into the new sand-dune scene without an opaque box, halo plane or visible edge seam; its complete anatomy remains visible and the right-hand text stays clear. [Desktop](../previews/skills-manta-chromium-1440.png), [tablet](../previews/skills-manta-chromium-768.png), [phone](../previews/skills-manta-webkit-390.png), [small phone](../previews/skills-manta-webkit-320.png).

In both engines, sampled transforms confirm movement of the water and manta, a stable paused pose and resumed movement after Play. WebKit's reduced-motion profile keeps art still and content visible. These checks exercise the existing shared ambient lifecycle; no separate new controller was introduced by QA.

Reachability uses DOM/programmatic scrolling. No physical iOS, measured frame-performance, assistive-technology or full-site audit is claimed. Browser processes closed cleanly; the root-owned server was left untouched. This QA task changed no application source or production asset.
