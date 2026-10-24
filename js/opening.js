(() => {
  const root = document.documentElement;
  const opening = document.getElementById('ocean-opening');
  const cue = document.getElementById('opening-instructions');
  const library = window.anime;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timeline;
  let exit;
  let active = false;
  let entering = false;
  let fallback;
  let wheelDistance = 0;
  let touchOrigin = null;
  let covered = [];

  function eligible() {
    if (!opening || !cue || !library?.createTimeline || reducedMotion.matches || document.hidden) return false;
    if (window.scrollY > 0 || (location.hash && location.hash !== '#home')) return false;
    const navigation = performance.getEntriesByType?.('navigation')[0];
    if (navigation?.type === 'back_forward') return false;
    try {
      return localStorage.getItem('portfolio-motion') !== 'paused';
    } catch {
      return true;
    }
  }

  function signal(isActive) {
    root.dataset.opening = isActive ? 'playing' : 'done';
    window.dispatchEvent(new CustomEvent('portfolio:opening-change', { detail: { active: isActive } }));
  }

  function finish(focusHero = false) {
    if (!active) return;
    active = false;
    clearTimeout(fallback);
    timeline?.pause();
    exit?.pause();
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

    if (focusHero) {
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
    fallback = setTimeout(() => finish(focusHero), 1200);
    try {
      exit = library.createTimeline({ autoplay: false, onComplete: () => finish(focusHero) });
      exit.add('.opening-content', { y: -28, opacity: 0, duration: 480, ease: 'inOutSine' }, 0);
      exit.add(cue, { opacity: 0, y: -8, duration: 300, ease: 'outSine' }, 0);
      exit.add(opening, { opacity: 0, duration: 560, ease: 'inOutSine' }, 0);
      exit.play();
    } catch {
      finish(focusHero);
    }
  }

  function onIntent() { finish(); }
  function onScroll() { if (window.scrollY > 0) finish(); }
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
    if (event.key === 'Escape' || event.key === 'Tab') {
      finish(true);
      return;
    }
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
    } else if (active && !timeline?.completed) timeline?.resume();
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

    try {
      timeline = library.createTimeline({ autoplay: false });
      opening.querySelectorAll('[data-opening-wave]').forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = length;
        timeline.add(path, { strokeDashoffset: [length, 0], duration: 1150, ease: 'inOutSine' }, index * 110);
      });
      timeline.add('.opening-title', { opacity: [0, 1], y: [12, 0], duration: 650, ease: 'outCubic' }, 80);
      timeline.add(cue, { opacity: [0, 1], y: [6, 0], duration: 650, ease: 'outCubic' }, 350);
      timeline.play();
    } catch {
      finish();
    }
  }

  if (document.hidden) {
    document.addEventListener('visibilitychange', startWhenVisible);
    window.addEventListener('pagehide', stopWaiting, { once: true });
  } else start();
})();
