import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const phases = ['decide', 'build', 'test', 'measure', 'decide-again'];
const navigationLabels = ['Overview', 'Decide', 'Build', 'Test', 'Measure', 'Decide again'];

const pilots = [
  {
    path: 'src/pages/android-local-llm-harness.astro',
    archetype: 'experiment',
  },
  {
    path: 'src/pages/local-llm-server.astro',
    archetype: 'infrastructure',
  },
  {
    path: 'src/pages/closedroom.astro',
    archetype: 'product',
  },
];

test('project-page UX contract declares the shared journey', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));
  assert.equal(contract.projectPages.contract, 'design/project-page-contract.md');
  assert.deepEqual(contract.projectPages.navigation, navigationLabels);
  assert.deepEqual(
    contract.projectPages.primaryJourney,
    [...navigationLabels, 'Next step'],
  );
  assert.equal(contract.projectPages.rules.verifiedEvidenceOnly, true);
  assert.equal(contract.projectPages.rules.missingEvidenceMustBeExplicit, true);
});

test('pilot project pages preserve one predictable phase order', () => {
  for (const pilot of pilots) {
    const source = read(pilot.path);

    assert.match(source, /data-project-page/);
    assert.ok(
      source.includes(`data-project-archetype="${pilot.archetype}"`),
      `${pilot.path} should declare archetype ${pilot.archetype}`,
    );
    assert.match(source, /ProjectPhase/);
    assert.match(source, /ProjectDecisionBand/);

    let previousPhaseIndex = -1;
    for (const phase of phases) {
      assert.ok(
        source.includes(`href: '#${phase}'`),
        `${pilot.path} navigation should link to #${phase}`,
      );

      const phaseMarker = `id="${phase}"`;
      const phaseIndex = source.indexOf(phaseMarker, previousPhaseIndex + 1);
      assert.ok(phaseIndex > previousPhaseIndex, `${pilot.path} should render ${phase} in shared order`);
      previousPhaseIndex = phaseIndex;
    }

    const phaseCount = (source.match(/<ProjectPhase\b/g) || []).length;
    assert.equal(phaseCount, 5, `${pilot.path} should render exactly five project phases after Overview`);
  }
});

test('project-page contract documents semantic consistency over visual sameness', () => {
  const contract = read('design/project-page-contract.md');
  assert.match(contract, /consistent comprehension, not identical pages/i);
  assert.match(contract, /OVERVIEW[\s\S]*DECIDE[\s\S]*BUILD[\s\S]*TEST[\s\S]*MEASURE[\s\S]*DECIDE AGAIN/);
  assert.match(contract, /Never use decorative charts that can be mistaken for measured evidence/i);
  assert.match(contract, /Infrastructure/);
  assert.match(contract, /Product \/ use case/);
  assert.match(contract, /Experiment \/ measurement/);
});
