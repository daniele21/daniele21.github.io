# Mobile-first audit — homepage

Status: **implemented and verified** · 2026-09-29  
Scope: homepage `Decide → Build → Test → Measure`; the screenshot supplied by the user shows `Build` on a phone. The rendered review now also covers `/about`, `/experiments` and project routes.

## Observed defect

The `Build` heading, introduction, principle and project card are cut off on the right. This is loss of readable content and of part of a linked card, not merely an extra horizontal scrollbar.

The local homepage was inspected in a browser at 320, 390 and 768 CSS px. At 320 px:

| Section | Section width | Computed grid track | Inner shell | Section scroll width |
| --- | ---: | ---: | ---: | ---: |
| Decide | 320 px | 320 px | 288 px | 320 px |
| Build | 320 px | 606 px | 574 px | 590 px |
| Test | 320 px | 549 px | 517 px | 533 px |
| Measure | 320 px | 577 px | 545 px | 561 px |

At 390 px, the browser's 15 px vertical scrollbar leaves a 375 px layout area; `Build`, `Test` and `Measure` retain the same oversized tracks. At 768 px, all four tracks fit the available width. The root document reports no horizontal overflow at 320/390 px, which explains why the existing page-level check does not catch the defect.

## Cause and verification boundary

- `PlaneTemplate.astro` sets `.plane-section` to `display: grid` without a shrinkable `minmax(0, 1fr)` column. Its `.plane-shell` is a grid item with an automatic minimum width. The content in the `Build`, `Test` and `Measure` stages contributes a larger intrinsic minimum than the phone viewport.
- `.plane-section { overflow: clip; }` masks the oversized track by cutting descendants. The root `scrollWidth` remains within the viewport while essential text and links extend past the section edge.
- `SystemsOverview.astro` and the corresponding product/evidence overviews have dense nested structures. Their phone presentation needs review after the shared track is fixed; shrinking the track alone may expose further local overflow.
- The current `capture-home.mjs` checks `documentElement/body.scrollWidth`, text size and a subset of action targets. It does not compare essential descendants with the visible bounds of a clipping ancestor. Structural tests in `home-experience-contract.test.mjs` assert the presence of mobile CSS rules, not the rendered result.

The measurements establish the layout failure and its shared template boundary. The same shrinkable grid-track fix resolves all three oversized stages; the nested cards then fit their columns with the mobile density changes described below.

## Mobile-first target

The existing `design/ux-contract.json` defines 320–430 px as the canonical touch surface. Implement the homepage as a readable one-column narrative at that width. Tablet and desktop may add horizontal composition after the phone layout works.

The phone reading sequence should be: stage number and question → one concise explanation → one clear proof point → project choices or evidence → next stage. The path is an orientation aid; it must never take space needed for the content or cross the text column.

## Backlog

| ID | Priority | Work | Acceptance evidence |
| --- | --- | --- | --- |
| MF-01 | P0 | Make the shared stage grid and shell shrink to the viewport in `PlaneTemplate.astro` (for example, an explicit `minmax(0, 1fr)` track plus `min-width: 0` on the grid item). Then find and fix any remaining intrinsic-width offender in each stage. Do not use root-level `overflow-x: hidden` as the remedy. | At 320, 390 and 430 px, every stage heading, introduction, proof block and link fits inside its section; no text or actionable area is clipped. |
| MF-02 | P0 | Extend `scripts/capture-home.mjs` to inspect the rendered bounds of `.stage-copy` and `.stage-visual` against each clipping `.method-stage`, and report the first offending descendant/ancestor pair. Keep the existing document-level overflow check. | The current broken layout is detected at 320/390 px, and the check passes after MF-01. Capture one light and one dark phone screenshot for human review. |
| MF-03 | P1 | Redesign the phone density of `Build`, `Test` and `Measure`: lead with the project name, one-sentence role/claim and a clear destination; move decorative mini diagrams or repeated “so what” detail below the essential summary or to the detail page where appropriate. Preserve status and limitations. | At 390 px, each project can be identified and opened without reading an entire tall card; no important evidence disappears. |
| MF-04 | P1 | Review the phone path, left inset, heading scale, body line length and spacing as one composition. Reduce the rail's visual/space cost if it competes with content, while retaining stage orientation. | At 320 px, title and paragraph wrap naturally; the rail/node do not overlap the first line or a card. Review with and without motion. |
| MF-05 | P1 | Check the global header/menu and all homepage actions with touch and keyboard. The theme/menu controls already use the 48 px token; verify rendered hit areas, open state, focus, sticky-header occlusion and safe-area behavior. | The primary next action remains obvious; menu items and project links are reachable, visible and at least 48 × 48 CSS px where applicable. |
| MF-06 | P2 | Run the same rendered audit on `/about`, `/experiments` and representative project pages, then open route-specific fixes rather than applying global clipping rules. | A route/viewport matrix records pass or defect for 320, 390, 430, 768 and 1440 px in light and dark mode. |

