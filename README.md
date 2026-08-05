# Daniele Moltisanti — Personal landing page

Greenfield static implementation of the personal positioning site documented in [`docs/personal-landing`](docs/personal-landing/README.md).

## Product direction

The page positions three reusable infrastructure pillars:

- Local LLM Server
- Local ASR Server
- Android Local LLM Harness

ClosedRoom and Aura Finance are presented as reference applications used to validate the stack against real privacy, packaging, performance and UX constraints.

## Implementation

The first version deliberately uses plain HTML, CSS and a small amount of JavaScript:

- no runtime framework;
- no third-party analytics;
- no external font or UI dependencies;
- semantic HTML and keyboard-accessible interactions;
- progressive disclosure through native `details` elements;
- responsive navigation and layout;
- reduced-motion support;
- static deployment through GitHub Pages.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Main files

- `index.html` — semantic page structure and content
- `assets/site/site.css` — design system and responsive layout
- `assets/site/site.js` — navigation and reveal behavior
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Verification

Before merging:

- validate all external links;
- review copy and project maturity labels;
- test at 360 px, 768 px, 1024 px and 1440 px widths;
- test keyboard navigation and reduced motion;
- confirm the repository Pages source is configured for GitHub Actions.
