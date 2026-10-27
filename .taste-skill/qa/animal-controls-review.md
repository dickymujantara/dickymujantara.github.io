# Animal captions and scene controls

Seven focused checks pass. Chromium covered1440×900 and768×1024; WebKit covered390×844,320×568 and an opening-only640×360 landscape check.

Opening captions identify the sea otter, seal and seabird group. Main captions identify the humpback whale, dolphin group, orca, manta ray and sea turtle. Footer animals have no captions. Representative opening and section screenshots were visually inspected. Captions avoid body copy and controls; the phone dolphin and whale positions were refreshed after adjustment. The narrow opening cue/caption and landscape/tablet seal positions were refreshed after their fixes.

Both control groups contain motion then sound, with44×44px circular buttons and an8px gap. Desktop/tablet margins are20px left and16px bottom; phone margins are12px. Visible content is SVG icons, while names and pressed states remain available through button attributes. Opening controls trap Tab/Shift+Tab focus; Enter/Space activate motion without entering the portfolio. Click/tap toggles for sound and motion update pressed states and labels. Main controls are hidden/inert while the opening is active and become available afterward. No horizontal overflow or page errors occurred.

Evidence: `animal-controls.json` and `../previews/animal-controls-*`.

Limits: headless browser emulation does not establish physical iPhone safe-area or toolbar behavior, VoiceOver output, animation performance, or audible sound quality. Native WebKit Tab navigation skipped ordinary page buttons under its current keyboard-navigation configuration; focused Enter/Space activation and the explicit opening focus trap were verified. Visual caption checks sample representative states rather than every animation frame. The final tablet seal adjustment also moves the desktop caption by approximately3px; root requested the targeted768px refresh, preserving the earlier desktop coverage. All browser contexts were closed and the root-owned server remains running.
