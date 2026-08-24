# Homepage rendered visual review protocol

This review is the rendered evidence layer for the homepage experience contract in `design/ux-contract.json`.

## Required viewports

- 1440px desktop
- 768px tablet
- 390px mobile
- 320px minimum-width edge case

## Review questions

At every viewport verify:

1. The first screen communicates the thesis `Local AI first ≠ Local AI only`, the evidence-led stance and one primary next action.
2. The reading order remains `Hero → Decide → Build → Test → Measure → Decide again` even when the visual path enhancement is absent.
3. The blue method path reinforces progress and continuity without scroll-jacking or obscuring content.
4. Reversing scroll reverses the progress state naturally; resize/reflow does not leave progress detached from the visible reading plane.
5. Reduced-motion mode keeps every stage visible and understandable without scroll-coupled transforms.
6. No meaningful rendered text falls below 14px and interaction targets remain at least 44×44px where applicable.
7. No page-level horizontal overflow appears at 320, 390, 768 or 1440px.
8. Visuals remain subordinate to the current question: Decide, Build, Test and Measure must not compete equally at the same moment.
9. Advisory/conversion content remains late in the journey and does not displace project proof or the primary exploration CTA.
10. Browser console/page errors are treated as experience defects.

Automated capture can prove geometry, runtime state and basic rendered invariants. Human inspection remains required for hierarchy, perceived continuity, density and whether motion supports comprehension rather than decoration.
