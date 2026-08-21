# Landing Success Alignment

Status: active
Owner: personal landing product experience
Read when: implementing, reviewing or coordinating the homepage redesign and its release evidence.

## Goal

Ship a production-ready landing that makes a qualified visitor understand Daniele's identity, `Local AI first != Local AI only` thesis, method, verified proof and next action in under one minute, while reaching repository baseline L0 and product-experience L1.

Intended perception: **Daniele runs applied-AI research, builds real systems and uses evidence to decide between Local, Hybrid and Cloud.**

## Non-goals

- A full visual redesign of every project deep-dive page.
- A CMS, authentication, contact form, analytics platform or complete blog engine.
- Publishing metrics, awards, dates or maturity claims that have not passed the evidence gate.
- Copying another personal site's visual style or adopting the entire template repository mechanically.
- Dark mode; a complete light homepage is sufficient for this workstream.

## Invariants

- Strategy and claims remain owned by `08 — Local AI Strategy, Positioning & Storytelling.md`; the landing may simplify, not contradict it.
- The outcome may be Local, Hybrid or Cloud. Visual comparison must not imply a universal winner.
- Every public metric resolves to one evidence record with date, device, model, quantization, runtime, workload, method, result, limitation and source.
- The UI models visitor questions, not repository architecture. Technical depth is progressively disclosed through project/evidence pages.
- One content owner, one semantic token owner and one canonical component family remain after integration.
- Existing uncommitted user changes are preserved and reconciled before old components are retired.
- Primary content works without client JavaScript; motion is enhancement-only and respects reduced motion.
- The four-plane method uses one active path owner and one cumulative progress value; local plane and handoff lines are fallback-only. Scroll maps to exact physical stage/thread checkpoints, never to a global percentage whose meaning changes with viewport width.
- Target WCAG 2.2 AA; meaningful text is at least 14 px, body copy 16–18 px and interactive targets at least 44 x 44 CSS px.

## Success model and references

