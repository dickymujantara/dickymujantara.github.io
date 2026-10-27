(() => {
  const root = document.documentElement;
  const opening = document.getElementById('ocean-opening');
  const cue = document.getElementById('opening-instructions');
  const scene = opening?.querySelector('.opening-scene');
  const environment = opening?.querySelector('.opening-environment');
  const motionButton = document.getElementById('opening-motion-toggle');
  const loader = opening?.querySelector('.opening-loader');
  const library = window.anime;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const portrait = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
  const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const animations = new Set();
  const ambient = new Set();
  const assetListeners = [];
  const backgrounds = new Map();
  const readyArt = new Map();
  const startedArt = new Set();
  let timeline;
  let loadingAnimation;
  let active = false;
  let ready = false;
  let entering = false;
  let motionPaused = false;
  let fallback;
  let loadingDeadline;
  let revealTimer;
  let loadingStarted;
  let artSettled = false;
  let loadingTimedOut = false;
  let wheelDistance = 0;
  let touchOrigin = null;
  let covered = [];

  function eligible() {
    if (!opening || !cue || !scene || !environment || !library?.createTimeline || !library?.animate || reducedMotion.matches || document.hidden) return false;
    if (window.scrollY > 0 || (location.hash && location.hash !== '#home')) return false;
    const navigation = performance.getEntriesByType?.('navigation')[0];
    if (navigation?.type === 'back_forward') return false;
    try {
      return localStorage.getItem('portfolio-motion') !== 'paused';
    } catch {
      return true;
    }
  }

  function own(animation) {
    animations.add(animation);
    return animation;
  }

  function signal(isActive) {
    root.dataset.opening = isActive ? 'playing' : 'done';
    window.dispatchEvent(new CustomEvent('portfolio:opening-change', { detail: { active: isActive, entered: !isActive && entering } }));
  }

  function syncAmbient() {
    const playing = active && ready && !entering && !motionPaused && !document.hidden;
    ambient.forEach(animation => playing ? animation.resume() : animation.pause());
  }

  function startAmbient(element, index = 0) {
    const profiles = {
      water: {
        x: [-8, 8], y: [-3, 3], scaleX: [1.02, 1.04],
        scaleY: compact ? [1.006, 1.021] : [1.01, 1.035], duration: 9000,
      },
      otter: { x: [-1.5, 1.5], y: [-2.5, 2.5], rotate: [-.25, .25], duration: 8000 },
      seal: { y: [-.5, .5], scale: [1, 1.008], duration: 9000 },
      bird: { x: [-18, 18], y: [-6, 6], rotate: [-3, 3], duration: index ? 14000 : 11000 },
    };
    const settings = profiles[element.dataset.openingAmbient];
    if (!settings) return;
    const profile = { ...settings };
    if (compact) {
      for (const property of ['x', 'y', 'rotate']) {
        if (profile[property]) profile[property] = profile[property].map(value => value * .6);
      }
      profile.duration *= 1.2;
    }
    const animation = own(library.animate(element, {
      ...profile, ease: 'inOutSine', alternate: true, loop: true, autoplay: false,
    }));
    animation.seek(profile.duration * (index ? .55 : .12));
    ambient.add(animation);
    syncAmbient();
  }

  function showArt(element) {
    if (!active || entering) return;
    own(library.animate(element, { opacity: [0, 1], duration: 700, ease: 'outSine' }));
  }

  function stageArt(element, index = 0) {
    if (!active || entering) return;
    readyArt.set(element, index);
    if (!ready || startedArt.has(element)) return;
    startedArt.add(element);
    showArt(element);
    startAmbient(element, index);
  }

  function loadImage(image, path, onReady) {
    return new Promise(resolve => {
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        image.removeEventListener('load', load);
        image.removeEventListener('error', settle);
        resolve();
      };
      const load = async () => {
        try {
          await image.decode?.();
          if (!settled && active && !entering && image.naturalWidth) onReady();
        } catch {
          // An unavailable image leaves the native title and entry controls usable.
        } finally {
          settle();
        }
      };
      image.addEventListener('load', load, { once: true });
      image.addEventListener('error', settle, { once: true });
      assetListeners.push(settle);
      image.src = new URL(path, document.baseURI).href;
    });
  }

  function loadBackground() {
    const key = portrait.matches ? 'mobile' : 'desktop';
    const property = key === 'mobile' ? '--opening-surface-mobile' : '--opening-surface';
    const apply = image => {
      environment.style.setProperty(property, `url("${image.src}")`);
      if (!environment.dataset.ready) {
        environment.dataset.ready = 'true';
        // Keep a ready composition visible while a rotated viewport loads the other.
        environment.style.setProperty('--opening-surface', `url("${image.src}")`);
        environment.style.setProperty('--opening-surface-mobile', `url("${image.src}")`);
        stageArt(environment);
        environment.querySelectorAll('[data-opening-ambient]').forEach(layer => stageArt(layer));
      }
    };
    if (backgrounds.has(key)) {
      const record = backgrounds.get(key);
      if (record.image.complete && record.image.naturalWidth) apply(record.image);
      return record.promise;
    }
    const image = new Image();
    const promise = loadImage(image, `img/ocean/surface${key === 'mobile' ? '-mobile' : ''}-v2.webp`, () => apply(image));
    backgrounds.set(key, { image, promise });
    return promise;
  }

  function loadArt() {
    const pending = [loadBackground()];
    const heroImage = document.querySelector('.hero-whale img');
    if (heroImage?.decode) pending.push(heroImage.decode().catch(() => {}));
    let bird = 0;
    opening.querySelectorAll('img[data-opening-src]').forEach(image => {
      const index = image.dataset.openingAmbient === 'bird' ? bird++ : 0;
      pending.push(loadImage(image, image.dataset.openingSrc, () => stageArt(image, index)));
    });
    return Promise.allSettled(pending);
  }

  function showOpening() {
    if (!active || ready || entering || document.hidden) return;
    ready = true;
    clearTimeout(loadingDeadline);
    clearTimeout(revealTimer);
    loadingAnimation?.cancel();
    opening.dataset.phase = 'waiting';
    window.dispatchEvent(new CustomEvent('portfolio:opening-ready'));
    opening.setAttribute('aria-busy', 'false');
    opening.setAttribute('aria-describedby', 'opening-instructions');
    readyArt.forEach((index, element) => stageArt(element, index));
    timeline = own(library.createTimeline({ autoplay: false }));
    timeline.add('.opening-title', { opacity: [0, 1], y: [12, 0], duration: 650, ease: 'outCubic' }, 80);
    timeline.add(cue, { opacity: [0, 1], y: [6, 0], duration: 650, ease: 'outCubic' }, 350);
    timeline.play();
    if (loader) own(library.animate(loader, {
      opacity: [1, 0], duration: 300, ease: 'outSine', onComplete: () => { loader.hidden = true; },
    }));
  }

  function scheduleOpening() {
    if (!active || ready || (!artSettled && !loadingTimedOut)) return;
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => {
      try { showOpening(); } catch { finish(); }
    }, Math.max(0, 650 - (performance.now() - loadingStarted)));
  }

  function startLoading() {
    loadingStarted = performance.now();
    opening.setAttribute('aria-busy', 'true');
    opening.setAttribute('aria-describedby', 'opening-loading-label');
    loadingAnimation = own(library.createTimeline({ loop: true, alternate: true, autoplay: false }));
    opening.querySelectorAll('[data-loading-wave]').forEach((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length} ${length}`;
      loadingAnimation.add(path, {
        strokeDashoffset: [length, 0], opacity: [.3, 1], duration: 900, ease: 'inOutSine',
      }, index * 140);
    });
    loadingAnimation.play();
    loadingDeadline = setTimeout(() => {
      loadingTimedOut = true;
      scheduleOpening();
    }, 4500);
    loadArt().then(() => {
      artSettled = true;
      scheduleOpening();
    });
  }

  function finish(focusHero = false) {
    if (!active) return;
    const restoreFocus = focusHero || opening.contains(document.activeElement);
    active = false;
    clearTimeout(fallback);
    clearTimeout(loadingDeadline);
    clearTimeout(revealTimer);
    animations.forEach(animation => animation.cancel());
    animations.clear();
    ambient.clear();
    assetListeners.splice(0).forEach(remove => remove());
    backgrounds.clear();
    readyArt.clear();
    startedArt.clear();
    opening.hidden = true;
    opening.removeAttribute('aria-busy');
    opening.dataset.phase = 'done';
    covered.forEach(({ element, wasInert }) => element.toggleAttribute('inert', wasInert));
    covered = [];
    signal(false);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart, true);
    window.removeEventListener('touchmove', onTouchMove, true);
    window.removeEventListener('touchend', onTouchEnd, true);
    window.removeEventListener('touchcancel', onTouchEnd, true);
    window.removeEventListener('keydown', onKey, true);
    window.removeEventListener('pageshow', onPageShow);
    window.removeEventListener('pagehide', onIntent);
    window.removeEventListener('hashchange', onIntent);
    document.removeEventListener('visibilitychange', onVisibility);
    reducedMotion.removeEventListener?.('change', onPreference);
    portrait.removeEventListener?.('change', onOrientation);
    motionButton?.removeEventListener('click', onMotionToggle);

    if (restoreFocus) {
      const heading = document.getElementById('hero-title');
      if (heading) {
        const hadTabindex = heading.hasAttribute('tabindex');
        if (!hadTabindex) heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        if (!hadTabindex) heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
      }
    }
  }

  function enter(focusHero = false) {
    if (!active || !ready || entering) return;
    entering = true;
    opening.dataset.phase = 'entering';
    const duration = compact ? 1450 : 1650;
    window.dispatchEvent(new CustomEvent('portfolio:opening-enter', { detail: { duration } }));
    timeline?.pause();
    syncAmbient();
    fallback = setTimeout(() => finish(focusHero), duration + 1000);
    try {
      const exit = own(library.createTimeline({ autoplay: false, onComplete: () => finish(focusHero) }));
      exit.add('.opening-content', { y: -20, opacity: 0, duration: 650, ease: 'inOutSine' }, 0);
      exit.add(cue, { opacity: 0, y: -6, duration: 450, ease: 'inOutSine' }, 0);
      exit.add(opening.querySelector('.opening-controls'), { opacity: 0, duration: 450, ease: 'inOutSine' }, 0);
      exit.add(scene, { scale: 1.045, y: -window.innerHeight * .055, duration, ease: 'inOutSine' }, 0);
      exit.add('.opening-dive', { y: [window.innerHeight + 80, -80], duration: duration * .88, ease: 'inOutSine' }, 0);
      exit.add(opening, { opacity: [1, 0], duration: duration - 120, ease: 'inOutSine' }, 120);
      exit.play();
    } catch {
      finish(focusHero);
    }
  }

  function onMotionToggle() {
    if (!active || !ready || entering) return;
    motionPaused = !motionPaused;
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.setAttribute('aria-label', motionPaused ? 'Play opening motion' : 'Pause opening motion');
    motionButton.querySelector('[data-opening-motion-icon]').dataset.state = motionPaused ? 'play' : 'pause';
    syncAmbient();
  }

  function onIntent() { finish(); }
  function onScroll() { if (window.scrollY > 0) finish(); }
  function onOrientation() { if (active && !entering) loadBackground(); }
  function onWheel(event) {
    if (event.ctrlKey || !event.deltaY) return;
    if (event.cancelable) event.preventDefault();
    if (entering || !ready) return;
    if (event.deltaY < 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      wheelDistance = 0;
      return;
    }
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    wheelDistance += event.deltaY * unit;
    if (wheelDistance >= 24) enter();
  }
  function onTouchStart(event) {
    touchOrigin = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY, canEnter: ready } : null;
  }
  function onTouchMove(event) {
    if (!touchOrigin || event.touches.length !== 1) return;
    const x = event.touches[0].clientX - touchOrigin.x;
    const y = touchOrigin.y - event.touches[0].clientY;
    if (Math.abs(y) > Math.abs(x) && event.cancelable) event.preventDefault();
    if (touchOrigin.canEnter && y >= 40 && y > Math.abs(x) * 1.2) enter();
  }
  function onTouchEnd() { touchOrigin = null; }
  function onKey(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') {
      finish(true);
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const controls = ready ? [...opening.querySelectorAll('button:not(:disabled)')] : [];
      const current = controls.indexOf(document.activeElement);
      const next = current < 0 ? (event.shiftKey ? controls.length - 1 : 0) : (current + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
      (controls[next] || opening).focus({ preventScroll: true });
      return;
    }
    if (event.target.closest('button') && ['Enter', ' '].includes(event.key)) return;
    if (event.key === ' ' && event.shiftKey) return;
    if (['Enter', ' ', 'ArrowDown', 'PageDown', 'End'].includes(event.key)) {
      event.preventDefault();
      enter(true);
    }
  }
  function onPageShow(event) { if (event.persisted || window.scrollY > 0) finish(); }
  function onVisibility() {
    if (document.hidden) {
      if (entering) finish();
      else {
        timeline?.pause();
        loadingAnimation?.pause();
      }
    } else if (active && !entering) {
      if (!ready) {
        loadingAnimation?.resume();
        scheduleOpening();
      } else if (!timeline?.completed) timeline?.resume();
    }
    syncAmbient();
  }
  function onPreference() { if (reducedMotion.matches) finish(); }

  function stopWaiting() {
    document.removeEventListener('visibilitychange', startWhenVisible);
    window.removeEventListener('pagehide', stopWaiting);
  }

  function startWhenVisible() {
    if (!document.hidden) start();
  }

  function start() {
    stopWaiting();
    if (!eligible()) {
      signal(false);
      return;
    }

    active = true;
    opening.hidden = false;
    opening.dataset.phase = 'loading';
    covered = [...document.querySelectorAll('.site-header, main, #portfolio-controls')]
      .map(element => ({ element, wasInert: element.hasAttribute('inert') }));
    covered.forEach(({ element }) => element.setAttribute('inert', ''));
    signal(true);
    if (document.activeElement === document.body) opening.focus({ preventScroll: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { capture: true, passive: true });
    window.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', onTouchEnd, { capture: true, passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { capture: true, passive: true });
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('pagehide', onIntent);
    window.addEventListener('hashchange', onIntent);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener?.('change', onPreference);
    portrait.addEventListener?.('change', onOrientation);
    motionButton?.addEventListener('click', onMotionToggle);

    try {
      startLoading();
    } catch {
      finish();
    }
  }

  if (document.hidden) {
    document.addEventListener('visibilitychange', startWhenVisible);
    window.addEventListener('pagehide', stopWaiting, { once: true });
  } else start();
})();
