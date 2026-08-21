# Local LLM Server Landing Integration Plan

## 1. Document status

- **Status:** Proposed
- **Scope:** Daniele Moltisanti personal landing and project deep-dive pages
- **Project:** [Local LLM Server](https://github.com/daniele21/local-llm-server)
- **Target route:** `/local-llm-server`
- **Primary audience:** technical leaders, applied-AI teams, developers and potential collaborators
- **Source of truth for implementation:** the current `local-llm-server` repository, not presentation assets or historical screenshots

## 2. Recommendation

Create a dedicated Local LLM Server deep-dive page with the same strategic weight as the Android Local LLM Harness page.

Local LLM Server must remain one of the three infrastructure pillars on the homepage. It must not be repositioned as a reference application. The page should distinguish two related but different product layers:

1. **Local LLM Server** is the reusable runtime and application-facing infrastructure.
2. **Local LLM Studio** is the bundled console that makes the runtime inspectable, configurable and easier to integrate.

The homepage explains the ecosystem. The new page proves that the desktop reasoning pillar exists as a product-grade engineering effort rather than a model demo or application-specific wrapper.

## 3. Strategic alignment

The integration must reinforce the landing's existing mission:

> Build and test reusable local-AI foundations that give products more control over model lifecycle, data, runtime and cost across desktop and mobile.

Local LLM Server contributes to that mission by providing:

- a stable application-facing API;
- explicit model identity and routing;
- reusable model and runtime lifecycle management;
- multiple replaceable inference backends;
- runtime health, logs and diagnostics;
- a local execution path for privacy-sensitive desktop products;
- separation between product workflows and inference-engine details.

The page must support the broader local-first position without presenting local inference as universally preferable to cloud models. Cloud models remain a valid execution choice when their capabilities justify the trade-off.

## 4. Current landing state

Local LLM Server is already present in:

- the homepage ecosystem map;
- the infrastructure pillar grid;
- the strategic and content documentation;
- the ClosedRoom architecture and trust-boundary story.

However, the current integration is incomplete:

- the Local LLM Server pillar has no internal deep-dive route;
- the Infrastructure navigation dropdown links only to Android Local LLM Harness;
- the homepage explains the role at a high level but cannot show product or architecture evidence;
- Local LLM Studio screenshots and runtime flows are not visible on the landing;
- the relationship with ClosedRoom is described but not supported by a dedicated infrastructure page;
- project-specific SEO and social metadata are not available.

## 5. Objectives

The new page must make visitors understand that:

1. local model execution is only the data plane;
2. applications need a stable boundary around model files, engines and processes;
3. Local LLM Server provides that reusable boundary;
4. the same public API can route to different local backends and resident models;
5. lifecycle, concurrency, failure handling and observability are part of the product;
6. Local LLM Studio is operational evidence, not the entire project;
7. the current project is useful and actively developed, but not presented as production-ready infrastructure.

## 6. Non-goals

The first integration will not:

- turn the landing into product documentation;
- reproduce the Local LLM Server README in full;
- expose every CLI flag or API field;
- provide an interactive server demo hosted on GitHub Pages;
- present future roadmap capabilities as integrated features;
- claim authentication or safe untrusted-network operation;
- claim universal hardware compatibility;
- present Local LLM Studio as a general-purpose consumer chat application;
- reuse old presentation slides as primary page sections.

## 7. Experience thesis

### 7.1 Visual thesis

A precise, inspectable runtime layer shown through one dominant real product surface, restrained technical flows and progressively disclosed architecture.

The page should reuse the landing's typography, spacing, light/dark themes, project sub-navigation and screenshot treatment. Local LLM Server should use the infrastructure palette, with blue as the primary signal and teal or violet only for backend or lifecycle differentiation.

### 7.2 Content thesis

> Running a model locally is easy. Turning it into a stable execution layer for real products is the engineering problem.

Each section must perform one job:

- establish the promise;
- explain the gap;
- show the runtime boundary;
- prove the working surfaces;
- expose technical depth;
- clarify maturity;
- invite exploration.

### 7.3 Interaction thesis

Use a small number of purposeful interactions:

1. coordinated hero copy and product-image entrance;
2. progressive request-flow or lifecycle reveal;
3. zoomable product and architecture images;
4. native disclosure for detailed architecture and backend information;
5. sticky project sub-navigation with scroll-spy.

All motion must respect `prefers-reduced-motion` and the page must remain understandable without JavaScript.

## 8. Proposed page narrative

### 8.1 Project sub-header

Recommended configuration:

- **Title:** `Local LLM Server`
- **Badge:** `Active development`
- **Navigation:** Overview, Why, Runtime, Studio, Backends, Architecture, API, Status
- **CTA:** `GitHub ↗`

The maturity badge should not use `Production-ready` until release, CI, platform and representative-hardware evidence support that claim.

### 8.2 Hero

**Responsibility:** communicate the product boundary in the first viewport.

Proposed content:

- **Eyebrow:** `Desktop local AI infrastructure`
- **Headline line 1:** `Run local models.`
- **Headline line 2:** `Ship reliable products.`
- **Lede:** `Local LLM Server exposes GGUF and MLX runtimes through an OpenAI-compatible API, with explicit model lifecycle, routing, concurrency and diagnostics.`
- **Primary CTA:** `See the runtime flow`
- **Secondary CTA:** `Explore GitHub ↗`
- **Key ideas:** `OpenAI-compatible`, `Multi-model runtime`, `GGUF + MLX`

The dominant visual should be a current Local LLM Studio Chat Studio screenshot showing a real structured-output task. It should not be a generic architecture card or a dark presentation slide.

### 8.3 Mission band

**Responsibility:** connect the project to the landing's broader mission.

Proposed statement:

> Make local inference reusable, observable and app-ready.

Supporting explanation:

> Product code should depend on a stable local AI boundary, not on model paths, backend processes or engine-specific lifecycle logic.

Principles:

- **Explicit:** model identity, configuration and routing are intentional.
- **Observable:** health, state, timings and logs remain inspectable.
- **Reusable:** multiple applications can depend on the same application-facing contract.

### 8.4 The infrastructure gap

**Responsibility:** explain why a local model alone is insufficient.

Recommended problem dimensions:

1. **Backend coupling** - application code inherits engine and model-format details.
2. **Lifecycle ownership** - models must be resolved, validated, loaded, drained and unloaded safely.
3. **Runtime coordination** - multiple resident models require explicit routing, admission and concurrency limits.
4. **Opaque operation** - teams need health, logs, timings and failure evidence beyond console output.

The section should use a numbered editorial sequence rather than a generic feature-card grid.

### 8.5 Stable runtime boundary

**Responsibility:** present the core solution before exposing implementation details.

Accessible simplified flow:

```text
Desktop application
        ↓
OpenAI-compatible request
        ↓
Model key or model ID
        ↓
Resident runtime lease
        ↓
Backend engine
        ↓
Response or SSE stream
```

Key takeaway:

> Applications integrate once. Models and backends can evolve behind the boundary.

### 8.6 Runtime lifecycle

**Responsibility:** demonstrate the infrastructure work surrounding inference.

Show this lifecycle as a horizontal process on desktop and vertical process on mobile:

```text
Registry
  → artifact resolution
  → completeness validation
  → engine load
  → resident runtime
  → explicit default route
  → request drain
  → unload
```

Clarify that:

- downloaded does not mean resident;
- resident does not mean default;
- changing the default route does not unload other models;
- active leases prevent unsafe unload or shutdown;
- admission limits apply independently to each runtime.

### 8.7 Local LLM Studio product proof

**Responsibility:** show the runtime through real working surfaces.

Use an editorial screenshot sequence rather than four equal cards:

1. **Chat Studio** - run prompts, stream responses, control supported inference parameters and inspect structured output.
2. **Models and configuration** - inspect configured models, load or switch runtimes and apply backend-supported parameters.
3. **Server diagnostics** - follow loading, prompt evaluation, generation and runtime logs when the administrative surface is enabled.
4. **Integration examples and Swagger** - move from inspection to application code with copy-ready examples and the live API contract.

Each screenshot must include:

- a short outcome-oriented heading;
- one-sentence explanation;
- accurate alt text;
- zoom support;
- optimized responsive formats.

### 8.8 Backend portability

**Responsibility:** prove that the stable contract is not tied to one engine.

Recommended matrix:

| Backend | Format | Execution | Current role |
|---|---|---|---|
| `llama_cpp` | GGUF | In process | Text generation and structured reasoning |
| `mlx` | MLX | In process | Apple Silicon text inference |
| `llama_server` | GGUF + optional projector | Managed process | Multimodal and audio-capable GGUF models |
| `mlx_vlm_server` | MLX VLM package | Managed process | Apple Silicon vision-language inference |

The matrix must be generated from structured content and verified against the repository before each release.

### 8.9 Architecture

**Responsibility:** provide technical depth after the product idea is understood.

First layer:

```text
Clients
  → FastAPI public boundary
  → ModelRuntimeManager
  → runtime lease and admission
  → engine adapter
  → local model or managed backend process
```

Second layer, inside a disclosure:

- configuration precedence;
- built-in and user registry merge;
- LM Studio and Hugging Face artifact discovery;
- in-process versus managed-process engines;
- process log draining and bounded shutdown;
- public versus administrative routes;
- response streaming and cancellation cleanup.

The detailed architecture should use accessible HTML/SVG. A textual equivalent must remain available to screen readers.

### 8.10 Developer boundary

**Responsibility:** show that integration remains intentionally small.

Use one concise OpenAI Python SDK example:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:1235/v1",
    api_key="local",
)

