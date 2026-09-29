import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

test('homepage UX contract makes outcome hierarchy and path semantics explicit', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));

  assert.equal(contract.designSourceOfTruth.mode, 'code-first');
  assert.equal(contract.experiencePriorities.audienceOrder[0], 'Technical Decision Maker');
  assert.match(contract.experiencePriorities.conflictRule, /thesis comprehension and evidence access/i);
  assert.deepEqual(contract.home.primaryJourney.slice(0, 6), [
    'Hero / end-to-end thesis',
    'Decide',
    'Build',
    'Test',
    'Measure',
    'Decide again',
  ]);
  assert.equal(contract.home.methodPath.noScrollJacking, true);
  assert.equal(contract.home.methodPath.scrollDirection, 'reversible');
  assert.match(contract.home.methodPath.reducedMotion, /static guide/i);
  assert.match(contract.home.methodPath.javascriptFailure, /show all content/i);
});

test('homepage path is progressive enhancement rather than a visibility dependency', () => {
  const layout = read('src/styles/layout.css');
  const page = read('src/pages/index.astro');

  assert.doesNotMatch(layout, /data-method-path-ready=['"]pending['"][\s\S]{0,240}opacity:\s*0/);
  assert.match(layout, /data-method-path-ready=['"]true['"]/);
  assert.match(page, /activateStaticFallback/);
  assert.match(page, /prefers-reduced-motion:\s*reduce/);
});

test('homepage preserves the declared narrative order', () => {
  const page = read('src/pages/index.astro');
  const components = ['<LandingHero', '<DecisionStage', '<BuildStage', '<TestStage', '<EvidenceStage', '<AboutSignal'];
  let previous = -1;
  for (const component of components) {
    const index = page.indexOf(component);
    assert.ok(index > previous, `${component} should follow the previous narrative surface`);
    previous = index;
  }
});

test('homepage section surfaces alternate through continuous gradients', () => {
  const layout = read('src/styles/layout.css');
  const plane = read('src/components/landing/PlaneTemplate.astro');
  const thread = read('src/components/landing/MethodThread.astro');

  assert.match(layout, /--journey-surface-tint:/);
  assert.match(plane, /plane-section--subtle[\s\S]{0,420}radial-gradient/);
  assert.match(thread, /var\(--journey-surface-tint[\s\S]{0,260}var\(--journey-surface-canvas/);
  assert.match(thread, /dir-rtl[\s\S]{0,260}var\(--journey-surface-canvas[\s\S]{0,260}var\(--journey-surface-tint/);
});

test('decision matrix keeps a local-first hierarchy without losing comparison semantics', () => {
  const matrix = read('src/components/landing/DecisionTable.astro');

  assert.match(matrix, /Local-first lens/);
  assert.match(matrix, /Where Local AI trades capacity for control/);
  assert.match(matrix, /class="mobile-cell-label"/);
  assert.match(matrix, /class="sr-only">Strength:/);
  assert.match(matrix, /--cloud-ink:/);
  assert.doesNotMatch(matrix, /\.hybrid-column\s*\{[\s\S]{0,120}background:/);
  assert.doesNotMatch(matrix, /\.cloud-column\s*\{[\s\S]{0,120}background:/);
});

test('homepage uses the canonical global header and keeps the hero focused on the thesis', () => {
  const page = read('src/pages/index.astro');
  const hero = read('src/components/landing/LandingHero.astro');
  const layout = read('src/layouts/BaseLayout.astro');
  const header = read('src/components/layout/SiteHeader.astro');
  const heroShellRule = hero.match(/\.hero-shell\s*\{([^}]*)\}/)?.[1] ?? '';

  assert.match(hero, /class="shell hero-shell"/);
  assert.doesNotMatch(heroShellRule, /width:\s*100%/);
  assert.doesNotMatch(hero, /identity-strip|identity-avatar|brand-avatar/);
  assert.doesNotMatch(page, /LandingHeader/);
  assert.match(layout, /import SiteHeader/);
  assert.match(layout, /<SiteHeader \/>/);
  assert.match(header, /class="brand-name"/);
  assert.match(header, /brandRole/);
});

test('brand contract keeps motion purposeful and user-controlled', () => {
  const brand = JSON.parse(read('design/brand-kit.json'));
  assert.equal(brand.sourceOfTruth.mode, 'code-first');
  assert.match(brand.motion.language, /continuity/i);
  assert.ok(brand.motion.rules.some((rule) => /No scroll-jacking/i.test(rule)));
  assert.ok(brand.motion.rules.some((rule) => /Autoplaying/i.test(rule)));

  const closedRoom = read('src/pages/closedroom.astro');
  assert.doesNotMatch(closedRoom, /setInterval\(/);
});


test('mobile-first contract keeps phone as the canonical surface', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));
  const tokens = read('src/styles/tokens.css');
  const layout = read('src/styles/layout.css');
  const plane = read('src/components/landing/PlaneTemplate.astro');
  const subheader = read('src/components/layout/ProductSubHeader.astro');

  assert.match(contract.mobileFirst.canonicalSurface, /320px.*430px/i);
  assert.deepEqual(contract.mobileFirst.primaryReviewWidths, [320, 390]);
  assert.equal(contract.mobileFirst.touchTargetPx, 48);
  assert.equal(contract.touchTargets.minWidthPx, 48);
  assert.equal(contract.touchTargets.minHeightPx, 48);

  assert.match(tokens, /--touch-target-min:\s*48px/);
  assert.match(layout, /Mobile-first method path/);
  assert.match(layout, /max-width:\s*760px[\s\S]*stage-copy[\s\S]*opacity:\s*1/);
  assert.match(plane, /padding-left:\s*34px/);
  assert.match(subheader, /min-height:\s*52px/);
});
