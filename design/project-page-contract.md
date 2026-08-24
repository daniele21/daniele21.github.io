# Project Page UX Contract

This contract specializes `repo-template-sw` product-experience rules for technical project deep-dives on this site.

The goal is **consistent comprehension, not identical pages**. Every project should answer the same high-level questions in the same order while preserving project-specific depth, visuals and technical modules.

## Governing journey

```text
OVERVIEW
→ DECIDE
→ BUILD
→ TEST
→ MEASURE
→ DECIDE AGAIN
→ NEXT STEP
```

This mirrors the site's broader Local AI method and gives returning readers a stable mental model across projects.

## Required semantic phases

### Overview

Answer in the first screen:
- What is this?
- What outcome does it enable?
- What is its current status?
- What is the primary next action?

Use one dominant product/system visual when useful. Do not turn the hero into a feature inventory.

### Decide — Why does this exist?

Explain the problem, constraints and architectural question that justified the project. For Local AI work, make the Local / Hybrid / Cloud boundary explicit when it is materially relevant.

### Build — What was built?

Show the concrete system and only then progressively disclose architecture, runtime, backends, APIs and implementation detail. Technical depth is encouraged when it supports the project story; it should not dominate before the reader understands why the system exists.

### Test — Where does it meet reality?

Show the real workflow, product surface, test bed or operational scenario. Prefer real screenshots and end-to-end flows over abstract feature lists.

### Measure — What can be claimed today?

Use verified evidence only. Depending on the project, this may include benchmark results, latency, throughput, memory, thermal behavior, network boundaries, product proof, runtime diagnostics or explicit maturity/limitations.

If measured results do not exist yet, say what is being measured or what still blocks a stronger claim. Never use decorative charts that can be mistaken for measured evidence.

### Decide again — What changed after evidence?

State the current architectural/product decision, trade-offs and remaining limits. This is not a motivational conclusion; it is the consequence of the previous phases.

### Next step

Offer the most useful next action: source code, demo, related project, benchmark or return to the broader Local AI journey. Do not default to a sales CTA when peer exploration is more appropriate.

## Shared navigation

Project pages should prefer this stable primary navigation:

```text
Overview · Decide · Build · Test · Measure · Decide again
```

Project-specific subtopics remain inside the relevant phase rather than competing as top-level navigation items.

On narrow screens, the canonical phase navigation remains horizontally scrollable but must behave as an intentional mobile control rather than clipped desktop navigation:

- the active phase is kept visible and centered when practical;
- subtle edge fades communicate that additional phases exist off-screen;
- the sticky project CTA is removed when it competes with phase navigation;
- normal page content still exposes the final source/demo/next-step CTA;
- every navigation target remains at least 44px high and keyboard-addressable.

## Archetypes

The shared journey is mandatory for full deep-dives, but internal modules vary by project type.

### Infrastructure

Examples: Local LLM Server, Local ASR Server.

Typical Build modules:
- runtime flow;
- lifecycle;
- backends;
- architecture;
- API/developer boundary.

Typical Measure modules:
- runtime diagnostics;
- operational constraints;
- hardware/runtime evidence;
- maturity and trust boundaries.

### Product / use case

Examples: ClosedRoom, Aura Finance, RedactGuard.

Typical Build/Test modules:
- user workflow;
- product surfaces;
- processing pipeline;
- privacy/trust boundary;
- architecture where relevant.

Typical Measure modules:
- product proof;
- boundary verification;
- task-quality evidence;
- explicit limitations.

### Experiment / measurement

Examples: Android Local LLM Harness, Performance Lab, Traffic Monitoring.

Typical modules:
- research question;
- device/configuration;
- methodology;
- test surfaces;
- metrics/results;
- decision consequence.

## Progressive disclosure

Use this order inside every phase:

```text
essential conclusion
→ explanatory context
→ visual / workflow proof
→ architecture / code / diagnostics
```

Do not show every advanced implementation detail at the same visual level as the primary project outcome.

## Adaptive technical content

Responsive behavior preserves **content priority**, not desktop geometry.

### Tables

Comparison tables should become stacked labeled rows/cards below roughly 640px when the comparison can remain understandable without simultaneous columns. Horizontal scrolling is a fallback for genuinely matrix-like information, not the default response to narrow screens.

### Code

Code keeps semantic line structure. On narrow screens it may use a horizontal scroller, but that region must be independently keyboard-focusable, must never create page-level overflow and should expose a small affordance such as “Scroll to inspect code” when overflow is expected.

### Architecture diagrams

Diagrams fit inside the content container and may provide explicit zoom for detail. Embedded micro-labels are supporting evidence only; the page must also explain the important architecture conclusion in readable text.

### Dense metrics and diagnostics

Keep summary and decision-relevant metrics above raw diagnostics. Never shrink meaningful labels, statuses, captions or explanatory text below 14px simply to preserve desktop density.

## Motion and product previews

Motion is subordinate to comprehension. Project-specific carousels, screenshots and previews should be user-controlled when repeated movement would otherwise continue automatically. Autoplay is acceptable only when it has a product reason and an explicit pause/stop control. Reduced-motion preferences must remove non-essential repeated movement.

## Accessibility and adaptive behavior

- WCAG 2.2 AA target.
- One H1 per route.
- Phase anchors must remain keyboard-addressable through normal links.
- Minimum meaningful text size remains 14px.
- Minimum interactive target is 44×44px where applicable.
- Desktop, tablet and mobile preserve the same phase order.
- Responsive behavior must preserve content priority rather than merely hide navigation/content.
- Motion is optional and subordinate to comprehension; reduced-motion preferences must remain respected.
- Invalid SVG, runtime console errors and broken visual assets are experience defects, not cosmetic warnings.

## Validation

A project-page migration is complete only when:
- all six semantic navigation states are represented (`Overview` plus five project phases);
- top-level project navigation uses the shared phase model;
- no measured claim is invented;
- project-specific depth stays inside the correct phase;
- one H1 and valid landmarks remain intact;
- meaningful rendered text remains at least 14px;
- active mobile phase navigation remains visibly discoverable;
- no page-level horizontal overflow exists at representative widths;
- browser/page errors are absent in representative rendered checks;
- build/check/test gates still pass;
- representative 1440 / 768 / 390 / 320 rendering is reviewed for important pages.

Short-form project pages may intentionally omit deep modules, but should still preserve the same question order where enough evidence exists.
