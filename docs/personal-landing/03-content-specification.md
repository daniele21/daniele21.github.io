# 03 — Content Specification

This document provides recommended English copy for the first landing-page release. The copy is implementation-ready but should remain editable through a centralized content model.

## 1. Voice and tone

The voice should be:

- direct;
- technically literate;
- understandable to non-specialists;
- ambitious without exaggeration;
- specific about what exists and what is still being explored;
- written in first person when Daniele is speaking and neutral voice for project descriptions.

Avoid:

- `AI enthusiast`;
- `passionate about innovation`;
- `revolutionizing the future`;
- `cutting-edge` without evidence;
- `fully private` unless the full data path has been verified;
- `production-ready` without release and device evidence;
- inflated claims about replacing cloud AI.

## 2. Metadata copy

### Page title

`Daniele Moltisanti — Building Privacy-First AI Products`

### Meta description

`I build reusable local-AI infrastructure for desktop and Android, then validate it through privacy-first products such as ClosedRoom and Aura Finance.`

### Social title

`Building the infrastructure for privacy-first AI products`

### Social description

`Local LLMs, private speech recognition and Android on-device inference, tested through real applications.`

## 3. Header

### Identity

`Daniele Moltisanti`

### Navigation

- Vision
- Infrastructure
- Applications
- Principles
- Journey
- About

### Header CTA

`Collaborate`

## 4. Hero

### Eyebrow

`LOCAL-FIRST AI INFRASTRUCTURE`

### Recommended headline

`Building the foundations for privacy-first AI products.`

### Supporting paragraph

`I design reusable infrastructure for local LLM inference, private speech recognition and Android on-device AI — then validate it through real desktop and mobile applications.`

### Primary CTA

`Explore the infrastructure`

### Secondary CTA

`Follow the build journey`

### Optional credibility line

`Open-weight models · Desktop and Android · Infrastructure validated through real products`

Do not place awards, years of experience or generic role labels between the headline and the core proposition.

## 5. Strategic problem

### Eyebrow

`THE GAP`

### Headline

`Running a model locally is not the same as shipping a local-AI product.`

### Body

`A local model demo can work on one machine, with one configuration and one happy path. A product must handle model distribution, hardware limits, memory, cancellation, failures, telemetry, packaging and user experience — while keeping sensitive data under control.`

`That missing product layer is where I am focusing my work.`

### Comparison labels

#### Left

`Local model demo`

Items:

- one model and one device;
- manual configuration;
- console-level feedback;
- happy-path inference;
- limited recovery and diagnostics.

#### Right

`Product-grade local AI`

Items:

- explicit model and device compatibility;
- reusable runtime lifecycle;
- memory, latency and health evidence;
- cancellation and failure recovery;
- installable product experience.

## 6. Vision and mission

### Section eyebrow

`DIRECTION`

### Vision heading

`AI should be able to work where sensitive data already lives.`

### Vision copy

`I see a future where many useful AI tasks can run directly on personal devices, close to documents, recordings and private information, without sending every interaction to an external provider.`

### Mission heading

`Make privacy-first AI products easier to build.`

### Mission copy

`My mission is to build reusable local-AI infrastructure and validate it through real applications across desktop and mobile.`

### Operating-model labels

1. `Build the foundations`
   - `Create reusable runtime, audio and mobile infrastructure.`
2. `Test them in real products`
   - `Expose the stack to real privacy, performance, packaging and UX constraints.`
3. `Publish the evidence`
   - `Share architecture, benchmarks, limitations and lessons to improve the ecosystem.`

## 7. Infrastructure introduction

### Eyebrow

`THE THREE PILLARS`

### Heading

`Reusable infrastructure, not isolated experiments.`

### Introductory copy

`The ecosystem is built around three infrastructure pillars. Each solves a different part of the local-AI product stack and is intended to support more than one application.`

## 8. Pillar copy

### 8.1 Local LLM Server

#### Label

`DESKTOP REASONING`

#### Name

`Local LLM Server`

#### One-line role

`A stable local inference layer for desktop applications.`

#### Problem

`Local applications should not need to couple their product logic to every inference backend, model format or runtime process.`

#### Description

`Local LLM Server exposes an OpenAI-compatible API across local backends such as GGUF and MLX, while managing model lifecycle, resident runtimes, configuration and observability.`

#### Capability bullets

- `OpenAI-compatible local API`
- `GGUF and Apple Silicon backends`
- `Runtime model switching`
- `Multiple resident models`
- `Web UI, logs and telemetry`

#### Strategic contribution

