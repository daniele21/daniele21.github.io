# Project Page UX Refactor

Status: active
Owner: project deep-dive experience
Read when: implementing, reviewing or migrating project pages away from the shared Decide/Build/Test/Measure page structure.

## Goal

Turn every project deep-dive into a page that follows the visitor's mental model for that project type, while preserving one coherent visual system, explicit evidence boundaries and clear links back to the broader Local AI ecosystem.

The homepage owns the `Decide -> Build -> Test -> Measure -> Decide Again` method. Project pages should show the concrete system, product or experiment that came out of that method rather than replaying the method as their information architecture.

Intended perception: **each project is a focused proof artifact inside one coherent Local AI system, not an isolated repository and not a repeated methodology slide deck.**

## Non-goals

- Rewriting every project from scratch.
- Making all project pages visually identical.
- Replacing truthful project-specific evidence with standardized decorative metrics.
- Adding unsupported benchmark, privacy, production-readiness or compliance claims.
- Removing technical depth; depth should be progressively disclosed after the visitor understands the project.
- Changing the homepage method narrative as part of this workstream.

## Invariants

- The homepage remains the canonical owner of the `Decide -> Build -> Test -> Measure -> Decide Again` method.
- Project pages use visitor questions and project archetype as their primary IA.
- Every page distinguishes implemented capability, observed evidence, limitation and future work.
- One dominant visual should explain the main idea of each major section wherever a real visual is available.
- Real product UI, architecture diagrams, code and measured evidence take precedence over decorative cards.
- Shared project components must remain semantic, accessible and reusable across archetypes.
- Target WCAG 2.2 AA; headings form a valid document outline, meaningful text is at least 14 px and interactive targets are at least 44 x 44 CSS px.
- Primary content works without client JavaScript; sticky navigation and scroll-spy are enhancements only.
- Mobile keeps project identity and current context visible instead of collapsing into anonymous phase tabs.
- Public claims remain governed by `docs/features/public-claims.md` and the relevant project repositories.

## Success references and interaction principles

Reference patterns:

- **Vercel / AI SDK:** value proposition first, then real developer surface, examples and implementation depth.
- **Supabase:** short explanations paired with real UI or code; capability is progressively disclosed rather than front-loaded.
- **Linear:** restrained copy and strong visual hierarchy; visual proof carries more weight than explanatory chrome.
- **Tailscale:** technical concepts move from mental model to system architecture and operational consequences.

Derived rule: **one question -> one dominant visual -> one piece of evidence -> deeper only when useful.**

## Archetypes

### A. Infrastructure

Projects:

- Local LLM Server
- Local ASR Server
- Android Local LLM Harness

Canonical IA:

1. Overview
2. Why it exists
3. Architecture
4. Runtime / developer boundary
5. Evidence
6. Status / limits
7. Connected system

Primary visual emphasis: architecture, runtime flow, developer/API surface.

### B. Product / proving ground

Projects:

- RedactGuard
- ClosedRoom
- Aura Finance

Canonical IA:

1. Overview
2. Problem
3. Workflow
4. Product
5. Under the hood
6. Evidence / limits
7. Connected infrastructure

Primary visual emphasis: real workflow and product UI before technical architecture.

### C. Measurement / experiment

Projects:

- Performance Lab
- Traffic Monitoring
- Traffic Monitoring Android

Canonical IA:

1. Overview
2. Question / hypothesis
3. Method
4. Evidence / results
5. Interpretation
6. Limits
7. Architectural consequence

Primary visual emphasis: method, measured evidence and the resulting Local / Hybrid / Cloud decision.

## Shared project design system

Create or evolve these canonical component roles:

- `ProjectHero`: compact project identity, status, value proposition, primary CTA and dominant visual.
- `ProductSubHeader`: archetype-specific sticky navigation; preserve project identity and action on mobile.
- `ProjectSection`: semantic `<section>` with eyebrow, `<h2>`, short explanation and visual/content slot.
- `ProjectProof`: one concise statement connecting the artifact to the hypothesis it proves.
- `ProjectEvidenceNote`: standard `proven today` versus `not claimed yet` evidence boundary.
- `ProjectStatus`: explicit current maturity and next validation step.
- `ProjectRelations`: contextual map to upstream/downstream projects in the Local AI system.
- `ProjectCTA`: repository, demo or next relevant project action.

`ProjectPhase` is transitional. It remains until all dependent routes have migrated, then should be retired.

## Hero contract

A visitor should understand the project within five seconds.

Required hierarchy:

1. archetype / status
2. project name
3. one-sentence outcome or capability
4. primary action
5. dominant real visual
6. optional compact technical metadata

Avoid badge clouds, multiple equal-weight CTAs and 50/50 layouts that compress the main visual when the visual is the stronger proof.

## Evidence contract

Every project must contain a visible evidence boundary with two states:

**Proven / implemented today**

- concrete shipped or integrated capabilities
- observed behavior with source/context where relevant

**Not claimed / still needs validation**

- production readiness gaps
- missing representative benchmark runs
- unsupported performance, privacy, compliance or generalization claims

The evidence block is a property of the project, not a mandatory `MEASURE` phase.

## Connected system contract

Every migrated route should help the reader understand where the project fits. Prefer a compact contextual chain over a generic `Back to projects` link.

Examples:

- Infrastructure -> Local LLM Server -> Product -> RedactGuard -> Measurement -> Performance Lab
- Infrastructure -> Android Harness -> Measurement -> Traffic Monitoring Android

Only real relationships should be shown.

## Work graph

| ID | Work | Owns/writes | Depends on | Parallel | State |
| --- | --- | --- | --- | --- | --- |
| PP-01 | Inventory and archetype mapping | this workstream, route matrix | - | yes | DONE |
| PP-02 | Shared semantic project foundation | `src/components/project/{ProjectHero,ProjectSection,ProjectProof,ProjectRelations}.astro`, `ProductSubHeader.astro` | PP-01 | no | IN PROGRESS |
| PP-03 | Infrastructure pilot | `src/pages/local-llm-server.astro`, Local LLM components/content as needed | PP-02 | no | BLOCKED |
| PP-04 | Product pilot | `src/pages/redact-guard.astro`, RedactGuard components/content as needed | PP-02 | yes after PP-03 foundation review | BLOCKED |
| PP-05 | Measurement pilot | `src/pages/performance-lab.astro`, measurement components as needed | PP-02 | yes after PP-03 foundation review | BLOCKED |
| PP-06 | Three-pilot UX review | desktop/mobile/accessibility/comprehension evidence | PP-03, PP-04, PP-05 | no | BLOCKED |
| PP-07 | Infrastructure migration | Local ASR Server, Android Harness | PP-06 | yes | BLOCKED |
| PP-08 | Product migration | ClosedRoom, Aura Finance | PP-06 | yes | BLOCKED |
| PP-09 | Measurement migration | Traffic Monitoring macOS + Android | PP-06 | yes | BLOCKED |
| PP-10 | Cross-project relation pass | relation data and page integrations | PP-07, PP-08, PP-09 | no | BLOCKED |
| PP-11 | Legacy cleanup | retire `ProjectPhase`, obsolete phase nav/copy and dead CSS | PP-10 | no | BLOCKED |
| PP-12 | Durable docs and release validation | architecture/current-state/tests | PP-11 | no | BLOCKED |

## Pilot 1 - Local LLM Server

Target navigation:

`Overview · Architecture · Runtime · Evidence · Status`

Target composition:

- Hero: `Local LLM Server` + concise capability + GitHub + full-width real product visual.
- Proof statement: applications can depend on one local API while models, backends and lifecycle change underneath.
- Why: backend coupling, lifecycle ownership, runtime coordination and opaque operation.
- Architecture: runtime flow and architecture are the dominant section.
- Runtime: lifecycle, backend matrix and OpenAI-compatible code boundary.
- Product surface: Local LLM Studio shows the runtime as an inspectable system.
- Evidence: implemented capabilities vs unsupported deployment/production claims.
- Status: explicit current maturity and next validation boundary.
- Connected system: link this infrastructure to representative proving grounds and measurement.

## Pilot 2 - RedactGuard

Target navigation:

`Overview · Workflow · Product · Architecture · Evidence`

Target composition:

- Hero: product outcome and real UI.
- Problem: configurable sensitive-data detection without moving the original document to cloud AI.
- Workflow: `load -> detect locally -> review -> redact -> export` as the dominant mental model.
- Product: reviewability and user control before architecture details.
- Under the hood: local inference and configurable PII boundary.
- Evidence: implemented local workflow vs no compliance/perfect-recall claim.
- Connected infrastructure: Local LLM Server and relevant measurement layer.

## Pilot 3 - Performance Lab

Target navigation:

`Overview · Method · Evidence · Findings · Status`

Target composition:

- Hero: `Is local execution actually good enough?`
- Core questions: `Can it run? -> Can it run well? -> Should it run locally?`
- Method: workload, model, quantization, runtime and device context.
- Evidence: latency, throughput, memory and thermal/battery only when representative runs exist.
- Interpretation: translate numbers into workload suitability.
- Limits: no decorative metrics or implied benchmark dataset.
- Architectural consequence: evidence can confirm Local, move to Hybrid or retain Cloud.

## UX gates before broad migration

The three pilots must pass:

- **5-second test:** project purpose and value are immediately clear.
- **15-second test:** the reader can identify what was actually built.
- **30-second test:** the reader can explain the core architecture/workflow/method.
- **Evidence test:** implemented facts and unsupported claims are visually distinct.
- **Visual test:** each major idea has one dominant visual or intentional whitespace, not a wall of generic cards.
- **Cross-project test:** the reader understands where the artifact lives in the larger system.
- **Mobile test:** no anonymous phase strip, horizontal page overflow or desktop diagram shrunk below practical readability.
- **Semantic test:** valid `<section>` / heading hierarchy, keyboard access, focus states and reduced-motion fallback.

## Migration order

1. Shared foundation.
2. Local LLM Server.
3. RedactGuard.
4. Performance Lab.
5. Review the three archetypes together.
6. Migrate remaining routes by archetype.
7. Add/normalize connected-system navigation.
8. Remove legacy phase infrastructure only after parity and route validation.

## Risks and mitigations

- **Three archetypes drift into three design systems:** share hero, section, evidence, navigation, spacing and typography primitives; vary composition, not foundations.
- **Technical depth disappears:** keep existing deep components, but move them later in the journey and group them by visitor question.
- **Marketing copy outruns evidence:** reuse verified project content and evidence boundaries; omit unsupported numbers or claims.
- **Pilot refactor breaks old routes:** additive shared components first; retire `ProjectPhase` only after every route migrates.
- **Mobile sticky navigation becomes crowded:** cap primary navigation at five archetype-specific items and keep compact project identity visible.
- **Connected-system UI invents dependencies:** encode only real architectural/product relationships.

## Completion

The workstream is complete when all project routes use an archetype-appropriate IA, shared semantic project primitives, explicit evidence boundaries, coherent mobile navigation and cross-project context, with no remaining dependency on `ProjectPhase`.

Definition of Done:

`PURPOSE CLEAR -> VISUAL PROOF -> TECHNICAL DEPTH -> EVIDENCE BOUNDARY -> SYSTEM CONTEXT -> RESPONSIVE/ACCESSIBLE -> LEGACY REMOVED`

After completion, update `docs/architecture.md` and `docs/current-state.md`, then delete this active workstream by default once its durable knowledge has been transferred.