- [Chip Huyen](https://huyenchip.com/): immediate identity, mission and artifacts.
- [Eugene Yan](https://eugeneyan.com/): dated work, prototypes and follow action.
- [Jay Alammar](https://jalammar.github.io/): one memorable category demonstrated by every artifact.
- [Simon Willison](https://simonwillison.net/): current notes and tools make authority observable.

## Experience thesis

- **Visual thesis:** independent applied-AI lab; editorial white canvas, cobalt signal line, calm typography and real device/product evidence instead of dashboard chrome.
- **Content plan:** identity and thesis -> current proof -> Decide/Build/Test/Measure method -> selected systems -> dated field notes -> about/track record -> follow/advisory CTA.
- **Interaction thesis:** restrained hero entrance, scroll progress that connects the four method stages, and precise media/link reveals; all content remains immediately available under reduced motion.

## Target information architecture

1. **Quiet header:** name, Work, Evidence, Notes, About and `Follow the research`.
2. **Hero:** portrait/hardware visual, role, thesis, research question and two ordered CTAs.
3. **Current evidence:** one real run with method and limitation before metrics.
4. **Method:** Decide, Build, Test, Measure; one question, proof and takeaway per stage.
5. **Selected systems:** one flagship with large real media; other projects as editorial rows.
6. **Latest field notes:** dated items with real destinations and a follow path.
7. **About:** short identity/track record using only verifiable facts.
8. **Final conversion:** primary `Follow the research`; secondary `Discuss a workload`.

## Critical journeys

- `J1 Decision maker`: hero -> decision method -> verified evidence -> discuss a workload.
- `J2 Technical peer`: current experiment -> methodology/project detail -> field notes -> follow research.
- `J3 Hiring/leadership`: hero -> selected systems -> about/track record -> LinkedIn/contact.
- `J4 Mobile visitor`: same priority and destinations at 320–430 px without horizontal scroll, tiny dashboards or lost narrative position.

## Current state

See [`docs/current-state.md`](../current-state.md). The active roadmap and unused homepage families duplicate content/components, while the repository has no declared check/test/E2E lifecycle.

## Work graph

| ID | Work | Owns/writes | Depends on | Parallel | State |
| --- | --- | --- | --- | --- | --- |
| LA-01 | Claim, asset and route evidence inventory | `docs/features/public-claims.md`, evidence/asset inventory | — | yes | READY |
| LA-02 | Minimum repository and product-UI contracts | `AGENTS.md`, `.engineering/commands.json`, `design/*`, `docs/architecture.md` | — | yes | READY |
| LA-03 | Canonical landing schema, IA and copy | `src/types/landing.ts`, `src/content/locales/en/landing.ts` | LA-01, LA-02 | no | BLOCKED |
| LA-04 | Semantic visual system and key references | `src/styles/tokens.css`, `src/styles/layout.css`, `design/reference/*` | LA-02 | yes | BLOCKED |
| LA-05 | Header and hero vertical slice | `src/components/landing/LandingHeader.astro`, `LandingHero.astro` | LA-03, LA-04 | yes | BLOCKED |
| LA-06 | Decide/Build method vertical slice | `src/components/landing/DecisionStage.astro`, `BuildStage.astro`, `MethodThread.astro` | LA-03, LA-04 | yes | BLOCKED |
| LA-07 | Test/Measure evidence vertical slice | `src/components/landing/TestStage.astro`, `EvidenceRun.astro` | LA-01, LA-03, LA-04 | yes | BLOCKED |
| LA-08 | Systems, notes, about and conversion slice | `src/components/landing/{SelectedSystems,FieldNotes,AboutSignal,FinalCta}.astro`, `src/pages/{insights,about}.astro` | LA-03, LA-04 | yes | BLOCKED |
| LA-09 | Route integration and duplicate-owner removal | `src/pages/index.astro`, `src/content/index.ts`, old `home/*` and `roadmap/*` retirement | LA-05, LA-06, LA-07, LA-08 | no | BLOCKED |
| LA-10 | Adaptive layout, accessibility and motion hardening | landing components/styles, `src/scripts/site.ts` | LA-09 | no | BLOCKED |
| LA-11 | Check/test/E2E/smoke lifecycle | `package.json`, lockfile, `tests/*`, CI workflow, bounded evidence config | LA-02 | yes | BLOCKED |
| LA-12 | Integration, comprehension review and release evidence | no product owner; validation artifacts only | LA-09, LA-10, LA-11 | no | BLOCKED |
| LA-13 | Durable knowledge transfer and plan deletion | canonical docs and `docs/current-state.md` | LA-12 | no | BLOCKED |

## Slice gates

### LA-01 — Evidence before design

- Classify every metric, date, award, maturity and privacy statement as `verified`, `needs source`, `conceptual` or `remove`.
- Confirm availability/privacy of portrait, screenshots, diagrams and real-device evidence; missing assets do not enter the route.
- Acceptance: no number or “current” item can reach canonical landing content without source identity and limitation text.
- Validation: asset existence/link audit plus manual claim review against project repositories or captured run artifacts.

### LA-02 — Smallest justified template alignment

- Specialize the TypeScript and `product-ui` profiles: design source, WCAG target, viewports, journeys and npm command mappings.
- Declare baseline L0 / experience L1; do not copy irrelevant build/package machinery.
- Acceptance: a fresh contributor can locate ownership, commands, active work and experience constraints without reading the entire documentation set.
- Validation: template verifiers adapted locally or equivalent deterministic schema/document checks.

### LA-03/04 — Content and visual contracts

- Consolidate strategy, notes, projects and evidence into one typed landing owner; remove broken/aspirational destinations.
- Define semantic colors, typography, spacing, focus and motion in one token source; eliminate roadmap-local microtype and raw color drift.
- Produce only two bounded key references: 1440 px desktop and 390 px mobile, with accessibility annotations.
- Acceptance: headline scan alone tells the full story; no meaningful text under 14 px; no generic bento/card mosaic.

### LA-05..08 — Vertical experience slices

- Hero contains name/role, thesis, research question, visual anchor and one dominant action within the first viewport.
- Local/Hybrid/Cloud comparison expresses contextual strengths and operational costs, not green/red ideology.
- One flagship application shows question -> architecture -> observed result -> limitation; secondary projects become editorial rows.
- Evidence shows real device/model/runtime/workload identity and links to methodology; field notes are dated and resolve to real content.
- `/insights` and `/about` either ship as valid routes or are removed from navigation until they exist.

### LA-09/10 — Integration quality

- Integrate once in `index.astro`, remove nested `<main>`, then retire duplicate owners after parity review.
- Preserve stage orientation on mobile with a simple vertical thread and `01/04` progress; no desktop dashboard shrink-down.
- Provide semantic landmarks/headings, keyboard/focus behavior, accessible diagrams, reduced motion and 200% zoom support.
- Acceptance: no horizontal overflow at 320 px; no essential hover/JS dependency; all CTAs communicate destination/outcome.

### LA-11/12 — Evidence and release

- Add native `check`, `test`, `e2e`, `smoke`, `stop` and `clean`; production E2E leaves no server/browser residue.
- Automate route/link, heading/landmark, accessibility and critical-journey checks; retain screenshots/traces only as bounded failure evidence.
- Run a 5-second and 60-second comprehension check with 3–5 representative technical readers; at least 80% identify Daniele, thesis, method, one proof and next action without prompting.
- Release gates: build/check/E2E pass; axe has no serious/critical findings; Lighthouse performance and best practices >=95, SEO 100, accessibility >=95; LCP <2.5 s, CLS <0.1, initial transfer <1.2 MB, first-party JS <60 KB.

## Integration points

- `landing.ts` connects claim review to UI; components do not invent copy or metrics.
- `tokens.css` connects brand kit to components without semantic duplication.
- `index.astro` is the only page composition point; package/CI ownership stays in LA-11.

## Risks and mitigations

- **Unverified evidence:** label the observed state or omit the metric; never backfill decorative numbers.
- **Scope expands into all project pages:** change deep pages only when required for a homepage destination or truthful evidence path.
- **Dirty work is lost:** reconcile and port approved changes before deletion; record parity in LA-09.
- **Roadmap becomes decorative:** every stage must have one distinct visitor question and one real artifact; remove the stage if it cannot earn its place.
- **Testing outweighs the site:** prefer small Playwright/axe/link checks and npm scripts; no second task runner.

## Durable documentation destinations

- `docs/architecture.md`: final page/content/design ownership and route map.
- `docs/features/public-claims.md`: durable claim/evidence policy and evidence-record schema.
- `docs/personal-landing/`: consolidate durable strategy/IA/design/acceptance facts; delete superseded implementation diaries rather than duplicating them.
- `design/ux-contract.json` and `design/brand-kit.json`: canonical experience and brand constraints.
- tests and schemas: executable truth for routes, accessibility and evidence requirements.

## Completion

The workstream is complete only when applicable code, integration, content accuracy, experience behavior, responsive/accessibility evidence, operational cleanup and durable documentation agree.

Definition of Done:

`CONTENT TRUE -> HIERARCHY CLEAR -> EXPERIENCE COMPLETE -> OPERATIONS COMPLETE -> EVIDENCE COMPLETE -> PRODUCT COMPLETE`

After durable knowledge transfer, update `docs/current-state.md` and delete this workstream by default. Git remains the implementation history.
