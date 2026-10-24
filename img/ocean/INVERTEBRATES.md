# Footer invertebrate illustrations

Generated on 2026-10-24 with the built-in image generation tool for this portfolio. These are painted-style 2D illustrations, not photographs. They match the existing cool navy, slate and icy blue animal artwork. No fish are included. Originals are retained in the generation cache; the website uses self-contained final WebP files in this directory.

| Asset | Dimensions | Bytes |
| --- | --- | ---: |
| `jellyfish.webp` | 512 × 768 | 92,632 |
| `crab.webp` | 768 × 512 | 93,696 |
| `starfish.webp` | 512 × 342 | 34,994 |

Total delivery size: 221,322 bytes. All outputs contain an alpha channel. Native PNG decoding confirmed substantial fully transparent space (approximately 65%, 59%, and 67% respectively). Alpha, rather than a painted checkerboard or solid rectangle, supplies the cutout. Visual integration is reviewed in the page separately.

Mechanical delivery conversion used `cwebp -q 82 -m 6 -alpha_q 100 -metadata none -exact -resize WIDTH HEIGHT SOURCE -o OUTPUT`. Jellyfish and crab were reduced to the dimensions above; starfish used `-resize 512 0` to preserve its aspect ratio. RGB is quality 82 and resized alpha is encoded losslessly. No creative edits were made during conversion. No duplicate PNG files were added to the workspace.

Generation reference images:

- `/Users/dickymujantara/Documents/Research/dickymujantara.github.io/img/ocean/turtle.webp`: painted animal style and palette reference only.
- `/Users/dickymujantara/Documents/Research/dickymujantara.github.io/img/ocean/abyss.webp`: destination environment palette reference only.

Every call used `transparent_background: true`. The first call per asset created the new subject from those style references; a second call per asset targeted background extraction using only that asset's first generated PNG.

## jellyfish.webp

Initial generated source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-9a1749bd-51cb-429c-99f0-5ccf5715d47c.png`

Final extraction source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-988f9cb3-ba95-4ccb-aa68-19d52932d46d.png`

Exact generation prompt:

```text
Use case: illustration-story. Asset type: separate transparent foreground animal cutout for an illustrated software engineer portfolio footer. Input image 1 is only the style and palette reference: refined painted 2D natural-history illustration, subtle ink accents, matte forms and delicate icy edge details. Input image 2 is only the destination scene palette reference: near-black navy and muted slate blue abyss. Create a NEW animal asset; do not reproduce the turtle or scenery. Palette strictly cool navy #06141f, ink blue #0b2637, slate blue #1d4b66, muted icy blue #709bb4, small silver/ivory highlights. Genuine transparent alpha background everywhere outside the animal, soft antialiasing only along immediate edges. Entire subject clearly isolated with at least 8 percent transparent margins, no cropped anatomy. No backdrop, water, rock, ground plane, cast shadow, halo, glow aura, bubbles, particles, other animals, text, UI, frame, watermark. No generic logo or icon, no glossy plastic, 3D CGI or photographic appearance. Natural anatomy and confident hand-painted shape design. Specific subject: exactly ONE elegant jellyfish, full body with bell in upper third and long slender flowing tentacles trailing down with a slight graceful rightward sway. Dome has subtle translucent silver/slate blue painted lobes, visible natural inner structure, restrained soft luminosity inside the bell, NEVER neon. Tentacles are clearly drawn distinct sinuous strands and a few soft frilled oral arms, beautifully legible at small website sizes. Portrait composition; no nearby fish or other jellyfish. The transparency must be genuine, not a simulated checkerboard.
```

Exact extraction prompt:

```text
Use case: background-extraction. The attached image is the exact edit target. Keep the illustrated jellyfish unchanged in anatomy, pose, painted detail, cool navy/slate/icy blue palette and all delicate appendages. Remove the entire blue diffuse haze, aura, shadow and background from outside the animal. Output ONLY the animal with a clean isolated silhouette and actual transparent alpha everywhere else, including open spaces between legs/arms/tentacles. No fog, halo or light behind it. Preserve gentle edge antialiasing only at immediate outer silhouette. Do not paint a flat black background or simulate transparency. Add at least 8 percent transparent margins around ALL extremities. The animal itself may retain its existing tonal highlights. Do not include a turtle, scenery, checkerboard, text or other animal.
```

## crab.webp

Initial generated source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-acfd025e-238d-4de7-a9c5-1206a4508517.png`

Final extraction source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-121c0ee4-a21e-4210-a32e-edc99ebf9805.png`

Exact generation prompt:

