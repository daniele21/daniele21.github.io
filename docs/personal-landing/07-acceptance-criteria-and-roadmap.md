# 07 — Acceptance Criteria and Roadmap

## 1. Purpose

This document defines when the new personal landing page can be considered strategically correct, implementation-complete and safe to replace the current site.

Passing the build is not sufficient. The page must communicate the ecosystem hierarchy accurately and meet content, usability, accessibility, performance and privacy requirements.

## 2. Non-negotiable strategic acceptance criteria

The release is rejected if any of the following are false.

### Positioning

- [ ] The hero communicates that Daniele builds infrastructure for privacy-first AI products.
- [ ] The page does not present Daniele primarily through a job title, résumé or generic AI-expert claim.
- [ ] The strategic problem distinguishes a local model demo from a reliable local-AI product.
- [ ] Mission and vision are visible before the detailed project catalogue.

### Ecosystem hierarchy

- [ ] Local LLM Server, Local ASR Server and Android Local LLM Harness are presented as the three infrastructure pillars.
- [ ] The three pillars have equal strategic importance in the information hierarchy.
- [ ] ClosedRoom and Aura Finance are explicitly described as reference applications or proving grounds.
- [ ] ClosedRoom and Aura Finance are not presented as the complete boundary of the ecosystem.
- [ ] The future direction is framed as enabling additional privacy-first applications.
- [ ] Conceptual future areas are clearly labelled and never presented as launched products.

### Accuracy

- [ ] Current capabilities and future integrations are separated.
- [ ] Aura Finance is not shown as using the Android harness unless that integration exists.
- [ ] Production-readiness claims are supported by repository and device evidence.
- [ ] Every maturity status has been manually verified.
- [ ] Every external link points to the intended current destination.
- [ ] Privacy claims reflect the complete data path, not only local model execution.

### Greenfield compliance

- [ ] The new design does not reuse the legacy page structure.
- [ ] No legacy Bootstrap or page-specific CSS is imported.
- [ ] Legacy copy is not carried forward without explicit strategic approval.
- [ ] The page is not organized around speaking, mentoring or a chronological résumé.
- [ ] The visual system is newly defined from the documentation in this directory.

## 3. Content acceptance criteria

### Hero

- [ ] The hero can be understood in approximately five seconds.
- [ ] The headline is no longer than two short lines at common desktop widths.
- [ ] Supporting copy mentions local inference, private speech and Android/mobile scope.
- [ ] Primary CTA moves to infrastructure.
- [ ] Secondary CTA moves to the build journey.
- [ ] No unsupported metrics or awards distract from the proposition.

### Problem and mission

- [ ] The page explains why local inference infrastructure is necessary.
- [ ] The content is pragmatic and does not frame cloud use as inherently wrong.
- [ ] Mission describes building reusable infrastructure and validating it through applications.
- [ ] The operating model contains build, validate and publish/learn stages.

### Pillars

For each pillar:

- [ ] problem is stated;
- [ ] role is stated in one sentence;
- [ ] core capabilities are current and verified;
- [ ] strategic contribution is explicit;
- [ ] maturity label is visible;
- [ ] repository CTA works;
- [ ] optional architecture or test CTA works;
- [ ] technology labels do not replace the value explanation.

### Reference applications

For ClosedRoom:

- [ ] local ASR and LLM relationship is shown accurately;
- [ ] user problem and privacy value are clear;
- [ ] what the product validates is explicit;
- [ ] status is accurate;
- [ ] screenshot contains no sensitive meeting data.

For Aura Finance:

- [ ] local-first current architecture is described accurately;
- [ ] optional encrypted backup is not confused with a fully offline-only model;
- [ ] future Android-AI possibilities are visually separated from current functionality;
- [ ] what the product validates is explicit;
- [ ] screenshot contains no real personal financial data.

### Possibilities

- [ ] section broadens the strategy beyond two applications;
- [ ] every item is presented as a possible direction;
- [ ] section remains concise and does not look like a product launch grid.

### About and collaboration

- [ ] About connects Daniele's infrastructure, product and communication capabilities.
- [ ] About does not duplicate a full CV.
- [ ] Collaboration section lists relevant conversation types.
- [ ] Contact method works and does not require unnecessary personal data.
- [ ] GitHub, LinkedIn and stAI tuned links are present and correct.

## 4. UX acceptance criteria

### Navigation

- [ ] Header navigation matches the new section architecture.
- [ ] All anchors account for sticky-header offset.
- [ ] Mobile menu works at 320 px width.
- [ ] Mobile menu can be opened, navigated and closed by keyboard.
- [ ] Escape closes the mobile menu.
- [ ] Focus returns to the menu trigger after closing.

### Visual hierarchy

