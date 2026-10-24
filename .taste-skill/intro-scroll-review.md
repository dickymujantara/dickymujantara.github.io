# Opening and mobile scroll revision

The opening's timed completion and Skip button are superseded by the user-requested [scroll-to-enter revision](scroll-entry-review.md). The evidence below records the earlier opening and unchanged scene/scroll work.

The primary agent reviewed the implementation, browser results, and native iOS Simulator captures. This revision adds the requested opening and tunes the existing Anime.js choreography while retaining the approved ocean composition.

Reading this as: an illustrated software engineering portfolio with an ocean setting, energy 3 / rhythm 3 / motion 3. The opening establishes the descent; supporting movement stays quieter than the hero.

## Behavior and implementation

- A 2.1-second Anime.js opening draws three vector ripples beneath “A little deeper.” and fades into the hero. It now plays on each eligible home-page load or reload, on desktop and mobile. An old session marker no longer suppresses it. A page initially loaded in the background waits until visible. Skip, keyboard navigation, scrolling, pointer/touch intent, navigation, or backgrounding during playback dismiss it. It does not lock native scrolling or intercept a swipe. The overlay blocks accidental clicks on covered links while it is visible.
- Deep links, restored pages, reduced motion, saved pause, JavaScript failure, and a missing animation library leave the content available immediately. Unavailable storage no longer blocks the opening; motion preferences remain optional. The overlay starts hidden and has a three-second fail-safe after activation. Scene and pointer motion wait for the opening to finish.
- Artwork follows the scroll target with elapsed-time easing, using a 75 ms response on compact/touch layouts and 110 ms on desktop. The dedicated scroll callback stops when the rendered pose reaches its target. Native page scrolling remains unchanged.
- Scroll coordinates and section dimensions are cached after layout changes. The scroll-rendering path no longer reads chapter/content bounds every frame. Content ResizeObserver updates cover the graph detail and other ordinary sections; actual viewport changes still recalculate the layout. Toolbar-only height changes preserve pinned chapter geometry.
- Mobile uses shorter pinned travel, smaller zoom/rotation ranges, and gentler ambient motion. The three treatment frames, their borders/handles, and their inner crops retain separate moving layers. Distinct section backgrounds and the muted turtle treatment remain intact.
- Pause freezes the current pose, including ordinary content reveals; Play eases toward the current position. QA caught and verified the removal of a forced content-completion jump on Pause. Saved paused startup still presents complete ordinary content. Reduced motion restores the complete unpinned layout.

## Evidence and limits

- **52/52 focused browser checks passed before the desktop follow-up** in WebKit 26.0 and Chromium 156.0.8078.4. Opening completion, dismissal, the original session behavior, dependency/storage/no-JavaScript fallbacks, responsive bounds, native anchors, easing, exact pause, reduced motion, visibility and offscreen suspension were exercised. Widths included 320, 390, 767, 768 and 1440 pixels. The session-only and unavailable-storage bypass assertions describe the earlier implementation; the desktop follow-up replaces those behaviors. Scroll choreography and styles are unchanged by that follow-up.
- **5/5 targeted cache/navigation checks pass**: four engine/width combinations cover toolbar-only resizing, actual resizing, and content-height changes; a separate native Chromium anchor recheck confirms the settled inset. An initial fixed-delay assertion sampled native smooth scrolling in flight. The settled recheck passed without a source change.
- Instrumented easing recorded **zero chapter/content geometry reads**. Its dedicated callback stopped after settlement. Toolbar-only synthetic resizing caused zero full geometry passes; desktop refreshed navigation positions separately. These are runtime-path observations, not an FPS benchmark.
- **7 native visual checks pass** in Apple's Mobile Safari 18.5 on the iPhone 16 Pro Simulator. The primary agent inspected the opening, settled hero, Explorations and recorded scroll frames: the opening draws/fades, the mobile header stays absent, icons keep their line shapes, and the turtle/mosaic remain consistent with the blue palette.
- Both changed scripts pass `node --check`; `git diff --check` passes. The final automated runs recorded no uncaught JavaScript errors.

### Desktop opening follow-up

The user could not see the opening on desktop. The baseline was reproduced in both engines: a first visit played it, a same-tab reload with the session marker skipped it, and an initially hidden page remained skipped after activation. The primary agent removed session-based suppression, made storage optional, and deferred an initially hidden page until visible. The approved opening design and scroll choreography are unchanged.

All **19 targeted desktop/mobile checks pass** in both engines: repeated home loads play despite the old marker; a hidden initial page starts after visibility changes; hero motion waits until dismissal and resumes afterward; mobile navigation stays hidden; and reduced motion, saved pause and deep links retain their bypasses. Unavailable storage allows playback and Escape dismissal without an exception. The primary agent inspected both 1440-pixel opening captures. Evidence: [desktop QA](qa/desktop-opening-review.md), [targeted results](qa/desktop-opening.json), [Chromium opening](previews/desktop-opening-chromium-1440.png) and [WebKit opening](previews/desktop-opening-webkit-1440.png).

The hidden-start check overrides `document.hidden` and dispatches `visibilitychange` deterministically; it is not an operating-system tab-switch certification. This follow-up did not repeat the native iOS Simulator probe. The four delivery-gate blocks below remain applicable: no visual style or content changed, and the corrected opening lifecycle was directly exercised.

