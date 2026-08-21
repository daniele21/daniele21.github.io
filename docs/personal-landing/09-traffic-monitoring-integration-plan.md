# Traffic Monitoring Ecosystem Integration Plan

## 1. Document status

- **Status:** Proposed
- **Scope:** personal landing homepage plus two project deep-dive pages
- **Projects:** Traffic Monitoring for macOS and Traffic Monitoring for Android
- **Target routes:** /traffic-monitoring and /traffic-monitoring-android
- **Homepage category:** Evidence & Observability
- **Source baseline reviewed:** current project READMEs and routed product documentation on 2026-08-09
- **Primary audience:** technical and product leaders, local-first builders, privacy-conscious users, developers and potential collaborators
- **Implementation source of truth:** the current project repositories and their explicit maturity documents, not historical screenshots or inferred capability

## 2. Executive recommendation

Create one dedicated page for each platform implementation and add one shared Evidence & Observability section to the homepage.

The integration must preserve three strategic categories:

1. **Reusable AI infrastructure**
   - Local LLM Server
   - Local ASR Server
   - Android Local LLM Harness
2. **Reference applications**
   - ClosedRoom
   - RedactGuard
   - Aura Finance
3. **Evidence & Observability**
   - Traffic Monitoring for macOS
   - Traffic Monitoring for Android

Traffic Monitoring must not become:

- a fourth AI runtime pillar;
- another reference application;
- a generic cybersecurity project;
- a packet-analysis product;
- proof that every local-first application is private.

The homepage should explain the shared strategic role. The two deep-dive pages should explain the different platform products, evidence semantics, current capability and maturity boundaries.

Do not create a third parent route in the first release. The homepage Evidence & Observability section is the family overview. A parent route such as /evidence-observability becomes useful only if the family later adds more platforms, shared specifications, public evidence packs or a distinct developer integration layer.

## 3. Strategic decision

### 3.1 Core thesis

The integration should add one idea to the current local-first narrative:

> Local-first gives products more control. Evidence makes that control understandable and, where the platform allows it, observable.

The revised ecosystem story is:

    Build reusable infrastructure
            ↓
    Validate it through real applications
            ↓
    Observe behavior and preserve evidence
            ↓
    Publish what was measured, including uncertainty

Traffic Monitoring is the network-side expression of the third step.

### 3.2 Why two project pages

The two repositories share a brand and product philosophy, but they do not share the same operating model, evidence sources or maturity:

- macOS has authoritative physical-interface evidence, historical analytics, a non-privileged Applications Beta preview and a separately gated Advanced Provider prototype;
- Android has deterministic usage attribution, Evidence Coverage and Measurement Health, but background reliability and multi-OEM feasibility still require physical-device evidence;
- macOS can expose best-effort process activity today but cannot turn it into a locality verdict;
- Android keeps app-level historical context exploratory and does not use a local VPN for v1;
- the installation, run, permission and release stories are platform-specific;
- the most important status caveats are different enough that one combined page would either be too dense or too vague.

The pages should share identity and selected presentation primitives, not collapse their content into one generic template.

### 3.3 Homepage role

The homepage should answer:

> Why does network evidence belong in a portfolio focused on product-grade local AI?

The project pages should answer:

> What does this platform implementation measure, how does it know, and what can the evidence safely support today?

## 4. Verified product baseline

This section freezes the public baseline that the first implementation must reflect.

### 4.1 Shared principles

Both projects support the following shared statements:

- measure before claiming;
- keep evidence and analytics local unless the user explicitly exports;
- preserve uncertainty instead of assigning evidence to the wrong network;
- distinguish user-facing evidence from raw technical diagnostics;
- avoid packet payloads, browsing history and content inspection;
- make exportability part of the evidence model;
- expose current limits and validation gaps;
- use the shield as the shared product identity;
- keep the product useful without a cloud backend.

### 4.2 macOS current baseline

**Primary descriptor**

> Local Network Observability for macOS.

**Current product promise**

> Measure what moves. Understand where it moves.

**Available now**

- physical-interface download and upload measurement;
- network-context attribution across supported Wi-Fi, Personal Hotspot and Ethernet contexts;
- Today, 7 days, 30 days, This month, All time and Custom timeframes;
- Overview, Trends, Networks, Applications Beta, Monitor and Settings surfaces;
- observation coverage and explicit evidence-quality states;
- JSON and CSV aggregate evidence preview and export;
- persistent local aliases and network detail;
- non-privileged App Activity Preview;
- best-effort application, process-name and PID grouping where macOS metadata allows it;
- local operation without an account or remote analytics backend.

**Current authoritative evidence**

- supported physical-interface byte movement;
- time and selected observation period;
- network context and identity quality;
- aggregate download, upload and total;
- coverage, gaps and degraded states;
- exported aggregate evidence with current limitations.

**Best-effort evidence**

- applications or processes appearing in the current macOS process network summary;
- cumulative process totals available to the preview source;
- parent/helper grouping when ownership can be resolved.

**Experimental or gated**

- signed Network Extension system extension;
- source-application identity through the Advanced Provider;
- Local, External and Unknown flow classification;
- provider byte accounting;
- privacy-audit or regression-test semantics.

The Advanced Provider source, build, packaging and IPC gates passing CI do not establish signed real-Mac behavior. Per-app locality and byte evidence remain not release-validated.

### 4.3 Android current baseline

**Primary descriptor**

> Evidence-first network observability for Android.

**Current product promise**

> Know your network usage - and the evidence behind it.

**Implemented product capability**

- persistent product usage history;
- Overview, Networks, Evidence and Monitor surfaces;
- Today, 7 days, 30 days, This month and Custom timeframes;
- Total used, Downloaded, Uploaded, trend, peak and network ranking;
- explicit Unattributed usage;
- deterministic attributed, unattributed and discarded interval semantics;
- Evidence Coverage v1;
- separate Measurement Health with Good, Limited and Degraded states;
- continuity-gap and discarded-evidence summaries;
- raw validation evidence and diagnostic ZIP export;
- event-driven PendingIntent and in-process network monitoring implementation;
- lifecycle, recovery and OEM/device instrumentation.

**Validated or passed in the current README**

- M1A persistence and export passed on emulator;
- M1B counters and in-process network evidence passed on emulator.

**Implemented but still awaiting field acceptance**

- M1C process-absent PendingIntent behavior;
- M1D recovery and lifecycle hardening;
- M1E 48–72 hour Standard-mode physical-device run;
- M2 physical replay acceptance;
- M4 real-phone usability refinement;
- M5 multi-device and OEM validation;
- E1 product validation and reconciliation against Monitor/export evidence.

