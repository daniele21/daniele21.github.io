# Project Page UX Contract

This contract specializes `repo-template-sw` product-experience rules for technical project deep-dives on this site.

The goal is **consistent comprehension, not identical pages**. The homepage owns the shared `Decide -> Build -> Test -> Measure -> Decide Again` method. Project routes show the concrete artifact produced by that method and therefore use the visitor's mental model for the project type as their primary information architecture.

## Governing principle

```text
HOMEPAGE
Decide -> Build -> Test -> Measure -> Decide Again

PROJECT PAGE
Purpose -> dominant project mental model -> technical depth -> evidence -> status -> connected system
```

Do not replay the homepage methodology as a mandatory project-page table of contents.

Derived interaction rule:

```text
one question
-> one dominant visual
-> one piece of evidence
-> deeper only when useful
```

## Shared semantic requirements

Every full project deep-dive must answer these questions, although the labels and ordering of the middle sections vary by archetype:

### Overview

Answer in the first screen:

- What is this?
- What outcome or capability does it enable?
- What is its current status?
- What is the primary next action?

Use one dominant real product/system visual when useful. Avoid feature inventories, badge clouds and multiple equal-weight calls to action.

### Why / question

State the real problem, workload or hypothesis that makes the artifact worth building or measuring. This may be compact and does not need to be a top-level navigation item.

### Primary mental model

Show the concept the visitor must understand first:

- architecture for infrastructure;
- workflow/product for proving grounds;
- method/evidence for experiments.

Prefer a real architecture diagram, product surface, workflow or result over generic card mosaics.

### Technical depth

Progressively disclose runtime, API, lifecycle, implementation, architecture or method only after the primary mental model is clear.

### Evidence

Use verified evidence only. Explicitly separate:

- **implemented / proven today**;
- **not claimed / still needs validation**.

If measured results do not exist yet, state what is being measured or what blocks a stronger claim. Never use decorative charts that can be mistaken for measured evidence.

### Status / consequence

State the current maturity, next validation step or architectural consequence. This is a decision boundary, not a motivational conclusion.

### Connected system

When a real relationship exists, show where the artifact sits relative to upstream infrastructure, proving grounds or measurement. Prefer contextual related-project navigation over a generic `Back to projects` link.

## Archetype information architecture

### Infrastructure

Examples: Local LLM Server, Local ASR Server, Android Local LLM Harness.

Canonical navigation:

```text
Overview · Architecture · Runtime · Evidence · Status
```

Typical composition:

1. Overview / dominant system visual.
2. Why the infrastructure gap exists.
3. Architecture / execution flow.
4. Runtime, lifecycle, backends, API and developer surface.
5. Evidence and trust/operational limits.
6. Status and next technical decision.
7. Connected proving ground / measurement.

### Product / proving ground

Examples: ClosedRoom, Aura Finance, RedactGuard.

Canonical navigation:

```text
Overview · Workflow · Product · Architecture · Evidence
```

Typical composition:

1. Overview / product outcome and real UI.
2. User or workflow problem.
3. Dominant end-to-end workflow.
4. Product surfaces and interaction model.
5. Under-the-hood architecture and Local AI boundary.
6. Evidence, human-control boundary and explicit limitations.
7. Connected infrastructure / measurement.

### Experiment / measurement

Examples: Performance Lab, Traffic Monitoring, Traffic Monitoring Android.

Canonical navigation:

```text
Overview · Method · Evidence · Findings · Status
```

Typical composition:

1. Overview / question being measured.
2. Hypothesis and decision context.
3. Method: workload, model/runtime/device/configuration as relevant.
4. Evidence / measured results when available.
5. Interpretation: what the evidence means for the workload.
6. Limits and missing validation.
7. Architectural consequence: Local, Hybrid or Cloud where relevant.

Android Local LLM Harness currently behaves as an infrastructure/experiment hybrid. Its final classification should follow whichever reader mental model wins after the three-pilot review; do not force the page into a category merely for taxonomy purity.

## Shared components

Project routes should converge on one shared semantic family:

- `ProjectHero`: project identity, status, value proposition, CTA and dominant visual.
- `ProductSubHeader`: archetype-specific sticky navigation and mobile context.
- `ProjectSection`: semantic `<section>` and `<h2>` foundation.
- `ProjectProof`: concise statement connecting the artifact to what it demonstrates.
- `ProjectEvidenceNote`: implemented/proven versus not-claimed boundary.
- `ProjectRelations`: contextual project chain.
- project-specific visual and technical modules.

