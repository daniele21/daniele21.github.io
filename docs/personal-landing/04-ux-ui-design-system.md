# 04 — UX/UI Design System

## 1. Design objective

The landing should feel like the public interface of a serious technical direction, not a traditional personal portfolio and not a generic AI startup template.

The design must visually reinforce four ideas:

1. reusable infrastructure;
2. privacy and user control;
3. evidence and technical credibility;
4. infrastructure validated through real products.

The visual system should make the hierarchy unmistakable:

- infrastructure pillars are primary;
- reference applications are secondary evidence;
- future application areas are conceptual;
- Daniele's biography supports the thesis rather than leading it.

## 2. Greenfield rule

Do not reuse the current website's:

- Bootstrap-based composition;
- hero structure;
- glass cards;
- navigation pattern;
- section order;
- color palette;
- typography;
- icon-led CTA card grid;
- current project cards;
- speaking-first or consulting-first hierarchy;
- legacy animations or visual assets unless independently reapproved.

The new page may live in the same repository but must be designed as a new product.

## 3. Visual direction

### Recommended direction: technical editorial system

Combine:

- an editorial reading experience;
- precise technical diagrams;
- product screenshots used as evidence;
- restrained motion;
- strong typography;
- generous spacing;
- high-contrast surfaces;
- subtle references to local processing and system boundaries.

The result should feel closer to a well-designed technical manifesto or product-lab site than a résumé template.

### Visual metaphor

Use **boundaries, flows and layers** rather than brains, robots or clouds.

Useful motifs:

- device frames;
- local processing boundaries;
- directed data flows;
- modular blocks;
- status indicators;
- benchmark traces;
- architecture lines;
- contained nodes representing data that stays local.

Avoid:

- neon cyberpunk grids;
- glowing AI brains;
- excessive particle effects;
- random code rain;
- generic 3D robots;
- constant gradient animation;
- lock icons repeated in every section.

## 4. Color system

The palette should communicate trust, technical precision and warmth without looking corporate or clinical.

### Recommended semantic palette

#### Base

- `surface.canvas`: near-white with a slight cool neutral tint;
- `surface.muted`: light neutral for section separation;
- `surface.inverse`: deep charcoal or near-black for selected contrast sections;
- `text.primary`: near-black, not pure black;
- `text.secondary`: neutral gray with WCAG-compliant contrast;
- `border.subtle`: low-contrast neutral;
- `border.strong`: medium neutral.

#### Accent

Use one principal accent associated with local infrastructure, such as a restrained blue, teal or indigo. Select one after contrast testing.

Semantic project accents may be used sparingly:

- Local LLM Server: reasoning accent;
- Local ASR Server: speech accent;
- Android LLM Harness: mobile accent;
- ClosedRoom and Aura Finance: product accents derived from, but visually subordinate to, pillar colors.

Do not assign unrelated rainbow colors simply to differentiate cards.

### Privacy treatment

Privacy should be represented through contained surfaces, clear boundaries and controlled data flows, not only green colors or padlock symbols.

## 5. Typography

### Requirements

- highly readable body type;
- distinctive but restrained display type;
- excellent rendering on macOS, Windows and Android;
- variable fonts preferred if self-hosted efficiently;
- no more than two font families;
- fallback stacks defined;
- body line length between approximately 60 and 75 characters.

### Recommended scale

Use fluid type with `clamp()` and a modular hierarchy.

- Hero display: 56–80 px desktop, 38–50 px mobile;
- Section title: 38–52 px desktop, 30–38 px mobile;
- Card title: 22–28 px;
- Body large: 18–21 px;
- Body: 16–18 px;
- Supporting/meta: 13–15 px.

### Typography behavior

- Headlines should be concise and use sentence case.
- Avoid centered paragraphs longer than two lines.
- Long sections should be left-aligned.
- Use monospace only for technical labels, status, architecture annotations and code-like metadata.
- Do not render entire paragraphs in monospace.

## 6. Layout system

### Grid