**Planned or exploratory**

- E2 human-readable Evidence Timeline and Evidence Pack;
- E3 Experiment Mode;
- E4 deterministic assertions;
- E5 optional app-level historical context;
- E6 optional open-observability export.

The site must never convert implementation status into a claim of reliable background measurement across Android devices.

### 4.4 Public claim matrix

| Area | Safe public wording | Wording to avoid |
|---|---|---|
| Shared role | Evidence & Observability for local-first software | Privacy verifier |
| macOS core | Physical-interface network usage with coverage and network-context evidence | Exact Internet or carrier-billing usage |
| macOS preview | Best-effort application and process activity preview | Per-app privacy proof |
| macOS provider | Experimental signed provider, not release-validated | Validated per-app locality |
| Android product | Evidence-first network usage attribution with explicit uncertainty | Reliable on every Android device |
| Android E1 | Evidence Coverage and Measurement Health implemented; validation pending | Fully validated evidence score |
| Future experiments | Planned bounded evaluation with Pass, Fail and Inconclusive | Current privacy audit |
| Privacy | No packet contents, DNS or browsing history in the documented core paths | Guaranteed private |
| Local-first | Local evidence and analytics by default | No network activity |

## 5. Mission and positioning integration

### 5.1 Primary positioning

Keep the existing homepage category and title direction:

> Building infrastructure for product-grade local AI.

Traffic Monitoring should deepen this positioning, not replace it with a generic observability message.

### 5.2 Revised hero lede

Recommended copy:

> I explore how local-first architectures can give AI products more control over model lifecycle, costs, data and runtime - and how evidence can show where those boundaries actually hold.

Recommended supporting line:

> Local-first is an execution choice. Evidence makes it an accountable product claim.

The supporting line must not imply that all relevant product behavior is currently verifiable.

### 5.3 Revised mission statement

Recommended copy:

> Build and test reusable local-AI, data-protection and observability foundations that give products more control over model lifecycle, data, runtime and cost - and make local-first behavior measurable across desktop and mobile.

### 5.4 Revised operating model

The strategic model should become:

1. build reusable infrastructure;
2. validate usefulness through real applications;
3. collect evidence, preserve uncertainty and improve the system.

### 5.5 Positioning guardrail

Traffic Monitoring must remain useful to people who do not care about AI:

- the macOS page begins with network usage and hotspot utility;
- the Android page begins with network usage and attribution confidence;
- the local-first developer use case appears as the strategic second layer;
- AI is an ecosystem relationship, not a forced feature of either product.

## 6. Information architecture

### 6.1 Revised homepage order

Use the following order:

1. Hero
2. Why local-first
3. Control comes with responsibility
4. Three infrastructure pillars
5. Evidence & Observability
6. Reference applications
7. Professional track record
8. Knowledge and public research
9. About
10. Collaborate

The new section belongs immediately after Infrastructure and before Applications because it completes the system model before the page moves into product proving grounds.

### 6.2 Primary navigation

Recommended desktop navigation:

1. Why local-first
2. Infrastructure
3. Evidence
4. Applications
5. Knowledge
6. About
7. Collaborate

To protect header width, remove Track record from the primary navigation while retaining the section in the homepage narrative. It remains discoverable by normal scrolling and can later become a child of About if a second-level structure is introduced.

Evidence should be a dropdown:

- Evidence & Observability - #evidence
- Traffic Monitoring for macOS - /traffic-monitoring
- Traffic Monitoring for Android - /traffic-monitoring-android

The dropdown family item may use the shared shield. Platform items may use the same shield plus a text platform label; do not create altered platform-specific shield marks.

### 6.3 Deep-page navigation

Both pages should use:

- the shared SiteHeader;
- the existing ProductSubHeader;
- one project-specific title;
- one honest maturity badge;
- section anchors;
- one GitHub CTA.

Do not add another copied project header. Product identity belongs in ProductSubHeader and the hero; global navigation remains owned by SiteHeader.

## 7. Homepage experience plan

### 7.1 Visual thesis

A calm evidence rail crossing the existing stack, using the shared shield, network-blue lines and explicit status language to show that observability supports the ecosystem without becoming another runtime layer.

### 7.2 Content plan

- Hero: extend the promise from control to measurable control.
- Challenge: introduce evidence as a responsibility.
- Infrastructure: keep the three pillars unchanged.
- Evidence: explain one shared role and reveal the two platform implementations.
- Applications: clarify the difference between proving product usefulness and observing behavior.
- Journey: connect Build, Measure, Document and Share to inspectable evidence.

### 7.3 Interaction thesis

Use three restrained interactions:

1. the evidence rail enters after the existing stack layers in the hero sequence;
2. platform rows reveal their status and primary CTA on scroll without hiding essential copy;
3. screenshot or architecture previews use the existing accessible image zoom.

No auto-advancing carousel, animated traffic simulation or decorative packet stream is required.

### 7.4 Hero ecosystem map

Keep the existing three visual layers:

    Applications
    Infrastructure
    User-owned devices

Add Evidence & Observability as a side rail or enclosing boundary:

    Applications          ClosedRoom | RedactGuard | Aura Finance
    Infrastructure       Local LLM | Local ASR | Android Harness
    Execution            Desktop / macOS | Android
                              │
    Evidence rail        Traffic Monitoring macOS
                         Traffic Monitoring Android

Requirements:

- do not add a fourth stacked infrastructure slab;
- solid connections may indicate device/network evidence available now;
- any connection implying application-level or locality evidence must be dashed and described as platform-dependent or gated;
- include a visible legend or nearby copy so line style is not the only distinction;
- update the screen-reader fallback list;
- make both platform labels keyboard-accessible internal links;
- keep the SVG legible and non-scrolling at 360 px;
- do not use No Cloud Required as a universal privacy verdict;
- prefer Local execution path or User-owned execution when the diagram needs a hardware-layer label.

### 7.5 Control comes with responsibility

Rename the existing challenge Observability & telemetry to:

> Observability, telemetry & evidence

Recommended description:

> Runtime metrics show whether local inference works. Network evidence shows what was observed, how complete it was and where uncertainty remains.

Recommended tags:

- Runtime telemetry
- Evidence coverage
- Explicit unknowns

### 7.6 New Evidence & Observability section

**Section ID:** evidence

**Kicker:** EVIDENCE & OBSERVABILITY

**Title**

> Local-first should be observable, not just claimed.

**Intro**

