# Graphalyze publication link

Replaced the Graphalyze “View project screenshot” anchor with “Read IEEE publication” and the exact URL supplied by the user: `https://ieeexplore.ieee.org/document/10276795`. The existing new-tab behavior, `noopener noreferrer`, SVG arrow and styles are preserved. README now describes the publication destination.

The primary agent parsed the final HTML and verified the destination, label, target, rel attributes and removal of the old label. `git diff --check` passes. IEEE could not be fetched by the browsing tool, so no article metadata, publication type or live remote availability is asserted. A broader browser suite was not repeated for this text/URL-only revision; existing layout and runtime evidence remains in the preceding reviews.

Reading this as: the approved ocean/software portfolio, energy 3 / rhythm 3 / motion 3. Its design remains unchanged.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: the new label contains no em dash.
- R-03 / R-25 / R-32 PASS within changed scope: the label is shorter than its predecessor and uses the same native anchor, styling, focus treatment and decorative SVG.
- R-17 / R-18 / R-36 / R-38 PASS: no metrics, testimonials, article metadata or unsupported claims were added.
- R-23 / R-37 PASS: the exact destination and change follow the explicit user instruction and established direction.
- R-24 / R-26 PASS: final HTML contains the supplied HTTPS link with its intended new-tab behavior.
- R-27 / R-28 / R-34 N/A: no stateful UI, FAQ or theme control was introduced.
- R-33 PASS: source was patched directly.
- R-35 PASS within changed scope: this revision received direct HTML verification; the unchanged app has prior browser evidence, and unavailable remote verification is stated above.

### Purpose gate

- R-01 / R-04 / R-06 / R-07 / R-08 / R-09 / R-10 / R-12 / R-13 / R-14 / R-19 / R-22 PASS: no styling, visual treatment or motion was added. The existing arrow still signals an external destination.

### Liveliness

- PASS: established dials, focal points, spacing, accent and ocean motif are unchanged.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: “Read IEEE publication” names the new destination without inventing article metadata.
- C-2 PASS: the anchor has the exact requested URL and keeps safe new-tab attributes.
- C-3 / R-05 / C-5 PASS: no filler or invented content was added.
- C-4 PASS within changed scope: native link semantics and existing responsive styling remain intact.
- R-11 / R-15 / R-16 / R-20 / R-21 / R-29 / R-30 PASS: the action is specific; existing component shapes, identity, palette and theme remain intact.
