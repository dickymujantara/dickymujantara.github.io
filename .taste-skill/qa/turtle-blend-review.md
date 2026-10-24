# Focused turtle integration QA

All 18 focused browser checks passed after the turtle and its two detail crops received the tone adjustment. Exact transforms, bounds, computed filters and link hit-test results are in `turtle-blend.json`.

- At 1440 and 390 pixels, the turtle image, both complete treatment frames, both inner crops and reef water change transform automatically while scroll remains fixed. All three outer scroll wrappers stay fixed until scrolling.
- Pause freezes all nine measured scene layers, including outer scroll wrappers while scrolling. Play resumes the automatic image, frame and crop movement. Scroll movement still changes all three outer transforms, with the section remaining pinned at the header inset.
- At 1440, 1024, 768, 390 and 320 pixels, both the mid-scroll scene and the reduced-motion still scene have no horizontal page overflow. Both frames remain within the scene, with four attached handles each. Process Mining Exploration and Spring Lab are unobstructed at their link centers.
- Reduced-motion starts paused, keeps every measured scene layer still and uses natural section flow instead of sticky positioning at all five widths.
- The browser's computed styles confirm the main image's toned appearance, the separate tone adjustment on each detail clip, and the retained `url("#pixelate")` filter on the mosaic image. Applying tone on the clip preserves the existing pixel filter rather than replacing it.
- No uncaught JavaScript exceptions occurred in the tested scenes.

Visual inspection covered desktop/mobile before and after crops, final tablet mid-scroll crops and representative reduced-motion crops. The turtle's shell and anatomy remain legible while the highlights sit closer to the cool reef colors. Both detail treatments retain their distinct halftone and mosaic appearance. Existing geometry is retained; at 768 pixels the turtle's rear flipper approaches the end of the body text, while both links remain clear.

Retained artifacts in `../previews/`:

- `turtle-blend-before-1440.png` and `turtle-blend-before-390.png`: original appearance before the CSS adjustment.
- `turtle-blend-after-1440.png` and `turtle-blend-after-390.png`: first direct after crops accepted by the primary agent.
- `turtle-blend-mid-{1440,1024,768,390,320}.png`: final direct Explorations crops at the midpoint of its scroll sequence.
- `turtle-blend-still-{1440,1024,768,390,320}.png`: final direct Explorations crops with reduced motion.
- `turtle-blend.webm`: 72 actual browser section screenshots encoded at 15 fps as VP9 WebM, 577,011 bytes. It shows the turtle, both complete frames and inner crops moving together at fixed scroll.

This revision changes only decorative tone and frame colors; text, background imagery and link destinations are unchanged. No new contrast measurement or broader page recheck was performed. QA changed no website source. The temporary harness is `/private/tmp/portfolio-browser-qa/turtle-blend.cjs`. The owned preview server was stopped after verification. The primary agent owns the final delivery gate.
