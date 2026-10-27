# Current Skills collage checks

All **6 focused checks pass**, with no JavaScript errors, in [the results](skills-collage.json). These results describe the current collage without the large rectangular image plate or the rejected Glide path.

Actual Chromium was exercised at 1440 × 900 and 768 × 1024; WebKit used emulated touch profiles of 390 × 844 and 320 × 568. All 26 technologies appear exactly once in the original plain list treatment, and the five-sentence introduction remains in About. The collage stays clear of the text column and the page has no horizontal overflow. Every skills row remains reachable.

Start, middle, end and reverse samples verify scroll movement of the manta, outline frame, halftone inset and smaller outline. Their poses return on reverse scrolling. The background has no motion attribute, no inline transform and computed transform `none`; its style and background position remain identical across time and scroll. The heading likewise stays still. Pause freezes foreground scroll changes, and Play resumes at the current position. Reduced-motion and saved-pause profiles preserve the static collage and complete list.

The crop/manta overlap check uses native pixels rather than rectangular image boxes. All 112,307 native manta pixels with alpha ≥32 are projected through the actual outer scroll and inner ambient affine transforms. Their viewport positions are tested against the transformed halftone-inset polygon. There are **zero occluded manta pixels at every tested start/middle/end/reverse sample in all four profiles**. This establishes that the inset does not cover the manta's head or body at the sampled poses; visual inspection also confirms the clear separation.

The explicit phone artwork height renders as 385px at 390px width and 308px at 320px width, avoiding the previous WebKit aspect-ratio collapse. The `Manta ray` caption sits below the lower inset without touching its border in the inspected desktop and phone views.

Inspected current captures: [desktop overview](../previews/skills-collage-chromium-1440.png), [phone overview](../previews/skills-collage-webkit-390.png), [desktop end](../previews/skills-collage-chromium-1440-end.png), [tablet start](../previews/skills-collage-chromium-768-start.png), [phone end](../previews/skills-collage-webkit-390-end.png) and [small-phone start](../previews/skills-collage-webkit-320-start.png).

Scroll positions, reverse checks and reachability are programmatic. Audio behavior was excluded because it is being delivered and verified separately; the new sound control is visible in current captures. No physical iOS, frame-performance, assistive-technology or full-site audit is claimed. Browser processes closed cleanly; the root-owned preview server was left untouched. This task changed no implementation source or production asset.
