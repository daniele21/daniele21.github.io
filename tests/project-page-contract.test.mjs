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
  assert.equal(contract.projectPages.routes.length, projectPages.length);
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

test('project-page contract documents semantic consistency over visual sameness', () => {
  const contract = read('design/project-page-contract.md');
  assert.match(contract, /consistent comprehension, not identical pages/i);
  assert.match(contract, /OVERVIEW[\s\S]*DECIDE[\s\S]*BUILD[\s\S]*TEST[\s\S]*MEASURE[\s\S]*DECIDE AGAIN/);
  assert.match(contract, /Never use decorative charts that can be mistaken for measured evidence/i);
});