> Traffic Monitoring measures network behavior and the quality of the evidence behind it, locally and without storing packet content. The macOS and Android implementations share the same principles while respecting different platform constraints.

**Shared principles**

- Measure before claiming
- Preserve uncertainty
- Keep evidence local

**Composition**

Use one full-width editorial section divided by a strong central rule:

- shared shield and strategic statement at the top;
- macOS platform row with a wide desktop product image;
- Android platform row with a phone product image;
- explicit maturity text attached to each row;
- one CTA per platform;
- no equal generic card grid;
- no feature-pill wall;
- no architecture detail before the product promise is understood.

**macOS summary**

- **Label:** macOS
- **Name:** Traffic Monitoring
- **Headline:** Understand how your Mac uses the network.
- **Description:** Local history, network context, observation coverage and a best-effort application activity preview, with richer signed flow evidence kept behind an explicit experimental boundary.
- **Status line:** Core usable today · Applications Beta best-effort · Advanced Provider experimental
- **CTA:** Explore the macOS project

**Android summary**

- **Label:** Android
- **Name:** Traffic Monitoring
- **Headline:** Know your network usage - and the evidence behind it.
- **Description:** Deterministic usage attribution, explicit Unattributed traffic, Evidence Coverage and Measurement Health, with real-device and multi-OEM reliability validation still in progress.
- **Status line:** Product UX implemented · E1 implemented · Field validation pending
- **CTA:** Explore the Android project

### 7.7 Reference applications transition

Update the transition into Applications:

> Infrastructure provides the execution path. Traffic Monitoring makes observed network behavior and uncertainty visible. Reference applications test whether the complete approach creates useful products.

Update the bottom note:

> Reference applications validate usefulness and product constraints. Traffic Monitoring separately develops the evidence needed to describe what was observed without turning incomplete measurement into a privacy guarantee.

Do not add Traffic Monitoring to the ReferenceApplication array.

### 7.8 Journey section

Keep the existing Build → Measure → Document → Share sequence and add one concise supporting sentence:

> Measurement includes not only runtime performance, but also coverage, uncertainty and reproducible network evidence.

## 8. macOS deep-dive page

### 8.1 Route and metadata

- **Route:** /traffic-monitoring
- **Title:** Traffic Monitoring for macOS, Local network observability
- **Description:** A privacy-first macOS utility for network usage history, observation coverage, evidence export and progressively stronger application activity evidence.
- **Canonical path:** /traffic-monitoring
- **Social image:** a sanitized Overview product screenshot with shield identity

### 8.2 Product sub-header

- **Title:** Traffic Monitoring for macOS
- **Badge:** Active observability project
- **Links:** Overview, Why, Evidence, Product, Architecture, Status
- **CTA:** GitHub ↗

The page may show more precise maturity labels inside its sections. The sub-header badge must not imply that the Advanced Provider is validated.

### 8.3 Hero

**Responsibility:** explain the current user value before the advanced vision.

**Eyebrow:** EVIDENCE & OBSERVABILITY · macOS

**Headline**

> Measure what moves.
> Understand where it moves.

**Lede**

> Traffic Monitoring gives Mac users local network history, usage by network, trends and observation coverage - then adds progressively stronger application activity evidence without making packet content the price of observability.

**Primary CTA:** See the evidence model

**Secondary CTA:** Explore GitHub ↗

**Status labels**

- macOS 14+
- Core usable today
- Applications Beta

**Dominant visual**

Use a sanitized current Overview screenshot. It should show:

- total usage;
- current network;
- observation percentage;
- data-quality state;
- saved-locally message.

Do not use the architecture diagram as the hero. The first viewport should show a tangible product.

### 8.4 Mission band

**Statement**

> Make network behavior understandable before trying to make it verifiable.

**Supporting copy**

> A trustworthy local-first claim needs measured behavior, explicit coverage and honest limits. Traffic Monitoring starts with useful network analytics and strengthens evidence only when the source supports it.

**Principles**

- Evidence over claims
- Observe, do not inspect
- Unknown is valid

### 8.5 Why it exists

Start with the practical question:

> How much data am I actually using when my Mac connects through my phone hotspot?

Then expand the problem:

1. a byte counter without network context is difficult to act on;
2. a selected period without observation coverage can be misleading;
3. a process name without locality cannot support a privacy conclusion;
4. richer evidence should not force every user to install a privileged component.

Use a numbered editorial sequence rather than four cards.

### 8.6 Evidence capability tiers

Present three deliberately distinct tiers.

#### Tier 1 - Core network evidence

- **Status:** Current and authoritative
- physical-interface counters;
- network identity and path metadata;
- historical usage;
- observation coverage;
- JSON and CSV aggregate export.

**Safe conclusion**

> Bytes were observed on a supported physical interface and network context while Traffic Monitoring was observing.

#### Tier 2 - App Activity Preview

- **Status:** Current, non-privileged and best-effort
- application and process grouping;
- cumulative process download/upload summaries;
- helper-process ownership when observable;
- no persistence in evidence export;
- no locality verdict.

**Safe conclusion**

> These applications or processes appear in the current macOS process network summary with these cumulative totals.

#### Tier 3 - Advanced Provider

- **Status:** Experimental signed path, not release-validated
- source-application identity;
- Local, External and Unknown flow classification;
- aggregate provider evidence;
- authenticated local IPC;
- byte accounting not validated.

**Safe conclusion**

> The architecture compiles and packages; controlled signed real-Mac evidence is still required before a locality or audit claim.

Use a vertical progression with status, evidence source and safe conclusion. Do not use green success styling for the experimental tier.

### 8.7 Product proof sequence

Use the current screenshots in an editorial sequence:

1. **Overview**
   - total usage, current network and observation quality;
2. **Trends**
   - when traffic happened and where peaks occurred;
3. **Networks**
   - which network contexts accounted for usage;
4. **Applications Beta**
   - best-effort process and application activity;
5. **Monitor**
   - raw interface counters and last-sample diagnostics.

Each surface must have:

- an outcome-oriented heading;
- one short explanatory sentence;
- current capability label;
- accurate alt text;
- explicit image dimensions;
- zoom support;
- lazy loading below the fold.

The Applications screenshot must visibly retain the message Activity preview, not privacy evidence.

### 8.8 Coverage and uncertainty

Explain the core evidence equation:

    Observed usage
        +
    Observation coverage
        +
    Network identity quality
        =
    Network-level evidence

Show the current evidence states:

- Identified
- Partially identified
- Unknown network
- Tracking degraded

The section should make clear that sleep, app shutdown, crashes and long gaps are not silently filled.

