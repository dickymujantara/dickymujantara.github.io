# Original reclining otter restored

The user's attached reference matches the existing [otter.webp](../img/ocean/otter.webp), rather than the later v2 or smiling head versions. The opening now uses that exact original animal illustration. No artwork was regenerated or repainted. Its original transparent waterline remains intact; [original asset provenance](../img/ocean/SURFACE.md) records the source and alpha inspection.

The change replaces one decorative image source, restores the three full-body placement rules and updates the README. Desktop uses 47% width at right 1% / top 38%; portrait phones use 94% width at right 0 / top 55%; short landscape uses 43% width at right 2% / top 36%. These are the earlier full-body settings. The current quiet Anime.js bobbing, loader, coast backgrounds and entry controller remain in place.

Design read: the existing illustrated ocean portfolio for visitors assessing Dicky's engineering work, retaining energy 3 / rhythm 3 / motion 3. This is a single-asset restoration in the approved direction; no new direction draw is needed.

The primary agent inspected actual [desktop Chromium](previews/otter-restored-chromium-1440.png), [small phone](previews/otter-restored-chromium-320.png), [touch tablet](previews/otter-restored-chromium-768.png), [short landscape](previews/otter-restored-chromium-844.png), [phone WebKit](previews/otter-restored-webkit-390.png) and [landscape WebKit](previews/otter-restored-webkit-844.png) captures. The requested face, chest paws and two feet are visible, with clean compositing into the water and separate title/cue areas.

All **13 scoped browser checks pass**, with no JavaScript errors. [Results](qa/otter-restored.json) cover five profiles in Chromium and WebKit: 1440 × 900, 390 × 844, 320 × 568, 844 × 390 and 768 × 1024. Checks verify the exact source, decoded 1024 × 512 image, loader completion, viewport fit, alpha-aware separation from title/cue, ambient movement, Pause/Play and entry/handoff. Desktop entry uses native wheel; mobile uses synthetic touch and programmatic follow-up scrolling. These checks do not certify physical Safari, frame rate, assistive technology or the full site. `git diff --check` passes. The temporary preview server and browsers were closed after verification; nothing was published.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: no visible interface copy or em dash was added.
- R-03 PASS within scope: all five profiles in both engines fit the restored otter without horizontal overflow; inspected captures confirm the composition.
- R-17 / R-18 PASS: no statistics or testimonials were added.
- R-23 / R-37 PASS: the exact user-selected animal is reused in the existing approved direction.
- R-24 PASS: the sole HTML change is the decorative image source; destinations are preserved.
- R-25 PASS within scope: text, backgrounds and text placement retain the prior measured treatment; alpha-aware checks show no otter pixels behind title/cue. No new full-site contrast audit is claimed.
- R-26 PASS: local Pause/Play and entry/handoff are exercised in both engines.
- R-27 PASS within scope: the restored source decodes through the existing bounded loader; its fallback implementation is unchanged from the prior verified revision.
- R-28 / R-34 N/A: this change adds no FAQ or theme switch.
- R-32 PASS within scope: empty alt, named controls and existing keyboard semantics remain; tested entry restores hero focus and background access. No assistive-technology audit is claimed.
- R-33 PASS: application edits were written directly with apply_patch; no pixel editing was performed.
- R-35 PASS: the actual local page ran in both engines, with saved captures and control/entry results.
- R-36 / R-38 PASS: no factual or performance claim was invented; original generated-art provenance and verification limits are recorded.

### Purpose gate

- R-01 PASS: existing navy scenery scrims protect text contrast; no new color treatment was introduced.
- R-04 / R-06 / R-08 PASS: existing pause glyphs, editorial serif/sans type and directional entry cue retain their established roles.
- R-07 / R-09 / R-10 / R-12 / R-13 / R-14 PASS: no grid, badge, glass, shadow, glow or card system was added.
- R-19 PASS: the user-requested Anime.js float remains restrained, pausable and canceled on entry, as confirmed in both engines.
- R-22 PASS: the original otter directly matches the user's attached subject and the ocean-surface opening.

### Liveliness

- PASS: energy 3 / rhythm 3 / motion 3 retain the approved page's illustrated ocean identity and choreography.
- PASS: title and otter share the screen's focus, with clear open water separating them.
- PASS: structural space keeps the entry cue below the artwork on phone and desktop.
- PASS: cool pale marine highlights remain the deliberate accent over navy water.
- PASS: painted animals and the surface-to-depth transition retain the site's recurring motif.
- PASS: the existing direction and explicit attached reference precede this restoration; rendered output was inspected afterward.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: source selection matches the attachment; restored sizing reveals the full body; transparent waterline integrates it with the existing sea.
- C-2 PASS: tested motion controls and entry remain functional with the restored asset.
- C-3 / C-5 PASS: no filler content, new section or unsupported fact was introduced.
- C-4 PASS within scope: two engines and five profiles verify loading, fit and motion/handoff; device and audit limits are explicit.
- R-05 / R-11 PASS: section rhythm, control shapes and layout system are retained.
- R-15 / R-16 PASS: no promotional copy or CTA was added.
- R-20 / R-21 / R-29 / R-30 PASS: the existing palette, typography and illustrated ocean direction remain consistent with the portfolio.
