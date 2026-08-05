# Personal Landing Page — Product Documentation

This directory defines a complete greenfield redesign of Daniele Moltisanti's personal landing page.

## Greenfield mandate

The implementation must **not** preserve, adapt, restyle, or use the current landing page as a structural reference. Existing HTML, CSS, layout, sections, navigation, copy, visual hierarchy, and calls to action are considered legacy and outside the design brief.

The existing repository is used only as the future deployment location. The new landing must be designed from the strategy documented here.

## Strategic premise

Daniele is not presenting a collection of unrelated side projects. He is building reusable local-AI infrastructure that can enable a new generation of privacy-first applications across desktop and mobile.

The ecosystem has three infrastructure pillars:

1. **Local LLM Server** — local reasoning and generation for desktop applications.
2. **Local ASR Server** — local audio capture and speech-to-text.
3. **Android Local LLM Harness** — reusable on-device inference infrastructure for native and Capacitor Android applications.

Two reference applications validate those pillars against real product constraints:

- **ClosedRoom** validates the desktop stack through private meeting recording, transcription, and analysis.
- **Aura Finance** validates the privacy-first product philosophy in personal finance and provides a future reference use case for on-device Android AI.

ClosedRoom and Aura Finance are not the final boundaries of the ecosystem. They are proving grounds. The long-term direction is to make the infrastructure, patterns, and evidence reusable across many privacy-first products.

## Landing objective

The landing must make a visitor understand, in this order:

1. the future Daniele is working toward;
2. the current problem preventing that future;
3. the reusable infrastructure he is building;
4. how real applications validate the infrastructure;
5. what this work may enable next;
6. how the visitor can explore, follow, test, contribute, or collaborate.

The page is a strategic positioning asset, not a chronological résumé and not a generic project gallery.

## Documentation map

| Document | Purpose |
|---|---|
| [`01-strategy-and-positioning.md`](01-strategy-and-positioning.md) | Mission, vision, positioning, audiences, narrative and success model. |
| [`02-information-architecture.md`](02-information-architecture.md) | Page structure, hierarchy, user journeys and section responsibilities. |
| [`03-content-specification.md`](03-content-specification.md) | Recommended English copy and content requirements for every section. |
| [`04-ux-ui-design-system.md`](04-ux-ui-design-system.md) | Visual direction, interaction rules, responsive behavior and components. |
| [`05-technical-implementation-plan.md`](05-technical-implementation-plan.md) | Recommended stack, architecture, data model and delivery phases. |
| [`06-seo-analytics-accessibility.md`](06-seo-analytics-accessibility.md) | Search, measurement, performance, privacy and accessibility requirements. |
| [`07-acceptance-criteria-and-roadmap.md`](07-acceptance-criteria-and-roadmap.md) | Definition of done, quality gates, phased delivery and future evolution. |

## Product principles

The landing must embody the same principles as the work it presents:

- **Privacy by architecture:** avoid unnecessary tracking and third-party dependencies.
- **Evidence over claims:** use working repositories, demos, benchmarks and documented constraints.
- **Clarity over breadth:** explain one coherent direction rather than every activity Daniele has ever completed.
- **Infrastructure connected to products:** show what each pillar enables, not only how it is built.
- **Honest maturity:** distinguish implemented, experimental, planned and conceptual capabilities.
- **Reusable narrative:** every major section should be linkable and reusable from LinkedIn, GitHub and stAI tuned.
- **Fast by default:** the experience should be lightweight, responsive and usable without heavy animation.

## Initial language decision

The recommended first release is **English-first**, because the intended positioning is international and the technical projects use English documentation. Italian localization can be added after the English information architecture and copy are validated.

The first implementation should keep content separate from components so localization does not require redesigning the page.

## Primary conversion events

The page should not optimize primarily for raw traffic or GitHub stars. Its meaningful outcomes are:

- a visitor understands Daniele's local-first AI thesis;
- a developer opens an infrastructure repository or testing guide;
- a potential collaborator starts a relevant conversation;
- a hiring manager understands the combination of architecture, product and communication skills;
- a potential user discovers ClosedRoom or Aura Finance;
- a reader follows the build journey through GitHub, LinkedIn or stAI tuned.

## Out of scope for the first implementation

- reproducing the current website;
- importing legacy sections without strategic justification;
- a full CV timeline;
- a long speaking catalogue;
- generic testimonials unrelated to the new positioning;
- a blog CMS;
- authentication or user accounts;
- presenting future capabilities as already available;
- claiming the infrastructure is production-ready without published evidence;
- making ClosedRoom or Aura Finance appear to be the entire ecosystem.
