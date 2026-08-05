# 02 — Information Architecture

## 1. Page model

The first release should be a focused, single-page experience with stable anchor links. Each section must have one clear narrative responsibility and one primary user action.

Recommended navigation:

- Vision
- Infrastructure
- Applications
- Principles
- Journey
- About
- Collaborate

The navigation should not reproduce the current website navigation. It should be rebuilt around the new positioning.

## 2. Information hierarchy

The page hierarchy is:

1. Hero
2. Strategic problem
3. Mission and operating thesis
4. Three infrastructure pillars
5. How the pillars work together
6. Reference applications
7. What the stack can enable
8. Product and engineering principles
9. Evidence and building in public
10. About Daniele
11. Collaboration
12. Footer

This order is mandatory for the first design exploration because it moves from purpose to proof. A résumé-first or project-grid-first sequence would weaken the strategic narrative.

## 3. Section specifications

### 3.1 Global header

#### Responsibility

Provide identity, orientation and access to the main conversion without competing with the hero.

#### Required content

- text-based or minimal wordmark: `Daniele Moltisanti`;
- desktop navigation anchors;
- compact mobile navigation;
- a single highlighted CTA: `Collaborate`;
- optional external GitHub icon link.

#### Behavior

- transparent or visually quiet at page load;
- gains a subtle surface and border after scrolling;
- current section may be indicated, but this is optional for the first release;
- keyboard accessible;
- mobile menu must trap focus and close with Escape;
- reduced-motion preferences must be respected.

#### Exclusions

- role-heavy title in the navigation;
- multiple brightly colored CTA buttons;
- social icon clusters dominating the header;
- a theme switch unless both themes are intentionally designed and tested.

### 3.2 Hero

#### Responsibility

Communicate the positioning within five seconds.

#### Required message layers

1. category/eyebrow: `Local-first AI infrastructure`;
2. primary statement: what Daniele is building;
3. supporting sentence: desktop, mobile and real applications;
4. primary CTA to infrastructure;
5. secondary CTA to build journey;
6. compact visual model of pillars leading to applications.

#### Visitor takeaway

> Daniele builds reusable local-AI infrastructure to enable privacy-first products.

#### Visual recommendation

Do not use a generic portrait as the only hero visual. The main visual should communicate the system: three infrastructure nodes or layers feeding product applications. A portrait can appear later in About.

### 3.3 Strategic problem

#### Responsibility

Explain why the work is necessary.

#### Core contrast

`Running a model locally` versus `shipping a reliable local-AI product`.

#### Required problem dimensions

- model/runtime fragmentation;
- hardware and memory constraints;
- model distribution and integrity;
- lifecycle and cancellation;
- audio capture and transcription complexity;
- observability and diagnostics;
- application integration;
- privacy and data ownership;
- packaging and user experience.

#### Interaction

A two-column or progressive comparison may be used:

| Local model demo | Product-grade local AI |
|---|---|
| One machine and one model | Multiple devices and explicit compatibility |
| Manual launch | Reusable runtime lifecycle |
| Console output | Structured telemetry and diagnostics |
| Happy-path prompt | Cancellation, failure and recovery |
| Technical prototype | Installable product experience |

Avoid an overly long wall of text.

### 3.4 Mission and operating thesis

#### Responsibility

State the long-term direction and the practical approach.

#### Structure

- short vision statement;
- short mission statement;
- three-step operating model:
  1. build reusable infrastructure;
  2. validate it through real applications;
  3. publish evidence and improve the stack.

#### Visitor takeaway

> The projects are part of a deliberate strategy rather than disconnected experiments.

### 3.5 Infrastructure pillars

#### Responsibility

Present the three core assets with equal strategic weight.

#### Layout

Three pillar cards or three vertical modules. Equal initial prominence is important even if project maturity differs.

#### Card anatomy

Each pillar must include:

- pillar number or category;
- project name;
- one-sentence role;
- problem solved;
- core capabilities, limited to four or five;
- strategic contribution;
- current maturity label;
- platform/backend tags;
- repository CTA;
- optional architecture/status CTA.

