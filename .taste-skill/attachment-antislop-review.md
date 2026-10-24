# Attachment-based mockup review

The user's attached earlier layout is the current design authority. The giant-name design and pale footer from the previous direction are superseded. The user approved the stronger composition and navigation without a personal name. This revision cools the turtle palette and specifies automatic motion for every non-hero animal or ocean asset. This is a static image and motion specification, not website code or a working animation.

## Direction and reasons

- Energy 3, rhythm 3, proposed motion 3: a cinematic interactive marine hero, varied content bands, and user-requested automatic marine motion in the supporting scenes.
- Palette: the user's near-black navy, slate blue, and ivory express underwater depth; pale blue marks meaningful selection.
- Layout: retain the supplied section order and column relationships, enlarge the hero, and give the content more breathing room so the preferred composition has a clearer focal point.
- Navigation: remove both the full name and DM monogram as requested; align the existing section links left and Contact right without inventing another brand mark.
- Typography: restrained editorial serif headings with readable sans-serif body text preserve the chosen reference and clear hierarchy.
- Artwork: generated painted 2D marine illustrations provide a deliberate alternative to unconvincing synthetic photographs. They are not real wildlife photos or commissioned human artwork.
- Animals: humpback in the hero, one orca and two dolphins in About, sea turtle in Explorations, as requested.
- Turtle palette: navy and slate shell plates with silver-blue seams and icy-blue face/flipper highlights replace the ochre coloring, including the mosaic detail, to match the other illustrated animals.
- Rules and spacing: thin separators distinguish substantive chapters without turning every section into a card.
- Crop windows: show natural/halftone/mosaic illustration treatments. Fixed frames contain automatically moving samples synchronized with the corresponding animal, so the effect no longer requires hovering.
- Graph: Graphalyze remains the sole featured project. Clean navy diagram panels replace the smoky background to clarify nodes and connections. These are representative illustrations, not verified product screenshots or real measured datasets.
- Experience: the three real employer entries follow Selected Work immediately. Timeline positions show ordering and selection, not fabricated career metrics.
- Footer: retain the dark underwater close from the user's attachment.

## Proposed Anime.js behavior

- Hero pointer movement or touch drag: retain the accepted interactive depth response across water, whale and foreground layers. Let the pointer response settle when input stops. Keep headline and actions fixed.
- About: automatically glide the orca and both dolphins along short, gently curved paths with offset phases. Slowly drift the surface-light and water layers. Animate the sample inside the halftone frame in sync with the orca while its frame stays fixed. No hover or pointer input is required.
- Explorations: automatically glide the cool-blue turtle with a small body tilt and slow flipper strokes. Water and light drift at a different speed for depth. Both crop frames stay fixed; the samples inside move with the animal. No hover or pointer input is required.
- Writing: gently move the ocean imagery inside both thumbnail bounds. Keep the article titles, hit areas and borders fixed.
- Footer: automatically move distant fish across the water and slowly drift surface light and sparse suspended particles. Keep all contact text and links fixed.
- Graph preview hover, focus, or tap: select a node, highlight its connected path, and reveal its descriptive label. Do not present invented analytical metrics.
- Experience entry: draw the connecting line once as the section enters view. Selecting an employer emphasizes its visible role details.
- The existing Pause motion control governs all scene motion across the page. It must remain accessible when scrolling. Keep the setting consistent across sections.
- Suspend scene loops when offscreen or when the page is hidden; resume without a visible reset. Reduced motion uses the complete still composition and immediate functional state changes.
- User-requested ambient loops are deliberate here and supersede the skill's default prohibition on untriggered loops. Their purpose is to make the ocean environment feel alive without requiring interaction. No blinking effects, pulsing UI, bouncing labels, or moving paragraphs.

### Motion timing targets

These are initial design targets for the later implementation, not measured or implemented timings. Tune them in a browser with real layered assets.

