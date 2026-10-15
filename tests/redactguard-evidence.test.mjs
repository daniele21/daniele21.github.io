import test from 'node:test';
import assert from 'node:assert/strict';
import {
  redactguardRows,
  redactguardMatrix,
  redactguardPareto,
} from '../src/scripts/redactguardEvidence.js';

const make = (model, dataset, cohort, latency, recall, leakage) => ({
  model, dataset, cases: 48, pii_recall: recall, system_pii_recall: recall,
  system_leakage_rate: leakage, precision: 0.9,
  latency_p95_ms: latency,
  provenance: {
    run_id: cohort, cohort_id: cohort,
    comparison_scope: 'same_run_exploratory',
  },
});

const data = () => ({
  publication: { has_published_model_metrics: true },
  datasets: [
    { id: 'healthcare', title: 'Healthcare', cases: 48, kind: 'challenge' },
    { id: 'ambiguous', title: 'Ambiguous', cases: 48, kind: 'challenge' },
    { id: 'smoke', title: 'Smoke', cases: 20, kind: 'smoke' },
  ],
  models: [
    make('qwen-2b', 'healthcare', 'run1', 500, 0.8, 0.2),
    make('nemotron-4b', 'healthcare', 'run1', 700, 0.95, 0.05),
    make('tiny-llm', 'healthcare', 'run1', 900, 0.75, 0.25),
    make('qwen-2b', 'ambiguous', 'run2', 550, 0.6, 0.4),
    make('nemotron-4b', 'ambiguous', 'run3', 800, 0.9, 0.1),
  ],
});

test('dataset-only snapshots never surface invented measurements', () => {
  const payload = { ...data(), publication: { has_published_model_metrics: false } };
  assert.deepEqual(redactguardRows(payload, 'healthcare'), []);
  assert.deepEqual(redactguardMatrix(payload), { datasets: [], models: [], cells: [] });
  assert.equal(redactguardPareto(payload, 'healthcare').valid, false);
});

test('matrix does not average across datasets or invent missing cells', () => {
  const result = redactguardMatrix(data());
  assert.equal(result.datasets.length, 2);
  assert.equal(result.models.length, 3);
  const tiny = result.cells.find((row) => row.model === 'tiny-llm');
  assert.equal(tiny.scores.healthcare.pii_recall, 0.75);
  assert.equal(tiny.scores.ambiguous, null);
  assert.equal(result.cells.find((row) => row.model === 'qwen-2b').scores.ambiguous.pii_recall, 0.6);
});

test('pareto uses same-run provenance and lower latency higher recall', () => {
  const result = redactguardPareto(data(), 'healthcare');
  assert.equal(result.valid, true);
  assert.deepEqual(
    result.frontier.map((row) => row.model),
    ['qwen-2b', 'nemotron-4b'],
  );
  assert.equal(result.points.find((row) => row.model === 'tiny-llm').frontier, false);
  assert.equal(result.provisional, true);
});

test('do not draw a cross-suite pareto for the same dataset', () => {
  const result = redactguardPareto(data(), 'ambiguous');
  assert.equal(result.valid, false);
  assert.equal(result.points.length, 0);
});

test('reject bogus zero/null/invalid latency and mismatched case counts', () => {
  const payload = data();
  payload.models[0].latency_p95_ms = 0;
  payload.models[1].cases = 12;
  payload.models[2].pii_recall = null;
  assert.equal(redactguardRows(payload, 'healthcare').length, 2);
  assert.equal(redactguardPareto(payload, 'healthcare').valid, false);
});