- Maximum content width: approximately 1200–1280 px.
- Reading width: approximately 720–800 px.
- Use a 12-column desktop grid and flexible mobile layout.
- Maintain consistent horizontal gutters through layout tokens.

### Vertical rhythm

Use a spacing scale rather than one-off values. Suggested base: 4 px or 8 px.

Key section spacing:

- desktop section block: 112–160 px;
- tablet: 88–120 px;
- mobile: 64–88 px.

### Hierarchy

The three pillars should occupy the strongest visual block after the hero and problem statement.

Reference applications should be large enough to show real product evidence, but their section styling must make clear that they validate the infrastructure rather than define it.

Future possibilities should use a lighter, more conceptual visual treatment.

## 7. Core components

### 7.1 Header

Variants:

- initial transparent/quiet state;
- scrolled elevated state;
- mobile overlay state.

Requirements:

- no more than six primary navigation items on desktop;
- one highlighted collaboration CTA;
- visible focus states;
- current anchor state optional;
- no oversized logo mark unless a purposeful identity is created.

### 7.2 Hero system map

The hero visual should communicate:

```text
Local LLM Server ─┐
Local ASR Server ─┼─→ privacy-first desktop products
                  │
Android Harness ──┴─→ privacy-first mobile products
```

This should be an accessible HTML/SVG composition rather than a raster illustration with embedded text.

Requirements:

- semantic fallback text;
- responsive reflow;
- no horizontal overflow;
- subtle entrance motion only if permitted by motion preference;
- nodes must remain readable at 320 px viewport width.

### 7.3 Comparison component

Used in the problem section.

Requirements:

- two clear states on desktop;
- stacked sequence on mobile;
- avoid red-versus-green oversimplification;
- use labels and structure, not color alone;
- support screen-reader linear order.

### 7.4 Pillar card

Pillar cards are the most important reusable component.

Required fields:

- label;
- title;
- role;
- description;
- capability list;
- strategic contribution;
- status;
- stack tags;
- CTA group.

Visual requirements:

- equal top-level dimensions on desktop where practical;
- content may expand without forcing identical text truncation;
- status shown as text and symbol, not color alone;
- project accent used as a small structural signal;
- no generic stock illustration.

Interaction:

- entire card should not be one large link if it contains multiple CTAs;
- hover effects must be subtle;
- keyboard focus order must follow content order;
- optional detail expansion must use native or accessible disclosure behavior.

### 7.5 Architecture flow

Use an SVG or CSS grid diagram to explain composition.

Requirements:

- labels remain selectable text where possible;
- arrows include accessible descriptions;
- mobile layout becomes a vertical process;
- animation is optional and never required to understand the relationship;
- diagrams must have a textual equivalent immediately adjacent or in an accessible description.

### 7.6 Reference application module

This component should include:

- product screenshot or UI crop;
- product category;
- product name and value proposition;
- infrastructure relationship;
- what it validates;
- maturity status;
- CTA.

Visual hierarchy:

- product screenshot is evidence, not decoration;
- `What it validates` should be visually distinct;
- ClosedRoom may show an end-to-end processing flow;
- Aura Finance must separate current local-first architecture from future Android-AI possibilities.

### 7.7 Principle module

Use a numbered or indexed system rather than disconnected icon cards.

Example:

```text
01  Local by default
02  Privacy by architecture
03  Explicit model control
...
```

This gives the principles the feel of an operating system rather than marketing claims.

### 7.8 Evidence entry

Required fields:

- date;
- category;
- title;
- one-sentence result or learning;
- project tag;
- source URL.

Optional visual:

- benchmark thumbnail;
- architecture snippet;
- release indicator.

Avoid a generic blog-card grid with large stock images.

### 7.9 CTA and button system

Button hierarchy:

- primary solid;
- secondary outline or text-with-arrow;
- tertiary inline link;
- external-link treatment.

Rules:

- no more than one primary CTA per section;
- button labels must describe the destination;
- avoid repeated `Learn more`;
- external destinations should be indicated accessibly;
- buttons must not be used for navigation when links are semantically correct.

