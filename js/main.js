document.documentElement.classList.add('js');

const nav = document.querySelector('#site-nav');
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

function closeMenu(restoreFocus = false) {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    if (restoreFocus) menuToggle.focus();
}

menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    navLinks?.classList.toggle('is-open', open);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});

document.addEventListener('click', event => {
    if (!nav?.contains(event.target)) closeMenu();
    if (event.target.closest('#site-nav a[href^="#"]')) closeMenu();
});

window.addEventListener('resize', () => {
    if (menuToggle && getComputedStyle(menuToggle).display === 'none') closeMenu();
}, { passive: true });

const sectionLinks = [...document.querySelectorAll('#site-nav a[href^="#"]')]
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(item => item.section);
let navFrame = 0;

function updateCurrentSection() {
    navFrame = 0;
    const readingLine = window.innerHeight * 0.35;
    const flowTop = section => (section.closest('[data-scroll-chapter]') || section).getBoundingClientRect().top;
    const ordered = sectionLinks.slice().sort((a, b) => flowTop(a.section) - flowTop(b.section));
    let current = null;
    for (const item of ordered) {
        if (item.section.getBoundingClientRect().top <= readingLine) current = item.link;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) current = ordered.at(-1)?.link;
    for (const { link } of sectionLinks) {
        if (link === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    }
}

window.addEventListener('scroll', () => {
    if (!navFrame) navFrame = requestAnimationFrame(updateCurrentSection);
}, { passive: true });
updateCurrentSection();

const graphNodes = [...document.querySelectorAll('.graph-node')];
const graphLinks = [...document.querySelectorAll('.graph-link')];
const graphDetail = document.querySelector('#graph-detail');
let selectedNode = graphNodes.find(node => node.getAttribute('aria-pressed') === 'true') || graphNodes[0];

function showGraphNode(node) {
    if (!node) return;
    for (const item of graphNodes) {
        const selected = item === node;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
    }
    for (const link of graphLinks) {
        link.classList.toggle('is-active', link.dataset.from === node.dataset.node || link.dataset.to === node.dataset.node);
    }
    const description = node.dataset.description;
    if (graphDetail && description && graphDetail.textContent !== description) graphDetail.textContent = description;
}

function restoreGraphSelection() {
    const focusedNode = document.activeElement?.closest('.graph-node');
    showGraphNode(focusedNode || selectedNode);
}

document.addEventListener('pointerover', event => {
    const node = event.target.closest('.graph-node');
    if (node) showGraphNode(node);
});

document.addEventListener('pointerout', event => {
    const node = event.target.closest('.graph-node');
    if (node && !node.contains(event.relatedTarget)) restoreGraphSelection();
});

document.addEventListener('focusin', event => {
    const node = event.target.closest('.graph-node');
    if (node) showGraphNode(node);
});

document.addEventListener('focusout', event => {
    if (event.target.closest('.graph-node')) queueMicrotask(restoreGraphSelection);
});

document.addEventListener('click', event => {
    const node = event.target.closest('.graph-node');
    if (node) {
        selectedNode = node;
        showGraphNode(node);
    }
    const experience = event.target.closest('[data-experience]');
    if (experience) {
        document.querySelectorAll('[data-experience]').forEach(item => {
            item.classList.toggle('is-selected', item === experience);
            item.setAttribute('aria-pressed', String(item === experience));
        });
    }
});
showGraphNode(selectedNode);

const motionToggle = document.querySelector('#motion-toggle');
const motionLabel = motionToggle?.querySelector('[data-motion-label]');
const motionIcon = motionToggle?.querySelector('[data-motion-icon]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionStorageKey = 'portfolio-motion';
let savedMotion = null;
try { savedMotion = localStorage.getItem(motionStorageKey); } catch { /* Storage can be disabled by browser privacy settings. */ }
let motionPaused = savedMotion === 'paused' || reducedMotion.matches;
let motionAvailable = true;
let syncPlayback = () => {};
let finishTimeline = () => {};
let syncScrollMotion = () => {};
let refreshScrollMotion = () => {};

function updateMotionControl() {
    document.documentElement.dataset.motionState = !motionAvailable ? 'unavailable' : motionPaused ? 'paused' : 'playing';
    if (!motionToggle) return;
    const label = !motionAvailable ? 'Static view' : motionPaused ? 'Play motion' : 'Pause motion';
    motionToggle.disabled = !motionAvailable;
    motionToggle.setAttribute('aria-label', !motionAvailable ? 'Ocean motion is unavailable' : `${motionPaused ? 'Play' : 'Pause'} all ocean motion`);
    motionToggle.setAttribute('aria-pressed', String(motionPaused));
    if (motionLabel) motionLabel.textContent = label;
    if (motionIcon) motionIcon.textContent = motionPaused ? '▶' : 'Ⅱ';
}

motionToggle?.addEventListener('click', () => {
    motionPaused = !motionPaused;
    savedMotion = motionPaused ? 'paused' : 'playing';
    try { localStorage.setItem(motionStorageKey, savedMotion); } catch { /* The control works without persisted storage. */ }
    updateMotionControl();
    syncPlayback();
    if (motionPaused) finishTimeline();
    syncScrollMotion();
});

reducedMotion.addEventListener('change', () => {
    motionPaused = reducedMotion.matches || savedMotion === 'paused';
    if (reducedMotion.matches) finishTimeline();
    refreshScrollMotion();
    updateMotionControl();
    syncPlayback();
});

document.addEventListener('visibilitychange', () => syncPlayback());
updateMotionControl();

async function initializeOceanMotion() {
    let animate;
    let createAnimatable;
    const library = window.anime;
    try {
        if (!library?.animate || !library?.createTimeline) throw new Error('Animation library unavailable');
        ({ animate, createAnimatable } = library);
    } catch {
        motionAvailable = false;
        motionPaused = true;
        document.documentElement.dataset.scrollMotion = 'unavailable';
        updateMotionControl();
        return;
    }

    const profiles = {
        whale: { x: [-18, 18], y: [-8, 8], rotate: [-0.8, 0.8], duration: 7000 },
        orca: { x: [-25, 25], y: [-8, 9], rotate: [-1, 1], duration: 8500 },
        dolphin: { x: [-32, 32], y: [-11, 11], rotate: [-1.4, 1.4], duration: 6500 },
        turtle: { x: [-18, 18], y: [-9, 9], rotate: [-1.5, 1.5], duration: 9500 },
        water: { x: [-8, 8], y: [-4, 4], scale: [1.02, 1.05], duration: 15500 },
        light: { x: [-12, 12], rotate: [-1, 1], duration: 14000 },
        jellyfish: { x: [-6, 6], y: [-16, 16], rotate: [-2, 2], duration: 6200 },
        crab: { x: [-9, 9], rotate: [-0.8, 0.8], duration: 8200 },
        starfish: { y: [-1, 1], rotate: [-1, 1], duration: 11000 },
        frame: { x: [-8, 8], y: [-11, 11], rotate: [-2, 2], duration: 5200 },
        detail: { x: [-8, 8], y: [-5, 5], duration: 6500 },
        fin: { rotate: [-4, 4], duration: 4600 },
    };
    const sceneRecords = new Map();
    const pointerLayers = [];
    const hero = document.querySelector('#home');

    function sceneRecord(element) {
        if (!sceneRecords.has(element)) {
            const bounds = element.getBoundingClientRect();
            sceneRecords.set(element, {
                visible: bounds.bottom > 0 && bounds.top < window.innerHeight,
                animations: [],
            });
        }
        return sceneRecords.get(element);
    }

    document.querySelectorAll('[data-scene]').forEach(scene => {
        const record = sceneRecord(scene);
        scene.querySelectorAll('[data-motion]').forEach((layer, index) => {
            const profile = profiles[layer.dataset.motion];
            if (!profile) return;
            const animation = animate(layer, {
                ...profile,
                ease: 'inOutSine',
                alternate: true,
                loop: true,
                autoplay: false,
            });
            const phase = Number(layer.dataset.phase ?? index * 0.17);
            if (Number.isFinite(phase)) animation.seek((Math.abs(phase) % 1) * profile.duration);
            record.animations.push(animation);
        });
    });

    hero?.querySelectorAll('[data-depth]').forEach(layer => {
        const depth = Number(layer.dataset.depth);
        if (!Number.isFinite(depth) || layer.hasAttribute('data-motion')) return;
        pointerLayers.push({
            depth,
            controller: createAnimatable(layer, { x: 800, y: 800, ease: 'out(3)' }),
        });
    });

    function canMoveHero() {
        return !motionPaused && !document.hidden && sceneRecords.get(hero)?.visible;
    }

    function moveHero(event) {
        if (!canMoveHero()) return;
        const bounds = hero.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
        for (const { depth, controller } of pointerLayers) {
            controller.x(x * depth);
            controller.y(y * depth * 0.6);
        }
    }

    function settleHero() {
        if (!canMoveHero()) return;
        for (const { controller } of pointerLayers) {
            controller.x(0, 1100);
            controller.y(0, 1100);
        }
    }

    hero?.addEventListener('pointermove', moveHero, { passive: true });
    hero?.addEventListener('pointerdown', moveHero, { passive: true });
    hero?.addEventListener('pointerleave', settleHero);
    hero?.addEventListener('pointercancel', settleHero);
    hero?.addEventListener('pointerup', event => {
        if (event.pointerType === 'touch') settleHero();
    });

    syncPlayback = () => {
        const enabled = !motionPaused && !document.hidden;
        for (const record of sceneRecords.values()) {
            for (const animation of record.animations) {
                if (enabled && record.visible && !animation.completed) animation.resume();
                else animation.pause();
            }
        }
        for (const { controller } of pointerLayers) {
            for (const animation of Object.values(controller.animations)) {
                if (canMoveHero() && !animation.completed) animation.resume();
                else animation.pause();
            }
        }
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                sceneRecord(entry.target).visible = entry.isIntersecting;
            }
            syncPlayback();
        }, { rootMargin: '40px 0px', threshold: 0.01 });
        sceneRecords.forEach((record, element) => observer.observe(element));
    } else {
        sceneRecords.forEach(record => { record.visible = true; });
    }

    syncPlayback();
    initializeScrollMotion(library);
}