### 8.9 Architecture

First show a simplified accessible flow:

    macOS platform sources
            ↓
    tracking and evidence domain
            ↓
    local aggregate persistence
            ↓
    analytics and application activity
            ↓
    SwiftUI product surfaces

Then provide the current architecture image with zoom and a textual disclosure covering:

- Network.framework and CoreWLAN context;
- Darwin 64-bit interface counters;
- local five-minute buckets and checkpoints;
- observation-coverage tracking;
- nettop App Activity Preview;
- separately gated Advanced Provider;
- local aggregate IPC;
- independence of core tracking from the advanced path.

### 8.10 Privacy and trust boundary

**Keep visible**

- analytics and evidence remain on-device unless explicitly exported;
- core analytics do not persist packet payloads or browsing content;
- preview activity is not part of authoritative evidence export;
- the advanced path is opt-in and independently disableable;
- missing permission, unknown network and unavailable provider are supported states.

**Do not claim**

- exact Internet-only usage;
- exact mobile-carrier billing parity;
- destination history;
- complete activity outside observation periods;
- application-locality proof from App Activity Preview;
- privacy audit capability today.

### 8.11 Ecosystem role

Use this relationship:

    Local-first applications and runtimes
                ↓
    observed device/network behavior
                ↓
    coverage + quality + explicit unknowns
                ↓
    reproducible evidence

ClosedRoom may appear as a future bounded validation example only if the copy says that current core counters and App Activity Preview do not prove that ClosedRoom stayed local.

Recommended wording:

> Traffic Monitoring develops the network evidence layer around the local-first ecosystem. It does not become a runtime dependency and it does not turn partial observation into a privacy verdict.

### 8.12 Maturity section

Use a structured matrix:

| Capability | Display status |
|---|---|
| Physical-interface usage | Implemented |
| Historical evidence and export | Implemented |
| App Activity Preview | Beta · best-effort |
| Application grouping | Best-effort |
| Advanced Provider | Experimental |
| Per-app locality and bytes | Not release-validated |
| Privacy Audit | Future |

The status text must remain understandable without relying on color.

### 8.13 Final CTA

- **Kicker:** Traffic Monitoring for macOS
- **Headline:** Understand your network usage. Inspect the evidence behind it.
- **Body:** Explore the implementation, run the ad-hoc development build or contribute to the signed real-Mac validation path.
- **Primary CTA:** Explore Traffic Monitoring on GitHub ↗
- **Secondary CTA:** View the Evidence & Observability family

If a Run it CTA is added, it must explain that the ad-hoc artifact supports the core product and App Activity Preview but cannot activate the Advanced Provider.

## 9. Android deep-dive page

### 9.1 Route and metadata

- **Route:** /traffic-monitoring-android
- **Title:** Traffic Monitoring for Android, Evidence-first network observability
- **Description:** An Android observability project for network usage, deterministic attribution, Evidence Coverage, Measurement Health and explicit uncertainty.
- **Canonical path:** /traffic-monitoring-android
- **Social image:** a sanitized Android Overview screenshot with shield identity

### 9.2 Product sub-header

- **Title:** Traffic Monitoring for Android
- **Badge:** Field validation pending
- **Links:** Overview, Difference, Evidence, Product, Architecture, Status
- **CTA:** GitHub ↗

The badge should prioritize the most important maturity boundary rather than only saying Active development.

### 9.3 Hero

**Responsibility:** communicate both the usage utility and evidence differentiation.

**Eyebrow:** EVIDENCE-FIRST NETWORK OBSERVABILITY · Android

**Headline**

> Know your network usage -
> and the evidence behind it.

**Lede**

> Traffic Monitoring measures how much data an Android device used, when and on which network, while preserving attribution confidence, continuity gaps and explicit Unattributed usage.

**Primary CTA:** See how evidence works

**Secondary CTA:** Explore GitHub ↗

**Status labels**

- Android
- E1 implemented
- Field validation pending

**Dominant visual**

Capture a current Android Overview screen showing:

- Current network;
- Total used;
- Downloaded and Uploaded;
- usage trend;
- Evidence Coverage;
- Measurement Health;
- explicit Unattributed state when useful.

Do not use the architecture diagram as the hero. The current repository does not yet contain a public product-screenshot set, so screenshot capture is a release dependency.

### 9.4 Mission band

**Statement**

> Measure before claiming. Preserve uncertainty. Make results auditable.

**Principles**

- Deterministic attribution
- Evidence with provenance
- User-controlled export

### 9.5 What makes it different

Use the two product questions:

1. **What happened?**
   - how much data;
   - when;
   - Wi-Fi, hotspot, mobile or another known context.
2. **How do we know?**
   - attributed versus unattributed;
   - continuity gaps;
   - discarded intervals;
   - evidence coverage and measurement health.

Then introduce the progressive product model:

    Usage          current
        ↓
    Evidence       E1 implemented
        ↓
    Experiments    E3 planned
        ↓
    Monitor        current advanced diagnostics

Current and planned states must be visible in text, not only through color or line style.

### 9.6 Product proof

Use an editorial sequence:

1. **Overview**
   - current network, total used, download/upload, trend and compact evidence summary;
2. **Networks**
   - ranked usage with transport and explicit Unattributed traffic;
3. **Evidence**
   - coverage, health reasons, continuity gaps, discarded intervals and methodology;
4. **Monitor**
   - raw observations, counters, callbacks, lifecycle and validation export.

Experiments must not appear as a current product screenshot until E3 is implemented.

### 9.7 Evidence Coverage and Measurement Health

Show the implemented formula:

    accountedBytes = attributedBytes + unattributedBytes
    Evidence Coverage = attributedBytes / accountedBytes

Explain:

- no accountable usage produces Not enough data, not 100%;
- discarded intervals do not contaminate consumer totals;
- Unattributed bytes remain visible;
- coverage and health are separate;
- health can be limited or degraded because of gaps or discarded evidence even when usage totals exist.

Show the current health policy as secondary detail:

| State | Current rule |
|---|---|
| Good | coverage at least 95% and no discarded evidence |
| Limited | incomplete coverage or some discarded evidence |
| Degraded | coverage below 80%, a gap of at least 30 minutes, or at least three discarded intervals |

The exact numeric policy must be reverified against the repository before launch.

### 9.8 Architecture

Use the current four-tier architecture after product proof:

1. Android platform signals;
2. raw evidence and attribution;
3. derived product state;
4. user experience and export.

The existing architecture image can be reused only after:

- Experiments / evaluation is visibly labelled Planned;
- no box visually implies E3 or E4 is current;
- a textual equivalent is provided;
- text remains legible in zoom;
- the image is optimized for the web.

Provide a simplified preface:

    platform events + cumulative counters
                    ↓
    raw evidence + deterministic attribution
                    ↓
    five-minute usage history + evidence summary
                    ↓
    Overview / Networks / Evidence / Monitor / Export

### 9.9 Two development tracks

Present separate roadmap bands.

**Track A - Measurement reliability**

- M1C and M1E real-device evidence;
- M2 replay acceptance;
- M5 multi-OEM matrix.

**Track B - Evidence product**

- E1 Coverage and Health implemented;
- E2 Timeline and Evidence Pack next;
- E3 Experiment Mode planned;
- E4 Assertions planned.

Do not use one percentage-complete progress bar. The two tracks measure different kinds of maturity and have different acceptance gates.

### 9.10 Privacy boundary

Keep visible:

- no packet contents;
- no DNS queries, URLs or browsing history;
- no local VPN interception for v1;
- no cloud backend required;
- all evidence remains local until explicit export or optional integration;
- a permanent Foreground Service is not the default strategy.

Do not imply that lack of content inspection proves that every byte was correctly attributed.

### 9.11 Relationship to Android Local LLM Harness

Show a conceptual relationship, not a dependency:

    Android Local LLM Harness
        provides on-device inference

    Traffic Monitoring Android
        measures device network usage and evidence quality

The current product does not establish per-application historical context for Harness. A future bounded experiment may evaluate network behavior only after E3/E4 and only within the evidence supported by Android.

Recommended wording:

> Harness explores reusable on-device intelligence. Traffic Monitoring explores how Android can document the network conditions and uncertainty around local-first behavior. Neither project depends on the other to remain useful.

### 9.12 Maturity section

Use two lists or a matrix.

**Implemented**

- persistence and export;
- counters and in-process evidence;
- attribution engine;
- usage history;
- product analytics UX;
- Evidence Coverage and Measurement Health;
- reliability instrumentation.

**Validation still required**

- process-absent PendingIntent field behavior;
- 48–72 hour Standard-mode run;
- physical replay acceptance;
- multi-device and OEM matrix;
- real-phone usability and evidence reconciliation;
- release hardening.

**Planned**

- Evidence Timeline and Evidence Pack;
- Experiment Mode;
- Assertions;
- optional app context;
- optional open-observability adapter.

### 9.13 Final CTA

- **Kicker:** Traffic Monitoring for Android
- **Headline:** Measure the usage. Preserve how you know.
- **Body:** Explore the implementation, run the emulator build or contribute physical-device evidence across Android and OEM conditions.
- **Primary CTA:** Explore Traffic Monitoring Android on GitHub ↗
- **Secondary CTA:** View the Evidence & Observability family

## 10. Shared visual system

### 10.1 Brand relationship

Use the Traffic Monitoring shield consistently across both pages:

- one shield in the project sub-header;
- one strong shield or wordmark in the hero;
- no shield repeated inside every status or metric;
- no platform-specific distortion of the mark.

### 10.2 Page-scoped color tokens

Map the product brand into page-scoped variables rather than changing the complete site palette:

| Product role | Source color | Site use |
|---|---|---|
| Midnight | #020D2C | hero framing and deep identity surface |
| Deep Navy | #0E2345 | dark secondary surface |
| Royal Blue | #002996 | primary action and selection |
| Network Blue | #207CCE | links, series and standard emphasis |
| Signal Cyan | #0DC1F9 | live state and meaningful peak |
| Healthy | #22C55E | verified healthy state only |
| Warning | #F59E0B | limitation or experimental caution |
| Critical | #EF4444 | actual failure or degraded state |

The integration may define:

- --traffic-midnight;
- --traffic-navy;
- --traffic-royal;
- --traffic-network;
- --traffic-signal.

Semantic status must remain controlled by shared status tokens where possible.

### 10.3 Typography

- retain Plus Jakarta Sans for portfolio display headings;
- retain Inter for body copy;
- use the existing monospace stack only for formulas, status codes and technical evidence;
- do not import SF Pro or Android-specific fonts into the website.

### 10.4 Surface language

- use broad section planes, dividers and image-led compositions;
- use cards only when a card represents an actual status unit or evidence tier;
- avoid a dashboard-card mosaic on the marketing pages;
- preserve flat product screenshot treatment;
- use restrained borders and shadows;
- avoid decorative cybersecurity grids, locks or packet animations.

### 10.5 Motion

Implement at most:

1. hero identity and screenshot entrance;
2. one scroll-linked evidence progression;
3. subtle platform-row and screenshot affordance transitions.

All motion must respect prefers-reduced-motion and the page must remain complete without JavaScript.

## 11. Content and code architecture

### 11.1 New homepage content model

Add a dedicated evidence category instead of extending Pillar or ReferenceApplication.

Recommended types:

    EvidencePlatform
      id
      platform
      name
      headline
      description
      principles
      currentCapabilities
      currentStatus
      statusLabel
      limitations
      logoPath
      heroImage
      pageUrl
      repositoryUrl

    EvidenceSectionContent
      kicker
      title
      subtitle
      principles
      platforms
      bottomNote

Possible controlled platform IDs:

- traffic-monitoring-macos
- traffic-monitoring-android

Do not add these IDs to the Pillar or ReferenceApplication unions.

### 11.2 New files

    src/pages/traffic-monitoring.astro
    src/pages/traffic-monitoring-android.astro

    src/content/trafficMonitoring.ts
    src/content/trafficMonitoringAndroid.ts
    src/content/locales/en/trafficMonitoring.ts
    src/content/locales/en/trafficMonitoringAndroid.ts
    src/content/locales/en/evidence.ts

    src/components/evidence/
      EvidenceObservabilitySection.astro
      EvidencePlatformRow.astro
      EvidencePrinciples.astro

    src/components/trafficmonitoring/
      shared/
        TrafficBrandMark.astro
        TrafficEvidenceTier.astro
        TrafficStatusMatrix.astro
        TrafficPrivacyBoundary.astro
        TrafficFinalCta.astro
      macos/
        TrafficMacHero.astro
        TrafficMacMission.astro
        TrafficMacProblem.astro
        TrafficMacEvidence.astro
        TrafficMacSurfaces.astro
        TrafficMacCoverage.astro
        TrafficMacArchitecture.astro
        TrafficMacMaturity.astro
      android/
        TrafficAndroidHero.astro
        TrafficAndroidMission.astro
        TrafficAndroidDifference.astro
        TrafficAndroidSurfaces.astro
        TrafficAndroidEvidence.astro
        TrafficAndroidArchitecture.astro
        TrafficAndroidRoadmap.astro
        TrafficAndroidMaturity.astro

