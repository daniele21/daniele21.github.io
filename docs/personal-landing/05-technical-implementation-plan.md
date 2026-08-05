# 05 - Technical Implementation Plan

## 1. Implementation objective

Build a new static personal landing page from the documentation in this directory and deploy it through GitHub Pages.

The implementation is greenfield. Legacy files may remain temporarily during development, but they must not dictate the new component model, styling, content or build system. The final cutover should replace the root experience only after the new version passes the quality gates.

## 2. Recommended stack

### Framework

**Astro with TypeScript** is the recommended default.

Rationale:

- the page is primarily content and static UI;
- Astro ships minimal client-side JavaScript by default;
- components can remain framework-agnostic;
- selective hydration is available for the mobile menu, filters or small interactions;
- static generation works well with GitHub Pages;
- structured content can be separated cleanly from presentation;
- performance and SEO are easier to protect than in a fully hydrated single-page application.

### Styling

Recommended options, in order:

1. CSS modules or scoped Astro styles backed by global design tokens;
2. a small utility layer created specifically for the project;
3. Tailwind only if the implementation team commits to a documented token system and avoids template-like composition.

Do not import the current Bootstrap styling into the new application.

### Content

Use typed TypeScript data or validated JSON/YAML for:

- pillars;
- applications;
- principles;
- evidence entries;
- social links;
- project statuses;
- external URLs.

Long-form page copy may be stored in Astro components or content files, but repeated entities must come from structured data.

### Icons

Use a small, tree-shakeable icon set or custom SVGs. Do not load a complete icon font.

### Fonts

Prefer system fonts for the first performance baseline or self-host no more than two optimized variable fonts. Do not depend on third-party font calls if avoidable.

## 3. Proposed repository structure

```text
/
├── docs/
│   └── personal-landing/
│       └── ... product documentation
├── public/
│   ├── favicon.svg
│   ├── social-preview.png
│   ├── images/
│   │   ├── closedroom/
│   │   ├── aura-finance/
│   │   ├── evidence/
│   │   └── portrait/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.astro
│   │   │   ├── SiteFooter.astro
│   │   │   └── SectionContainer.astro
│   │   ├── hero/
│   │   │   ├── Hero.astro
│   │   │   └── EcosystemMap.astro
│   │   ├── infrastructure/
│   │   │   ├── PillarCard.astro
│   │   │   ├── PillarGrid.astro
│   │   │   └── ArchitectureFlow.astro
│   │   ├── applications/
│   │   │   ├── ApplicationCaseStudy.astro
│   │   │   └── ValidationFlow.astro
│   │   ├── principles/
│   │   │   └── PrincipleList.astro
│   │   ├── evidence/
│   │   │   ├── EvidenceFeed.astro
│   │   │   └── EvidenceItem.astro
│   │   └── common/
│   │       ├── ButtonLink.astro
│   │       ├── StatusBadge.astro
│   │       ├── TagList.astro
│   │       └── ExternalLink.astro
│   ├── content/
│   │   ├── site.ts
│   │   ├── pillars.ts
│   │   ├── applications.ts
│   │   ├── principles.ts
│   │   └── evidence.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── privacy.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   └── utilities.css
│   ├── scripts/
│   │   ├── navigation.ts
│   │   └── evidence-filter.ts
│   └── types/
│       └── content.ts
├── tests/
│   ├── content.spec.ts
│   ├── links.spec.ts
│   └── accessibility.spec.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── .github/workflows/deploy-pages.yml
```

The exact structure can evolve, but content, components, styling and assets must remain separated.

## 4. Typed content model

### Pillar

```ts
export type ProjectStatus =
  | "experimental"
  | "active-development"
  | "beta"
  | "reference-ready"
  | "production-ready";

export interface Pillar {
  id: "local-llm-server" | "local-asr-server" | "android-local-llm-harness";
  label: string;
  name: string;
  role: string;
  problem: string;
  description: string;
  capabilities: string[];
  strategicContribution: string;
  status: ProjectStatus;
  statusNote: string;
  technologies: string[];
  repositoryUrl: string;
  architectureUrl?: string;
  testUrl?: string;
  lastVerified: string;
}
```

### Reference application

```ts
export interface ReferenceApplication {
  id: "closedroom" | "aura-finance";
  category: string;
  name: string;
  headline: string;
  description: string;
  currentCapabilities: string[];
  validates: string[];
  learning: string;
  status: string;
  productUrl?: string;
  repositoryUrl?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  currentRelationship: string;
  futureRelationship?: string;
  lastVerified: string;
}
```

### Evidence item