## Review matrix and stop conditions

Start with 320 and 390 px, then check 430, 768 and 1440 px. Include a 200% zoom pass, long status labels, reduced motion and JavaScript-disabled reading order. At each width inspect the first viewport, all four stages, the menu, and a project destination.

A viewport passes only when there is no page-level horizontal scroll **and** no essential descendant extends beyond a clipping section. Native horizontal scrolling is acceptable only for explicitly secondary metadata/navigation, with an affordance; primary prose, cards and CTAs must fit. Verify the hierarchy visually as well as geometrically: a visitor should be able to scan the stage question, proof and next action without decoding a miniature desktop layout.

Implementation order: MF-01 → MF-02 → MF-03/04 → MF-05 → MF-06. The shared containment fix comes first so later visual decisions are based on the actual phone width.

## Implementation and verification

- **MF-01:** The shared stage grid now uses a shrinkable column and shell. Build, Test and Measure fit the phone layout without depending on page-level overflow suppression.
- **MF-02:** The homepage capture checks essential stage descendants against each clipping stage, in addition to document overflow. It records 320, 390, 430, 768 and 1440 px, reduced motion, and a dark phone view.
- **MF-03/04:** Phone cards surface their destination, capability labels wrap, and decorative diagrams yield space to the project claim. The stage rail retains orientation without taking the text column. The shorter hero introduction puts the main action in the first 320 px viewport.
- **MF-05:** The menu and theme controls use the 48 px touch token. The capture exercises menu opening and Escape closing, including focus return. The mobile project subheader no longer animates its horizontal correction when the active section changes.
- **MF-06:** The route capture includes About and 430 px alongside the existing project and Experiments matrix. Narrow-route fixes cover About's grid and metadata wrapping and the Traffic Monitoring platform switch.

### Rendered result

| Check | Result |
| --- | --- |
| Homepage: 320, 390, 430, 768, 1440 px; dark 390 px; reduced-motion 390 px | 7/7 captures passed, including clipped-stage bounds, document overflow, text size, action targets, menu behavior and browser errors. |
| About, Experiments and ten project routes at the five widths above | 60 captures: no document overflow, undersized subheader targets, small text, missing anchors or browser errors. All section links resolved to the expected active section. |
| Navigation test correction | The full run initially reported 35 false failures for `Overview`: its selector matched the project brand link with `href="#top"` before the actual subheader link. The selector now requires `data-sublink`; six representative captures at 320 and 1440 px passed with zero failures. |
| Homepage with JavaScript disabled at 320 px | HTTP 200; four section headings and copy remain visible, with no document overflow. |
| Build, unit tests, smoke and whitespace check | Passed. |

The route matrix uses the light theme; dark mode was inspected on representative routes and captured on the homepage. Browser zoom at 200% and long translated status labels were not part of the automated run.