| Scene | Initial motion target |
| --- | --- |
| About orca | 10-16 px glide over a 14-18 second cycle; slow tail/fin movement with separate artwork layers. |
| About dolphins | 8-12 px drift over offset 11-15 second cycles so both animals do not move in lockstep. |
| Turtle | 10-14 px glide and 1-2 degree tilt over 16-20 seconds, with separately articulated flippers. |
| Water and light | Broad 18-28 second drift, low contrast, no flashing caustics. |
| Writing thumbnails | 3-5 px internal image movement over 18-24 seconds, clipped to each thumbnail. |
| Footer fish | 25-35 second crossings with resets concealed outside the visible area. |

Use continuous gentle paths and seamless cycles. Keep each animal, articulated fins/tail, background water and light as separate artwork layers; do not stretch the entire screenshot or warp animal anatomy to simulate swimming. The hero remains the only marine scene whose movement responds to the pointer/touch position. Graph selection and navigation remain ordinary functional interactions.

## Intended destinations

- Work and View selected work: Selected Work.
- Experience: Work Experience.
- About: About.
- Explorations: the repositories and ocean-interest section.
- Contact and Get in touch: contact section or the existing email address.
- Process Mining Exploration and Spring Lab: the existing GitHub repositories.
- Writing: the existing Medium articles.
- Footer: the existing email, GitHub, LinkedIn, and Medium destinations.

These are reviewed behavior specifications. They have not been implemented or clicked in this mockup pass.

## Delivery gate for this static deliverable

PASS means a visual/content check of the mockup or an instruction/asset-scope check. N/A means an executable-interface criterion cannot be tested in a raster mockup. No runtime PASS is claimed.

### Hard gate

- R-02 PASS: visible copy does not introduce em dashes.
- R-03 N/A: this is a desktop image; actual responsive overflow and touch targets await implementation.
- R-17 PASS: no invented statistics, model metrics, or performance numbers. Section indices are ordering, not data claims.
- R-18 PASS: no testimonials or fabricated people.
- R-23 PASS: regeneration, layout reference, animals, and illustrated alternative were explicitly requested. No new logo concept, human portrait, or navigation structure was invented.
- R-24 PASS for design scope: every shown navigation item corresponds to an included section; intended destinations are recorded above. Actual links are untested.
- R-25 N/A for measurement: navy/ivory copy is visually legible in the image, but actual font-size-dependent contrast and photographic overlap are not browser-tested.
- R-26 N/A for execution: controls depict proposed behavior and are explicitly disclosed as non-running mockup elements.
- R-27 N/A: no live-data interface is delivered; the graph is an illustrative portfolio preview.
- R-28 PASS: no generic FAQ was added.
- R-32 N/A for execution: keyboard alternatives are specified, not tested.
- R-33 PASS: no source or CSS was rewritten by a script.
- R-34 N/A: the explicit ocean identity has one dark theme and no theme toggle is shipped.
- R-35 PASS for static-deliverable disclosure: the generated image was visually inspected. No build, click-through, console, keyboard, or animation test is claimed.
- R-36 PASS: no fabricated security, compliance, or customer claims.
- R-37 PASS: the user's exact attachment supplies the direction.
- R-38 PASS for content scope: identity, employers, work and links come from existing content. Illustration and proposed interaction provenance are disclosed here.

### Purpose gate

- R-01 PASS: ocean navy is the user's palette, not a default blue-purple gradient.
- R-04 PASS: article titles and restrained destination arrows identify the writing links; the previous document icons have been removed. No generic AI feature-icon set is used.
- R-06 PASS: heading/body choices follow the supplied editorial reference; no large terminal-style type.
- R-07 PASS: halftone belongs to selected illustration details. The diagram is actual process-graph content, not a generic page-wide grid.
- R-08 PASS: arrows distinguish selected destination links rather than decorating every control.
- R-09 PASS: no generic AI capsule, false status chip, or pulsing badge.
- R-10 PASS: no page-wide glass treatment.
- R-12 PASS: no resting shadow system makes the page float.
- R-13 PASS: pale-blue emphasis belongs to diagram/timeline selection; it is not applied to every surface.
- R-14 PASS: one substantive featured project; the repeated pair is a real article list.
- R-19 PASS for concept under the explicit user direction: supporting marine scenes now use intentional automatic loops with fixed copy, a shared pause control and reduced-motion still states. The hero retains its interactive response. Execution remains untested.
- R-22 PASS: every animal is explicitly requested and relates to the stated oceanography interest.

