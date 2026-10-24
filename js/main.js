document.documentElement.classList.add('js');

const sectionLinks = [...document.querySelectorAll('#site-nav a[href^="#"]')]
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(item => item.section);
const mobileNavigation = window.matchMedia('(max-width: 767px), (pointer: coarse)');
let sectionPositions = [];
let navigationPageHeight = 0;
let navFrame = 0;

function measureSectionPositions() {
    if (mobileNavigation.matches) return;
    const scrollTop = window.scrollY;
    sectionPositions = sectionLinks.map(item => ({
        ...item,
        top: (item.section.closest('[data-scroll-chapter]') || item.section).getBoundingClientRect().top + scrollTop,
    })).sort((a, b) => a.top - b.top);
    navigationPageHeight = document.documentElement.scrollHeight;
}

function updateCurrentSection() {
    navFrame = 0;
    if (mobileNavigation.matches) return;
    const readingLine = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    for (const item of sectionPositions) {
        if (item.top <= readingLine) current = item.link;
    }
    if (window.scrollY + window.innerHeight >= navigationPageHeight - 12) current = sectionPositions[sectionPositions.length - 1]?.link;
    for (const { link } of sectionLinks) {
        if (link === current && link.getAttribute('aria-current') !== 'location') link.setAttribute('aria-current', 'location');
        else if (link !== current && link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
    }
}

window.addEventListener('scroll', () => {
    if (!mobileNavigation.matches && !navFrame) navFrame = requestAnimationFrame(updateCurrentSection);
}, { passive: true });
window.addEventListener('resize', () => {
    if (!mobileNavigation.matches) requestAnimationFrame(() => {
        measureSectionPositions();
        updateCurrentSection();
    });
}, { passive: true });
measureSectionPositions();
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
let openingActive = document.documentElement.dataset.opening === 'playing';
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
    if (motionIcon) motionIcon.dataset.state = motionPaused ? 'play' : 'pause';
}

