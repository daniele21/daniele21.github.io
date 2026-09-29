# Portfolio end-to-end narrative — maintenance plan

Last implementation pass: 2026-09-29.

## Goal

The site should communicate one connected capability: frame an AI problem, design the architecture, build the system, put it inside a real product, measure what works, and use that evidence to make the next decision.

Local and on-device AI remain a major specialization, not the boundary of the portfolio.

## Public information architecture

```text
Home
  Method
  Systems
    Korgis
    Harnex
    Decisio
  Products
    RedactGuard
    Aura Finance
    ClosedRoom
  Experiments
    Jev vs LLM
    Model Capability Benchmark
    RedactGuard Local Anonymization
    VLM Capability Benchmark
    Image Generation Benchmark
  About
```

`/performance-lab` is compatibility-only and points to the consolidated Experiments hub.

## Canonical editorial source

`src/content/portfolio.ts` is the public cross-project narrative registry.

Before changing a status, capability, metric or limitation there, verify the relevant source repository. Prefer current-state ledgers when present; otherwise use the current README / explicit workstream documentation.

Current source map:

| Public item | Repository | Preferred source |
| --- | --- | --- |
| Korgis | `daniele21/korgis` | `docs/current-state.md`, then `README.md` |
| Harnex | `daniele21/harnex` | `docs/current-state.md`, then `README.md` |
| Decisio | `daniele21/decisio` | `docs/current-state.md`, then `README.md` |
| Experiments | `daniele21/experiments` | root README + each experiment README |
| RedactGuard | `daniele21/redact-guard` | `README.md` |
| RedactGuard Android | `daniele21/redactguard-android` | `README.md` |
| ClosedRoom | `daniele21/closedroom` | `README.md` |
| Aura Finance | `daniele21/personal-budget` | active product branch README; verify branch before claims |

## Evidence rules

- Do not turn an implemented feature into a measured-quality claim.
- Failed gates stay visible when they materially define current project status.
- Numeric results must retain model/runtime/dataset provenance.
- Provider or contract publication restrictions override the desire to show metrics.
- Planned experiments say that no publication-grade result exists yet.
- If the desired visual does not exist, keep an explicit `VISUAL PLACEHOLDER` describing the verified artifact that should replace it.

## Freshness gate

`tests/portfolio-freshness.test.mjs` requires `portfolioNarrative.lastVerified` to be refreshed at least every 45 days.

Refreshing the date means re-checking the source repositories above. Do not bump the date without re-verifying statuses, limitations and evidence claims.

## Implementation sequence completed

1. Audit current repositories and claims.
2. Create canonical portfolio source and navigation model.
3. Reframe Home around end-to-end capability.
4. Consolidate Performance Lab into Experiments and add the research hub.
5. Add Mission / My Role / Evidence / So What context to project pages and add Decisio.
6. Rebuild About around research foundations + enterprise constraints + independent ownership.
7. Update UX contracts and CI freshness checks.


## Mobile-first rule

The canonical design surface is a 320–430px touch viewport.

Review order is:
1. 320px phone
2. 390px phone
3. 768px tablet
4. 1440px desktop

The phone experience owns information hierarchy. Wider layouts may add spatial density, columns and decorative continuity, but they must not introduce information required to understand the mission, project state, evidence boundary or so-what.

Mobile requirements:
- 16px page gutters;
- 48px primary touch targets;
- one-column primary reading flow;
- compact sticky chrome;
- no core content hidden behind scroll animation;
- horizontal scrolling only for compact navigation or metadata;
- zero page-level horizontal overflow.