`It separates product experience from inference complexity, allowing multiple applications to reuse the same local reasoning layer.`

#### Suggested status

`Active development`

#### Primary CTA

`View repository`

#### Secondary CTA

`Read the architecture`

### 8.2 Local ASR Server

#### Label

`PRIVATE SPEECH`

#### Name

`Local ASR Server`

#### One-line role

`A reusable local audio capture and transcription layer.`

#### Problem

`Meeting and voice data is highly sensitive, yet speech products often require sending recordings to remote infrastructure.`

#### Description

`Local ASR Server records microphone and system audio, stores sessions locally and transcribes them with Whisper on Apple Silicon through a reusable API and interface.`

#### Capability bullets

- `Microphone and system-audio capture`
- `Local Whisper transcription`
- `Structured session storage`
- `OpenAI-compatible transcription endpoint`
- `Reusable desktop integration`

#### Strategic contribution

`It creates a private speech-to-text foundation that can feed local reasoning workflows without making remote transcription the default.`

#### Suggested status

`Active development`

#### Primary CTA

`View repository`

#### Secondary CTA

`See the ClosedRoom flow`

### 8.3 Android Local LLM Harness

#### Label

`ON-DEVICE MOBILE AI`

#### Name

`Android Local LLM Harness`

#### One-line role

`A reusable runtime for embedding explicit GGUF models in Android applications.`

#### Problem

`Running an LLM on Android requires more than native bindings: applications need model integrity, lifecycle, memory handling, cancellation, telemetry and device evidence.`

#### Description

`The harness builds these concerns around llama.cpp, with a shared architecture for native and Capacitor applications and a path from embedded inference to a future shared Android service.`

#### Capability bullets

- `GGUF import and integrity verification`
- `Model and context lifecycle`
- `Streaming and cancellation`
- `Memory and thermal observations`
- `Health checks and performance benchmarks`

#### Strategic contribution

`It extends the privacy-first stack from desktop to mobile and aims to reduce the repeated engineering required to add local models to Android products.`

#### Suggested status

`Experimental · active development`

#### Primary CTA

`View repository`

#### Secondary CTA

`Help test a device`

## 9. Relationship section

### Eyebrow

`COMPOSABLE BY DESIGN`

### Heading

`Different components. Shared product principles.`

### Body

`The pillars do not need to become one monolithic framework. They are reusable components that can be composed according to the product: local speech and reasoning on desktop, or embedded on-device inference on Android.`

### Shared-principle labels

- `Local by default`
- `Explicit model control`
- `Observable runtimes`
- `Privacy-conscious data paths`
- `Evidence before compatibility claims`

## 10. Reference applications introduction

### Eyebrow

`REFERENCE APPLICATIONS`

### Heading

`Built to prove the foundations in the real world.`

### Introductory copy

`Infrastructure becomes meaningful only when it survives real product constraints. ClosedRoom and Aura Finance are the first reference applications I use to test privacy, performance, packaging, reliability and user experience.`

`They are not the boundary of the ecosystem. They are evidence that the foundations can support useful products.`

## 11. ClosedRoom copy

### Product category

`PRIVATE MEETING INTELLIGENCE`

### Product name

`ClosedRoom`

### Headline

`Record, transcribe and understand meetings without sending the room to the cloud.`

### Description

`ClosedRoom is a Mac application for recording, transcribing and analysing meetings entirely on-device. It combines the local speech and reasoning pillars into one product experience.`

### Stack flow

`Meeting audio → Local ASR Server → Transcript → Local LLM Server → Summary and actions`

### What it validates

- `end-to-end local processing`;
- `audio setup and recording reliability`;
- `model packaging and startup`;
- `transcription-to-analysis workflows`;
- `product UX around private data`.

### Learning statement

`ClosedRoom forces the infrastructure to work as a product, not only as two independent servers.`

### Status label

Use the status supported by the product repository at implementation time. If no public beta exists, use `In development`.

### CTA

`Discover ClosedRoom`

## 12. Aura Finance copy

### Product category

`LOCAL-FIRST PERSONAL FINANCE`

### Product name

`Aura Finance`

### Headline

`Understand personal finances without handing over the full financial history.`

### Description

`Aura Finance is a mobile-first budgeting application where financial data stays in the browser by default and cloud storage is an optional encrypted backup.`

### Current validation

- `local ownership of sensitive data`;
- `privacy-conscious product architecture`;
- `mobile-first recurring workflows`;
- `encrypted optional backup`;
- `clear reporting without remote analysis`.

### Future relationship to the Android pillar

