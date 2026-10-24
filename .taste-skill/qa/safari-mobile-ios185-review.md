# iOS 18.5 Mobile Safari visual probe

Inspected the local portfolio in Apple's native Mobile Safari 18.5 running in an iPhone 16 Pro Simulator with the iOS 18.5 runtime (22F77). MobileSafari's bundled `CFBundleShortVersionString` reports `18.5`. Screenshots are native Simulator PNG captures at 1206 × 2622 pixels.

This is actual iOS Simulator Safari rendering, separate from Playwright WebKit emulation. It is not a physical iPhone test. No remote Safari automation setting was changed. The browser user-agent string was not collected.

## Visual results

- PASS: mobile navigation is hidden on the current home page. The pre-change snapshot still displays the old Menu and Contact bar.
- PASS: the current hero arrow and motion pause icon render as clean line SVGs. The pre-change hero screenshot demonstrates the old arrow rendering as a blue emoji tile.
- PASS after correction: the final hero light layer spans the viewport without the earlier hard vertical edge. A targeted native Safari screenshot was repeated after the light bounds were expanded.
- PASS: project graph node shapes, edges, selected-node highlight, and borders render correctly.
- PASS: experience entries use the intended neutral text and timeline styling without native blue button appearance.
- PASS after correction: the experience intro retains a space between “across” and “different” when its line break is hidden. The initial capture found the joined words; the final capture verifies the correction.
- PASS: the turtle mosaic renders as distinct slate-blue pixel blocks with the frame and corner handles intact. The accompanying halftone crop and turtle artwork remain visible.
- PASS: footer jellyfish, crab, starfish, text, and external-link SVGs render correctly, with no fish silhouettes.

## Evidence

- [Final home and expanded light layer](../previews/safari-mobile-ios185-home-final.png)
- [Current graph](../previews/safari-mobile-ios185-work.png)
- [Final experience](../previews/safari-mobile-ios185-experience-final.png)
- [Current Explorations and mosaic](../previews/safari-mobile-ios185-explorations.png)
- [Current footer](../previews/safari-mobile-ios185-contact.png)
- [Before home](../previews/safari-mobile-ios185-before-home.png)
- [Before Explorations](../previews/safari-mobile-ios185-before-explorations.png)

## Scope and cleanup

Navigation used `simctl openurl` section anchors followed by screenshot inspection. This probe does not claim touch/swipe scrolling, VoiceOver, link activation, or a complete automated interaction suite on native iOS Safari. The separate cross-engine QA covers automated interaction assertions.

The final hero capture was repeated after the CSS light-bounds correction. Other section captures reflect the same section implementation; only the hero light bounds changed after those captures.

No website source was edited by this probe. The previously shut-down, unused Simulator was booted for this task and shut down afterward. Only the owned temporary snapshot server on port 4174 was stopped; the parent QA agent owns port 4173.
