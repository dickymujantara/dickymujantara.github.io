# Ocean favicon

The user requested a generated favicon added to the portfolio. The primary agent authored a custom wave directly in `img/favicon.svg`, using the established navy, ivory and icy blue palette. A bold silhouette stays recognizable at tab sizes; vector geometry avoids tiny photographic detail and platform-dependent emoji. The navy tile provides contrast on light and dark browser chrome.

Reading this as: the established illustrated ocean portfolio, energy 3 / rhythm 3 / motion 3. The favicon is a static identifier; page composition and animation remain unchanged.

The SVG is the source. Installed `rsvg-convert` produced the 32-pixel PNG fallback and opaque 180-pixel Apple touch icon. Python's standard library packaged rendered 16/32/48-pixel PNG frames into the root `favicon.ico`. The page head replaces the empty `data:,` link with relative ICO, PNG, SVG and Apple touch references. No runtime dependency or build step was added. README records the source and exports.

## Verification

The primary agent inspected the 16, 32, 180 and 256-pixel renders. The wave remains legible at favicon size. SVG XML parses, the ICO directory contains the expected three PNG dimensions, and `git diff --check` passes.

All **5 focused checks pass** in Chromium 156 and WebKit 26: relative head paths, HTTP status/MIME, decoding dimensions, direct-file loading and Apple icon opacity. The browser image decoder selects the ICO's 48-pixel frame; this is a decoding observation rather than a native tab-icon selection measurement. All 32,400 Apple icon pixels are opaque in both engines. No uncaught page errors were recorded. Owned browsers and the preview server were stopped.

Evidence: [preview](previews/favicon-256.png), [QA report](qa/favicon-review.md) and [results](qa/favicon.json). No native Safari tab/Home Screen installation test or deployment was performed.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: no visible prose was added to the page.
- R-03 PASS within changed scope: head metadata adds no layout; decoded assets have the declared dimensions.
- R-17 / R-18 PASS: no statistics, testimonials or people were added.
- R-23 PASS: creating and adding this visual asset follows the explicit user request.
- R-24 / R-26 PASS: page destinations and controls are untouched; all new asset references resolve.
- R-25 PASS within changed scope: the mark reuses the approved light-on-navy palette, inspected at small sizes; it introduces no UI text.
- R-27 PASS: ICO and PNG alternatives accompany the SVG source.
- R-28 / R-34 N/A: no FAQ or theme toggle is involved.
- R-32 PASS within changed scope: navigation, keyboard behavior and focus styles are untouched; the SVG has a title.
- R-33 PASS: SVG and metadata were patched directly; image rendering packages the code-native artwork into required formats.
- R-35 PASS: the integrated references were run in both engines over HTTP and direct files.
- R-36 / R-38 PASS: no performance, security, business or factual claims were added to the page.
- R-37 PASS: the approved ocean direction guides the mark.

### Purpose gate

- R-01 / R-10 / R-12 / R-13 PASS: no gradient, glass, shadow or glow was added.
- R-04 / R-22 PASS: the wave identifies the portfolio's explicit ocean theme; it uses custom geometry rather than an unrelated library glyph.
- R-06 / R-07 / R-08 / R-09 / R-14 PASS: no font, background pattern, arrow, badge or card system was added.
- R-19 PASS: the favicon stays static for recognition; the requested page motion is unchanged.

### Liveliness

- PASS: the existing energy, rhythm and motion dials remain intact.
- PASS: the wave repeats the opening's ocean identity in a compact form.
- PASS: one clear silhouette, deliberate padding and the existing blue accent retain hierarchy at small sizes.
- PASS: the palette and motif follow the established design read.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: silhouette, palette, padding and format choices have concrete purposes above.
- C-2 / C-4 PASS within tested scope: asset references and format decoding work in both engines; fallbacks are provided.
- C-3 / R-05 / C-5 PASS: no filler section, mock content or invented fact was introduced.
- R-11 PASS: the rounded tile gives the small identifier a defined edge; page component shapes are unchanged.
- R-15 / R-16 PASS: labels and page copy are untouched.
- R-20 / R-21 / R-29 / R-30 PASS: the mark uses this portfolio's ocean identity and approved three colors rather than another product's branding.