```ts
export interface EvidenceItem {
  id: string;
  date: string;
  category: "release" | "benchmark" | "architecture" | "product" | "lesson";
  project: string;
  title: string;
  summary: string;
  url: string;
  external: boolean;
  featured?: boolean;
}
```

## 5. Content integrity rules

Implement validation that fails the build when:

- a required project URL is empty;
- two entities use the same ID;
- a status is outside the allowed set;
- a `lastVerified` date is invalid;
- an image lacks alt text, width or height;
- an evidence item has no source URL;
- current and future capabilities are mixed in the same field;
- an external link uses an unsupported protocol.

A schema library such as Zod may be used, or equivalent TypeScript runtime validation.

## 6. Component responsibilities

### BaseLayout

Owns:

- document language;
- canonical URL;
- metadata;
- social metadata;
- favicons;
- global styles;
- skip link;
- shared header and footer;
- optional privacy-conscious analytics script.

### SiteHeader

Owns:

- anchor navigation;
- mobile menu state;
- collaboration CTA;
- keyboard and focus behavior;
- scrolled visual state.

It must not own page-section content.

### EcosystemMap

Owns a responsive, accessible representation of:

- three pillars;
- desktop/mobile grouping;
- reference applications;
- future product enablement.

It must provide a semantic textual equivalent and must not require JavaScript to display the basic relationships.

### PillarCard

Receives one `Pillar` object and renders the same semantic structure for each pillar. Visual variants must not alter information priority.

### ApplicationCaseStudy

Receives one `ReferenceApplication` and visibly separates:

- current product behavior;
- infrastructure or principles being validated;
- future integration possibilities.

### EvidenceFeed

Renders entries from structured data. Filtering may use a small client script, but all entries should remain present in the initial HTML or have an accessible no-JavaScript fallback.

## 7. JavaScript budget

The page should work as a static document without JavaScript except for enhancements.

Client-side JavaScript may be used for:

- mobile navigation;
- evidence filtering;
- optional diagram animation;
- optional contact-form enhancement.

Do not hydrate the full page.

Initial target:

- less than 60 KB compressed first-party JavaScript;
- preferably less than 30 KB for the first release;
- no third-party animation framework unless a clear requirement cannot be met with CSS or small native scripts.

## 8. Asset pipeline

### Product screenshots

For each screenshot:

1. remove personal and sensitive data;
2. crop to the relevant workflow;
3. export AVIF and WebP where supported;
4. provide 1x and 2x variants where useful;
5. specify intrinsic dimensions;
6. write descriptive alt text;
7. document the source and capture date.

### Social preview

Create a dedicated 1200 × 630 image containing:

- Daniele Moltisanti;
- headline: `Building the infrastructure for privacy-first AI products`;
- a restrained three-pillar visual;
- no tiny unreadable project details.

### Architecture graphics

Prefer inline SVG or semantic HTML/CSS. SVG text must remain legible and should use current color tokens.

## 9. GitHub Pages deployment

### Recommended deployment

Use GitHub Actions and the official Pages deployment flow.

Workflow stages:

1. checkout;
2. set up Node with a pinned major version;
3. install with lockfile enforcement;
4. run type checking;
5. run content validation;
6. run unit/link tests;
7. build Astro static output;
8. run accessibility/performance smoke checks;
9. upload Pages artifact;
10. deploy on approved branch.

### Branch strategy

Development branches:

- `agent/personal-landing-strategy-docs` for this specification;
- future implementation branch such as `agent/personal-landing-v2`.

Deployment should remain tied to the default branch only after merge. Do not deploy unfinished branches over the current live site.

### Base path

Because the repository is `daniele21.github.io`, production can use the root path. Preview builds should be tested carefully because local and PR preview paths may differ.

## 10. Development phases

### Phase 0 - Confirm content and evidence

Tasks:

- confirm English-first launch;
- verify all repository URLs;
- assign accurate maturity statuses;
- collect product screenshots;
- confirm public destinations for ClosedRoom and Aura Finance;
- identify available benchmarks and architecture documents;
- decide contact method;
- confirm analytics choice.

Exit criteria:

- no placeholder claims;
- every CTA has a destination or is intentionally omitted;
- current versus future capabilities are clearly classified.

### Phase 1 - Project foundation

Tasks:

- initialize Astro and TypeScript;
- configure linting and formatting;
- create design tokens and reset;
- implement BaseLayout;
- configure metadata and Pages build;
- create typed content schemas;
- create basic automated tests.

Exit criteria:

- clean build;
- deployable static artifact;
- no legacy CSS or JavaScript imported;
- content validation operational.

