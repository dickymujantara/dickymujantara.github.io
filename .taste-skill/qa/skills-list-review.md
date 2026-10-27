# Restored About skills list: focused checks

All **12 checks pass** in [skills-list.json](skills-list.json), with no JavaScript exceptions. The final source keeps the list inside `.about-copy`, retains seven categories and contains all 26 exact skill names. The rejected full-width `.skills-band` is absent.

Five Chromium profiles were checked: 1440 × 900, 1024 × 768, 768 × 1024, 390 × 844 and 320 × 568. Three emulated touch WebKit profiles were checked: 768 × 1024, 390 × 844 and 320 × 568. Assertions cover viewport overflow, list/copy bounds inside About, About/Work separation, every atomic label remaining inside the list, noninteractive label semantics and all 26 items reachable through scrolling. The final compact desktop list includes its last Integrations category inside the 900-pixel viewport.

One Chromium animation check instruments the real bundled Anime.js `animate` calls. Starting with a simulated hidden document avoids starting the entrance before the test. Revealing the last category creates its finite entrance; hiding freezes its timeline, returning resumes it, and global Pause settles the labels at their final positions. After every category has entered, exactly seven unique finite animations have completed, all label translations are zero, no opacity animation or loop is configured, and revisiting the section creates no repeat.

Three WebKit fallback checks confirm all 26 labels remain visible with reduced motion, saved pause and JavaScript disabled. Labels have no opacity-zero baseline. The label animation remains uncreated in these cases.

Screenshots: `../previews/skills-list-{chromium,webkit}-{width}.png`. Close-ups: [desktop](../previews/skills-list-detail-chromium-1440.png) and [phone](../previews/skills-list-detail-webkit-390.png). The close-up capture temporarily disables smooth scroll only to prevent screenshot timing races; application files are unchanged by QA.

The first harness run called a wheel method unavailable in mobile WebKit and began its hidden-document check after the group had already entered during navigation. The harness was corrected to use explicit programmatic follow-up scrolling on mobile WebKit and hidden state before boot. The linked JSON contains the clean final run. Desktop/Chromium scrolling uses actual browser wheel input; item reachability uses DOM scrolling. These checks are not physical touch, physical iOS Safari, operating-system backgrounding, frame-performance or full-site certification.

Browsers completed and closed. Root owns the preview HTTP server. No application source was edited by this QA task.
