import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const phases = ['decide', 'build', 'test', 'measure', 'decide-again'];
const navigationLabels = ['Overview', 'Decide', 'Build', 'Test', 'Measure', 'Decide again'];

const projectPages = [
  { path: 'src/pages/android-local-llm-harness.astro', archetype: 'experiment' },
  { path: 'src/pages/local-llm-server.astro', archetype: 'infrastructure' },
  { path: 'src/pages/local-asr-server.astro', archetype: 'infrastructure' },
  { path: 'src/pages/closedroom.astro', archetype: 'product' },
  { path: 'src/pages/aura-finance.astro', archetype: 'product' },
  { path: 'src/pages/redact-guard.astro', archetype: 'product' },
  { path: 'src/pages/performance-lab.astro', archetype: 'experiment' },
  { path: 'src/pages/traffic-monitoring.astro', archetype: 'experiment' },
  { path: 'src/pages/traffic-monitoring-android.astro', archetype: 'experiment' },
];

test('project-page UX contract declares the shared journey', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));
  assert.equal(contract.projectPages.contract, 'design/project-page-contract.md');
  assert.deepEqual(contract.projectPages.navigation, navigationLabels);
  assert.deepEqual(contract.projectPages.primaryJourney, [...navigationLabels, 'Next step']);
  assert.equal(contract.projectPages.rules.verifiedEvidenceOnly, true);
  assert.equal(contract.projectPages.rules.missingEvidenceMustBeExplicit, true);
  assert.equal(contract.projectPages.rules.meaningfulTextNeverBelow14Px, true);
  assert.equal(contract.projectPages.rules.mobileActivePhaseMustRemainVisible, true);
  assert.equal(contract.projectPages.routes.length, projectPages.length);
  assert.match(contract.adaptiveContent.tables, /stacked labeled rows/i);
  assert.match(contract.adaptiveContent.code, /keyboard-focusable horizontal scroller/i);
});

test('all project pages preserve one predictable phase order', () => {
  for (const projectPage of projectPages) {
    const source = read(projectPage.path);
    assert.match(source, /data-project-page/);
    assert.ok(source.includes(`data-project-archetype="${projectPage.archetype}"`));
    assert.match(source, /ProjectPhase/);
    assert.match(source, /ProjectDecisionBand/);

    let previousPhaseIndex = -1;
    for (const phase of phases) {
      assert.ok(source.includes(`href: '#${phase}'`));
      const phaseIndex = source.indexOf(`id="${phase}"`, previousPhaseIndex + 1);
      assert.ok(phaseIndex > previousPhaseIndex);
      previousPhaseIndex = phaseIndex;
    }

    assert.equal((source.match(/<ProjectPhase\b/g) || []).length, 5);
  }
});

test('shared project subheader uses canonical tokens, accessible targets and adaptive phase visibility', () => {
  const source = read('src/components/layout/ProductSubHeader.astro');

  assert.doesNotMatch(source, /var\(--text-small\)/);
  assert.doesNotMatch(source, /var\(--surface-blue\)/);
  assert.match(source, /var\(--text-caption\)/);
  assert.match(source, /var\(--surface-blue-subtle\)/);
  assert.match(source, /min-height: var\(--touch-target-min\)/);
  assert.match(source, /aria-current/);
  assert.match(source, /href === '#top'/);
  assert.match(source, /requestAnimationFrame/);
  assert.match(source, /mask-image:/);
  assert.match(source, /mobileNavigation\.matches/);
  assert.match(source, /nav\.scrollTo/);
});

test('technical content follows the narrow-screen adaptive contract', () => {
  const table = read('src/components/localllm/LocalLlmBackends.astro');
  assert.match(table, /data-label="Backend engine"/);
  assert.match(table, /@media \(max-width: 640px\)/);
  assert.match(table, /content: attr\(data-label\)/);

  for (const path of [
    'src/components/localllm/LocalLlmCodePreview.astro',
    'src/components/harness/HarnessCodePreview.astro',
  ]) {
    const source = read(path);
    assert.match(source, /tabindex="0"/);
    assert.match(source, /Scroll to inspect code/);
    assert.match(source, /overflow-x: auto/);
  }
});

test('project-page contract documents semantic consistency over visual sameness', () => {
  const contract = read('design/project-page-contract.md');
  assert.match(contract, /consistent comprehension, not identical pages/i);
  assert.match(contract, /OVERVIEW[\s\S]*DECIDE[\s\S]*BUILD[\s\S]*TEST[\s\S]*MEASURE[\s\S]*DECIDE AGAIN/);
  assert.match(contract, /Never use decorative charts that can be mistaken for measured evidence/i);
  assert.match(contract, /active phase is kept visible and centered/i);
  assert.match(contract, /Minimum meaningful text size remains 14px/i);
});

test('ClosedRoom header SVG and controls satisfy baseline rendering/accessibility invariants', () => {
  const source = read('src/components/closedroom/ClosedRoomHeader.astro');
  assert.doesNotMatch(source, /M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z/);
  assert.match(source, /M21 12\.79A9 9 0 1 1 11\.21 3A7 7 0 0 0 21 12\.79Z/);
  assert.match(source, /width: var\(--touch-target-min\)/);
  assert.match(source, /font-size: var\(--text-caption\)/);
});