The final implementation may merge very small components, but it must not create one giant page component or force both platform narratives through an inflexible shared component.

### 11.3 New public assets

    public/images/traffic-monitoring/
      shield.png
      overview.webp
      trends.webp
      networks.webp
      applications.webp
      monitor.webp
      architecture.webp
      social-card.webp

    public/images/traffic-monitoring-android/
      shield.png
      wordmark.svg
      overview.webp
      networks.webp
      evidence.webp
      monitor.webp
      architecture.webp
      social-card.webp

Keep high-resolution zoom sources only where the normal responsive image is insufficient.

### 11.4 Existing files to update

    src/pages/index.astro
    src/types/content.ts
    src/content/index.ts
    src/content/i18n.ts
    src/content/locales/en/home.ts
    src/content/locales/en/site.ts
    src/components/hero/EcosystemMap.astro
    src/components/layout/ProductSubHeader.astro
    src/layouts/BaseLayout.astro
    src/styles/tokens.css
    docs/personal-landing/README.md

Possible contextual cross-links:

    src/components/closedroom/ClosedRoomTrust.astro
    src/components/harness/HarnessValues.astro
    src/components/sections/JourneySection.astro

Cross-links should be added only where they improve the narrative and must not imply a current runtime integration.

### 11.5 Content wrappers and localization

Follow the existing project-page pattern:

- an English source under src/content/locales/en;
- a stable re-export under src/content;
- registration in src/content/index.ts;
- homepage dictionary registration through i18n;
- typed interfaces adjacent to the project data until a genuinely reusable schema emerges.

The first implementation remains English-first. Italian should not be added by duplicating English content into the Italian dictionary.

### 11.6 Page composition

Each route should:

- render BaseLayout with page-specific metadata;
- render ProductSubHeader;
- use a neutral wrapper with id top inside BaseLayout;
- avoid a nested main element because BaseLayout already owns the primary main landmark;
- render platform-specific section components;
- reuse the global ImageZoomModal;
- use import.meta.env.BASE_URL for public assets and internal routing.

### 11.7 BaseLayout metadata

The current BaseLayout accepts page title and description but still emits the global canonical and social metadata.

Extend it to accept:

- canonicalPath;
- socialTitle;
- socialDescription;
- socialImage;
- optional structured-data type or project data.

Requirements:

- homepage behavior remains unchanged;
- project pages emit their own canonical URL;
- Open Graph URL, title, description and image are page-specific;
- Twitter metadata matches the page;
- preview builds remain noindex;
- production paths work with GitHub Pages base configuration.

### 11.8 ProductSubHeader

Reuse the current component. Extend only if needed for:

- a controlled badge tone;
- clearer current-section behavior;
- a shared shield logo without forced square cropping;
- accessible overflow affordance on narrow screens.

Do not add platform-switch tabs to ProductSubHeader in the first release. The family link in the final CTA and navigation dropdown is sufficient.

## 12. Asset plan

### 12.1 macOS assets available

The current repository provides:

- shield assets at multiple resolutions;
- Overview screenshot;
- Trends screenshot;
- Networks screenshot;
- Applications screenshot;
- Monitor screenshot;
- architecture diagram.

These are suitable source assets but not automatically publication-ready.

### 12.2 macOS sanitization gate

Before copying screenshots into the landing:

- replace personal hotspot or network names with neutral fixtures;
- remove personal device names;
- remove private timestamps or test-history details when unnecessary;
- remove installed-company or security-tool process names;
- remove local usernames and filesystem paths;
- verify that process/application examples were generated in a controlled test session;
- confirm that visible numbers are plausible test data;
- confirm that every displayed capability still exists.

Recommended controlled names:

- Home Wi-Fi
- iPhone Hotspot
- Office Ethernet
- ClosedRoom
- Local LLM Server
- Traffic Monitoring

Do not edit screenshots in a way that fabricates product behavior. Prefer recapturing with controlled data.

### 12.3 Android asset gap

The current repository provides:

- shield icon;
- wordmark;
- SVG lockup;
- architecture diagram.

It does not yet provide the product screenshot set required by the page.

Capture from the current emulator or a sanitized test device:

1. Overview with evidence summary;
2. Networks with at least one attributed network and explicit Unattributed state;
3. Evidence with coverage, health reason and continuity detail;
4. Monitor with technical evidence clearly separated;
5. optional dark-mode Overview if needed for social or theme QA.

The capture session must use deterministic seeded data or a documented controlled run.

### 12.4 Architecture asset review

The macOS architecture image should be checked against the current three data paths and Advanced Provider status.

The Android architecture image currently contains the Experiments/evaluation layer. Before publication:

- label it Planned;
- keep Pass, Fail and Inconclusive as future assertion semantics;
- avoid a visual path that makes Experiments look implemented;
- verify all component labels against the current README;
- provide an equivalent text flow.

### 12.5 Optimization

- produce responsive WebP or AVIF variants with a compatible fallback where needed;
- preserve explicit width and height;
- eager-load only the hero image;
- lazy-load below-the-fold images;
- use sizes and srcset;
- keep zoom sources bounded;
- avoid shipping all original 2230 × 1726 PNGs to every visitor;
- target a combined initial hero transfer below 500 KB on mobile where practical;
- review social images separately from in-page assets.

## 13. Cross-linking plan

### 13.1 Homepage entry points

- Evidence dropdown;
- hero ecosystem evidence rail;
- Evidence & Observability section platform CTAs.

### 13.2 macOS page return paths

- portfolio brand/home;
- Evidence family anchor;
- GitHub;
- optional contextual link to the Android implementation;
- optional future link to a public validation runbook.

### 13.3 Android page return paths

- portfolio brand/home;
- Evidence family anchor;
- GitHub;
- optional contextual link to the macOS implementation;
- contextual link to Android Local LLM Harness only in the ecosystem section.

### 13.4 Reference application links

One contextual link from ClosedRoom may use:

> Explore the network evidence layer →

It must be accompanied by copy that does not imply a completed audit integration.

Do not add Traffic Monitoring CTAs to every application card.

## 14. Implementation work packages

### WP1 - Accuracy snapshot

**Deliverables**

- README commit/date recorded for both projects;
- verified current versus experimental/planned capability inventory;
- approved page-level maturity labels;
- public claim matrix;
- source asset inventory;
- identified screenshot privacy risks.