motionToggle?.addEventListener('click', () => {
    motionPaused = !motionPaused;
    savedMotion = motionPaused ? 'paused' : 'playing';
    try { localStorage.setItem(motionStorageKey, savedMotion); } catch { /* The control works without persisted storage. */ }
    updateMotionControl();
    syncPlayback();
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
window.addEventListener('portfolio:opening-change', event => {
    openingActive = Boolean(event.detail?.active);
    syncPlayback();
    if (openingActive) syncScrollMotion();
    else refreshScrollMotion();
});
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

    const compactMotion = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
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
            const base = profiles[layer.dataset.motion];
            if (!base) return;
            let profile = { ...base };
            if (compactMotion) {
                for (const property of ['x', 'y', 'rotate']) {
                    if (profile[property]) profile[property] = profile[property].map(value => value * .65);
                }
                profile.duration *= 1.2;
                if (layer.dataset.motion === 'water') profile = { x: [-5, 5], y: [-2, 2], duration: 19000 };
                if (layer.dataset.motion === 'light') profile = { x: [-6, 6], duration: 17000 };
            }
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
        return !motionPaused && !openingActive && !document.hidden && sceneRecords.get(hero)?.visible;
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
        const enabled = !motionPaused && !openingActive && !document.hidden;
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
    const compactView = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const clamp = value => Math.max(0, Math.min(1, value));
    let chapterRecords = [];
    let contentRecords = [];
    let enabled = false;
    let compact = compactView.matches;
    let headerHeight = 73;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let viewportHeight = window.innerHeight;
    let pageHeight = 0;
    let lastTick = 0;
    let progressValue = -1;
    let snapNext = true;
    let geometryKey = '';
    let layoutWidth = window.innerWidth;

    function timeline() {
        return createTimeline({ autoplay: false, defaults: { duration: 1000, ease: 'linear' } });
    }

    function add(animation, element, properties, position = 0) {
        if (element) animation.add(element, properties, position);
    }

    function buildTimelines() {
        const distance = compact ? .45 : 1;
        const vertical = compact ? .65 : 1;
        const rotation = compact ? .55 : 1;
        chapterRecords = chapters.map(chapter => {
            const frame = chapter.querySelector('[data-scroll-frame]');
            const animation = timeline();
            const type = chapter.dataset.scrollChapter;
            if (type === 'hero') {
                add(animation, frame.querySelector('.hero-whale'), {
                    x: [-20 * distance, 125 * distance], y: [18 * vertical, -75 * distance],
                    scale: compact ? [1, 1.06] : [.98, 1.16], rotate: [-1.5 * rotation, 2.5 * rotation],
                });
                add(animation, frame.querySelector('.scroll-water'), { y: [0, -55 * distance], scale: [1, compact ? 1.03 : 1.14] });
                add(animation, frame.querySelector('h1'), { y: [0, -32 * distance], scale: [1, compact ? .96 : .84] });
                add(animation, frame.querySelector('.hero-description'), { y: [0, -24 * distance] });
                add(animation, frame.querySelector('.hero-actions'), { y: [0, -18 * distance] });
            } else if (type === 'about') {
                add(animation, frame.querySelector('.about-orca'), { x: [-70 * distance, 58 * distance], y: [25 * vertical, -32 * vertical], rotate: [-2 * rotation, 2 * rotation], scale: compact ? [.99, 1.025] : [.95, 1.05] });
                add(animation, frame.querySelector('.dolphin-one'), { x: [-85 * distance, 75 * distance], y: [30 * vertical, -38 * vertical], rotate: [-3 * rotation, 2 * rotation] });
                add(animation, frame.querySelector('.dolphin-two'), { x: [-40 * distance, 105 * distance], y: [18 * vertical, -25 * vertical], scale: compact ? [.99, 1.025] : [.94, 1.04] });
                add(animation, frame.querySelector('.orca-detail'), { y: [30 * vertical, -24 * vertical], rotate: [-3 * rotation, 2 * rotation] });
                add(animation, frame.querySelector('h2'), { y: [20 * vertical, -10 * vertical] });
            } else {
                add(animation, frame.querySelector('.exploration-turtle'), { x: [-65 * distance, 55 * distance], y: [35 * vertical, -45 * vertical], rotate: [-4 * rotation, 4 * rotation], scale: compact ? [.98, 1.025] : [.93, 1.06] });
                add(animation, frame.querySelector('.turtle-detail'), { x: [-14 * vertical, 12 * vertical], y: [35 * vertical, -24 * vertical], rotate: [-4 * rotation, 2 * rotation] });
                add(animation, frame.querySelector('.turtle-mosaic'), { x: [16 * vertical, -10 * vertical], y: [-25 * vertical, 24 * vertical], rotate: [4 * rotation, -2 * rotation] });
                add(animation, frame.querySelector('h2'), { y: [22 * vertical, -10 * vertical] });
            }
            return { chapter, frame, animation, top: 0, height: 0, travel: 0, target: 0, progress: -1 };
        });

        contentRecords = ['work', 'experience', 'writing', 'contact'].map(id => {
            const section = document.getElementById(id);
            const animation = timeline();
            add(animation, section.querySelector('h2'), { y: [34 * vertical, 0] });
            if (id === 'work') {
                add(animation, section.querySelector('.graph-preview'), { y: [45 * vertical, 0], scale: [compact ? .98 : .96, 1] });
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
                add(animation, section.querySelector('.article-list'), { y: [40 * vertical, 0], duration: 800 });
            } else {
                add(animation, section.querySelector('.contact-content'), { y: [32 * vertical, 0] });
                add(animation, section.querySelector('.footer-art'), { y: [35 * vertical, -12 * vertical], scale: [compact ? 1.015 : 1.04, 1] });
            }
            return { section, animation, top: 0, height: 0, target: 0, progress: -1 };
        });
    }

    function clearTimelines() {
        stopScrollFrame();
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
        geometryKey = '';
    }

    function measureChapters() {
        headerHeight = header.getBoundingClientRect().height;
        root.style.setProperty('--header-size', `${headerHeight}px`);
        // Match the CSS viewport so Safari's toolbar does not resize pinned chapters while scrolling.
        const frameMinimum = parseFloat(getComputedStyle(chapterRecords[0].frame).minHeight);
        viewportHeight = Number.isFinite(frameMinimum) ? frameMinimum + headerHeight : window.innerHeight;
        const available = viewportHeight - headerHeight;
        const frameHeights = chapterRecords.map(record => record.frame.offsetHeight);
        chapterRecords.forEach((record, index) => {
            const frameHeight = frameHeights[index];
            const tallContent = frameHeight > available + 80;
            record.chapter.toggleAttribute('data-scroll-static', tallContent);
            const ratio = record.chapter.dataset.scrollChapter === 'hero' ? (compact ? .55 : .8) : (compact ? .38 : .55);
            record.travel = tallContent ? 0 : Math.round(Math.min(viewportHeight * ratio, compact ? 560 : 800));
            record.chapter.style.setProperty('--chapter-height', `${frameHeight + record.travel}px`);
            record.frameHeight = frameHeight;
            record.height = frameHeight + record.travel;
        });
        // Cache document coordinates after all chapter heights are written.
        const scrollTop = window.scrollY;
        chapterRecords.forEach(record => { record.top = record.chapter.getBoundingClientRect().top + scrollTop; });
        contentRecords.forEach(record => {
            const bounds = record.section.getBoundingClientRect();
            record.top = bounds.top + scrollTop;
            record.height = bounds.height;
        });
        pageHeight = document.documentElement.scrollHeight;
        layoutWidth = window.innerWidth;
        const nextKey = [window.innerWidth, viewportHeight, headerHeight, pageHeight, ...frameHeights].join(':');
        if (nextKey !== geometryKey) snapNext = true;
        geometryKey = nextKey;
        measureSectionPositions();
    }

    function seek(record, progress) {
        if (progress === record.progress) return;
        record.animation.seek(progress * record.animation.duration, true);
        record.progress = progress;
        if (record.chapter) {
            const value = progress.toFixed(4);
            if (record.chapter.dataset.scrollProgress !== value) record.chapter.dataset.scrollProgress = value;
        }
    }

    function stopScrollFrame() {
        if (scrollFrame) cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
        lastTick = 0;
    }

    function scheduleScroll() {
        if (!scrollFrame && !document.hidden) scrollFrame = requestAnimationFrame(renderScroll);
    }

    function renderScroll(now) {
        scrollFrame = 0;
        const scrollTop = window.scrollY;
        const maxScroll = pageHeight - window.innerHeight;
        const pageProgress = maxScroll > 0 ? clamp(scrollTop / maxScroll) : 0;
        if (progressBar && pageProgress !== progressValue) {
            progressBar.style.transform = `scaleX(${pageProgress})`;
            progressValue = pageProgress;
        }
        if (!enabled || motionPaused || openingActive || document.hidden) {
            lastTick = 0;
            return;
        }

        const elapsed = lastTick ? Math.min(64, Math.max(0, now - lastTick)) : 1000 / 60;
        const blend = 1 - Math.exp(-elapsed / (compact ? 75 : 110));
        lastTick = now;
        let settling = false;
        chapterRecords.forEach(record => {
            const top = record.top - scrollTop;
            record.target = record.travel > 0
                ? clamp((headerHeight - top) / record.travel)
                : clamp((viewportHeight * .85 - top) / (record.frameHeight + viewportHeight * .3));
        });
        contentRecords.forEach(record => {
            record.target = clamp((viewportHeight * .9 - (record.top - scrollTop)) / (viewportHeight * .8));
        });

        for (const record of [...chapterRecords, ...contentRecords]) {
            const nearby = record.top - scrollTop < viewportHeight * 1.15
                && record.top + record.height - scrollTop > -viewportHeight * .15;
            let progress = record.target;
            if (!snapNext && nearby && record.progress >= 0) {
                progress = record.progress + (record.target - record.progress) * blend;
                if (Math.abs(record.target - progress) < .0004) progress = record.target;
                else settling = true;
            }
            seek(record, progress);
        }
        snapNext = false;
        if (settling) scheduleScroll();
        else lastTick = 0;
    }

    syncScrollMotion = () => {
        if (!enabled || motionPaused || openingActive || document.hidden) stopScrollFrame();
        scheduleScroll();
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
            pageHeight = document.documentElement.scrollHeight;
            measureSectionPositions();
            syncScrollMotion();
            return;
        }
        let rebuilt = false;
        if (!enabled || compact !== compactView.matches) {
            if (enabled) clearTimelines();
            compact = compactView.matches;
            root.classList.add('scroll-motion');
            buildTimelines();
            enabled = true;
            rebuilt = true;
        }
        measureChapters();
        root.dataset.scrollMotion = 'enabled';
        if (motionPaused && rebuilt) finishTimeline();
        syncScrollMotion();
        updateCurrentSection();
    };

    function scheduleMeasure(event) {
        if (event?.type === 'resize' && enabled && layoutWidth === window.innerWidth) {
            const minimum = parseFloat(getComputedStyle(chapterRecords[0].frame).minHeight);
            if (Number.isFinite(minimum) && Math.abs(minimum + headerHeight - viewportHeight) < .5) return;
        }
        if (!resizeFrame) resizeFrame = requestAnimationFrame(refreshScrollMotion);
    }

    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleMeasure, { passive: true });
    window.addEventListener('pageshow', () => { snapNext = true; scheduleMeasure(); });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopScrollFrame();
        else { snapNext = true; scheduleMeasure(); }
    });
    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(scheduleMeasure);
        observer.observe(header);
        chapters.forEach(chapter => observer.observe(chapter.querySelector('[data-scroll-frame]')));
        document.querySelectorAll('#work, #experience, #writing, #contact').forEach(section => observer.observe(section));
    }
    refreshScrollMotion();
}

initializeOceanMotion();