### 7.10 Status system

Controlled statuses:

- Experimental;
- Active development;
- Beta;
- Reference-ready;
- Production-ready;
- Planned integration.

Each status has:

- label;
- semantic icon or marker;
- accessible explanation;
- optional last-verified date.

Do not infer status automatically from commit activity.

## 8. Motion

Motion should clarify relationships and state, not create spectacle.

Permitted examples:

- subtle hero-node connection reveal;
- line drawing for architecture flow;
- small content fade/translate on first entry;
- hover elevation of cards;
- disclosure expansion;
- active navigation indicator.

Requirements:

- respect `prefers-reduced-motion`;
- no essential content hidden behind animation completion;
- avoid scroll-jacking;
- avoid long parallax sequences;
- avoid animations that delay reading;
- keep default transitions around 150–300 ms;
- animated diagrams should pause when offscreen if resource-intensive.

## 9. Responsive behavior

### Breakpoint philosophy

Use content-driven breakpoints rather than designing only for common devices.

Minimum test widths:

- 320 px;
- 375 px;
- 430 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px.

### Mobile rules

- narrative order remains unchanged;
- header becomes a compact menu;
- hero CTAs stack if necessary;
- system map becomes vertical;
- pillar cards stack in fixed order;
- project screenshots remain legible and do not become tiny desktop mockups;
- capability tags wrap naturally;
- diagrams use vertical flows;
- no text smaller than 14 px for meaningful content;
- touch targets at least 44 × 44 CSS px.

### Large-screen rules

- do not stretch paragraph measure excessively;
- use whitespace rather than oversized cards;
- architecture diagrams may expand, but labels stay close to related nodes;
- maximum page width remains controlled.

## 10. Imagery and assets

### Preferred asset types

- real product screenshots;
- architecture diagrams;
- benchmark charts;
- device photographs only when they prove real testing;
- restrained portrait in About;
- repository or release metadata shown as designed UI, not raw screenshots when possible.

### Asset requirements

- modern formats such as AVIF/WebP with fallback where needed;
- responsive `srcset`;
- explicit width and height to prevent layout shift;
- descriptive alt text;
- decorative assets use empty alt text;
- no text embedded in raster images when HTML text can be used;
- screenshots must not expose personal or sensitive data.

## 11. Dark mode

Dark mode is optional for the first release.

It should be implemented only if:

- both palettes are intentionally designed;
- all diagrams and screenshots remain readable;
- contrast is tested in both modes;
- system preference is respected;
- no theme flash occurs;
- the theme switch is accessible.

A high-quality single theme is preferable to an incomplete dual-theme system.

## 12. Accessibility design requirements

Target WCAG 2.2 AA.

Required:

- semantic heading order;
- visible keyboard focus;
- sufficient color contrast;
- content not dependent on color alone;
- skip-to-content link;
- accessible mobile navigation;
- descriptive link text;
- reduced-motion support;
- no auto-playing audio or video;
- captions/transcripts for video content;
- accessible diagrams with textual equivalents;
- form errors associated with fields;
- minimum pointer target sizing;
- zoom support up to 200% without loss of content.

## 13. Anti-template quality checklist

The design should be rejected if it contains several of these characteristics:

- oversized gradient headline with no clear supporting hierarchy;
- repeated rounded glass cards everywhere;
- generic three-feature icon row;
- random bento grid with no narrative logic;
- animated starfield or grid background;
- identical project cards that hide strategic differences;
- dozens of skill badges;
- generic portrait plus résumé headline as hero;
- testimonials inserted without relevance to the local-AI mission;
- excessive marketing language without repository evidence.

## 14. Design deliverables

Before implementation, produce:

1. low-fidelity page flow;
2. desktop wireframe;
3. mobile wireframe;
4. visual direction board;
5. token proposal;
6. hero system-map exploration;
7. pillar-card component states;
8. reference-application module states;
9. architecture diagram states;
10. responsive prototypes for 375 px and 1440 px;
11. accessibility annotations;
12. asset list with source and privacy review.
