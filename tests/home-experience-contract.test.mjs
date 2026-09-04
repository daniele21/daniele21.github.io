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
    'Hero / thesis',
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
  const components = ['<LandingHero', '<DecisionStage', '<BuildStage', '<TestStage', '<EvidenceStage', '<FinalCta'];
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

test('homepage identity stays in the shared header without duplicating the hero', () => {
  const hero = read('src/components/landing/LandingHero.astro');
  const header = read('src/components/landing/LandingHeader.astro');
  const heroShellRule = hero.match(/\.hero-shell\s*\{([^}]*)\}/)?.[1] ?? '';

  assert.match(hero, /class="shell hero-shell"/);
  assert.doesNotMatch(heroShellRule, /width:\s*100%/);
  assert.doesNotMatch(hero, /identity-strip|identity-avatar/);
  assert.match(header, /class="brand-avatar"/);
  assert.match(header, /src=\{resolveHref\(hero\.identity\.portraitPath\)\}/);
  assert.match(header, /class="brand-name"/);
  assert.match(header, /class="brand-role"/);
});

test('brand contract keeps motion purposeful and user-controlled', () => {
  const brand = JSON.parse(read('design/brand-kit.json'));
  assert.equal(brand.sourceOfTruth.mode, 'code-first');
  assert.match(brand.motion.language, /continuity/i);
  assert.ok(brand.motion.rules.some((rule) => /No scroll-jacking/i.test(rule)));
  assert.ok(brand.motion.rules.some((rule) => /Autoplaying/i.test(rule)));

  const closedRoomHero = read('src/components/closedroom/ClosedRoomHero.astro');
  assert.doesNotMatch(closedRoomHero, /setInterval\(/);
  assert.match(closedRoomHero, /aria-pressed/);
});
