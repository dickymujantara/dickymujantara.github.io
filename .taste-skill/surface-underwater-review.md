# Surface introduction, underwater portfolio and animal labels

This revision follows the user's four requests: move the existing waves/music into the introduction and soften it; use quiet underwater ambience in the portfolio; add labels in the Manta ray style outside the footer; group icon-only sound and motion controls at bottom left.

## Sound behavior

The native Web Audio engine now has two persistent audio buses sharing one context and master volume. The introduction's surface mix combines softened surf with a lower warm pad and a sparse original phrase. The main portfolio's separate mix contains low-passed colored water noise and slow, shallow swells. Music connects only to the surface bus. Entry begins the surface-to-underwater crossfade immediately and adds one soft descent swell, filtered progressively from 1000 to 180 Hz. Both follow the visual entry duration, 1450 milliseconds on compact screens and 1650 on desktop. Finishing the visual transition keeps the same underwater bus without resetting its gain or restarting playback. Interrupted or expired dive cues do not replay later.

The loader stays silent. Sound resets to on on every page load or refresh, including when an old stored mute value exists. The engine attempts surface playback as soon as the introduction is ready, or underwater playback when a section link, reduced motion or saved motion pause bypasses the introduction. Mute applies only to the current loaded page; audio preferences are no longer read from or written to local storage. Browsers that block autoplay start after a trusted tap or key press, with an accurate blocked/off icon state until then. Hidden/away pages fade and suspend; returning restores prior enabled playback. The audio remains an original procedural composition, with no downloaded recording or claim that it duplicates the Pinterest soundtrack.

## Continuous entry and original otter

The opaque blue entry curtain and final 320-millisecond reveal were replaced with an early, gradual crossfade and a translucent waterline. The scroll controller now sets the covered hero's initial pose before it can become visible; ambient and pointer motion remain gated until entry completes. The loader also awaits the whale's image decode within its existing bounded deadline. This prevents an exposed initial pose followed by a one-frame seek at handoff.

The [original reclining otter](../img/ocean/otter.webp) is restored as requested. The cartoon drafts are not referenced by the site. Their built-in image generation prompt/source records remain in the prompts directory as design history.

## Labels and controls

Small uppercase captions repeat the existing Manta ray typography: Sea otter, Seal and Seabirds in the introduction; Humpback whale in the hero; Dolphins and Orca in About; Manta ray in Skills; Sea turtle in Explorations. Repeated birds/dolphins share their species-group label. Detail crops reuse the main subject's label. Footer animals have no captions. The Seal caption is anchored inside the seal image wrapper, just beneath the visible rock, rather than using independent viewport coordinates. Foreground motion and the fixed Skills background remain intact.

Each scene has a bottom-left control group containing motion and sound buttons, in that visual and keyboard order. Both are 44 by 44 pixels with an 8-pixel gap, consistent inline SVG icons and safe-area-aware margins. Text is visually hidden while accessible names, pressed states and focus rings remain. The full background group is inert while the opening dialog is active; the dialog cycles focus through its own two controls. The phone entry cue sits above the controls. If the browser blocks default audio, any trusted tap or key press on the introduction can unlock it, without requiring the speaker button. A completed-click fallback supplements pointer/touch/key activation.

## Primary-agent delivery gate

### Hard gate

- R-02 / R-17 / R-18 / R-36 / R-38 PASS: no invented metrics, testimonials, soundtrack attribution or species-level identification beyond what the imagery supports. Audio and images are described as authored/generated assets rather than field recordings or photographs.
- R-23 / R-37 PASS: the user's explicit ocean direction and four requested changes govern this revision. Their current biography and all skill values are preserved.
- R-24 / R-26 / R-27 / R-32 PASS within scope: named native controls, actual playback/motion behavior, keyboard focus and unavailable/static states are checked; evidence follows below.
- R-03 / R-25 / R-33 / R-35 PASS within scope: responsive captures, visual legibility review, source patches and native browser checks are retained below. This is a scoped local check, not a formal accessibility certification.
- R-28 / R-34 N/A: no FAQ or additional color theme.

### Purpose gate

- R-01 / R-06 / R-21 / R-22 / R-29 PASS: labels and controls use the approved marine palette, small uppercase caption style and existing system fonts. No new imagery or type family was introduced.
- R-04 / R-07 / R-08 / R-09 / R-10 / R-12 / R-13 / R-14 PASS: SVG icons express actual motion/sound states; captions identify the animals. No new badges, metrics, card system, glow or decorative interface layer was added.
- R-19 PASS: audio follows the surface-to-underwater journey. Both audio and motion remain independently controllable, and audio suspends while hidden. The underwater mix avoids prominent music or sharp entry effects as requested.

### Liveliness

- PASS: established energy 3, rhythm 3, motion 3 remain. The calm surface scene and quieter underwater mix distinguish the two moments without changing the accepted visual composition.
- PASS: the recurring animal captions connect the separate marine scenes; compact control groups keep the artwork clear.

### Craftsmanship and quality locks

- C-1 / C-3 / C-5 / R-05 / R-15 / R-16 / R-20 / R-30 / R-31 PASS: the changes serve explicit requests and the personal ocean identity. No filler, invented measurement or unrelated layout was added.
- C-2 / C-4 PASS within scope: actual browser state and input checks are recorded below; physical-device and listening limits are stated separately.
- R-11 PASS: circular icon controls follow the site's existing compact-control convention.

## Verification

All [six final autoplay checks pass](qa/surface-underwater-audio.json), with no page exceptions. Passive document-start snapshots avoid evaluation calls that can themselves grant browser activation. Permissive Chromium starts surface audio automatically as the introduction appears, including after an in-page mute followed by reload and with a stale stored-off value. Restricted Chromium blocks the automatic resume with its native “AudioContext was not allowed to start” warning; a generic introduction tap starts it without the sound button. Native WebKit also blocks initial playback and starts after a generic touch. Reload resets the requested sound state to on and attempts playback again in each policy case.

Fourteen separately scoped earlier native cue/DSP/lifecycle checks are retained in the same results file. They verify the entry-time dive cue, uninterrupted bus/master scheduling at finish, cue cancellation/expiry, reuse of one context/four base noise layers, quiet output and lifecycle/fallback behavior. These functions were unchanged by the final default-preference and completed-click changes; the fourteen checks were not rerun as part of the final autoplay pass. Signal measurements support quieter, lower-frequency underwater output; they do not establish listening quality or physical-device loudness. [Detailed method and limits](qa/surface-underwater-audio-review.md).

The primary agent inspected desktop/phone opening captures, short-phone and landscape captures, phone Hero/About scenes and the before/middle/after entry frame sheets. The [seven caption/control checks](qa/animal-controls.json) and [two handoff checks](qa/opening-handoff.json) cover the changed UI and stable hero pose. The final original-otter revision adds [two focused opening checks](qa/final-opening.json): the Seal caption is centered 5.8–5.9 pixels below the visible rock, both controls remain 44 × 44 with an 8-pixel gap, and entry keeps scroll position, hero bounds and whale pose stable without navigation or page errors. [Final desktop](previews/final-opening-chromium-1440.png) and [final phone](previews/final-opening-webkit-390.png) captures show the restored otter and closer label.

`node --check` for the edited JavaScript and `git diff --check` pass. The browser checks use emulated viewport/touch settings; physical iPhone, assistive technology, speaker/headphone sound quality and frame performance are outside this scope. No commit or deployment was performed.