#### Maturity labels

Use controlled labels:

- `Experimental`
- `Active development`
- `Beta`
- `Reference-ready`
- `Production-ready`

A label must be supported by repository evidence. Never infer production readiness from repository size or feature count.

#### Required pillar order

1. Local LLM Server
2. Local ASR Server
3. Android Local LLM Harness

The order moves from desktop reasoning to audio and then mobile expansion. On small screens, maintain the same sequence.

### 3.6 System relationship

#### Responsibility

Show how the pillars can be composed without implying they must form one monolith.

#### Recommended diagram

```text
Desktop applications
    ├── Local ASR Server ── transcript ──┐
    └── Local LLM Server ◀───────────────┘

Android applications
    └── Android Local LLM Harness

Shared principles
    ├── local by default
    ├── explicit models
    ├── observable runtime
    └── privacy-conscious product design
```

#### Important clarification

The three projects are a family of reusable components and patterns. They do not need to be marketed as one installable framework in the first release.

### 3.7 Reference applications

#### Responsibility

Prove that the infrastructure and principles are tested through real products.

#### Section title direction

`Built to prove the stack in the real world`

#### Introductory clarification

The section must explicitly state that ClosedRoom and Aura Finance are reference applications, not the boundary of the ecosystem.

#### Application card anatomy

- product name;
- user problem;
- privacy-first value proposition;
- infrastructure or principle being validated;
- current product status;
- one product visual;
- one clear CTA;
- a `What this teaches the stack` subsection or expandable detail.

#### ClosedRoom relationship

Show a simple flow:

```text
Meeting audio → Local ASR → Transcript → Local LLM → Summary and actions
```

#### Aura Finance relationship

Show the current and future relationship honestly:

```text
Current: local-first financial data and optional encrypted backup
Future validation path: on-device classification and summarization through the Android harness
```

Do not visually imply that Aura currently uses the Android harness unless the integration is implemented.

### 3.8 What this enables

#### Responsibility

Expand the reader's understanding beyond the two current applications.

#### Content model

Use capability-led opportunities rather than fake product cards. Examples:

- private document analysis;
- offline professional assistants;
- personal knowledge tools;
- sensitive workflow automation;
- local health and wellbeing tools;
- financial classification and insight;
- Android apps with embedded open-weight models.

#### Visual treatment

Use a restrained opportunity map, tags or small conceptual cards. Apply a clear label such as `Possible directions`, `What the foundations can enable` or `Exploration areas`.

#### Exclusion

Do not add logos, screenshots or launch-style CTAs for products that do not exist.

### 3.9 Product and engineering principles

#### Responsibility

Explain how decisions are made across the ecosystem.

#### Required principles

1. **Local by default** — process data on the user's device when the workload and hardware allow it.
2. **Privacy by architecture** — reduce data exposure structurally rather than relying only on policy language.
3. **Explicit model control** — make model selection, artifacts and fallback behavior visible.
4. **Observable and measurable** — treat latency, memory, health and failures as product concerns.
5. **Product before demo** — validate packaging, UX and recovery, not only inference output.
6. **Honest trade-offs** — communicate device limits, quality differences and maturity clearly.
7. **Reusable foundations** — solve shared infrastructure problems once, then apply them to multiple products.

#### Optional interaction

Each principle can reveal one example from the projects. Avoid carousel controls that hide essential information.

### 3.10 Evidence and building in public

#### Responsibility

Convert claims into inspectable proof and create a reason to return.

#### Evidence types

- latest release;
- benchmark or device test;
- architecture decision;
- implementation milestone;
- technical article;
- open testing request;
- lessons from a reference application.

#### Content source

The first release may use a manually maintained data file. Automatic GitHub fetching is optional and should not block launch.

#### Entry anatomy

- date;
- category;
- concise title;
- one-sentence learning or result;
- source link;
- optional project tag.

#### Editorial rule

Every update should answer at least one of:

- what changed;
- what was learned;
- what evidence was collected;
- what help or feedback is needed.

### 3.11 About Daniele

#### Responsibility

Connect the mission to the person without turning the page into a full résumé.

#### Required content

- concise biography;
- combination of AI engineering, product thinking and communication;
- current interest in local-first and privacy-first systems;
- links to LinkedIn, GitHub and stAI tuned;
- optional portrait;
- link to a separate CV or LinkedIn profile for detailed experience.

#### Recommended emphasis

- ability to move from strategic framing to implementation;
- experience leading AI/data work;
- history of writing and explaining technical ideas;
- product experimentation across desktop and mobile.

#### Exclusions

- complete chronological job history;
- every award or certificate;
- unrelated legacy project galleries;
- generic skill bars or percentage ratings.

### 3.12 Collaboration

#### Responsibility

Make the next step specific and qualified.

#### Suggested headline

`Exploring a privacy-first AI product?`

#### Suitable conversations

- local-AI feasibility and architecture;
- desktop local inference;
- local speech and meeting workflows;
- Android on-device inference;
- product prototyping;
- device benchmarks and testing;
- open-source contribution or research collaboration.

#### CTA options

Primary: `Start a conversation`

Secondary:

- `View GitHub`
- `Connect on LinkedIn`
- `Test the Android harness`

#### Contact implementation

Prefer either:

- a direct email link with a clearly displayed address; or
- a privacy-conscious contact form with minimal fields and explicit handling information.

Do not embed an opaque third-party scheduler as the only way to make contact.

### 3.13 Footer

#### Required content

- Daniele Moltisanti;
- one-sentence positioning;
- GitHub, LinkedIn and stAI tuned links;
- privacy note;
- copyright year;
- optional build/version link to the website repository.

## 4. User journeys

### Journey A — Technical leader

1. Reads hero.
2. Understands strategic problem.
3. Reviews pillars.
4. Opens architecture or repository.
5. Reviews reference application.
6. Uses collaboration CTA.

### Journey B — Developer

1. Arrives from a LinkedIn technical post at a section anchor.
2. Reviews one pillar.
3. Checks status and supported platforms.
4. Opens repository or testing guide.
5. Returns to build updates or collaboration.

### Journey C — Potential product user

1. Arrives from a ClosedRoom or Aura link.
2. Understands product benefit.
3. Sees privacy-first rationale.
4. Learns that the product is part of a broader stack.
5. Opens product destination or beta information.

### Journey D — Hiring manager

1. Understands positioning in hero.
2. Sees evidence of infrastructure depth.
3. Sees product validation.
4. Reads concise About section.
5. Opens LinkedIn/CV or starts contact.

## 5. Anchor and URL strategy

Use stable English slugs:

- `#vision`
- `#problem`
- `#infrastructure`
- `#how-it-connects`
- `#applications`
- `#possibilities`
- `#principles`
- `#journey`
- `#about`
- `#collaborate`

Every anchor should account for the sticky header through scroll margin. Section-level sharing is important because LinkedIn posts may link directly to a project or benchmark context.

## 6. Content density rules

- Hero: maximum 45 words excluding CTAs and labels.
- Problem section: maximum 180 words plus comparison elements.
- Mission: maximum 120 words.
- Pillar intro: maximum 100 words.
- Each pillar: maximum 160 visible words before optional detail.
- Reference application intro: maximum 100 words.
- Each application: maximum 180 visible words.
- About: maximum 180 words.
- Collaboration: maximum 120 words.

Longer technical detail belongs in repository documentation or expandable, accessible supporting content.

## 7. Mobile hierarchy

On mobile:

- preserve the narrative order;
- keep primary CTA visible without forcing all content above the fold;
- stack pillar and application cards vertically;
- simplify diagrams without removing semantic relationships;
- avoid horizontal scrolling for architecture graphics;
- keep tap targets at least 44 by 44 CSS pixels;
- ensure external-link icons have text labels or accessible names;
- avoid sticky bottom bars unless testing shows a clear benefit.
