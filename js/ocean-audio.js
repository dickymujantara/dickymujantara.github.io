(() => {
  const root = document.documentElement;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let wanted = true;

  let context;
  let master;
  let surfaceBus;
  let underwaterBus;
  let musicBus;
  let noise;
  let soundscapesReady = false;
  let surfaceReady = false;
  let entryStarted = false;
  let entryCompleted = false;
  let playing = false;
  let scene = 'off';
  let unavailable = !AudioContext;
  let resumeAfterHide = false;
  let pageAway = false;
  let suspendTimer;
  let musicTimer;
  let diveStart = 0;
  let diveDeadline = 0;
  let divePlayed = false;
  let diveCue;
  const phraseNotes = new Set();

  const buttons = () => [...new Set(document.querySelectorAll('[data-sound-toggle], #sound-toggle'))];
  const introductionActive = () => Boolean(document.getElementById('ocean-opening')) && root.dataset.opening !== 'done';

  function desiredScene() {
    if (!wanted || document.hidden || pageAway) return 'off';
    if (introductionActive()) return entryStarted ? 'underwater' : surfaceReady ? 'surface' : 'off';
    return 'underwater';
  }

  function updateControls() {
    const audible = playing && context?.state === 'running' && !document.hidden && !pageAway;
    const ready = wanted && context?.state === 'running' && introductionActive() && !audible;
    const state = unavailable ? 'unavailable' : audible ? 'playing' : ready ? 'ready' : 'off';
    root.dataset.soundState = state;
    root.dataset.soundScene = audible ? scene : 'off';
    for (const button of buttons()) {
      button.disabled = unavailable;
      button.setAttribute('aria-pressed', String(state === 'playing' || state === 'ready'));
      button.setAttribute('aria-label', unavailable ? 'Ocean sound unavailable' : state === 'playing' ? 'Mute ocean sound' : state === 'ready' ? 'Disable ocean sound' : 'Enable ocean sound');
      const label = button.querySelector('[data-sound-label]');
      if (label) label.textContent = unavailable ? 'Sound unavailable' : state === 'playing' ? 'Mute sound' : state === 'ready' ? 'Sound ready' : 'Enable sound';
      const icon = button.querySelector('[data-sound-icon]');
      if (icon) icon.dataset.state = state === 'playing' || state === 'ready' ? 'on' : 'off';
    }
  }

  function setPreference(value) {
    wanted = value;
  }

  function ramp(parameter, value, seconds) {
    if (!context || !parameter) return;
    const now = context.currentTime;
    if (typeof parameter.cancelAndHoldAtTime === 'function') parameter.cancelAndHoldAtTime(now);
    else {
      const current = parameter.value;
      parameter.cancelScheduledValues(now);
      parameter.setValueAtTime(current, now);
    }
    parameter.linearRampToValueAtTime(value, now + seconds);
  }

  function stopPhrase(release = .3) {
    clearTimeout(musicTimer);
    musicTimer = null;
    for (const note of phraseNotes) {
      ramp(note.gain.gain, 0, release);
      try { note.source.stop(context.currentTime + release + .04); } catch { /* Completed notes already disconnected. */ }
    }
    phraseNotes.clear();
  }

  function stopDive(immediate = false) {
    if (!diveCue) return;
    const current = diveCue;
    diveCue = null;
    if (immediate) {
      try { current.source.stop(); } catch { /* Interrupted cues must not restart later. */ }
      current.source.disconnect();
      current.gain.disconnect();
      return;
    }
    ramp(current.gain.gain, 0, .1);
    try { current.source.stop(context.currentTime + .14); } catch { /* The short cue may already have finished. */ }
  }

  function silence(suspend = true) {
    playing = false;
    scene = 'off';
    ramp(master?.gain, 0, .22);
    stopPhrase(.18);
    stopDive();
    clearTimeout(suspendTimer);
    if (suspend && context?.state === 'running') {
      suspendTimer = setTimeout(() => {
        if (desiredScene() === 'off' && context?.state === 'running') context.suspend().catch(() => {});
      }, 260);
    }
    updateControls();
  }

  function ensureContext() {
    if (unavailable) return false;
    if (context && context.state !== 'closed') return true;
    try {
      context = new AudioContext({ latencyHint: 'playback' });
      master = context.createGain();
      master.gain.value = 0;
      master.connect(context.destination);
      noise = null;
      soundscapesReady = false;
      context.addEventListener('statechange', () => {
        if (context.state !== 'running') {
          playing = false;
          scene = 'off';
          stopPhrase(.1);
          stopDive(true);
        }
        reconcile();
      });
      return true;
    } catch {
      unavailable = true;
      updateControls();
      return false;
    }
  }

  function noiseBuffer() {
    if (noise) return noise;
    noise = context.createBuffer(2, Math.round(context.sampleRate * 6), context.sampleRate);
    for (let channel = 0; channel < noise.numberOfChannels; channel++) {
      const samples = noise.getChannelData(channel);
      let smooth = 0;
      for (let index = 0; index < samples.length; index++) {
        const white = Math.random() * 2 - 1;
        smooth += .035 * (white - smooth);
        samples[index] = (white * .12 + smooth * .88) * 2.1;
      }
    }
    return noise;
  }

  function noiseLayer(destination, high, low, level, variation, frequency, offset) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer();
    source.loop = true;
    const highpass = context.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = high;
    highpass.Q.value = .45;
    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = low;
    lowpass.Q.value = .4;
    const envelope = context.createGain();
    envelope.gain.value = level;
    const tide = context.createOscillator();
    tide.frequency.value = frequency;
    const depth = context.createGain();
    depth.gain.value = variation;
    tide.connect(depth).connect(envelope.gain);
    source.connect(highpass).connect(lowpass).connect(envelope).connect(destination);
    source.start(context.currentTime, offset);
    tide.start();
  }

  function ensureSoundscapes() {
    if (soundscapesReady) return;
    soundscapesReady = true;
    surfaceBus = context.createGain();
    underwaterBus = context.createGain();
    surfaceBus.gain.value = 0;
    underwaterBus.gain.value = 0;
    surfaceBus.connect(master);
    underwaterBus.connect(master);

    noiseLayer(surfaceBus, 80, 950, .11, .045, .055, 0);
    noiseLayer(surfaceBus, 350, 1500, .012, .005, .082, 2.3);
    noiseLayer(underwaterBus, 55, 580, .09, .022, .038, 1.7);
    noiseLayer(underwaterBus, 130, 820, .025, .007, .061, 3.4);

    musicBus = context.createGain();
    musicBus.gain.value = .24;
    const warmth = context.createBiquadFilter();
    warmth.type = 'lowpass';
    warmth.frequency.value = 700;
    warmth.Q.value = .4;
    musicBus.connect(warmth).connect(surfaceBus);
    for (const [index, frequency] of [146.8324, 220, 329.6276].entries()) {
      const voice = context.createOscillator();
      voice.type = 'sine';
      voice.frequency.value = frequency;
      voice.detune.value = (index - 1) * 1.5;
      const level = context.createGain();
      level.gain.value = .012;
      voice.connect(level).connect(musicBus);
      voice.start();
    }
  }

  function schedulePhrase() {
    if (musicTimer || !playing || scene !== 'surface' || desiredScene() !== 'surface' || context.state !== 'running') return;
    // An original sparse surface phrase; the underwater bus has no musical connection.
    const phrase = [[0, 293.6648], [12, 220], [27, 329.6276]];
    for (const [offset, frequency] of phrase) {
      const start = context.currentTime + 6 + offset;
      const source = context.createOscillator();
      source.type = 'sine';
      source.frequency.value = frequency;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(.032, start + 1.8);
      gain.gain.exponentialRampToValueAtTime(.0001, start + 7);
      source.connect(gain).connect(musicBus);
      const note = { source, gain };
      phraseNotes.add(note);
      source.onended = () => {
        source.disconnect();
        gain.disconnect();
        phraseNotes.delete(note);
      };
      source.start(start);
      source.stop(start + 7.2);
    }
    musicTimer = setTimeout(() => {
      musicTimer = null;
      schedulePhrase();
    }, 48000);
  }

  function playDive() {
    if (divePlayed || !diveDeadline || scene !== 'underwater') return;
    divePlayed = true;
    const remaining = (diveDeadline - performance.now()) / 1000;
    if (remaining < .18) return;
    const source = context.createBufferSource();
    source.buffer = noiseBuffer();
    const highpass = context.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 70;
    highpass.Q.value = .4;
    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.Q.value = .35;
    const gain = context.createGain();
    const now = context.currentTime;
    const elapsed = Math.max(0, performance.now() - diveStart) / Math.max(1, diveDeadline - diveStart);
    lowpass.frequency.setValueAtTime(1000 * Math.pow(.18, Math.min(1, elapsed)), now);
    lowpass.frequency.exponentialRampToValueAtTime(180, now + remaining);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(.18, now + Math.min(.28, remaining * .27));
    gain.gain.exponentialRampToValueAtTime(.0001, now + remaining);
    source.connect(highpass).connect(lowpass).connect(gain).connect(master);
    diveCue = { source, gain };
    source.onended = () => {
      source.disconnect();
      highpass.disconnect();
      lowpass.disconnect();
      gain.disconnect();
      if (diveCue?.source === source) diveCue = null;
    };
    source.start(now, .7, remaining + .04);
  }

  function reconcile() {
    if (unavailable) return updateControls();
    const next = desiredScene();
    if (next === 'off') {
      if (playing) silence();
      else updateControls();
      return;
    }
    if (context?.state !== 'running') return updateControls();
    clearTimeout(suspendTimer);
    ensureSoundscapes();
    const changingScene = scene !== next;
    if (!playing || changingScene) {
      const wasPlaying = playing;
      playing = true;
      scene = next;
      resumeAfterHide = false;
      const entering = next === 'underwater' && entryStarted && !entryCompleted && performance.now() < diveDeadline;
      const fade = entering ? Math.max(.2, (diveDeadline - performance.now()) / 1000) : wasPlaying ? 2.8 : 2.4;
      ramp(master.gain, next === 'surface' ? .13 : .105, fade);
      ramp(surfaceBus.gain, next === 'surface' ? 1 : 0, fade);
      ramp(underwaterBus.gain, next === 'underwater' ? 1 : 0, fade);
      if (next === 'surface') schedulePhrase();
      else stopPhrase(.85);
    }
    if (next === 'underwater') playDive();
    updateControls();
  }

  function unlock() {
    if (!wanted || document.hidden || pageAway || !ensureContext()) return;
    clearTimeout(suspendTimer);
    if (context.state === 'running') return reconcile();
    try {
      const pending = context.resume();
      pending?.then(reconcile).catch(updateControls);
    } catch { updateControls(); }
    updateControls();
  }

  function onGesture(event) {
    if (!event.isTrusted || !wanted) return;
    if (event.target.closest?.('[data-sound-toggle], #sound-toggle')) return;
    if (event.type === 'keydown' && (event.repeat || event.metaKey || event.ctrlKey || event.altKey || ['Shift', 'Control', 'Alt', 'Meta'].includes(event.key))) return;
    unlock();
  }

  document.addEventListener('pointerdown', onGesture, { capture: true, passive: true });
  document.addEventListener('touchend', onGesture, { capture: true, passive: true });
  document.addEventListener('keydown', onGesture, true);
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-sound-toggle], #sound-toggle');
    if (!button) {
      onGesture(event);
      return;
    }
    if (button.disabled || !event.isTrusted) return;
    if (root.dataset.soundState === 'playing' || root.dataset.soundState === 'ready') {
      setPreference(false);
      silence();
    } else {
      setPreference(true);
      unlock();
    }
  });

  window.addEventListener('portfolio:opening-ready', () => {
    surfaceReady = true;
    if (wanted) unlock();
    else updateControls();
  });
  window.addEventListener('portfolio:opening-enter', event => {
    if (!entryStarted) {
      const requested = Number(event.detail?.duration);
      const duration = Number.isFinite(requested) && requested > 0 ? Math.min(2200, Math.max(800, requested)) : 1400;
      diveStart = performance.now();
      diveDeadline = diveStart + duration;
      divePlayed = false;
    }
    entryStarted = true;
    surfaceReady = true;
    if (wanted) unlock();
  });
  window.addEventListener('portfolio:opening-change', event => {
    if (event.detail?.active) {
      surfaceReady = false;
      entryStarted = false;
      entryCompleted = false;
      diveStart = 0;
      diveDeadline = 0;
      divePlayed = false;
      silence(false);
    } else {
      if (event.detail?.entered === true && entryStarted) entryCompleted = true;
      if (wanted) unlock();
      else reconcile();
    }
  });

  function hide() {
    resumeAfterHide = resumeAfterHide || playing;
    silence();
  }
  function restore() {
    if (resumeAfterHide && wanted && !document.hidden) unlock();
    else updateControls();
  }
  document.addEventListener('visibilitychange', () => document.hidden ? hide() : restore());
  window.addEventListener('pagehide', () => {
    pageAway = true;
    hide();
  });
  window.addEventListener('pageshow', () => {
    pageAway = false;
    restore();
  });
  updateControls();
})();
