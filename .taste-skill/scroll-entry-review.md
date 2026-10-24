# Scroll-to-enter opening

The user requested removal of the Skip opening button and a scroll action before revealing the hero. The primary agent retained the approved title, ripples, palette and composition, and replaced timed completion with an explicit entry gesture.

Reading this as: the approved illustrated engineering/ocean portfolio, energy 3 / rhythm 3 / motion 3. The opening now provides a short pause before the descent rather than an automatic transition.

## Current behavior

- The Skip opening button and its handlers/styles are removed. A plain cue reads “Scroll to enter”, or “Swipe up to enter” with a coarse pointer.
- Anime.js draws the title, ripples and cue once, then stops. The opening holds indefinitely while idle; it does not automatically reveal the hero after a timer.
- Downward wheel movement of 24 CSS pixels, or a vertically dominant upward swipe of 40 pixels, starts a 560 ms Anime.js fade into the hero. Exit animations start from the current pose, including when input arrives during the entrance.
- The opening consumes the initial vertical gesture while visible, keeping the hero at its start. Those listeners are removed when the reveal finishes; subsequent page scrolling is native. No body overflow lock is added. Control-wheel and multi-touch pinch input remain available.
- Enter, Space, Arrow Down, Page Down and End provide keyboard entry. Escape and Tab immediately leave the opening. The modal region has an accessible title/instructions; covered content is temporarily inert and is restored on exit. Keyboard entry focuses the hero heading without scrolling it.
- Each eligible home load/reload shows the opening. Reduced motion, saved pause, deep links, restoration and missing animation dependencies retain their bypasses. Storage is optional. Initial background loads wait until visible; backgrounding during the waiting entrance pauses it and returning continues to wait for input.
- A 1.2-second fail-safe applies after the reveal starts. It does not advance an idle opening. Dependency/setup errors expose the content. Hero pointer, ambient and scroll motion wait until the opening closes.

Changes are limited to the opening markup/controller/styles and documentation. Main scene choreography, post-opening scroll easing, marine assets, footer and mobile navigation rules remain unchanged.

## Verification scope

All **23 focused checks pass** in Chromium and WebKit. They exercise desktop wheel entry and subsequent native scrolling, mobile tap/downward/upward gesture differences, idle holding beyond the old timeout, settled ripple drawing, absence of Skip, background inertness, keyboard focus, reduced/saved-pause/deep-link bypasses and visibility integration. The primary agent inspected the Chromium 1440-pixel and WebKit 390-pixel waiting captures: title, waves and cue fit the viewport and the removed button leaves no gap.

The first 21 checks ran before a three-line refinement that changes exit animations to start from the current pose. Their settled starting values and endpoints remain equivalent by source review. Two additional checks ran on the final controller: immediate wheel/swipe input preserves cue opacity at zero through sampled exit frames and reveals the hero with inertness removed. This is a focused correction, not a repeated full-page scroll suite.

Evidence: [focused QA](qa/scroll-entry-review.md), [23 check results](qa/scroll-gated-opening.json), [desktop opening](previews/scroll-gated-opening-chromium-1440.png) and [mobile opening](previews/scroll-gated-opening-webkit-390.png). The controller passes `node --check`, and `git diff --check` passes. No uncaught JavaScript errors were recorded; the owned preview server was stopped.

Mobile touch and hidden-document cases use synthetic browser events. They verify event handling and state integration; this revision does not certify native iPhone swipe performance, OS tab switching or VoiceOver interactions. No Simulator rerun or deployment was performed. Earlier opening reports describe the superseded timed/Skip behavior; their unchanged scene and scroll evidence remains historical.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: added visible cue text has no em dash.
- R-03 PASS within reviewed scope: the inspected desktop/mobile opening states fit without overflow or overlapping text.
- R-17 / R-18 PASS: no portfolio metrics, people, testimonials or endorsements were added.
- R-23 PASS: removing Skip and requiring a scroll action follow the explicit user request and approved visual direction.
- R-24 / R-26 PASS: existing destinations remain intact; the new entry gestures and keyboard paths are exercised, with ordinary scrolling restored afterward.
- R-25 PASS within reviewed scope: the cue uses the existing light blue/navy palette; inspected captures remain legible. No full contrast audit is claimed.
- R-27 PASS: dependency/setup failures and the transition fail-safe restore access; no-JavaScript markup starts hidden.
- R-28 N/A: no FAQ is present or added by this revision.
- R-32 PASS within tested scope: semantic modal instructions, inert background handling, keyboard entry/exits, focus restoration and reduced-motion bypass are retained. No viewport zoom restriction was added.
- R-33 PASS: source was patched directly; no application files were rewritten by generated scripts.
- R-34 N/A: the approved ocean theme has no theme toggle.
- R-35 PASS: reviewed source, browser interactions and desktop/mobile captures support the scoped findings.
- R-36 / R-38 PASS: no business, security or compliance claims were added; testing limits are explicit.
- R-37 PASS: the established composition remains intact; this is a requested behavior revision.

### Purpose gate

- R-01 / R-10 / R-12 / R-13 PASS: no gradient, glass, shadow or glow system was added.
- R-04 / R-08 PASS: the single downward arrow explains the requested scroll action; it is decorative to assistive technology alongside named instructions.
- R-06 PASS: approved serif/sans typography is reused.
- R-07 / R-22 PASS: the existing three vector ripples establish the ocean setting; no new illustration or repeating page pattern was added.
- R-09 PASS: no capsule, status dot, counter or fake loading state was added.
- R-14 PASS: portfolio section composition remains unchanged.
- R-19 PASS: requested motion is bounded, its entrance settles, and its reveal requires input. Keyboard/reduced-motion paths prevent a mandatory motion barrier.

### Liveliness

- PASS: the visible scroll/swipe cue gives the waiting state a clear next action.
- PASS: the title and ripples retain their quiet ocean identity before the illustrated hero.
- PASS: the fade uses the current pose, preserving continuity for immediate input.
- PASS: mobile and desktop share the approved navy/ivory/slate palette and separate gesture wording.
- PASS: the overall energy, rhythm and motion follow the user's approved direction.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: gesture thresholds, modal handling, finite entrance, fade and transition-only fail-safe have concrete purposes above.
- C-2 PASS within tested scope: idle, entry, resume, keyboard, gesture and bypass paths are exercised.
- C-3 / R-05 PASS: no filler section, mock data or template content was introduced.
- C-4 PASS within tested scope: real-browser desktop/mobile rendering and interaction evidence is retained; native gesture/assistive-technology limits are explicit.
- C-5 PASS: no portfolio facts were invented.
- R-11 PASS: the removed button leaves no replacement container; existing component shapes remain unchanged.
- R-15 / R-16 PASS: cues name the action directly and add no promotional copy.
- R-20 / R-21 / R-29 PASS: approved identity, dark ocean theme and palette remain intact.
- R-30 PASS: the opening behavior serves this portfolio's descent into the hero rather than importing another site's design.