`ProjectPhase` is a migration-only component. It may remain on unmigrated routes while the archetype refactor is active, but it is not the target contract.

## Shared navigation

Top-level project navigation is archetype-specific and should normally contain no more than five items.

Desktop:

- project name/status remains visible;
- archetype sections are directly addressable;
- one high-value repository/demo action may remain visible.

Mobile:

- preserve compact project identity and current context;
- archetype section navigation may horizontally scroll when needed;
- the active item must remain visible when practical;
- subtle edge fades may communicate additional items;
- never reduce the route to anonymous methodology tabs;
- each interactive target remains at least 44px high and keyboard-addressable.

## Hero contract

A visitor should understand the project within five seconds.

Required hierarchy:

1. archetype / status;
2. project name;
3. one-sentence outcome or capability;
4. primary action;
5. dominant real visual;
6. optional compact technical metadata.

For evidence-rich visuals, prefer copy-above / full-width-visual layouts over 50/50 layouts that compress the stronger proof.

## Progressive disclosure

Preferred page-level order:

```text
essential conclusion
-> dominant visual/workflow
-> explanatory context
-> architecture/code/diagnostics
-> evidence boundary
-> next consequence
```

Technical depth is encouraged. It simply should not arrive before the visitor knows why it matters.

## Adaptive technical content

Responsive behavior preserves **content priority**, not desktop geometry.

### Tables

Comparison tables should become stacked labeled rows/cards below roughly 640px when the comparison remains understandable without simultaneous columns. Horizontal scrolling is a fallback for genuinely matrix-like information, not the default response to narrow screens.

### Code

Code keeps semantic line structure. On narrow screens it may use a horizontal scroller, but that region must be independently keyboard-focusable, must never create page-level overflow and should expose a small affordance such as `Scroll to inspect code` when overflow is expected.

### Architecture diagrams

Diagrams fit inside the content container and may provide explicit zoom for detail. Embedded micro-labels are supporting evidence only; the page must also explain the important architecture conclusion in readable text.

### Dense metrics and diagnostics

Keep summary and decision-relevant metrics above raw diagnostics. Never shrink meaningful labels, statuses, captions or explanatory text below 14px simply to preserve desktop density.

## Motion and product previews

Motion is subordinate to comprehension. Project-specific carousels, screenshots and previews should be user-controlled when repeated movement would otherwise continue automatically. Autoplay is acceptable only when it has a product reason and an explicit pause/stop control. Reduced-motion preferences must remove non-essential repeated movement.

## Accessibility and adaptive behavior

- WCAG 2.2 AA target.
- One H1 per route.
- One `<main>` landmark supplied by `BaseLayout`; project pages must not add a nested main.
- Top-level section anchors remain keyboard-addressable through normal links.
- Project sections use semantic `<section>` and heading hierarchy where the shared primitive owns the section.
- Minimum meaningful text size remains 14px.
- Minimum interactive target is 44×44px where applicable.
- Responsive behavior preserves content priority rather than merely hiding navigation/content.
- Motion is optional and subordinate to comprehension; reduced-motion preferences remain respected.
- Invalid SVG, runtime console errors and broken visual assets are experience defects, not cosmetic warnings.

## Migration compatibility

During the active refactor, routes are allowed to be in one of two states:

1. **Migrated:** uses archetype navigation and shared project primitives; does not depend on `ProjectPhase` as its page IA.
2. **Legacy:** retains the old six-state phase journey until its archetype pilot/template is validated.

Tests must identify the state deliberately. A migrated route must never be forced back to `ProjectPhase` merely to satisfy a legacy contract.

## Validation

A migrated project page is acceptable only when:

- project purpose is clear in a five-second scan;
- the visitor can identify what was actually built within roughly fifteen seconds;
- the dominant architecture/workflow/method is understandable within roughly thirty seconds;
- top-level navigation matches its archetype and contains no more than five primary items;
- evidence and missing evidence are visually distinct;
- no measured claim is invented;
- one H1 and a valid single-main document structure remain intact;
- meaningful rendered text remains at least 14px;
- project identity/context remains discoverable on mobile;
- no page-level horizontal overflow exists at representative widths;
- browser/page errors are absent in representative rendered checks;
- build/check/test gates pass;
- representative 1440 / 768 / 390 / 320 rendering is reviewed for the three pilot pages before broad migration.

The migration is complete only when all project routes are in the migrated state and `ProjectPhase` can be retired.