response = client.chat.completions.create(
    model="nemotron-nano-4b-q8",
    messages=[
        {"role": "user", "content": "Extract the decisions and action items."}
    ],
)
```

The landing should not reproduce all languages and workflows. The CTA should send developers to the repository for complete examples.

### 8.11 Trust boundary and maturity

**Responsibility:** communicate operational limits as evidence of engineering judgment.

#### Available today

- loopback binding by default;
- CORS disabled by default;
- administrative API excluded unless explicitly enabled;
- multiple resident model routing;
- streaming and non-streaming chat completions;
- model and artifact validation;
- safe runtime lease, drain and unload behavior;
- local Web UI, examples and API documentation;
- Python client and programmatic server lifecycle.

#### Important limits

- no built-in authentication for deliberately shared network deployments;
- macOS and Linux focus;
- MLX backends require Apple Silicon;
- representative-hardware validation is still required for model/backend combinations;
- desktop background lifecycle, discovery and expanded benchmarks remain priorities;
- the project should be described as active development, not production-ready.

Avoid the unqualified phrase `fully private`. The complete application data path, bind configuration, selected backend and any optional remote providers determine the actual privacy boundary.

### 8.12 Ecosystem role

**Responsibility:** return from the project detail to the landing's strategic model.

Use the current relationship:

```text
ClosedRoom
  → meeting transcript
  → Local LLM Server
  → structured summary, decisions and actions
