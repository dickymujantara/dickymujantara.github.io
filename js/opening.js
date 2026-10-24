(() => {
  const root = document.documentElement;
  const opening = document.getElementById('ocean-opening');
  const cue = document.getElementById('opening-instructions');
  const scene = opening?.querySelector('.opening-scene');
  const environment = opening?.querySelector('.opening-environment');
  const motionButton = document.getElementById('opening-motion-toggle');
  const library = window.anime;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const portrait = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
  const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const animations = new Set();
  const ambient = new Set();
  const assetListeners = [];
  const backgrounds = new Map();
  let timeline;
  let active = false;
  let entering = false;
  let motionPaused = false;
  let fallback;
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
    window.dispatchEvent(new CustomEvent('portfolio:opening-change', { detail: { active: isActive } }));
  }

  function syncAmbient() {
    const playing = active && !entering && !motionPaused && !document.hidden;
    ambient.forEach(animation => playing ? animation.resume() : animation.pause());
  }

  function startAmbient(element, index = 0) {
    const profiles = {
      water: { x: [-3, 3], y: [-1, 1], duration: 14000 },
      otter: { x: [-3, 3], y: [-5, 5], rotate: [-.6, .6], duration: 8000 },
      seal: { y: [-.5, .5], scale: [1, 1.008], duration: 9000 },
      bird: { x: [-18, 18], y: [-6, 6], rotate: [-3, 3], duration: index ? 14000 : 11000 },
    };
    const profile = { ...profiles[element.dataset.openingAmbient] };
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

  function listenForAsset(image, ready) {
    const load = () => {
      if (!active || entering || !image.naturalWidth) return;
      ready();
    };
    image.addEventListener('load', load, { once: true });
    assetListeners.push(() => image.removeEventListener('load', load));
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
        showArt(environment);
        startAmbient(environment);
      }
    };
    if (backgrounds.has(key)) {
      const image = backgrounds.get(key);
      if (image.complete && image.naturalWidth) apply(image);
      return;
    }
    const image = new Image();
    backgrounds.set(key, image);
    listenForAsset(image, () => apply(image));
    image.src = new URL(`img/ocean/surface${key === 'mobile' ? '-mobile' : ''}.webp`, document.baseURI).href;
  }

  function loadArt() {
    loadBackground();
    let bird = 0;
    opening.querySelectorAll('img[data-opening-src]').forEach(image => {
      const index = image.dataset.openingAmbient === 'bird' ? bird++ : 0;
      listenForAsset(image, () => {
        showArt(image);
        startAmbient(image, index);
      });
      image.src = new URL(image.dataset.openingSrc, document.baseURI).href;
    });
  }

  function finish(focusHero = false) {
    if (!active) return;
    const restoreFocus = focusHero || opening.contains(document.activeElement);
    active = false;
    clearTimeout(fallback);
    animations.forEach(animation => animation.cancel());
    animations.clear();
    ambient.clear();
    assetListeners.splice(0).forEach(remove => remove());
    backgrounds.clear();
    opening.hidden = true;
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
    if (!active || entering) return;
    entering = true;
    opening.dataset.phase = 'entering';
    timeline?.pause();
    syncAmbient();
    const rise = compact ? 650 : 800;
    fallback = setTimeout(() => finish(focusHero), 1800);
    try {
      const exit = own(library.createTimeline({ autoplay: false, onComplete: () => finish(focusHero) }));
      exit.add('.opening-content', { y: -28, opacity: 0, duration: 350, ease: 'inOutSine' }, 0);
      exit.add(cue, { opacity: 0, y: -8, duration: 250, ease: 'outSine' }, 0);
      if (motionButton) exit.add(motionButton, { opacity: 0, duration: 250, ease: 'outSine' }, 0);
      exit.add(scene, { scale: 1.1, y: -window.innerHeight * .08, duration: rise, ease: 'inOutSine' }, 0);
      exit.add('.opening-dive', { y: [window.innerHeight + 80, 0], duration: rise, ease: 'inOutSine' }, 0);
      exit.add(opening, { opacity: 0, duration: 320, ease: 'inOutSine' }, rise - 70);
      exit.play();
    } catch {
      finish(focusHero);
    }
  }

  function onMotionToggle() {
    if (!active || entering) return;
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
    if (entering) return;
    if (event.deltaY < 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      wheelDistance = 0;
      return;
    }
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    wheelDistance += event.deltaY * unit;
    if (wheelDistance >= 24) enter();
  }
  function onTouchStart(event) {
    touchOrigin = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }
  function onTouchMove(event) {
    if (!touchOrigin || event.touches.length !== 1) return;
    const x = event.touches[0].clientX - touchOrigin.x;
    const y = touchOrigin.y - event.touches[0].clientY;
    if (Math.abs(y) > Math.abs(x) && event.cancelable) event.preventDefault();
    if (y >= 40 && y > Math.abs(x) * 1.2) enter();
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
      motionButton?.focus({ preventScroll: true });
      return;
    }
    if (event.target === motionButton && ['Enter', ' '].includes(event.key)) return;
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
      else timeline?.pause();
    } else if (active && !entering && !timeline?.completed) timeline?.resume();
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
      root.dataset.opening = 'done';
      return;
    }

    active = true;
    opening.hidden = false;
    opening.dataset.phase = 'waiting';
    covered = [...document.querySelectorAll('.site-header, main, #motion-toggle')]
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
      timeline = own(library.createTimeline({ autoplay: false }));
      timeline.add('.opening-title', { opacity: [0, 1], y: [12, 0], duration: 650, ease: 'outCubic' }, 80);
      timeline.add(cue, { opacity: [0, 1], y: [6, 0], duration: 650, ease: 'outCubic' }, 350);
      timeline.play();
      loadArt();
    } catch {
      finish();
    }
  }

  if (document.hidden) {
    document.addEventListener('visibilitychange', startWhenVisible);
    window.addEventListener('pagehide', stopWaiting, { once: true });
  } else start();
})();
