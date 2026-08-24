# Daniele Moltisanti -Local AI portfolio

Astro-based personal site for the public Local AI thesis documented in [`08 -Local AI Strategy, Positioning & Storytelling.md`](./08%20%E2%80%94%20Local%20AI%20Strategy,%20Positioning%20&%20Storytelling.md) and translated into the landing experience in [`09 -Local AI Landing Page -Narrative, UX & Copy.md`](./09%20%E2%80%94%20Local%20AI%20Landing%20Page%20%E2%80%94%20Narrative,%20UX%20&%20Copy.md).

## Product direction

The site is an evidence system rather than a repository gallery. Its main narrative is:

```text
DECIDE → BUILD → TEST → MEASURE → DECIDE AGAIN
```

The central positioning is **Local AI first ≠ Local AI only**: determine where Local, Hybrid or Cloud makes sense using explicit constraints and evidence.

Representative infrastructure includes Local LLM Server, Local ASR Server and Android Local LLM Harness. Product/use-case pages such as ClosedRoom, Aura Finance and RedactGuard show how those ideas survive real workflows. Performance Lab and Traffic Monitoring provide the measurement/evidence layer.

## Implementation

- Astro 7 + TypeScript-oriented Astro components;
- static output for GitHub Pages;
- code-first design system with canonical tokens in `src/styles/tokens.css`;
- UX contract in `design/ux-contract.json`;
- brand/motion/imagery language in `design/brand-kit.json`;
- shared project deep-dive model in `design/project-page-contract.md`;
- no third-party analytics;
- semantic HTML, keyboard focus, reduced-motion support and WCAG 2.2 AA target;
- scroll-driven home method path without scroll-jacking;
- automated structural, smoke and rendered visual validation.

## Development

```bash
npm ci
npm run dev
```

Useful gates:

```bash
npm run check
npm run test
npm run verify
```

`npm run verify` builds the site, runs source-level UX/contract tests and validates the generated static artifact.

## Key source areas

- `src/pages/index.astro` -production homepage and continuous method path;
- `src/pages/*.astro` -project and supporting routes;
- `src/components/landing/` -home narrative components;
- `src/components/project/` -shared project-page semantic components;
- `src/components/layout/ProductSubHeader.astro` -shared project phase navigation;
- `src/styles/tokens.css` -canonical design tokens;
- `design/` -UX, brand and visual-review contracts;
- `scripts/capture-project-pages.mjs` -rendered project-page diagnostics;
- `scripts/capture-home.mjs` -rendered homepage diagnostics;
- `tests/` -source-level contract and static-output checks.

## Experience validation

Before treating structural UX work as complete:

- preserve the declared outcome/task/IA hierarchy before visual polish;
- test 1440, 768, 390 and 320px representative layouts;
- keep meaningful text at or above 14px;
- preserve 44×44px interaction targets where applicable;
- validate keyboard/focus and reduced-motion behavior;
- confirm the home remains readable if the scroll-path enhancement cannot initialize;
- confirm project pages preserve `Overview → Decide → Build → Test → Measure → Decide again`;
- reject page-level horizontal overflow, browser/page errors and hidden active mobile navigation;
- distinguish verified evidence from planned or still-unmeasured work.
