# Skills collage and ocean sound

The later [surface introduction and underwater revision](surface-underwater-review.md) supersedes the audio timing, mix and control placement below. The Skills collage and its unobstructed manta layout remain as reviewed here.

The collage reference applies only to the Skills artwork. The existing ocean theme, right-hand plain skills list and section order are retained. All 26 technologies remain in seven categories. About retains its five-sentence introduction.

The artwork uses the manta illustration, a halftone detail crop, fine ivory frames and small registration crosses. The marked rectangular duplicate of the ocean background has been removed. The manta sits higher and the inset is smaller and lower, leaving the animal's head and body unobstructed. A quiet caption sits below the inset. The collage is decorative, not a scientific measurement or an interactive editor.

The section's sand-bank background is static. Only foreground artwork responds to the existing Anime.js scroll timeline: the manta glides and turns, and the inset and outlines move by smaller amounts. The inner manta retains the previously requested ambient float. Shared Pause, reduced-motion and visibility handling applies. Tall phone layouts scroll normally, with the list followed by the artwork; explicit mobile illustration height avoids WebKit's collapsed grid aspect-ratio case.

## Artwork and provenance

No new raster art was generated for the collage. It composes the already delivered [transparent manta](../img/ocean/skills-manta.webp) and [sand-bank environment](../img/ocean/skills-sandscape.webp) using HTML, CSS and SVG. The painted marine style and navy, slate, icy blue and ivory palette follow the approved whale imagery. The two source illustrations were created with the built-in image generation tool and mechanically encoded as WebP. [Exact prompts and source paths](prompts/skills-manta-assets.json) and [asset delivery details](../img/ocean/SKILLS-MANTA.md) remain available.

## Sound direction

The [Pinterest reference](https://id.pinterest.com/pin/859554278889263323/) was inspected read-only. Its title is “Creative Fish Website Landing Page Design,” posted by IndyLogix Solutions; the approximately 30-second clip contains an audio track. The soundtrack could not be auditioned with the available tools and its metadata identifies no track or reuse license. No reference audio was copied into the site, and a sonic match is not claimed.

The user selected “Ocean waves with soft ambient music.” The site therefore uses an original native Web Audio composition rather than a downloaded recording. It prepares silently during the introduction and plays a short wave swell after actual entry, followed by a quiet ocean and musical bed. An explicit sound control is available in the opening and page, independently of motion. Browser autoplay policy can require a tap or key press; the control reports whether sound is enabled rather than implying that blocked sound is playing.

## Verification

The primary agent inspected final desktop and phone browser captures and corrected both manta placement and mobile collage height. [Six focused collage checks pass](qa/skills-collage.json), with no page exceptions, at Chromium 1440/768 and WebKit 390/320. Checks cover all 26 skills, natural phone scrolling, absent duplicate plate, fixed background, moving foreground layers, reverse scrolling, Pause, saved pause and reduced motion. The transformed inset covers zero sampled native manta pixels with alpha at least 32 at the tested start, middle, end and reverse positions.

All [26 native audio/browser checks pass](qa/ocean-audio.json) in Chromium and WebKit. They verify silent introduction, sound preparation without playback, two-control opening keyboard cycling, post-entry output, mute and reload persistence, reuse of one audio context without duplicate wave sources, explicit deep-link activation, suspension and resumption, no page exceptions and the unsupported-audio fallback. A live analyser confirms nonzero output after entry and zero before it. Visibility events are simulated; the audio contexts themselves are native. The sound is an original three-voice sine pad with a sparse four-note phrase over filtered ocean noise; the quiet master gain fades in and out without abrupt cuts.

Current previews: [desktop](previews/skills-collage-chromium-1440.png) and [phone](previews/skills-collage-webkit-390.png). JavaScript syntax and `git diff --check` pass. Physical iPhone behavior, sound quality through actual speakers and frame performance are outside this browser check. No commit or deployment was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 / R-17 / R-18 / R-36 / R-38 PASS: no fabricated metrics, claims, testimonials or proficiency levels; illustrations, sound authorship and reference limitations are stated accurately.
- R-03 / R-25 / R-32 PASS within scope: the readable plain list uses the established high-contrast palette; responsive layout, native definition-list structure, named controls and visible keyboard focus are retained.
- R-23 / R-37 PASS: the user's ocean direction and Skills-only collage scope govern the change, including the latest duplicate-image removal and unobstructed manta requirement.
- R-24 / R-26 / R-27 PASS within scope: existing links remain concrete; motion controls, sound activation/mute, browser lifecycle and still/unavailable fallbacks are checked.
- R-28 / R-34 N/A: no FAQ or theme switch added.
- R-33 / R-35 PASS: scoped HTML/CSS/JS patches ran in actual Chromium and WebKit, with retained captures and current test evidence.

### Purpose gate

- R-01 / R-06 / R-21 / R-22 / R-29 PASS: established typography and marine colors unify the new composition with the approved portfolio.
- R-04 / R-07 / R-08 / R-09 PASS: registration crosses and framing follow the user's explicit collage reference; they are confined to artwork. Speaker marks represent a real sound control. No decorative status metrics or labels were invented.
- R-10 / R-12 / R-13 / R-14 PASS: no glass, shadow, glow or card system was introduced; the plain categorized skills list remains the reading surface.
- R-19 PASS: foreground scroll motion creates depth while the background remains still to address the user's dizziness. Ambient motion follows explicit user direction and remains pausable.

### Liveliness

- PASS: energy 3, rhythm 3, motion 3 follow the established art direction. The framed manta composition provides a distinct Skills focal point, while quiet text and a fixed background preserve readability.
- PASS: the user's reference is expressed through overlapping crops, halftone, registration marks and fine frames, without changing other sections into the collage style.

### Craftsmanship and quality locks

- C-1 / C-3 / C-5 / R-05 / R-15 / R-16 / R-20 / R-30 / R-31 PASS: composition serves the supplied Skills content and personal ocean identity; no filler, fake data or unrelated interface pattern was added.
- C-2 / C-4 PASS within scope: motion, responsive and sound lifecycle checks pass. The report distinguishes actual browser evidence from physical-device and audio-listening claims.
- R-11 PASS: fine rectangular art frames follow the reference; compact circular controls retain the existing mobile convention.
