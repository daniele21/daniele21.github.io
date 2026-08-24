# Current State

Status: active  
Updated: 2026-08-21  
Read when: selecting repository-wide work or continuing an active implementation workstream.

## Product state

- **Production Landing**: The primary entry point (`src/pages/index.astro`) implements the canonical `Decide -> Build -> Test -> Measure -> Decide Again` causal flow. One global 4px SVG path links four compact `1/3 narrative + 2/3 visual` planes; odd and even planes reverse the column order. Desktop handoffs use compact rounded elbows and a true horizontal run, while mobile resolves to one vertical path. A single cumulative `stroke-dashoffset` advances against the center of the actually visible viewport below the sticky header, using `visualViewport` under page or pinch zoom. Progress follows physical stage/thread checkpoints rather than a percentage of total SVG length, so a wider horizontal run cannot move the illuminated head away from the visible scanline. Each next plane stays fully hidden until that same rendered head reaches its node, then reveals copy and visual in sequence.
- **Plane Visuals**: Every plane presents three compact visual modules in the two-thirds column. Strategy uses a decision framework, boundary comparison, and trade-off guide. Infrastructure presents Local LLM Server, Android Local LLM Harness, and Local ASR Server as project cards. Use Cases shows three image-led product cards. Performance links Performance Lab, Traffic Monitoring, and the architecture feedback loop without decorative metrics. All four groups become horizontal scroll-snap strips on mobile.
- **Plane Deep Dives**: `/local-ai-strategy`, `/local-ai-infrastructure`, `/local-ai-use-cases`, and `/local-ai-performance` progressively disclose rationale, method, active work, constraints, artifacts, and the next handoff without overloading the homepage.
- **Identity & Mission**: Clear 1/3 identity + 2/3 mission hero framing Daniele's applied-AI systems research, the `Local AI first != Local AI only` thesis, and the empirical motto: *"Find the boundary with evidence, not ideology."*
- **Evidence & Comparison**: Balanced Local vs Hybrid vs Cloud framing without anti-cloud bias. The detailed comparison moved to the Strategy deep dive; the landing keeps only the decision outcome. Plane 04 names the performance dimensions and measurement systems; numeric results remain omitted until a complete public execution record exists.
- **Accessible & Responsive**: WCAG 2.2 AA compliant, minimum 14px typography, >= 44x44px interactive touch targets, visible focus rings, single `<main id="main">` landmark per route, and a static fully revealed path/content fallback under `@media (prefers-reduced-motion: reduce)`.
- **Routes & Navigation**: Landing handoffs resolve to the four plane pages; those pages retain `01/04` orientation and link onward to existing project/evidence routes.
- **Lifecycle & Testing**: The journey controller disposes its scroll, resize, `visualViewport`, breakpoint, timer, media-query, and observer hooks before page swaps or live reinitialization, isolates replacement markup from any legacy listener, then remeasures node thresholds from the final cumulative SVG geometry. Resize and zoom changes commit measurement and rendering atomically instead of temporarily resetting the active path. Exact stage/thread joins eliminate vertical backtracking; desktop handoffs reserve explicit scroll bands for entry, horizontal traversal, and exit. The pure `journeyPathModel.mjs` mapping rejects non-monotonic or inconsistent checkpoints, while runtime data records the rendered head position and alignment invariant. A failed geometry invariant switches to the fully visible static local path and content instead of failing blank. Progress uses a normalized `pathLength="1"` dash, the stroke remains the shared 4px token without JavaScript zoom compensation, and the permanent guide retains a 24% blue contrast floor. `npm run test` now runs dedicated checkpoint, zoom-width, boundary and forward/reverse regression cases before the static smoke suite. The declared `npm run check` command still requires `@astrojs/check` and TypeScript to become a non-interactive gate.

## Shipped Workstreams

- ✅ **[Landing success alignment](workstreams/landing-success-alignment.md)** -Reshaped homepage into an evidence-led applied-AI research landing page, established UX/brand contracts, unified token system, and added deterministic smoke testing.

## Canonical Product Sources

- `08 -Local AI Strategy, Positioning & Storytelling.md` -positioning and public-claim guardrails.
- `09 -Local AI Landing Page -Narrative, UX & Copy.md` -narrative chain and intended landing behavior.
- `docs/features/public-claims.md` -durable claims and evidence inventory.
- `docs/architecture.md` -route map and component model.
- `design/ux-contract.json` & `design/brand-kit.json` -design and experience specifications.
