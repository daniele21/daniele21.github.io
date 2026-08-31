# Current State

Status: active  
Updated: 2026-08-31  
Read when: selecting repository-wide work or continuing an active implementation workstream.

## Product state

- **Production Landing**: The primary entry point (`src/pages/index.astro`) implements the canonical `Decide -> Build -> Test -> Measure -> Decide Again` causal flow. The homepage owns this methodology narrative; project routes are now being migrated away from repeating it as their internal table of contents.
- **Project Deep Dives**: Project pages are moving to an archetype-based experience defined in `design/project-page-contract.md`: Infrastructure uses `Overview -> Architecture -> Runtime -> Evidence -> Status`; Product uses `Overview -> Workflow -> Product -> Architecture -> Evidence`; Measurement uses `Overview -> Method -> Evidence -> Findings -> Status`. Local LLM Server, RedactGuard and Performance Lab are the three reference pilots. Remaining routes intentionally retain the legacy `ProjectPhase` journey until the pilot review gate is complete.
- **Project Design System**: Shared `ProjectHero`, `ProjectSection`, `ProjectProof`, `ProjectEvidenceNote`, `ProjectRelations` and `ProductSubHeader` primitives provide semantic structure, evidence boundaries and connected-system context without forcing identical page composition. Mobile project navigation preserves project identity/context instead of collapsing into anonymous phase tabs.
- **Evidence & Comparison**: Project pages must visibly distinguish implemented/proven capability from unsupported or pending claims. Decorative benchmark values remain prohibited. Performance Lab explicitly publishes the measurement method without numeric benchmark results until representative runs exist.
- **Accessible & Responsive**: WCAG 2.2 AA target, minimum 14px meaningful typography, >= 44x44px interactive touch targets, visible focus rings, one `<main id="main">` landmark per route, keyboard-addressable section navigation and reduced-motion fallbacks.
- **Lifecycle & Testing**: `npm run verify` remains the project-page validation gate. During the active migration, tests deliberately support a mixed state: migrated archetype pages use the new primitives and IA, while unmigrated routes are still required to satisfy the legacy phase contract until converted.

## Active Workstreams

- 🚧 **[Project page UX refactor](workstreams/project-page-ux-refactor.md)** - Replacing shared methodology-driven project IA with three visitor-centered archetypes. Shared foundation and the Local LLM Server / RedactGuard / Performance Lab pilots are implemented; next gate is comparative desktop/mobile/accessibility review before broad migration.

## Shipped Workstreams

- ✅ **[Landing success alignment](workstreams/landing-success-alignment.md)** - Reshaped homepage into an evidence-led applied-AI research landing page, established UX/brand contracts, unified token system, and added deterministic smoke testing.

## Canonical Product Sources

- `08 -Local AI Strategy, Positioning & Storytelling.md` - positioning and public-claim guardrails.
- `09 -Local AI Landing Page -Narrative, UX & Copy.md` - narrative chain and intended landing behavior.
- `docs/features/public-claims.md` - durable claims and evidence inventory.
- `docs/architecture.md` - route map and component model.
- `design/project-page-contract.md` - canonical project-page archetypes, evidence contract and migration rules.
- `design/ux-contract.json` & `design/brand-kit.json` - design and experience specifications.
