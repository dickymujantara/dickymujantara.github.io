# Final default-on audio verification

All **6 final focused checks pass**, with no JavaScript exceptions. [Machine-readable results](surface-underwater-audio.json) also retain 14 earlier passing cue/DSP/lifecycle checks under an explicitly separate evidence scope. The retained checks were not rerun after the default-preference-only change.

The final run avoids a testing trap: normal Playwright evaluations supply user activation in Chromium and WebKit. Before the first tap, this run uses only document-start instrumentation, passive timers, console snapshots and navigation/network events. No page evaluation or locator inspection unlocks the AudioContext.

| Native policy | Untouched opening | Generic intro tap |
| --- | --- | --- |
| Chromium, autoplay permitted | Surface audio plays automatically; context running; no prior user activation | Continues playing with one context and four noise layers |
| Chromium, activation required | Context suspended, UI off, one automatic resume attempt, zero output | Starts surface audio without touching the sound toggle |
| WebKit, native automation policy | Context initially interrupted, UI off, one automatic resume attempt, zero output | Native touch starts surface audio without touching the sound toggle |

Restricted Chromium emits the expected native diagnostic: “The AudioContext was not allowed to start.” The controls accurately display off while audio is blocked. These observations establish the actual browser restriction; they do not claim the site can override autoplay policy.

Each profile also mutes the current page, then reloads with a deliberately stale stored `portfolio-sound=off` value. Every reload creates a fresh default-on attempt instead of retaining mute. Permissive Chromium immediately plays again. Restricted Chromium and WebKit remain silent only until the next generic intro tap, which starts audio. The legacy stored value is ignored.

The tap is an actual browser pointer/touch at (160,140) within the opening, away from sound controls. Passive analyser snapshots confirm zero output before a blocked unlock and nonzero output afterward. One context and four noise layers are used per document. The browser sample peaks remain low; these measurements do not assess listening quality or hardware loudness.

Earlier retained native evidence covers the dive cue starting during entry, ending around the visual transition deadline, no extra master/bus gain scheduling at finish, suppression of expired/replayed cues, cancellation on mute/hidden, quieter filtered underwater output, and visibility/page lifecycle behavior. Old saved-mute/deep-link-opt-in expectations are obsolete and are excluded from retained evidence.

Chromium uses a 1440 × 900 desktop profile; WebKit uses an emulated 390 × 844 touch profile. This is not a physical iPhone, actual BFCache, operating-system audio-volume or subjective listening test. Both browsers closed after the run; root's preview server was left running. No application source or audio asset was edited by this QA task.