**Completion condition**

- every proposed public statement maps to current repository evidence or is explicitly labelled experimental, pending or planned.

### WP2 - Strategic and homepage content

**Deliverables**

- approved mission revision;
- approved hero lede;
- updated challenge copy;
- Evidence & Observability section copy;
- platform summaries and status lines;
- Applications transition;
- navigation decision.

**Completion condition**

- a headings-only scan explains infrastructure, evidence and applications as three different roles.

### WP3 - Content model and page foundations

**Deliverables**

- EvidencePlatform and EvidenceSection content types;
- macOS and Android typed content dictionaries;
- content exports and i18n registration;
- BaseLayout per-page metadata support;
- route shells;
- ProductSubHeader configuration.

**Completion condition**

- both routes build with correct landmarks, canonical metadata and empty section shells.

### WP4 - Asset readiness

**Deliverables**

- sanitized macOS screenshot set;
- captured Android product screenshot set;
- reviewed platform architecture diagrams;
- responsive image variants;
- social cards;
- alt-text inventory.

**Completion condition**

- no screenshot exposes personal networks, private process inventory, device identifiers or unsupported behavior.

### WP5 - Homepage integration

**Deliverables**

- revised hero/mission copy;
- revised challenge item;
- evidence rail in EcosystemMap;
- EvidenceObservabilitySection;
- navigation dropdown;
- updated Applications transition;
- responsive and accessible textual fallback.

**Completion condition**

- Traffic Monitoring is clearly Evidence & Observability and is not visually grouped with pillars or reference applications.

### WP6 - macOS page

**Deliverables**

- hero and mission;
- practical problem narrative;
- three evidence tiers;
- product surface sequence;
- coverage and uncertainty;
- architecture;
- privacy boundary;
- maturity matrix;
- ecosystem relationship;
- final CTA.

**Completion condition**

- the page communicates current utility before advanced capability and never turns App Activity Preview into a locality verdict.

### WP7 - Android page

**Deliverables**

- hero and mission;
- What happened / How do we know narrative;
- Usage/Evidence/Experiments/Monitor progression;
- product surface sequence;
- Evidence Coverage and Measurement Health;
- four-tier architecture;
- M and E roadmap tracks;
- privacy boundary;
- Harness relationship;
- maturity and final CTA.

**Completion condition**

- implemented product capability and unresolved physical-device reliability are both obvious without opening GitHub.

### WP8 - Cross-links and documentation

**Deliverables**

- contextual ecosystem links;
- documentation map updates;
- route inventory updates;
- root README updates after implementation;
- source verification dates.

**Completion condition**

- all entry and return paths work without duplicated promotional clutter.

### WP9 - Verification and release

**Deliverables**

- clean production build;
- responsive visual QA;
- keyboard and screen-reader checks;
- reduced-motion check;
- internal/external link validation;
- metadata preview;
- screenshot privacy review;
- final claim review against both repositories;
- rollback-ready deployment.

**Completion condition**

- every acceptance criterion in this document passes or has an explicitly approved exception.

## 15. Acceptance criteria

### 15.1 Strategy

- [ ] Traffic Monitoring is presented as Evidence & Observability.
- [ ] The homepage still has exactly three AI infrastructure pillars.
- [ ] Traffic Monitoring is not included in ReferenceApplication.
- [ ] The two platform implementations share one strategic role but retain separate product stories.
- [ ] The products remain understandable without an AI use case.
- [ ] The integration strengthens the local-first mission without becoming anti-cloud.

### 15.2 Homepage

- [ ] Evidence appears after Infrastructure and before Applications.
- [ ] The hero copy connects control with measurable evidence.
- [ ] The ecosystem map uses a side rail or boundary, not a fourth runtime layer.
- [ ] Current and gated evidence relationships are visually and textually distinct.
- [ ] macOS and Android have one primary CTA each.
- [ ] The section avoids a generic equal-card grid.
- [ ] Navigation remains usable at desktop and mobile widths.
- [ ] The Evidence dropdown works with mouse, keyboard and touch.

### 15.3 macOS accuracy

- [ ] Core physical-interface evidence is described as current.
- [ ] Observation coverage and identity quality remain separate from usage totals.
- [ ] App Activity Preview is labelled Beta, non-privileged and best-effort.
- [ ] Preview totals are not described as locality or privacy evidence.
- [ ] Advanced Provider is labelled experimental and not release-validated.
- [ ] Byte accounting is not described as validated.
- [ ] Privacy Audit remains future only.
- [ ] The ad-hoc build limitation is accurate if download/run instructions are shown.

### 15.4 Android accuracy

- [ ] M1A and M1B emulator status is described accurately.
- [ ] M1C, M1E, M2 and M5 field gates remain visible.
- [ ] E1 is labelled implemented with product/device validation pending.
- [ ] E2 is next, E3/E4 are planned and E5 is exploratory.
- [ ] Evidence Coverage and Measurement Health remain separate.
- [ ] No-data does not become 100% coverage.
- [ ] Unattributed usage remains visible.
- [ ] Experiments are not presented as a current product surface.
- [ ] No all-device or all-OEM reliability claim is made.

### 15.5 User experience

- [ ] Each hero communicates its product in approximately five seconds.
- [ ] Each hero has one dominant real product visual.
- [ ] Product proof appears before detailed architecture.
- [ ] Every section has one responsibility and one dominant takeaway.
- [ ] Technical depth uses progressive disclosure.
- [ ] Maturity and limitations are visible, not buried in a footer.
- [ ] CTA labels explain the destination or outcome.

### 15.6 Responsive behavior

- [ ] Homepage and both pages work at 360, 768, 1024 and 1440 px.
- [ ] No horizontal page scroll occurs at 320 or 360 px.
- [ ] Evidence diagrams reflow or remain zoomable on mobile.
- [ ] ProductSubHeader remains usable without hiding the primary CTA.
- [ ] Tables convert to readable stacked rows where required.
- [ ] Screenshots remain meaningful and zoomable on touch devices.
- [ ] Layout remains coherent at 200% browser zoom.

### 15.7 Accessibility

- [ ] Each page has one main landmark.
- [ ] Heading hierarchy is valid.
- [ ] Every image has accurate alt treatment and explicit dimensions.
- [ ] Architecture diagrams have textual equivalents.
- [ ] Status is never communicated by color alone.
- [ ] Evidence line styles have a text legend.
- [ ] All controls and links have visible focus.
- [ ] ProductSubHeader, disclosures, zoom and CTAs work by keyboard.
- [ ] Reduced-motion preferences disable nonessential animation.
- [ ] VoiceOver can follow the primary page narrative.

