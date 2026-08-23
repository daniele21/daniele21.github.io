# Product Experience Validation

This file defines the evidence required before claiming the landing page has reached the `L1` product-experience target in `design/ux-contract.json`.

The governing order is the one inherited from `repo-template-sw`: structure and interaction are validated before motion and visual polish are treated as complete.

## Automated gate

Canonical command:

```bash
npm run test
```

The command must:

1. build the Astro site from a clean checkout;
2. validate the viewport-Y-locked journey controller and cubic handoff contract;
3. validate static route output and internal links;
4. validate single-main and single-H1 semantics;
5. validate the design/UX source-of-truth contracts;
6. validate compact navigation and evidence semantics;
7. validate referenced public assets.

GitHub Actions runs this gate through `.github/workflows/validate.yml` on pull requests and on `master`.

## Manual experience matrix

These checks remain required because source inspection and static smoke tests cannot prove rendered interaction quality.

| Context | Required evidence | Pass criteria |
| --- | --- | --- |
| Desktop 1440px | full-page scroll | Journey head visually tracks the viewport playhead; S-curves remain continuous; no scroll-jacking or delayed input. |
| Tablet 768px | full-page scroll + header | Content priority remains clear; navigation remains available; no unexpected horizontal page overflow. |
| Mobile 390px | full critical journey | Compact navigation is reachable and closable; method becomes a readable vertical narrative; partial card affordance remains understandable. |
| Mobile 320px | edge-case journey | No clipped primary actions, broken rail/path geometry, unreadable microtype, or page-level horizontal overflow. |
| Keyboard | header + all primary links/cards | Logical focus order, visible focus state, no keyboard trap in compact navigation. |
| Reduced motion | full critical journey | Meaning remains complete with movement removed; content does not remain hidden; navigation remains usable. |
| Text zoom / scaling | hero + stage copy + header | Core content and actions remain available without overlap or clipping at representative browser zoom/text scaling. |
| Contrast spot check | hero, body, muted copy, buttons, focus | WCAG 2.2 AA target remains satisfied for meaningful text and interactive states. |

## Current evidence status

- Automated contract coverage: **implemented**.
- CI gate: **implemented**; run result must be checked on the relevant commit/PR.
- Manual viewport/device evidence: **pending capture**.
- Manual keyboard/reduced-motion/text-scaling evidence: **pending capture**.

Do not describe the landing as fully `L1` until the pending manual checks have been performed on the final rendered branch/PR and any regressions have been resolved.
