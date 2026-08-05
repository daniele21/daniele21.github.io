# 06 — SEO, Analytics and Accessibility

## 1. Search strategy

The landing should be optimized for Daniele's name and for a narrow set of concepts that accurately reflect the work.

### Primary search intent

- Daniele Moltisanti;
- local-first AI;
- privacy-first AI products;
- local LLM infrastructure;
- Android local LLM;
- on-device AI Android;
- local speech recognition;
- privacy-first meeting AI.

Do not overload the page with repetitive keywords or try to rank for broad terms such as `artificial intelligence expert`.

## 2. On-page SEO requirements

### Document structure

- one descriptive `h1`;
- logical heading hierarchy;
- semantic landmarks: `header`, `nav`, `main`, `section`, `aside` where appropriate, `footer`;
- stable section IDs;
- meaningful link labels;
- text equivalents for diagrams.

### Metadata

Required:

- unique title;
- meta description;
- canonical URL;
- Open Graph title, description, image and URL;
- Twitter/X card metadata;
- author metadata;
- favicon and web manifest where appropriate;
- theme color;
- language declaration.

### Structured data

Add JSON-LD for:

- `Person`;
- `WebSite`;
- `ProfilePage` where appropriate;
- `SoftwareSourceCode` only for clearly described public repositories;
- `SoftwareApplication` only for products with enough public, accurate information.

The `Person` entity may include:

- name;
- public URL;
- public social profiles;
- job title expressed conservatively;
- areas of knowledge;
- image if published intentionally.

Do not include private contact information, unsupported awards or employment claims that are not meant to be public.

### Internal linking

- Hero CTA links to `#infrastructure`.
- Pillars link to architecture, repositories and relevant evidence.
- ClosedRoom links back to the desktop pillars it validates.
- Aura Finance links to its local-first architecture and clearly marked future Android path.
- Building-in-public entries link to the relevant pillar or application.
- About links to professional profiles rather than duplicating a full résumé.

## 3. URL and canonical strategy

Production canonical:

`https://daniele21.github.io/`

Use a custom domain later only after deciding the long-term personal brand domain. When a custom domain is introduced:

- update canonical and social URLs;
- add the GitHub Pages `CNAME` file;
- enforce HTTPS;
- redirect or preserve the GitHub Pages URL appropriately;
- verify search-console ownership;
- avoid duplicate indexation.

Section anchors should remain stable across redesigns.

## 4. Social sharing

The page will frequently be shared from LinkedIn and GitHub. Social presentation is therefore a core requirement.

### Social-card requirements

- 1200 × 630 px;
- title readable at small preview size;
- Daniele's name;
- the privacy-first AI positioning;
- restrained three-pillar visual;
- no repository-star counters;
- no detailed architecture text;
- compressed for fast delivery.

### Link-preview validation

Before launch, validate:

- LinkedIn preview;
- Slack/Discord preview;
- WhatsApp preview where practical;
- X/Twitter card;
- browser title and favicon.

## 5. Analytics philosophy

Measurement should help determine whether the positioning is understood and whether qualified visitors reach relevant destinations.

Avoid analytics that collect more data than needed.

### Recommended options

In priority order:

1. privacy-friendly aggregate analytics with no cookies and minimal identifiers;
2. self-hosted or EU-hosted analytics if operationally reasonable;
3. no analytics for the initial release, using GitHub and contact outcomes manually;
4. Google Analytics only after an explicit privacy and consent assessment.

The site should not add a consent banner merely to support low-value marketing scripts.

## 6. Event model

Use a small controlled event taxonomy.

### Navigation events

- `nav_select`
  - `section`
  - `source: header | footer | inline`

### Project events

- `project_open`
  - `project_id`
  - `destination: repository | architecture | test | product`
  - `section`

### Evidence events

- `evidence_open`
  - `evidence_id`
  - `category`
  - `project_id`

### Collaboration events

- `collaboration_start`
  - `method: email | form | linkedin | calendar`
  - `source_section`

### Content events

- `content_open`
  - `destination: linkedin | staituned | github`
  - `content_id` where available.

Do not send:

- email addresses;
- form contents;
- GitHub usernames entered by visitors;
- full external URLs containing personal query parameters;
- sensitive free-text values.

## 7. Outcome dashboard

Review monthly rather than optimizing daily.

### Core metrics

- infrastructure-section reach;
- project repository click-through by pillar;
- architecture/test click-through;
- reference-application click-through;
- collaboration starts;
- repeat visits to building-in-public content;
- referral sources producing qualified actions.

### Qualitative evidence

Record:

- collaboration enquiries and which concept they mention;
- tester requests;
- contributor activity;
- recruiter or founder conversations;
- whether people describe the ecosystem correctly;
- recurring confusion in feedback.

### Interpretation rule

Low GitHub-star growth does not automatically imply failure. A small number of qualified testers, integrations or strategic conversations may be more valuable.