### Liveliness

- PASS: dials declared; cinematic illustrated hero and alternating content density match them at mockup scope.
- PASS: hero, project canvas, and timeline each have a clear local focal point.
- PASS: spacing and dividers separate actual content chapters.
- PASS: one restrained selection accent, with navy/slate/ivory as the identity palette.
- PASS: coherent marine illustration and editorial typography form the repeated motif.
- PASS: the design read was written before generation.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: major choices and their reasons are recorded above.
- C-2 / C-4 N/A for runtime: static artifact only; functional, responsive, and keyboard checks remain future implementation work.
- C-3 / R-05 PASS: all sections contain existing portfolio content; no filler pricing, testimonial, FAQ, or logo bar.
- C-5 PASS: no fabricated proof.
- R-11 PASS: restrained rectangular controls and image frames, no pill system.
- R-15 PASS: project and contact actions describe their context and intended destinations.
- R-16 PASS: no new generic AI marketing claims.
- R-20 PASS: the requested marine subjects and software/process-mining content determine this design.
- R-21 PASS: the fixed dark theme comes directly from the user's ocean reference.
- R-29 PASS: restrained ocean colors and one selection accent.
- R-30 PASS: the user's own preferred mockup is followed; no unrelated product is imitated.

## Artifact

Generated with the built-in image generation tool, using the previous illustrated mockup as the reference. The complete prompt is recorded in this conversation's tool call. The primary agent inspected the resulting image and reran the static checks above for this revision.

`/Users/dickymujantara/.codex/generated_images/01a16b1f-1be9-7de2-a8d6-2814f83363df/exec-3cc709ac-ae07-44fb-bb20-1ca9f1d64da7.png`

Visual review found a cool-blue turtle and matching mosaic sample, no name or monogram in the navigation, a taller whale hero, one orca and two dolphins in About, one turtle in Explorations, clean Graphalyze panels, Experience directly after Work, and the dark footer. The accepted layout and content remain visually consistent. Tokyo MK Booking and SIMBA Top-up remain absent. All substantive text is contained and readable in the desktop image. No website code, dependencies, or deployment changed. The image itself is still; the automatic animation is specified above for later implementation.

## UI supplement for the latest revision

- PASS: navy, slate and ivory follow the supplied ocean reference; the turtle and its mosaic crop now use matching cool-blue shades. Blue UI emphasis marks selected graph and timeline nodes.
- PASS: no decorative emoji, pill eyebrow, fake terminal, bento grid, pricing, or invented social proof appears.
- PASS: the enlarged scenic hero, split About, precise diagram, timeline, turtle scene, compact writing links and dark contact band have distinct compositions.
- PASS at concept scope: every shown control has an intended destination or behavior recorded above. The primary action now reads View selected work and still targets Selected Work.
- PASS at concept scope: pointer/touch hero depth, automatic About/Explorations/Writing/footer scenes, node selection and once-only timeline drawing have defined purposes. They are proposed Anime.js behaviors, not running animation.
- PASS: no broad glass or shadow treatment; restrained blue graph focus rings show selection. The single filled timeline node marks the emphasized first employer.
- PASS: no fabricated statistics, activity feeds, form data, or product claims were introduced.
- N/A: app decision layouts, live-data loading/error states, responsive reflow, keyboard navigation, measured contrast and runtime motion cannot be validated in this desktop raster artifact.
