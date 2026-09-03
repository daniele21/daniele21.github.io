# Project Page UX Refactor

Status: active
Owner: project deep-dive experience
Read when: implementing, reviewing or migrating project pages away from the shared Decide/Build/Test/Measure page structure.

## Goal

Turn every project deep-dive into a page that follows the visitor's mental model for that project type, while preserving one coherent visual system, explicit evidence boundaries and clear links back to the broader Local AI ecosystem.

The homepage owns the `Decide -> Build -> Test -> Measure -> Decide Again` method. Project pages show the concrete system, product or experiment that came out of that method instead of replaying the method as their information architecture.

Intended perception: **each project is a focused proof artifact inside one coherent Local AI system, not an isolated repository and not a repeated methodology slide deck.**

## Current checkpoint

The archetype system is now established on `dev` beyond the original three pilots:

- shared `ProjectHero`, `ProjectSection`, `ProjectProof`, `ProjectEvidenceNote` and `ProjectRelations` primitives are active;
- `ProductSubHeader` owns project context and archetype-specific navigation while `SiteHeader` owns site navigation only;
- Local LLM Server and Android LLM Harness use the Infrastructure archetype;
- RedactGuard, ClosedRoom and Aura Finance use the Product / proving-ground archetype;
- Performance Lab uses the Measurement / experiment archetype;
- Local ASR Server and both Traffic Monitoring routes remain transitional `ProjectPhase` pages;
- the global dark-mode toggle now has canonical semantic dark tokens in `src/styles/tokens.css` and persists through `localStorage`;
- project-page validation and staging build cover the mixed migration state.

## Invariants

- The homepage remains the canonical owner of the `Decide -> Build -> Test -> Measure -> Decide Again` method.
- Project pages use visitor questions and project archetype as their primary IA.
- Every migrated page uses the canonical `SiteHeader`; no project-specific global header is allowed.
- Every page distinguishes implemented capability, observed evidence, limitation and future work.
- One dominant visual should explain the main idea of each major section wherever a real visual is available.
- Real product UI, architecture diagrams, code and measured evidence take precedence over decorative cards.
- Shared project components remain semantic, accessible and reusable across archetypes.
- Target WCAG 2.2 AA; meaningful text is at least 14 px and interactive targets are at least 44 x 44 CSS px.
- Primary content works without client JavaScript; sticky navigation and scroll-spy are enhancements only.
- Mobile keeps project identity and current context visible instead of collapsing into anonymous phase tabs.
- Public claims remain governed by `docs/features/public-claims.md` and the relevant project repositories.

## Interaction principle

Reference patterns remain Vercel / AI SDK, Supabase, Linear and Tailscale.

Derived rule: **one question -> one dominant visual -> one piece of evidence -> deeper only when useful.**

## Archetypes

### A. Infrastructure

Current routes:

- Local LLM Server - migrated
- Android Local LLM Harness - migrated
- Local ASR Server - transitional

Canonical navigation:

`Overview · Architecture · Runtime · Evidence · Status`

Primary visual emphasis: architecture, runtime flow, developer/API surface.

### B. Product / proving ground

Current routes:

- RedactGuard - migrated
- ClosedRoom - migrated
- Aura Finance - migrated

Canonical navigation:

`Overview · Workflow · Product · Architecture · Evidence`

Primary visual emphasis: real workflow and product UI before technical architecture.

### C. Measurement / experiment

Current routes:

- Performance Lab - migrated
- Traffic Monitoring - transitional
- Traffic Monitoring Android - transitional

Canonical navigation:

`Overview · Method · Evidence · Findings · Status`

Primary visual emphasis: method, measured evidence and the resulting architectural consequence.

## Shared project design system

Canonical component roles:

- `ProjectHero`: project identity, status, value proposition, primary CTA and dominant visual.
- `ProductSubHeader`: archetype-specific sticky navigation plus compact project context.
- `ProjectSection`: semantic section with eyebrow, heading, short explanation and content slot.
- `ProjectProof`: concise statement connecting the artifact to the hypothesis it proves.
- `ProjectEvidenceNote`: `proven today` versus `not claimed yet` evidence boundary.
- `ProjectRelations`: contextual map to relevant projects in the wider system.
- project-specific workflow, architecture, code and diagnostic modules remain reusable inside the shared shell.

