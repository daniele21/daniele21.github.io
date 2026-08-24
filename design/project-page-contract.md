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

## Accessibility and adaptive behavior

- WCAG 2.2 AA target.
- One H1 per route.
- Phase anchors must remain keyboard-addressable through normal links.
- Minimum meaningful text size remains 14px.
- Minimum interactive target is 44×44px where applicable.
- Desktop, tablet and mobile preserve the same phase order.
- Responsive behavior must preserve content priority rather than merely hide navigation/content.
- Motion is optional and subordinate to comprehension; reduced-motion preferences must remain respected.

## Validation

A project-page migration is complete only when:
- all six semantic phases are represented;
- top-level project navigation uses the shared phase model;
- no measured claim is invented;
- project-specific depth stays inside the correct phase;
- one H1 and valid landmarks remain intact;
- build/check/test gates still pass;
- representative desktop/tablet/mobile rendering is reviewed for important pages.

Short-form project pages may intentionally omit deep modules, but should still preserve the same question order where enough evidence exists.
