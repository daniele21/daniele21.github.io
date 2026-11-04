# /connect — motion design contract

This page is a **digital first impression**, not a product dashboard. Its one job is to communicate Daniele's local-first AI positioning and let a visitor connect quickly. Movement must help that job, never compete with the content.

## Guidance consulted

- [Anthropic Frontend Design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) — prefer one orchestrated reveal over scattered canned fades; make the memorable moment specific to the brief.
- [UI/UX Pro Max motion reference](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/references/quick-reference.md) — consistent motion hierarchy, spatial continuity, responsive state transitions and interaction feedback.
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) — favor CSS and compositor-friendly opacity/transform; preserve keyboard access and reduced motion.
- [Chrome modern web motion](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/motion) — avoid layout thrashing; treat motion as progressive enhancement.

## Motion hierarchy

1. **The entrance** — name/portrait → accent line → LOCAL-FIRST thesis → connection actions. One run per page load, finished in under one second. No autoplay loops.
2. **The story** — a luminous line progresses through Strategy → Build → Control as the visitor scrolls. Each numbered stop has a quiet active state; content is always available, whether JS runs or not.
3. **The interaction** — buttons lift slightly on hover (fine pointer only) and respond on press; the share action responds immediately and buttons show short feedback on hover/press. No large page parallax.

## Non-negotiable constraints

- No extra third-party motion library for this small Astro page.
- No looping visual effects, timers driving scroll animation, or `transition: all`.
- Prefer opacity and transform; never animate layout size or position.
- No hidden essential content in no-JavaScript mode.
- The experience is functional with `prefers-reduced-motion: reduce`, including Save contact, LinkedIn, Share card and the portfolio link.
- Keep touch targets at least 44px; keyboard focus must remain visible. One dominant full-width vCard CTA, then two equal LinkedIn/Share actions: no redundant QR control.
- A quick scroll must not leave a step in a false active state. On scroll, requestAnimationFrame reads the three step rectangles and updates a single CSS custom property and active class.

## QA and proof

- `tests/connect-card-contract.test.mjs` guards the design intent and user-facing content.
- `scripts/capture-connect-card.mjs` checks 360/390/1200px and reduced-motion, then runs a no-preference animation sequence and saves a short WebM as a CI artifact.
- Review the mobile screenshots plus motion recording before merging the PR.
