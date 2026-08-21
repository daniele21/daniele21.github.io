# Repository Architecture & Component Model

Status: active  
Updated: 2026-08-21  

## Overview

This repository generates the static website for Daniele Moltisanti (`daniele21.github.io`), focusing on applied AI systems research, local-first architectures, on-device intelligence, and evidence-based decision frameworks.

---

## Route & Page Map

| Route Path | Page File | Purpose & Role | Primary Content / Data Source |
|---|---|---|---|
| `/` | `src/pages/index.astro` | Production homepage and narrative roadmap (`Decide -> Build -> Test -> Measure -> Decide Again`). | `src/content/locales/en/landing.ts` |
| `/local-ai-strategy` | `src/pages/local-ai-strategy.astro` | Plane 01 deep dive: workload rationale and Local / Hybrid / Cloud decision outputs. | `src/content/locales/en/planDetails.ts` |
| `/local-ai-infrastructure` | `src/pages/local-ai-infrastructure.astro` | Plane 02 deep dive: reusable execution boundaries, active infrastructure tracks, and maturity constraints. | `src/content/locales/en/planDetails.ts` |
| `/local-ai-use-cases` | `src/pages/local-ai-use-cases.astro` | Plane 03 deep dive: applications as proving grounds for Plane 02 capabilities. | `src/content/locales/en/planDetails.ts` |
| `/local-ai-performance` | `src/pages/local-ai-performance.astro` | Plane 04 deep dive: workload-specific performance and boundary observability feeding the next decision. | `src/content/locales/en/planDetails.ts` |
| `/insights` | `src/pages/insights.astro` | Field notes, research thinking, articles, and methodology writings. | `src/content/locales/en/principles.ts` / `landing.ts` |
| `/about` | `src/pages/about.astro` | Verified track record, engineering background, and speaking engagements. | `src/content/locales/en/credibility.ts` / `landing.ts` |
| `/redact-guard` | `src/pages/redact-guard.astro` | Deep-dive for RedactGuard (sensitive document redaction with local LLMs). | `src/content/locales/en/redactGuard.ts` |
| `/aura-finance` | `src/pages/aura-finance.astro` | Deep-dive for Aura Finance (on-device transaction intelligence). | `src/content/locales/en/auraFinance.ts` |
| `/closedroom` | `src/pages/closedroom.astro` | Deep-dive for ClosedRoom (local meeting intelligence). | `src/content/locales/en/closedRoom.ts` |
| `/local-llm-server` | `src/pages/local-llm-server.astro` | Deep-dive for Local LLM Server (GGUF / MLX inference layer). | `src/content/locales/en/localLlmServer.ts` |
| `/android-local-llm-harness` | `src/pages/android-local-llm-harness.astro` | Deep-dive for Android on-device inference harness. | `src/content/locales/en/harness.ts` |
| `/local-asr-server` | `src/pages/local-asr-server.astro` | Deep-dive for Local ASR Server (private speech primitive). | `src/content/locales/en/pillars.ts` |
| `/traffic-monitoring` | `src/pages/traffic-monitoring.astro` | Deep-dive for macOS Traffic Monitoring evidence platform. | `src/content/locales/en/trafficMonitoring.ts` |
| `/traffic-monitoring-android` | `src/pages/traffic-monitoring-android.astro` | Deep-dive for Android Traffic Monitoring evidence platform. | `src/content/locales/en/trafficMonitoringAndroid.ts` |
| `/performance-lab` | `src/pages/performance-lab.astro` | Deep-dive for Performance Lab (model/device optimization). | `src/content/locales/en/evidence.ts` |

---

## Component Architecture

The landing page is composed of focused, accessible components located in `src/components/landing/`:

```
src/components/landing/
├── LandingHeader.astro       # Sticky header with brand hexagon cube & section/page links
├── LandingHero.astro         # Two-column hero (1/3 identity + 2/3 thesis & research question)
├── ContinuousJourneyPath.astro # Single guide/progress SVG spanning all four planes
├── MethodThread.astro        # Handoff copy and no-JavaScript local path fallback
├── StageRail.astro           # Plane anchor, active numbered node, and local path fallback
├── StageHandoff.astro        # Compact plane output and deep-dive action inside the narrative third
├── DecisionStage.astro       # Stage 01: three compact decision tools resolving to Local / Hybrid / Cloud
├── BuildStage.astro          # Stage 02: Local LLM Server, Android Harness, and Local ASR project cards
├── TestStage.astro           # Stage 03: minimal image-led strip of the three application test-beds
├── EvidenceStage.astro       # Stage 04: three evidence modules for performance, boundaries, and feedback
├── SelectedSystems.astro     # Reusable system-list component; no longer duplicated on the homepage
├── FieldNotes.astro          # Dated articles and research notes
├── AboutSignal.astro         # Verifiable track record summary
├── FinalCta.astro            # Loop closing (Decide Again) & collaboration inquiry
└── PlanDetail.astro          # Shared progressive-disclosure layout for all four plane pages
```