- [ ] Infrastructure is the strongest content block after the strategic framing.
- [ ] Reference applications are visually substantial but secondary.
- [ ] Future possibilities are lighter and conceptual.
- [ ] About and contact do not visually overpower the ecosystem.
- [ ] Status and current/future labels are understandable without relying on color.

### Responsive design

- [ ] No horizontal page scroll at 320 px.
- [ ] System diagrams reflow vertically on mobile.
- [ ] Pillar order remains LLM, ASR, Android.
- [ ] Text remains readable without pinch zoom.
- [ ] Product screenshots remain meaningful on small screens.
- [ ] Tap targets meet minimum size requirements.
- [ ] Layout remains coherent at 200% zoom.

### Interaction

- [ ] Essential information is available without hover.
- [ ] Essential information is available without JavaScript.
- [ ] Motion is nonessential and restrained.
- [ ] Reduced-motion preference disables nonessential animation.
- [ ] No scroll-jacking or auto-advancing carousels.
- [ ] All external-link behaviors are clear.

## 5. Accessibility acceptance criteria

Target WCAG 2.2 AA.

- [ ] Skip link is present and functional.
- [ ] Heading hierarchy is valid.
- [ ] All interactive controls have accessible names.
- [ ] Visible focus is present across the site.
- [ ] Text and UI contrast meet required ratios.
- [ ] Diagrams have equivalent text descriptions.
- [ ] Images have correct alt treatment.
- [ ] Status is not communicated by color alone.
- [ ] Automated axe checks have no serious or critical violations.
- [ ] Manual keyboard test is complete.
- [ ] VoiceOver test is complete for the main page journey.
- [ ] Contact errors, if a form exists, are announced accessibly.
- [ ] The page remains usable with CSS text-spacing overrides.

A documented exception may be accepted only if it does not block a core journey and has a follow-up issue with an owner.

## 6. Performance acceptance criteria

Release candidate targets:

- [ ] Lighthouse Performance score at least 95 on representative mobile configuration.
- [ ] Lighthouse Best Practices at least 95.
- [ ] Lighthouse SEO target 100.
- [ ] Lighthouse Accessibility target 100 and never below 95 without documented reason.
- [ ] LCP under 2.5 seconds in lab target conditions.
- [ ] CLS under 0.1.
- [ ] No long task caused by decorative animation.
- [ ] Compressed first-party JavaScript under 60 KB.
- [ ] Initial total transfer under 1.2 MB.
- [ ] All below-the-fold screenshots are lazy-loaded.
- [ ] All media reserves dimensions.
- [ ] No render-blocking third-party marketing script.

## 7. Privacy and security acceptance criteria

- [ ] No advertising or retargeting pixel.
- [ ] No unnecessary cookie.
- [ ] Analytics choice is documented on the privacy page.
- [ ] Analytics events do not contain personal or free-text data.
- [ ] No third-party social feed is embedded.
- [ ] No secret or private token is present in the built files.
- [ ] External links use safe attributes where appropriate.
- [ ] Contact handling and retention are described.
- [ ] Form, if present, collects only necessary fields.
- [ ] Screenshots and benchmark artifacts have been reviewed for sensitive data.
- [ ] Basic security headers or meta policies are configured where GitHub Pages allows.

## 8. Technical acceptance criteria

- [ ] Static production build succeeds from a clean checkout.
- [ ] Type checking succeeds.
- [ ] Content-schema validation succeeds.
- [ ] Broken-link check succeeds or documented external transient failures are reviewed.
- [ ] All required routes build.
- [ ] 404 route exists.
- [ ] Canonical and social metadata use the production URL.
- [ ] Deployment workflow targets GitHub Pages correctly.
- [ ] The live site does not depend on the GitHub API at runtime.
- [ ] Primary content renders without client-side JavaScript.
- [ ] No legacy CSS or JavaScript dependency is included accidentally.
- [ ] Rollback commit or tag is documented before cutover.

## 9. Browser and device matrix

Minimum manual validation:

### Desktop

- [ ] Safari current on macOS;
- [ ] Chrome current on macOS or Windows;
- [ ] Firefox current;
- [ ] Edge current where available.

### Mobile

- [ ] Safari on a recent iPhone viewport/device;
- [ ] Chrome on Android;
- [ ] 320 px narrow viewport;
- [ ] 375 px common viewport;
- [ ] 430 px large-phone viewport;
- [ ] landscape orientation.

### Input modes

- [ ] mouse;
- [ ] touch;
- [ ] keyboard only;
- [ ] screen reader for primary journey.

## 10. Evidence required before launch

Create a launch evidence folder or PR attachments containing:

