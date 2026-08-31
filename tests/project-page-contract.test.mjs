import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const legacyPhases = ['decide', 'build', 'test', 'measure', 'decide-again'];

const archetypeNavigation = {
  infrastructure: ['Overview', 'Architecture', 'Runtime', 'Evidence', 'Status'],
  product: ['Overview', 'Workflow', 'Product', 'Architecture', 'Evidence'],
  experiment: ['Overview', 'Method', 'Evidence', 'Findings', 'Status'],
};

const projectPages = [
  { path: 'src/pages/android-local-llm-harness.astro', archetype: 'experiment', migrated: false },
  { path: 'src/pages/local-llm-server.astro', archetype: 'infrastructure', migrated: true },
  { path: 'src/pages/local-asr-server.astro', archetype: 'infrastructure', migrated: false },
  { path: 'src/pages/closedroom.astro', archetype: 'product', migrated: false },
  { path: 'src/pages/aura-finance.astro', archetype: 'product', migrated: false },
  { path: 'src/pages/redact-guard.astro', archetype: 'product', migrated: true },
  { path: 'src/pages/performance-lab.astro', archetype: 'experiment', migrated: false },
  { path: 'src/pages/traffic-monitoring.astro', archetype: 'experiment', migrated: false },
  { path: 'src/pages/traffic-monitoring-android.astro', archetype: 'experiment', migrated: false },
];

test('project-page UX contract declares archetype-specific IA and evidence rules', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));
  assert.equal(contract.projectPages.contract, 'design/project-page-contract.md');
  assert.deepEqual(contract.projectPages.navigation, archetypeNavigation);
  assert.equal(contract.projectPages.rules.homepageOwnsMethodJourney, true);
  assert.equal(contract.projectPages.rules.archetypeIAOverSharedPhaseIA, true);
  assert.equal(contract.projectPages.rules.verifiedEvidenceOnly, true);
  assert.equal(contract.projectPages.rules.missingEvidenceMustBeExplicit, true);
  assert.equal(contract.projectPages.rules.dominantVisualForPrimaryMentalModel, true);
  assert.equal(contract.projectPages.rules.meaningfulTextNeverBelow14Px, true);
  assert.equal(contract.projectPages.rules.mobileProjectContextMustRemainVisible, true);
  assert.equal(contract.projectPages.rules.maxPrimaryNavigationItems, 5);
  assert.equal(contract.projectPages.migration.allowMixedStateDuringWorkstream, true);
  assert.equal(contract.projectPages.routes.length, projectPages.length);
  assert.match(contract.adaptiveContent.tables, /stacked labeled rows/i);
  assert.match(contract.adaptiveContent.code, /keyboard-focusable horizontal scroller/i);
});

test('migrated project pages use archetype IA while legacy routes remain explicitly transitional', () => {
  for (const projectPage of projectPages) {
    const source = read(projectPage.path);
    assert.match(source, /data-project-page/);
    assert.ok(source.includes(`data-project-archetype="${projectPage.archetype}"`));

    if (projectPage.migrated) {
      assert.match(source, /ProjectHero/);
      assert.match(source, /ProjectProof/);
      assert.match(source, /ProjectEvidenceNote/);
      assert.match(source, /ProjectRelations/);
      assert.doesNotMatch(source, /ProjectPhase/);

      for (const label of archetypeNavigation[projectPage.archetype]) {
        assert.ok(source.includes(`label: '${label}'`), `${projectPage.path} is missing ${label} navigation`);
      }
      continue;
    }

    assert.match(source, /ProjectPhase/);
    assert.match(source, /ProjectDecisionBand/);

    let previousPhaseIndex = -1;
    for (const phase of legacyPhases) {
      assert.ok(source.includes(`href: '#${phase}'`));
      const phaseIndex = source.indexOf(`id="${phase}"`, previousPhaseIndex + 1);
      assert.ok(phaseIndex > previousPhaseIndex);
      previousPhaseIndex = phaseIndex;
    }

    assert.equal((source.match(/<ProjectPhase\b/g) || []).length, 5);
  }
});

test('shared project primitives preserve semantic structure and proof hierarchy', () => {
  const hero = read('src/components/project/ProjectHero.astro');
  const section = read('src/components/project/ProjectSection.astro');
  const proof = read('src/components/project/ProjectProof.astro');
  const relations = read('src/components/project/ProjectRelations.astro');

  assert.match(hero, /<section class="project-hero"/);
  assert.match(hero, /<h1 id="project-hero-title">/);
  assert.match(hero, /min-height: var\(--touch-target-min\)/);
  assert.match(section, /<section/);
  assert.match(section, /<h2 id=\{titleId\}>/);
  assert.match(proof, /WHAT THIS PROVES/);
  assert.match(relations, /CONNECTED SYSTEM/);
  assert.match(relations, /aria-current/);
});

test('shared project subheader uses canonical tokens, accessible targets and adaptive section visibility', () => {
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
  assert.doesNotMatch(source, /\.subheader-brand,\s*\.subheader-cta\s*\{\s*display: none/);
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

test('project-page contract documents archetype consistency over methodology repetition', () => {
  const contract = read('design/project-page-contract.md');
  assert.match(contract, /consistent comprehension, not identical pages/i);
  assert.match(contract, /homepage owns the shared `Decide -> Build -> Test -> Measure -> Decide Again` method/i);
  assert.match(contract, /Overview · Architecture · Runtime · Evidence · Status/);
  assert.match(contract, /Overview · Workflow · Product · Architecture · Evidence/);
  assert.match(contract, /Overview · Method · Evidence · Findings · Status/);
  assert.match(contract, /Never use decorative charts that can be mistaken for measured evidence/i);
  assert.match(contract, /Minimum meaningful text size remains 14px/i);
  assert.match(contract, /ProjectPhase.*migration-only/is);
});

test('ClosedRoom header SVG and controls satisfy baseline rendering/accessibility invariants', () => {
  const source = read('src/components/closedroom/ClosedRoomHeader.astro');
  assert.doesNotMatch(source, /M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z/);
  assert.match(source, /M21 12\.79A9 9 0 1 1 11\.21 3A7 7 0 0 0 21 12\.79Z/);
  assert.match(source, /width: var\(--touch-target-min\)/);
  assert.match(source, /font-size: var\(--text-caption\)/);
});