### 15.8 Asset privacy

- [ ] No personal Wi-Fi or hotspot name is visible.
- [ ] No private device name is visible.
- [ ] No company/security-tool process inventory is visible.
- [ ] No username, filesystem path, email, token or device serial is visible.
- [ ] Test data is documented and does not resemble real personal history.
- [ ] Screenshot edits do not fabricate product behavior.
- [ ] Architecture images distinguish current, experimental and planned paths.

### 15.9 Performance

- [ ] Both pages are statically rendered.
- [ ] Only the hero image is eager-loaded.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Responsive images are used.
- [ ] Media dimensions prevent layout shift.
- [ ] Decorative motion creates no long task.
- [ ] No third-party product demo runtime is added.
- [ ] Lighthouse performance remains at least 95 in the agreed mobile profile.
- [ ] LCP remains below 2.5 seconds in target lab conditions.

### 15.10 SEO and technical quality

- [ ] npm run build passes from the current worktree.
- [ ] Both routes are emitted in the static build.
- [ ] Internal links respect Astro base-path configuration.
- [ ] Each page has a unique title and description.
- [ ] Each page emits its own canonical and social metadata.
- [ ] Social images render without private data.
- [ ] External GitHub links use safe target and rel behavior.
- [ ] Preview builds remain noindex.
- [ ] Existing deep-dive pages do not regress.
- [ ] Existing user changes in the worktree are preserved.

## 16. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Traffic Monitoring appears to be a fourth AI runtime | Ecosystem confusion | Create a separate Evidence category and side rail |
| Traffic Monitoring appears to be another consumer app | Strategic role is weakened | Place the section before Applications and explain the different validation role |
| One family page hides platform differences | Misleading capability and status | Keep two routes and platform-specific narratives |
| macOS preview is presented as privacy proof | False claim | Repeat best-effort and no-locality boundary in tier, screenshot and maturity sections |
| Advanced Provider breadth implies readiness | Credibility risk | Use experimental/not release-validated language and amber status |
| Android implementation is mistaken for field reliability | Misleading product maturity | Keep measurement and evidence tracks separate and expose physical gates |
| Android architecture makes Experiments look current | Roadmap confusion | Revise the image with explicit Planned state |
| Current screenshots expose personal context | Privacy leak | Recapture with controlled data and run an asset privacy gate |
| Navigation becomes overcrowded | Desktop/mobile usability regression | Replace Track record with Evidence in primary nav and test all breakpoints |
| Shared components erase platform identity | Generic pages | Share identity and status primitives only; keep narrative components platform-specific |
| Too many screenshots hurt performance | Slow mobile LCP and transfer | Optimize, lazy-load and limit each narrative moment to one image |
| Page becomes a README clone | Weak communication | Lead with product outcome, progressively disclose implementation detail |
| Status drifts after repository changes | Stale claims | Store lastVerified and recheck against README on each relevant release |
| BaseLayout emits homepage canonical for project pages | SEO duplication | Implement page-specific canonical and social metadata before activation |

## 17. Release sequence

### Phase A - Content and evidence approval

- approve the ecosystem category;
- approve hero and mission revisions;
- freeze current claim matrix;
- approve platform status labels;
- approve screenshot capture scenarios;
- approve route names.

### Phase B - Asset and foundation preparation

- sanitize or recapture macOS screenshots;
- capture Android product screenshots;
- revise architecture images;
- implement typed content;
- extend BaseLayout metadata;
- create isolated route shells.

### Phase C - Isolated page previews

- implement /traffic-monitoring;
- implement /traffic-monitoring-android;
- review both pages without homepage links;
- verify mobile, dark mode, content accuracy and image privacy;
- verify that the two pages feel related but not duplicated.

### Phase D - Homepage activation

- update mission and hero;
- update challenge copy;
- add the evidence rail;
- add the Evidence & Observability section;
- add navigation;
- add restrained contextual cross-links;
- validate every entry and return path.

### Phase E - Production release

- run the full build and QA matrix;
- review final claims against current READMEs;
- generate launch evidence;
- deploy through the existing GitHub Pages workflow;
- verify production assets, canonical URLs and base-path routing;
- retain the previous deployment artifact or commit for rollback.

## 18. Documentation maintenance

When implementation begins, update:

- 01-strategy-and-positioning.md
  - add Evidence & Observability as the third ecosystem category;
  - revise mission and core narrative;
- 02-information-architecture.md
  - insert the homepage evidence section;
  - add both deep-dive routes and entry paths;
- 03-content-specification.md
  - replace proposed homepage and page copy with approved text;
- 04-ux-ui-design-system.md
  - document the evidence rail, Traffic Monitoring brand mapping and status language;
- 05-technical-implementation-plan.md
  - add EvidencePlatform content, per-page metadata and route structure;
- 06-seo-analytics-accessibility.md
  - add page metadata, diagram text alternatives and asset-privacy rules;
- 07-acceptance-criteria-and-roadmap.md
  - add the new category and both routes to quality gates;
- docs/personal-landing/README.md
  - add this plan to the documentation map;
- root README.md
  - update Product direction, implemented routes and verification commands after release.

Repository-facing maintenance after launch:

- add each final portfolio route to the relevant project README;
- verify the page against the nearest source-of-truth product/maturity document;
- record last verification date or source commit in the landing content;
- review status text whenever M, E or Advanced Provider gates change.

Do not duplicate complete repository roadmaps in the landing documentation. Link to their authoritative project sources.

## 19. Definition of done

The integration is complete when:

1. the homepage explains Infrastructure, Evidence and Applications as three distinct ecosystem roles;
2. the local-first mission includes measurable evidence without becoming a universal verification claim;
3. /traffic-monitoring tells a current-utility-to-evidence story and preserves the boundary between core, preview and Advanced Provider;
4. /traffic-monitoring-android explains Usage, Evidence and Monitor while keeping Experiments and Assertions visibly future;
5. both pages expose maturity and uncertainty as product information;
6. all screenshots are current, sanitized, optimized and accessible;
7. the pages reuse the current Astro, content, ProductSubHeader, ImageZoom and design-token patterns;
8. navigation and ecosystem diagrams work with keyboard, touch, reduced motion and narrow screens;
9. canonical, social, responsive, accessibility, performance and link checks pass;
10. every public claim still matches the current project READMEs at release time.

The integration should leave visitors with one clear conclusion:

> Product-grade local-first systems need more than local execution. They need useful products, observable boundaries and evidence that remains honest about what was not known.