```text
Use case: illustration-story. Asset type: separate transparent foreground animal cutout for an illustrated software engineer portfolio footer. Input image 1 is only the style and palette reference: refined painted 2D natural-history illustration, subtle ink accents, matte forms and delicate icy edge details. Input image 2 is only the destination scene palette reference: near-black navy and muted slate blue abyss. Create a NEW animal asset; do not reproduce the turtle or scenery. Palette strictly cool navy #06141f, ink blue #0b2637, slate blue #1d4b66, muted icy blue #709bb4, small silver/ivory highlights. Genuine transparent alpha background everywhere outside the animal, soft antialiasing only along immediate edges. Entire subject clearly isolated with at least 8 percent transparent margins, no cropped anatomy. No backdrop, water, rock, ground plane, cast shadow, halo, glow aura, bubbles, particles, other animals, text, UI, frame, watermark. No generic logo or icon, no glossy plastic, 3D CGI or photographic appearance. Natural anatomy and confident hand-painted shape design. Specific subject: exactly ONE small seabed crab seen from a low front three-quarter view, with a broad modestly textured matte navy/slate carapace, two distinct claws and eight walking legs arranged clearly with anatomically sensible articulation. Entire claw tips and all legs inside frame. Cool silver blue edges, darker underside, no orange red gold green or other warm color. Elegant realistic natural-history painted illustration, distinctive complete silhouette, not cute smiling cartoon. Landscape composition. Animal alone floating on transparent canvas without ground or rock.
```

Exact extraction prompt:

```text
Use case: background-extraction. The attached image is the exact edit target. Keep the illustrated crab unchanged in anatomy, pose, painted detail, cool navy/slate/icy blue palette and all delicate appendages. Remove the entire blue diffuse haze, aura, shadow and background from outside the animal. Output ONLY the animal with a clean isolated silhouette and actual transparent alpha everywhere else, including open spaces between legs/arms/tentacles. No fog, halo or light behind it. Preserve gentle edge antialiasing only at immediate outer silhouette. Do not paint a flat black background or simulate transparency. Add at least 8 percent transparent margins around ALL extremities. The animal itself may retain its existing tonal highlights. Do not include a turtle, scenery, checkerboard, text or other animal.
```

## starfish.webp

Initial generated source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-fbedd4d7-beb9-4485-99c8-2d8472495152.png`

Final extraction source: `/Users/dickymujantara/.codex/generated_images/01a16bfa-64cd-7660-942f-adcac4935ca3/exec-bb4cb0de-316b-419b-a1a4-8d83e23e6a41.png`

Exact generation prompt:

```text
Use case: illustration-story. Asset type: separate transparent foreground animal cutout for an illustrated software engineer portfolio footer. Input image 1 is only the style and palette reference: refined painted 2D natural-history illustration, subtle ink accents, matte forms and delicate icy edge details. Input image 2 is only the destination scene palette reference: near-black navy and muted slate blue abyss. Create a NEW animal asset; do not reproduce the turtle or scenery. Palette strictly cool navy #06141f, ink blue #0b2637, slate blue #1d4b66, muted icy blue #709bb4, small silver/ivory highlights. Genuine transparent alpha background everywhere outside the animal, soft antialiasing only along immediate edges. Entire subject clearly isolated with at least 8 percent transparent margins, no cropped anatomy. No backdrop, water, rock, ground plane, cast shadow, halo, glow aura, bubbles, particles, other animals, text, UI, frame, watermark. No generic logo or icon, no glossy plastic, 3D CGI or photographic appearance. Natural anatomy and confident hand-painted shape design. Specific subject: exactly ONE five-arm sea star, seen slightly from above in an organic gently asymmetric natural pose. Five well-shaped tapered arms have a subtly curved sea star anatomy, small restrained surface bumps and painted texture. Matte muted slate blue surface with dark navy undersides and small icy ivory ridge highlights. No orange, red, gold, purple or green. No face, eyes, mouth, cartoon emoji or geometric emblem. Wide simple beautifully detailed natural-history silhouette with all five arm tips fully inside transparent margins.
```

Exact extraction prompt:

```text
Use case: background-extraction. The attached image is the exact edit target. Keep the illustrated five-arm sea star unchanged in anatomy, pose, painted detail, cool navy/slate/icy blue palette and all delicate appendages. Remove the entire blue diffuse haze, aura, shadow and background from outside the animal. Output ONLY the animal with a clean isolated silhouette and actual transparent alpha everywhere else, including open spaces between legs/arms/tentacles. No fog, halo or light behind it. Preserve gentle edge antialiasing only at immediate outer silhouette. Do not paint a flat black background or simulate transparency. Add at least 8 percent transparent margins around ALL extremities. The animal itself may retain its existing tonal highlights. Do not include a turtle, scenery, checkerboard, text or other animal.
```