```

The copy must say that ClosedRoom validates the server against a real private-product workflow. It must not imply that every reference application already depends on Local LLM Server.

### 8.13 Final CTA

Proposed copy:

- **Kicker:** `Local LLM Server`
- **Headline:** `Give your product a local execution path.`
- **Body:** `Explore the runtime, run it against your hardware and use the OpenAI-compatible boundary from an existing application.`
- **Primary CTA:** `Explore Local LLM Server on GitHub ↗`
- **Secondary CTA:** `View the local-first ecosystem`

## 9. Homepage integration

### 9.1 Infrastructure pillar

Update the Local LLM Server pillar with:

```ts
pageUrl: '/local-llm-server'
```

The card title and deep-dive CTA should route internally. The repository link remains a separate external action.

### 9.2 Primary navigation

Add Local LLM Server as the first item in the Infrastructure dropdown:

1. Local LLM Server
2. Android Local LLM Harness

Local ASR Server should be added when it has a dedicated page or another intentional destination.

### 9.3 Ecosystem map

Make the Local LLM Server node discoverable as a link without turning the complete infrastructure layer into a single click target.

Requirements:

- visible keyboard focus;
- accessible name;
- no dependence on hover;
- unchanged textual fallback;
- no SVG overflow on narrow viewports.

### 9.4 ClosedRoom cross-link

Add one contextual link from the ClosedRoom architecture or trust-boundary section to Local LLM Server.

Recommended label:

`Explore the local reasoning layer →`

Do not introduce repeated cross-promotional CTAs throughout the ClosedRoom page.

## 10. Content and code structure

### 10.1 New files

```text
src/pages/local-llm-server.astro