## 8. Privacy requirements

### Site-level privacy

- no unnecessary cookies;
- no advertising pixels;
- no embedded social feeds;
- no fingerprinting;
- no automatic third-party video loads;
- no remote fonts if a suitable self-hosted or system alternative exists;
- no collection of form fields beyond what is needed;
- a concise privacy page describing analytics and contact handling.

### Contact form, if implemented

Required fields:

- name;
- email;
- message.

Optional:

- conversation topic using a fixed select.

Do not require:

- company;
- phone number;
- marketing consent;
- budget;
- address.

Required behavior:

- clear purpose statement;
- retention statement;
- spam protection that does not heavily track users;
- server-side validation;
- no sensitive content logged unnecessarily;
- success and error states accessible to screen readers.

A direct email link is acceptable and simpler for the first release.

## 9. Performance targets

Measure on mobile and desktop under realistic conditions.

### Core Web Vitals targets

At the 75th percentile where field data becomes available:

- LCP: under 2.5 seconds;
- INP: under 200 milliseconds;
- CLS: under 0.1.

### Lighthouse targets for release candidate

- Performance: at least 95;
- Accessibility: 100 target, never below 95 without documented reason;
- Best Practices: at least 95;
- SEO: 100 target.

### Page-weight targets

Initial page, excluding optional large media opened by the user:

- total transfer under 1.2 MB;
- JavaScript under 60 KB compressed, preferably under 30 KB;
- fonts under 150 KB combined compressed;
- hero imagery under 250 KB;
- no single screenshot over 300 KB in its default rendered variant.

### Performance rules

- preload only critical assets;
- lazy-load below-the-fold screenshots;
- reserve media dimensions;
- avoid autoplay video;
- avoid large client-side libraries;
- use static HTML for all primary content;
- defer nonessential scripts;
- cache immutable assets with content hashes where deployment permits.

## 10. Accessibility standard

Target WCAG 2.2 AA.

### Semantic requirements

- one `main` landmark;
- skip link;
- descriptive page title;
- logical headings;
- lists rendered as lists;
- links and buttons used according to semantics;
- architecture diagrams accompanied by equivalent text;
- status conveyed by label, not color alone.

### Keyboard requirements

A keyboard user must be able to:

- reach and use all navigation;
- open and close the mobile menu;
- dismiss the menu with Escape;
- activate every CTA;
- use evidence filters;
- open and close disclosures;
- submit the contact form;
- see a visible focus indicator at all times.

No focus traps except the intentional mobile-menu dialog, where focus trapping is required while open.

### Screen-reader requirements

- external links have understandable destination labels;
- decorative icons are hidden;
- meaningful icons have accessible names or adjacent text;
- project status includes an explanatory label;
- diagram descriptions communicate direction and relationship;
- dynamic status messages use appropriate live regions;
- form errors identify both the field and resolution.

### Visual requirements

- normal text contrast at least 4.5:1;
- large text contrast at least 3:1;
- UI component and focus indicator contrast at least 3:1;
- content remains usable at 200% zoom;
- no information is lost at 320 CSS px width;
- text spacing overrides do not break layout;
- hover information is also available by keyboard and touch.

### Motion requirements

- respect reduced-motion preference;
- disable nonessential transforms and line animations;
- no flashing content;
- no motion triggered repeatedly on minor scroll changes;
- no auto-advancing carousel.

### Media requirements

- captions for spoken video;
- transcript for substantial audio/video;
- no autoplay with sound;
- controls accessible by keyboard;
- screenshots use meaningful alt text focused on what the image proves.

## 11. Accessibility test matrix

### Automated

- axe-core on the home page and privacy page;
- Lighthouse accessibility audit;
- HTML validation;
- link checker;
- contrast checking against token values.

### Manual keyboard

Test in:

- Chrome;
- Firefox;
- Safari.

### Screen reader

Minimum:

- VoiceOver with Safari on macOS;
- VoiceOver on iOS if available;
- NVDA with Firefox or Chrome where available.

### Responsive and zoom

- 320 px viewport;
- 375 px viewport;
- 400% browser zoom for reflow checks where practical;
- landscape mobile;
- desktop with enlarged text.

## 12. Error and edge states

Document and design:

- broken external destination;
- missing product screenshot;
- no evidence items;
- JavaScript disabled;
- analytics blocked;
- contact-form failure;
- offline or weak network;
- unavailable font;
- long translated copy in a future Italian version.

The static narrative and project links should remain useful when optional enhancements fail.

## 13. Content freshness

Every project record must include a `lastVerified` date in source data.

Recommended review cadence:

- project status and capability review: monthly while active;
- links: checked automatically on every build and weekly schedule;
- biography and collaboration copy: quarterly;
- metadata and social preview: whenever positioning changes;
- privacy page: whenever tracking or contact handling changes.

Stale evidence entries may remain visible as dated history, but project status must never be inferred from old evidence.