function initializeScrollMotion({ createTimeline }) {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const progressBar = document.querySelector('#scroll-progress');
    const chapters = [...document.querySelectorAll('[data-scroll-chapter]')];
    const compactView = window.matchMedia('(max-width: 600px)');
    const clamp = value => Math.max(0, Math.min(1, value));
    let chapterRecords = [];
    let contentRecords = [];
    let enabled = false;
    let compact = compactView.matches;
    let headerHeight = 73;
    let scrollFrame = 0;
    let resizeFrame = 0;

    function timeline() {
        return createTimeline({ autoplay: false, defaults: { duration: 1000, ease: 'linear' } });
    }

    function add(animation, element, properties, position = 0) {
        if (element) animation.add(element, properties, position);
    }

    function buildTimelines() {
        const distance = compact ? 0.55 : 1;
        chapterRecords = chapters.map(chapter => {
            const frame = chapter.querySelector('[data-scroll-frame]');
            const animation = timeline();
            const type = chapter.dataset.scrollChapter;
            if (type === 'hero') {
                add(animation, frame.querySelector('.hero-whale'), {
                    x: [-20 * distance, 125 * distance], y: [18, -75 * distance],
                    scale: [0.98, 1.16], rotate: [-1.5, 2.5],
                });
                add(animation, frame.querySelector('.scroll-water'), { y: [0, -55], scale: [1, 1.14] });
                add(animation, frame.querySelector('h1'), { y: [0, -32 * distance], scale: [1, 0.84] });
                add(animation, frame.querySelector('.hero-description'), { y: [0, -24 * distance] });
                add(animation, frame.querySelector('.hero-actions'), { y: [0, -18 * distance] });
            } else if (type === 'about') {
                add(animation, frame.querySelector('.about-orca'), { x: [-70 * distance, 58 * distance], y: [25, -32], rotate: [-2, 2], scale: [0.95, 1.05] });
                add(animation, frame.querySelector('.dolphin-one'), { x: [-85 * distance, 75 * distance], y: [30, -38], rotate: [-3, 2] });
                add(animation, frame.querySelector('.dolphin-two'), { x: [-40 * distance, 105 * distance], y: [18, -25], scale: [0.94, 1.04] });
                add(animation, frame.querySelector('.orca-detail'), { y: [30, -24], rotate: [-3, 2] });
                add(animation, frame.querySelector('h2'), { y: [20, -10] });
            } else {
                add(animation, frame.querySelector('.exploration-turtle'), { x: [-65 * distance, 55 * distance], y: [35, -45], rotate: [-4, 4], scale: [0.93, 1.06] });
                add(animation, frame.querySelector('.turtle-detail'), { x: [-14, 12], y: [35, -24], rotate: [-4, 2] });
                add(animation, frame.querySelector('.turtle-mosaic'), { x: [16, -10], y: [-25, 24], rotate: [4, -2] });
                add(animation, frame.querySelector('h2'), { y: [22, -10] });
            }
            return { chapter, frame, animation, travel: 0, progress: -1 };
        });

        contentRecords = ['work', 'experience', 'writing', 'contact'].map(id => {
            const section = document.getElementById(id);
            const animation = timeline();
            add(animation, section.querySelector('h2'), { y: [34, 0] });
            if (id === 'work') {
                add(animation, section.querySelector('.graph-preview'), { y: [45, 0], scale: [0.96, 1] });
                add(animation, section.querySelector('.project-copy'), { x: [36 * distance, 0] });
                section.querySelectorAll('.graph-link').forEach((path, index) => {
                    const length = path.getTotalLength();
                    path.style.strokeDasharray = `${length} ${length}`;
                    add(animation, path, { strokeDashoffset: [length, 0], duration: 680 }, Math.min(index * 12, 200));
                });
            } else if (id === 'experience') {
                add(animation, section.querySelector('.timeline-progress'), { scaleY: [0.05, 1] });
                section.querySelectorAll('.experience-entry').forEach((entry, index) => {
                    add(animation, entry, { x: [28 * distance, 0], duration: 650 }, index * 120);
                });
            } else if (id === 'writing') {
                section.querySelectorAll('.article-link').forEach((article, index) => {
                    add(animation, article, { y: [40 + index * 12, 0], duration: 800 }, index * 100);
                });
            } else {
                add(animation, section.querySelector('.contact-content'), { y: [32, 0] });
                add(animation, section.querySelector('.footer-art'), { y: [35, -12], scale: [1.04, 1] });
            }
            return { section, animation, progress: -1 };
        });
    }

    function clearTimelines() {
        [...chapterRecords, ...contentRecords].forEach(record => record.animation.revert());
        document.querySelectorAll('.graph-link').forEach(path => {
            path.style.removeProperty('stroke-dasharray');
            path.style.removeProperty('stroke-dashoffset');
        });
        chapters.forEach(chapter => {
            chapter.style.removeProperty('--chapter-height');
            delete chapter.dataset.scrollStatic;
            delete chapter.dataset.scrollProgress;
        });
        chapterRecords = [];
        contentRecords = [];
    }

    function measureChapters() {
        headerHeight = header.getBoundingClientRect().height;
        root.style.setProperty('--header-size', `${headerHeight}px`);
        const available = window.innerHeight - headerHeight;
        chapterRecords.forEach(record => {
            const frameHeight = record.frame.offsetHeight;
            const tallContent = frameHeight > available + 80;
            record.chapter.toggleAttribute('data-scroll-static', tallContent);
            const ratio = record.chapter.dataset.scrollChapter === 'hero' ? 0.8 : 0.55;
            record.travel = tallContent ? 0 : Math.round(Math.min(window.innerHeight * ratio, compact ? 560 : 800));
            record.chapter.style.setProperty('--chapter-height', `${frameHeight + record.travel}px`);
            record.progress = -1;
        });
        contentRecords.forEach(record => { record.progress = -1; });
    }

    function seek(record, progress) {
        if (Math.abs(progress - record.progress) < 0.0001) return;
        record.animation.seek(progress * record.animation.duration, true);
        record.progress = progress;
    }

    syncScrollMotion = () => {
        scrollFrame = 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.transform = `scaleX(${maxScroll > 0 ? clamp(window.scrollY / maxScroll) : 0})`;
        if (!enabled || motionPaused || document.hidden) return;

        chapterRecords.forEach(record => {
            const top = record.chapter.getBoundingClientRect().top;
            const progress = record.travel > 0
                ? clamp((headerHeight - top) / record.travel)
                : clamp((window.innerHeight * 0.85 - top) / (record.frame.offsetHeight + window.innerHeight * 0.3));
            seek(record, progress);
            record.chapter.dataset.scrollProgress = progress.toFixed(4);
        });
        contentRecords.forEach(record => {
            const top = record.section.getBoundingClientRect().top;
            seek(record, clamp((window.innerHeight * 0.9 - top) / (window.innerHeight * 0.8)));
        });
    };

    finishTimeline = () => {
        contentRecords.forEach(record => seek(record, 1));
    };

    refreshScrollMotion = () => {
        resizeFrame = 0;
        if (reducedMotion.matches) {
            clearTimelines();
            enabled = false;
            root.classList.remove('scroll-motion');
            root.dataset.scrollMotion = 'reduced';
            syncScrollMotion();
            return;
        }
        if (!enabled || compact !== compactView.matches) {
            if (enabled) clearTimelines();
            compact = compactView.matches;
            root.classList.add('scroll-motion');
            buildTimelines();
            enabled = true;
        }
        measureChapters();
        root.dataset.scrollMotion = 'enabled';
        if (motionPaused) finishTimeline();
        syncScrollMotion();
        updateCurrentSection();
    };

    function scheduleMeasure() {
        if (!resizeFrame) resizeFrame = requestAnimationFrame(refreshScrollMotion);
    }

    window.addEventListener('scroll', () => {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollMotion);
    }, { passive: true });
    window.addEventListener('resize', scheduleMeasure, { passive: true });
    window.addEventListener('pageshow', scheduleMeasure);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) syncScrollMotion();
    });
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(scheduleMeasure);
        chapters.forEach(chapter => observer.observe(chapter.querySelector('[data-scroll-frame]')));
    }
    refreshScrollMotion();
}

initializeOceanMotion();