src/content/localLlmServer.ts
src/content/locales/en/localLlmServer.ts

src/components/localllm/
  LocalLlmHero.astro
  LocalLlmMission.astro
  LocalLlmProblems.astro
  LocalLlmRuntimeFlow.astro
  LocalLlmSurfaces.astro
  LocalLlmBackends.astro
  LocalLlmArchitecture.astro
  LocalLlmCodePreview.astro
  LocalLlmMaturity.astro
  LocalLlmCta.astro

public/images/local-llm-server/
  logo.svg
  chat-studio.webp
  models-config.webp
  server-logs.webp
  integration-example.webp
  architecture.svg
```

### 10.2 Existing files to update

```text
src/content/index.ts
src/content/locales/en/pillars.ts
src/content/locales/en/site.ts
src/components/hero/EcosystemMap.astro
src/components/closedroom/ClosedRoomArchitecture.astro
src/layouts/BaseLayout.astro
```

The exact ClosedRoom component may change if the cross-link fits a different narrative section more naturally.

### 10.3 Content model

Create a typed `LocalLlmServerData` structure covering:

- metadata;
- hero;
- mission;
- problems;
- runtime flow;
- product surfaces;
- backends;
- architecture;
- code example;
- trust boundary;
- maturity;
- ecosystem relationship;
- final CTA.

Current and planned capabilities must use separate fields.

### 10.4 Shared project header

Before adding another copied project header, extract a reusable `ProjectHeader.astro` or extend `SiteHeader.astro` with explicit project-page props:

- portfolio link;
- repository URL;
- repository CTA label;
- shared navigation dropdowns;
- theme toggle;
- mobile navigation.

Existing project headers may be migrated only after visual and interaction regression checks. If that migration is deferred, the new page must still avoid introducing inconsistent behavior.

### 10.5 Main landmark

`BaseLayout.astro` already renders the primary `<main>` element. The Local LLM Server page must not add a nested `<main>`. Use sections or a neutral wrapper with `id="top"`.

### 10.6 Project metadata

Extend `BaseLayout.astro` to accept page-specific:

- title;
- description;
- canonical path;
- Open Graph title;
- Open Graph description;
- Open Graph image.

Recommended metadata:

- **Title:** `Local LLM Server, Product-grade local AI infrastructure`
- **Description:** `An OpenAI-compatible local inference layer with explicit model lifecycle, multi-model routing, GGUF and MLX backends, and live operational visibility.`
- **Canonical:** `/local-llm-server`

## 11. Asset plan

### 11.1 Reuse

- prefer the source SVG logo over the raster logo;
- use current Local LLM Studio surfaces as product evidence;
- reuse the existing image zoom interaction;
- reuse the landing's shared design tokens and theme behavior.

### 11.2 Recapture

Capture new screenshots from the current codebase in English:

1. Chat Studio with a structured product task;
2. Models and configuration with no private filesystem path visible;
3. Server Logs with the supported administrative surface only;
4. Integration examples or current Swagger contract.

The repository's current screenshots must not be copied blindly. Some historical assets show terminal UI or API behavior that the current test suite explicitly excludes. Every visible feature in the landing must be verified against the current routes and runtime behavior.

### 11.3 New assets

Create one responsive architecture diagram matching the landing's design system. It should replace dense presentation slides rather than restyle them.

The diagram must:

- use selectable text where practical;
- provide a textual equivalent;
- support light and dark contexts;
- remain legible at 360 px;
- avoid embedding unsupported capability claims;
- export at sufficient resolution for zoom without excessive file size.

### 11.4 Optimization

- generate responsive WebP or AVIF variants;
- preserve a high-resolution zoom source where useful;
- specify image dimensions to prevent layout shift;
- keep meaningful alt text in structured content;
- lazy-load below-the-fold screenshots;
- avoid auto-playing the existing demo video in the first release.

## 12. Implementation work packages

### WP1 - Accuracy baseline

Deliverables:

- verified current feature inventory;
- verified route and backend matrix;
- current versus planned capability split;
- approved maturity label;
- screenshot capture checklist.

Completion condition:

- every public claim maps to current repository evidence or is explicitly labelled as future work.

### WP2 - Content specification

Deliverables:

- final English copy;
- typed content object;
- metadata copy;
- alt text;
- CTA labels;
- architecture labels and textual fallback.

Completion condition:

- the page can be understood by scanning headings only;
- Local LLM Server and Local LLM Studio are never conflated.

### WP3 - Asset refresh

Deliverables:

- current logo asset;
- four verified product screenshots;
- one architecture diagram;
- responsive image variants.

Completion condition:

- no stale route, model, local path or unsupported capability is visible.

### WP4 - Shared page foundation

Deliverables:

- reusable project header decision;
- page-specific metadata support;
- Local LLM Server route shell;
- typed data wiring;
- sub-header navigation.

Completion condition:

- the page has valid document landmarks, working navigation and correct canonical metadata.

### WP5 - Narrative implementation

Deliverables:

- hero and mission;
- infrastructure gap;
- stable runtime boundary;
- lifecycle flow;
- product-proof sequence;
- backend matrix;
- architecture disclosure;
- developer example;
- maturity and final CTA.

Completion condition:

- the page communicates product value before implementation detail;
- each section has one primary takeaway.

### WP6 - Homepage and ecosystem integration

Deliverables:

- internal pillar CTA;
- Infrastructure dropdown item;
- ecosystem-map link;
- ClosedRoom contextual cross-link.

Completion condition:

- visitors can reach the new page from every intentional ecosystem entry point without duplicate or competing CTAs.

### WP7 - Verification and release

Deliverables:

- production build;
- responsive screenshots;
- accessibility review;
- link validation;
- metadata preview;
- final claim review;
- rollback-ready deployment.

Completion condition:

- all acceptance criteria in this document pass.

## 13. Acceptance criteria

### 13.1 Strategy

- [ ] Local LLM Server remains an infrastructure pillar.
- [ ] The page explains how it advances the landing's local-first mission.
- [ ] Local LLM Studio is presented as the operational console, not the complete project.
- [ ] ClosedRoom is shown as a proving ground, not the only possible consumer.
- [ ] The page does not position local inference as universally superior to cloud models.

### 13.2 Content accuracy

- [ ] Every backend and endpoint claim is verified against the current repository.
- [ ] Current and planned capabilities are visibly separated.
- [ ] Administrative routes are described as opt-in.
- [ ] Network exposure and lack of built-in authentication are stated accurately.
- [ ] No terminal endpoint, embeddings or function-calling capability is shown unless implemented and verified at release time.
- [ ] The status remains `Active development` until stronger evidence supports another label.
- [ ] Privacy language describes the full trust boundary and avoids guarantees.

### 13.3 User experience

- [ ] The hero communicates the product boundary within approximately five seconds.
- [ ] One dominant screenshot anchors the first viewport.
- [ ] Every section has one primary message.
- [ ] Product evidence appears before the most detailed architecture.
- [ ] Advanced technical information uses progressive disclosure.
- [ ] Primary and secondary actions have distinct hierarchy.

### 13.4 Responsive behavior

- [ ] The page works at 360, 768, 1024 and 1440 px widths.
- [ ] Runtime and lifecycle diagrams reflow vertically on narrow screens.
- [ ] The project sub-navigation remains usable without page overflow.
- [ ] Code blocks scroll internally without breaking the viewport.
- [ ] Screenshots remain legible and zoomable on touch devices.

### 13.5 Accessibility

- [ ] The page contains one primary `<main>` landmark.
- [ ] All headings follow a valid hierarchy.
- [ ] All interactive controls have accessible names and visible focus states.
- [ ] Diagrams have textual equivalents.
- [ ] Images have meaningful alt text and explicit dimensions.
- [ ] Color is not the only status or backend differentiator.
- [ ] Reduced-motion preferences are respected.
- [ ] Keyboard navigation covers the header, sub-header, disclosures, image zoom and CTAs.

### 13.6 Performance and privacy

- [ ] The page remains statically rendered.
- [ ] No project demo requires third-party runtime JavaScript.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Images use optimized formats and responsive sizes.
- [ ] No auto-playing media is added.
- [ ] No analytics or external tracking is introduced by this integration.

### 13.7 Technical quality

- [ ] `npm run build` passes.
- [ ] Internal links work with the configured Astro base path.
- [ ] External links use the correct target and `rel` behavior.
- [ ] The new page has correct canonical and social metadata.
- [ ] No existing project deep-dive page regresses visually or functionally.
- [ ] The implementation does not overwrite or discard the in-progress content/i18n worktree changes.

## 14. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Historical assets show removed or unsupported behavior | Loss of credibility | Recapture from the current runtime and verify every visible route |
| Server and Studio are presented as the same product layer | Strategic confusion | Define both terms in the hero and repeat the distinction in product proof |
| Page becomes a README clone | Weak product story | Keep operational detail behind progressive disclosure and link to GitHub |
| Dense technical diagrams dominate the narrative | Reduced comprehension | Start with a six-step flow and reveal full architecture later |
| Production-readiness is implied by project breadth | Misleading maturity | Use an explicit current/next section and `Active development` status |
| Network privacy is overstated | Security and trust risk | State loopback defaults, admin opt-in and lack of authentication |
| New header duplicates existing project headers | Maintenance cost | Extract or parameterize a shared project header before adding another copy |
| New integration conflicts with active i18n refactor | Lost user work | Rebase work on the current working tree and patch localized source files carefully |
| Screenshot-heavy page harms performance | Slow mobile experience | Responsive formats, fixed dimensions, lazy loading and a limited image set |

## 15. Release sequence

### Phase A - Content and evidence

- approve narrative and copy;
- verify current project behavior;
- recapture screenshots;
- approve architecture diagram;
- confirm maturity and trust-boundary language.

### Phase B - Isolated page preview

- implement `/local-llm-server` without homepage links;
- validate content, layout, dark mode and mobile behavior;
- review against repository evidence.

### Phase C - Ecosystem activation

- add homepage pillar link;
- add navigation entry;
- link the ecosystem map;
- add the ClosedRoom cross-link;
- validate all entry and return paths.

### Phase D - Production release

- run the full build and quality gates;
- deploy through the existing GitHub Pages workflow;
- verify the production canonical URL, assets and base-path routing;
- keep the previous deployment artifact available for rollback.

## 16. Documentation maintenance

When the page is implemented, update the affected documentation surfaces:

- `02-information-architecture.md` - add the Local LLM Server deep-dive page and entry points;
- `03-content-specification.md` - replace proposed copy with the approved page copy;
- `04-ux-ui-design-system.md` - document the desktop infrastructure screenshot pattern if it becomes reusable;
- `05-technical-implementation-plan.md` - record the shared project header and per-page metadata model;
- `06-seo-analytics-accessibility.md` - add the project-page metadata and diagram requirements;
- `07-acceptance-criteria-and-roadmap.md` - mark the dedicated pillar page milestone and quality evidence;
- root `README.md` - update the implemented route and current verification commands.

A separate architectural decision record is recommended only if the implementation introduces a shared project-page framework used to migrate the existing deep-dive pages. A simple component addition does not require an ADR.

## 17. Definition of done

The integration is complete when:

1. `/local-llm-server` tells a coherent problem-to-proof story;
2. the runtime layer and Studio console are clearly distinguished;
3. all claims reflect the current repository;
4. current limits and future priorities are visible;
5. the page is reachable from the pillar card, navigation and ecosystem map;
6. ClosedRoom connects back to the infrastructure without overstating adoption;
7. metadata, accessibility, responsive behavior and performance checks pass;
8. the production build deploys without regressions to the existing landing or project pages.