- desktop screenshots;
- mobile screenshots;
- Lighthouse reports;
- accessibility audit summary;
- keyboard test notes;
- link-check result;
- production build log;
- metadata preview screenshots;
- list of manually verified project statuses and dates;
- privacy review notes;
- final asset inventory.

## 11. Delivery roadmap

### Milestone 1 — Strategy approved

Deliverables:

- positioning and ecosystem hierarchy;
- target audiences;
- information architecture;
- English copy;
- success model.

Completion condition:

- Daniele confirms the three pillars/reference-applications hierarchy;
- no unresolved strategic ambiguity remains.

### Milestone 2 — Evidence and asset readiness

Deliverables:

- verified project facts;
- selected repository and architecture links;
- project maturity statuses;
- ClosedRoom screenshots;
- Aura Finance screenshots;
- portrait decision;
- social links;
- contact method.

Completion condition:

- no placeholder destination is required for core page sections.

### Milestone 3 — UX and visual design

Deliverables:

- low-fidelity page flow;
- responsive wireframes;
- visual direction;
- design tokens;
- hero ecosystem map;
- pillar cards;
- application case studies;
- mobile navigation prototype;
- accessibility annotations.

Completion condition:

- hierarchy works at 375 px and 1440 px;
- design does not resemble the legacy portfolio;
- infrastructure visibly dominates the project narrative.

### Milestone 4 — Foundation implementation

Deliverables:

- Astro project;
- TypeScript and content schemas;
- base layout;
- tokens;
- deployment workflow;
- initial tests.

Completion condition:

- static preview deploys;
- no legacy dependency is imported;
- clean build and validation pass.

### Milestone 5 — Core narrative implementation

Deliverables:

- header;
- hero;
- problem;
- mission;
- three pillars;
- system relationship diagram.

Completion condition:

- strategy is understandable without the lower half of the page;
- responsive and keyboard behavior passes.

### Milestone 6 — Product evidence implementation

Deliverables:

- ClosedRoom case study;
- Aura Finance case study;
- possibility map;
- principles;
- optimized media.

Completion condition:

- current versus future capabilities are unambiguous;
- applications clearly validate the stack.

### Milestone 7 — Journey and conversion

Deliverables:

- evidence feed;
- About;
- collaboration section;
- footer;
- privacy page;
- analytics if approved.

Completion condition:

- all defined audiences have an intentional next step.

### Milestone 8 — Launch readiness

Deliverables:

- complete quality evidence;
- final content review;
- SEO/social validation;
- production deployment plan;
- rollback plan.

Completion condition:

- all non-negotiable criteria pass;
- any accepted exceptions are documented;
- Daniele approves cutover.

## 12. Post-launch roadmap

### Phase A — Validate positioning

First four to six weeks:

- collect qualitative feedback;
- review which pillar receives qualified interest;
- identify misunderstandings;
- review collaboration enquiries;
- adjust copy before adding more features.

### Phase B — Strengthen evidence

- publish Android device matrix;
- add benchmark summaries;
- add architecture decisions;
- expose reliable release information;
- add product workflow clips with captions;
- link technical articles to relevant sections.

### Phase C — Add project depth

Possible additions:

- dedicated pillar detail pages;
- dedicated reference-application pages;
- benchmark methodology pages;
- public roadmap;
- contribution/testing guide;
- selected case studies.

Do not add these until the single-page positioning has been validated.

### Phase D — Localization

Add Italian after:

- English copy stabilizes;
- content files are localization-ready;
- navigation and metadata strategy are defined;
- long-copy responsive tests pass.

### Phase E — Product conversion

As products mature, add only evidence-backed conversions:

- ClosedRoom download or waitlist;
- Aura Finance public demo;
- Android harness test build;
- contributor onboarding;
- privacy-first AI feasibility service.

## 13. Maintenance model

### Monthly

- verify project status;
- verify links;
- add meaningful evidence entries;
- review contact outcomes.

### Quarterly

- review positioning;
- update About copy;
- assess whether future directions remain relevant;
- review analytics necessity and privacy;
- run accessibility and performance regression checks.

### Per release

- update relevant project capabilities;
- add evidence entry;
- verify maturity status;
- verify screenshots;
- update `lastVerified` date;
- review whether landing claims still match repository documentation.

## 14. Final launch decision

The new page is ready to replace the current landing only when it passes all four tests:

1. **Clarity:** a new visitor understands the mission and ecosystem hierarchy.
2. **Credibility:** claims are supported by inspectable projects and honest statuses.
3. **Usability:** the page works across mobile, keyboard and assistive technology.
4. **Restraint:** the implementation remains fast, privacy-conscious and free from unnecessary complexity.

The purpose of the launch is not to publish a prettier portfolio. It is to establish a durable public position around building the foundations for privacy-first AI products.