### Phase 2 - Core narrative

Tasks:

- implement header;
- implement hero and system map;
- implement strategic problem;
- implement vision/mission;
- implement pillar grid and cards;
- implement relationship diagram.

Exit criteria:

- visitor can understand the strategy before reference applications appear;
- full mobile and desktop layout works;
- pillars have equal strategic prominence;
- basic keyboard navigation passes.

### Phase 3 - Product evidence

Tasks:

- implement ClosedRoom case study;
- implement Aura Finance case study;
- implement current/future relationship treatment;
- add optimized screenshots;
- implement possibilities and principles sections.

Exit criteria:

- applications are visibly reference implementations;
- no false integration claims;
- product images contain no sensitive information;
- all media has accessible alternatives.

### Phase 4 - Journey and conversion

Tasks:

- implement evidence feed;
- implement About;
- implement collaboration section;
- implement footer and privacy page;
- add external-link and contact behaviors;
- add optional analytics.

Exit criteria:

- all primary user journeys have a clear destination;
- contact works without unnecessary data collection;
- analytics events map to the documented success model.

### Phase 5 - Quality and launch

Tasks:

- cross-browser testing;
- responsive testing;
- accessibility audit;
- performance profiling;
- metadata and social-card validation;
- broken-link check;
- copy review;
- privacy review;
- final status verification against repositories.

Exit criteria are defined in `07-acceptance-criteria-and-roadmap.md`.

## 11. Testing strategy

### Unit/content tests

- schema validation;
- project ID uniqueness;
- valid statuses;
- correct current/future separation;
- date parsing;
- required links.

### Component tests

Prioritize interactive elements:

- mobile navigation;
- evidence filters;
- disclosures;
- contact form if used.

### End-to-end tests

Minimum flows:

1. navigate from hero to infrastructure;
2. open each repository link;
3. navigate from ClosedRoom to its destination;
4. navigate from Aura Finance to its destination;
5. open collaboration contact;
6. use mobile menu with keyboard;
7. verify reduced-motion behavior;
8. verify 404 page.

### Automated accessibility

Use axe-core through Playwright or an equivalent tool. Automated testing does not replace manual keyboard and screen-reader checks.

### Visual regression

Capture at least:

- 375 × 812;
- 768 × 1024;
- 1440 × 1000.

Key snapshots:

- hero;
- pillar grid;
- reference applications;
- mobile navigation;
- collaboration section.

## 12. External integrations

### GitHub data

Do not make the first release dependent on the GitHub API at runtime. Repository metadata may be maintained manually or fetched during build with a cached fallback.

Rationale:

- avoids runtime rate limits;
- prevents layout instability;
- allows editorial control over status;
- avoids equating recent commits or stars with strategic importance.

### LinkedIn

Use direct links. Do not embed a heavy third-party LinkedIn feed.

### stAI tuned

Link to selected articles or the publication. Avoid iframe embeds.

### Contact

Preferred order:

1. direct email link;
2. small serverless form with documented privacy handling;
3. scheduling link as an optional secondary path.

## 13. Security and privacy

- no secrets in client code;
- no exposed private API tokens;
- use a restrictive Content Security Policy where compatible with Pages;
- set safe referrer policy;
- use `rel="noopener noreferrer"` where needed;
- avoid third-party scripts that fingerprint users;
- do not expose personal analytics identifiers in public content;
- sanitize any future remote content;
- avoid collecting contact fields that are not necessary;
- provide a concise privacy page before enabling analytics or a form.

## 14. Migration and cutover

Because the current page must be ignored rather than incrementally redesigned, use a parallel build strategy.

Recommended process:

1. build the new Astro site in the branch without modifying live deployment behavior;
2. deploy preview artifacts or test locally;
3. validate content and quality gates;
4. prepare a cutover PR that removes or archives legacy root assets as appropriate;
5. merge only when the new output is ready to replace the root site;
6. preserve Git history rather than mixing legacy fragments into the new source tree;
7. verify the production URL immediately after deployment;
8. retain a rollback tag or known-good commit.

The migration should not carry over legacy sections unless they are reintroduced explicitly through the new strategy.

## 15. Definition of technical simplicity

The implementation should be considered over-engineered if it introduces:

- a backend solely for static content;
- a database for the first release;
- full-page client rendering;
- runtime GitHub API dependence;
- a CMS before a real editorial need exists;
- complex animation libraries for basic transitions;
- authentication;
- separate micro-frontends;
- a design-system package used nowhere else.

Build the smallest architecture that preserves content integrity, accessibility, performance and future maintainability.