The homepage owns the causal summary and continuous visual path. Each plane follows a strict alternating `1/3 narrative + 2/3 visual` layout: odd planes explain on the left and even planes explain on the right. The narrative third contains only the question, a short explanation, the output, and the deep-dive action. The visual two-thirds contains three bounded modules: decision tools in Plane 01, infrastructure projects in Plane 02, product proving grounds in Plane 03, and evidence surfaces in Plane 04. At mobile widths these module groups become horizontal scroll-snap strips rather than vertically stacked card lists. `PlanDetail.astro` owns the consistent deep-dive structure; `planDetails.ts` owns rationale, method, active work, maturity language, and handoffs. Project routes remain the artifact/evidence layer linked from the relevant plane.

`ContinuousJourneyPath.astro` is the only active renderer for the journey line. It owns one SVG guide and one SVG progress path spanning Plane 01 through Plane 04; `StageRail.astro` and `MethodThread.astro` retain local line markup only as a no-JavaScript fallback and provide the anchors used to calculate the global geometry. `tokens.css` remains the single source for the 4px width, translucent guide, and illuminated blue glow.

`index.astro` measures the four plane anchors and three handoff regions and builds one desktop path with compact rounded elbows or one continuous mobile vertical. The global path uses the exact stage/thread boundaries as its joins; decorative rail overhangs are never reused as connection endpoints, so the geometry cannot reverse or traverse the same vertical range twice. The scroll playhead is the center of the actually visible viewport below the sticky header: when page or pinch zoom changes `visualViewport`, its offset and height replace the larger layout viewport for that calculation.

Scroll progress is mapped through physical checkpoints, not through a percentage of the total SVG length. Vertical planes map their document start/end directly to their path start/end. Each desktop handoff adds checkpoints for entry, start of the horizontal run, end of the horizontal run, and exit; the horizontal run owns the central 50% of the handoff's scroll band. Piecewise-linear interpolation preserves those exact joins even when zoom changes the horizontal path length. `src/scripts/journeyPathModel.mjs` owns this pure mapping and rejects checkpoints that move backward in scroll or path space, coincident joins with different lengths, and an incomplete final path. The runtime exposes the real SVG head position, its viewport delta, the active segment and an `aligned`/`misaligned` invariant through path data attributes so dynamic QA validates the rendered endpoint rather than inferring correctness from dash monotonicity. If a geometry invariant ever fails in production, the controller disables the global animation and reveals the complete local fallback path and all content rather than leaving an empty or partially hidden journey.

The active state remains one normalized `pathLength="1"` dash (`1 1`, offset `1 -> 0`). Resize, `visualViewport`, DPR and the 760px layout breakpoint feed one scheduled geometry commit; measurement and rendering happen atomically, so a zoom event never resets the active dash to an empty state. The 4px stroke continues to come only from the design token and `vector-effect: non-scaling-stroke`; there is no JavaScript zoom compensation. The controller is re-entrant: page swaps or live DOM replacement dispose listeners, timers and observers before the new path is measured. When a visible journey is reinitialized, its subtree is replaced before ownership transfers, so even unremovable listeners from a legacy development session can only mutate detached nodes. The global line layer is not clipped by individual plane or handoff containers, and the permanent guide uses the shared 24% contrast token so the route remains legible ahead of the illuminated head. With `prefers-reduced-motion: reduce`, the complete path and all content are revealed statically.

---

## Design System & Tokens

- **Global Tokens**: `src/styles/tokens.css` defines CSS custom properties for colors, typography, spacing, shadows, and transitions.
- **Global Reset & Base Layout**: `src/styles/reset.css` and `src/styles/layout.css`.
- **Accessibility Guarantee**:
  - Minimum text size: `14px` (0.875rem), body text `16–18px`.
  - Minimum touch target: `44 x 44px`.
  - Contrast: WCAG 2.2 AA compliant.
  - Reduced Motion: `@media (prefers-reduced-motion: reduce)` delivers static, fully revealed content instantly.