`Aura Finance can become a reference use case for private on-device classification, transaction titles, recurring-pattern detection and financial summaries once those integrations are implemented and validated.`

### Honesty note

The landing must visually separate current capabilities from future experimentation.

### Learning statement

`Aura Finance tests whether privacy-first choices can remain understandable and useful in an everyday consumer product.`

### CTA

`Explore Aura Finance`

## 13. Possibilities section

### Eyebrow

`WHAT THE FOUNDATIONS CAN ENABLE`

### Heading

`The direction extends beyond meetings and personal finance.`

### Body

`The same infrastructure and product patterns can support applications that work with private documents, personal knowledge, professional workflows and sensitive mobile data.`

### Opportunity labels

- `Private document analysis`
- `Offline professional assistants`
- `Personal knowledge tools`
- `Sensitive workflow automation`
- `Local health and wellbeing tools`
- `Financial classification and insight`
- `Android apps with embedded models`

### Disclaimer

`These are exploration areas, not announced products.`

## 14. Principles copy

### Section eyebrow

`HOW I BUILD`

### Heading

`Privacy-first is a product and architecture discipline.`

### Principle 1

**Local by default**

`Process data on the user's device when the workload, model quality and hardware make it a responsible choice.`

### Principle 2

**Privacy by architecture**

`Reduce unnecessary data movement structurally, instead of relying only on policies or promises.`

### Principle 3

**Explicit model control**

`Make model artifacts, configurations and fallback behaviour visible and intentional.`

### Principle 4

**Observable and measurable**

`Treat latency, memory, health, errors and recovery as part of the product.`

### Principle 5

**Product before demo**

`A useful local-AI system must survive installation, setup, failure and repeated use — not only generate one successful response.`

### Principle 6

**Honest trade-offs**

`Local AI has real limits. Communicate device compatibility, model quality and maturity before making broad claims.`

### Principle 7

**Reusable foundations**

`Solve shared infrastructure problems once, then validate them through multiple products.`

## 15. Building-in-public copy

### Eyebrow

`BUILDING IN PUBLIC`

### Heading

`Architecture, evidence and lessons from the work.`

### Introductory copy

`I document the decisions, benchmarks, failures and product lessons behind the stack. The goal is to make the progress inspectable and invite useful feedback.`

### Filters

- All
- Infrastructure
- Android
- Speech
- Products
- Benchmarks
- Architecture

### Empty-state copy

`New evidence and implementation notes will appear here as the projects evolve.`

### CTA

`Follow on LinkedIn`

Secondary:

`Read stAI tuned`

## 16. About copy

### Eyebrow

`ABOUT`

### Heading

`I work where AI infrastructure, product strategy and communication meet.`

### Recommended biography

`I am Daniele Moltisanti, a data and AI professional based in Milan. My work combines technical architecture, product thinking and the ability to turn complex AI systems into understandable decisions and usable experiences.`

`Alongside my professional work, I build local-first infrastructure and privacy-first products in public. I also write about AI architecture and strategy through stAI tuned and LinkedIn.`

`I am particularly interested in the last mile between a working model and a reliable product: integration, observability, evaluation, packaging, user experience and strategic adoption.`

### Links

- `View GitHub`
- `Connect on LinkedIn`
- `Read stAI tuned`
- `View professional profile`

## 17. Collaboration copy

### Eyebrow

`COLLABORATE`

### Heading

`Exploring a privacy-first AI product?`

### Body

`I am interested in conversations where local or on-device AI can create a real advantage — especially when privacy, offline use, cost predictability or control over the model matters.`

### Conversation areas

- `Local-AI feasibility and architecture`
- `Desktop inference and private speech workflows`
- `Android on-device inference`
- `Privacy-first product prototyping`
- `Benchmarks, device testing and open-source collaboration`

### Primary CTA

`Start a conversation`

### Secondary CTA

`View GitHub`

## 18. Footer copy

### Positioning line

`Building reusable local-AI infrastructure for privacy-first products.`

### Privacy note

`This site is designed to avoid unnecessary tracking and third-party data collection.`

### Repository link label

`View site source`

## 19. Content governance

Before publishing a project claim, verify:

- repository state;
- current release status;
- supported platform;
- actual integration between projects;
- benchmark methodology;
- presence of a public demo or installer;
- privacy implications of every data path.

Use explicit qualifiers where needed:

- `currently supports`;
- `being tested`;
- `planned`;
- `future integration path`;
- `validated on`;
- `not yet production-ready`.

All project details should be stored in structured data so status and capabilities can be updated without rewriting page components.