Evidence: [browser QA](qa/intro-scroll-review.md), [52 check results](qa/intro-scroll.json), [cache/navigation results](qa/intro-scroll-cache-addendum.json), and [native iOS scope](qa/intro-scroll-ios185-review.md). Watch the [native iOS opening](previews/intro-scroll-ios185-opening-clip.mp4) or [WebKit opening and scroll recording](previews/intro-scroll-mobile.webm).

The native Simulator probe used URL anchors, screenshots and recording; the browser scroll recording uses scripted position changes. Mobile WebKit does not support Playwright wheel injection, so native wheel behavior was checked in desktop WebKit. Physical iPhone swipe performance and native VoiceOver interactions were not tested. Video encoding at 15 fps is not a rendering-performance measurement. Owned servers and the temporary Simulator were stopped. No deployment was performed.

This report supersedes earlier scroll-review statements about direct seeking and forced content completion on Pause. Earlier reports retain evidence for unchanged composition, assets, footer blending and Safari compatibility.

## Primary-agent delivery gate

### Hard gate

- R-02 PASS: added visible copy contains no em dash.
- R-03 PASS: reviewed mobile/desktop widths fit without horizontal page overflow; native iOS captures remain readable.
- R-17 PASS: no portfolio metrics were added. Test counts and timing are recorded implementation evidence.
- R-18 PASS: no people, testimonials or endorsements were added.
- R-23 PASS: the opening and smoother mobile motion follow the explicit user request and approved ocean direction.
- R-24 PASS: existing destinations remain intact; native anchors and the hero CTA remain usable.
- R-25 PASS within reviewed scope: the opening uses the existing ivory/navy palette with a visible skip control and focus treatment. Primary-agent screenshot inspection found no new text overlap or background conflict; no full numerical contrast audit is claimed.
- R-26 PASS: the changed opening and motion controls were exercised, including exact pause/resume and dismissal paths.
- R-27 PASS: no-JavaScript, missing-library and unavailable-storage paths expose the content; the opening has a bounded fail-safe.
- R-28 PASS: no FAQ was added.
- R-32 PASS within tested scope: native links/buttons, keyboard dismissal, focus handling and reduced motion remain available. No scroll lock or viewport zoom restriction was added.
- R-33 PASS: application source was edited directly with patches; vector ripples are code-native artwork.
- R-34 N/A: the approved ocean theme has no theme toggle.
- R-35 PASS: source, interaction traces, measurements and real-browser/native Simulator captures support the findings above.
- R-36 PASS: no security, customer or compliance claims were added.
- R-37 PASS: the approved composition remains the direction; this is an explicitly requested motion revision.
- R-38 PASS: no portfolio facts were invented; simulation and physical-device limits are stated.

### Purpose gate

- R-01 PASS: existing depth gradients retain their scene/contrast purpose; no gradient was added to the opening.
- R-04 PASS: the skip control uses text, and existing functional SVG icons remain intact.
- R-06 PASS: the opening reuses the approved serif and sans typography.
- R-07 PASS: three vector waves introduce the ocean setting; no page-wide pattern was added.
- R-08 PASS: existing destination arrows retain their purpose.
- R-09 PASS: no capsules, status dots or loading counters were added.
- R-10 PASS: no glass treatment was added.
- R-12 PASS: no shadow system was added.
- R-13 PASS: no new glow system was added.
- R-14 PASS: the existing substantive section composition remains intact.
- R-19 PASS: requested motion has a purpose, bounded ranges, exact pause and reduced-motion handling; offscreen layers suspend and the scroll easing loop settles.
- R-22 PASS: existing marine illustrations remain intact; the opening uses simple vector water strokes.

### Liveliness

- PASS: the brief ripple opening establishes the descent before the existing hero.
- PASS: headline, marine focal points and quieter engineering sections preserve the approved hierarchy.
- PASS: mobile travel and amplitude are reduced while animals and image frames continue moving.
- PASS: navy, slate, icy blue and ivory remain the restrained palette.
- PASS: serif typography, illustrated marine layers and moving treatment windows retain the portfolio's identity.
- PASS: energy, rhythm and motion follow the user's approved design and explicit animation preference.

### Craftsmanship and quality locks

- C-1 / R-31 PASS: opening duration, dismissal, cache invalidation, easing and mobile ranges have concrete purposes documented above.
- C-2 PASS: changed behavior and failure paths were exercised; the pause regression found during QA was fixed and rechecked.
- C-3 / R-05 PASS: no filler sections or template content were introduced.
- C-4 PASS within tested scope: responsive bounds, fallbacks, keyboard access, reduced motion and two automated engines plus native Simulator visuals were checked. Physical-device limits remain explicit.
- C-5 PASS: no portfolio facts, testimonials or business metrics were invented.
- R-11 PASS: the opening skip button follows the existing rectangular controls; existing circles retain their functional roles.
- R-15 PASS: “Skip opening” states its action; existing destination labels remain intact.
- R-16 PASS: the short opening line introduces the ocean descent without promotional claims.
- R-20 PASS: motion is tuned within the established visual identity.
- R-21 PASS: the fixed dark theme follows the approved ocean setting.
- R-29 PASS: no unrelated accent color was added.
- R-30 PASS: the implementation serves this portfolio's existing scenes rather than copying another site's composition.