`ProjectPhase` is migration-only and should disappear after Local ASR Server and both Traffic Monitoring pages move to their archetypes.

## Hero contract

A visitor should understand the project within five seconds.

Required hierarchy:

1. archetype / status
2. project name
3. one-sentence outcome or capability
4. primary action
5. dominant real visual
6. optional compact technical metadata

Avoid badge clouds, multiple equal-weight CTAs and layouts that compress the strongest visual proof.

## Evidence contract

Every migrated project contains a visible evidence boundary:

**Proven / implemented today**

- concrete shipped or integrated capabilities
- observed behavior with source/context where relevant

**Not claimed / still needs validation**

- production readiness gaps
- missing representative benchmark runs
- unsupported performance, privacy, compliance or generalization claims

The evidence block is a property of the project, not a mandatory `MEASURE` phase.

## Header contract

There are exactly two navigation levels on project routes:

1. `SiteHeader`: site-level navigation and theme control.
2. `ProductSubHeader`: project identity, page sections and one project-specific action such as GitHub.

Do not duplicate owner identity, Portfolio/back links, GitHub CTAs or site navigation between the two levels.

The theme toggle must change semantic tokens globally, switch the header icon/logo state and persist the selected value.

## Work graph

| ID | Work | State |
| --- | --- | --- |
| PP-01 | Inventory and archetype mapping | DONE |
| PP-02 | Shared semantic project foundation | DONE |
| PP-03 | Local LLM Server infrastructure pilot | DONE |
| PP-04 | RedactGuard product pilot | DONE |
| PP-05 | Performance Lab measurement pilot | DONE |
| PP-06 | Cross-archetype UX review | IN PROGRESS |
| PP-07A | Android Harness infrastructure migration | DONE |
| PP-07B | Local ASR Server infrastructure migration | TODO |
| PP-08A | ClosedRoom product migration | DONE |
| PP-08B | Aura Finance product migration | DONE |
| PP-09 | Traffic Monitoring macOS + Android migration | TODO |
| PP-10 | Cross-project relation normalization | IN PROGRESS |
| PP-11 | Legacy `ProjectPhase` and dedicated-header cleanup | TODO |
| PP-12 | Durable docs and release validation | IN PROGRESS |

## UX gates

Each migrated route must pass:

- **5-second test:** project purpose and value are immediately clear.
- **15-second test:** the reader can identify what was actually built.
- **30-second test:** the reader can explain the core architecture/workflow/method.
- **Evidence test:** implemented facts and unsupported claims are visually distinct.
- **Visual test:** each major idea has one dominant visual or intentional whitespace, not a wall of generic cards.
- **Cross-project test:** the reader understands the relevant relationship to the larger system without invented dependencies.
- **Mobile test:** no anonymous phase strip, horizontal page overflow or desktop diagram shrunk below practical readability.
- **Semantic test:** valid section/heading hierarchy, keyboard access, focus states and reduced-motion fallback.
- **Theme test:** light/dark mode changes the semantic palette, not only the button state.

## Remaining migration order

1. Review the six migrated pages together for spacing and visual hierarchy.
2. Migrate Local ASR Server to Infrastructure.
3. Migrate Traffic Monitoring macOS and Android to Measurement / experiment.
4. Normalize all connected-system relationships.
5. Remove unused dedicated project headers and `ProjectPhase` infrastructure.
6. Update durable architecture/current-state docs and close this workstream.

## Completion

The workstream is complete when all project routes use an archetype-appropriate IA, shared semantic project primitives, explicit evidence boundaries, coherent mobile navigation and cross-project context, with no remaining dependency on `ProjectPhase` or dedicated project-level global headers.

Definition of Done:

`PURPOSE CLEAR -> VISUAL PROOF -> TECHNICAL DEPTH -> EVIDENCE BOUNDARY -> SYSTEM CONTEXT -> RESPONSIVE/ACCESSIBLE -> THEME-SAFE -> LEGACY REMOVED`
