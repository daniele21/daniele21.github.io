import test from 'node:test';
import assert from 'node:assert/strict';
import { redactguardSummary, prettyRedactguardModel } from '../src/scripts/redactguardSummary.js';

function measured(model, cohort, recall, leakage, precision, p95) {
  return {
    model, dataset: 'challenge', cases: 46,
    pii_recall: recall, system_pii_recall: recall,
    system_leakage_rate: leakage, precision,
    inference_success_rate: 1, latency_p95_ms: p95,
    provenance: { run_id: cohort, cohort_id: cohort },
  };
}
function payload(rows, published = true) {
  return {
    publication: { has_published_model_metrics: published },
    datasets: [{ id: 'challenge', cases: 46 }],
    models: rows,
  };
}
const rows = [
  measured('qwen3.5-9b-q4km', 'shared', 1, 0, 0.75, 3800),
  measured('qwen3.5-4b-q4km', 'shared', 0.933, 0.08, 0.808, 1980),
  measured('nemotron-nano-4b-q8', 'shared', 0.867, 0.119, 0.907, 4338),
  measured('nemotron-nano-4b', 'shared', 0.733, 0.245, 0.825, 3030),
];

test('insights use real same-run leaders, not an invented weighted quality score', () => {
  const result = redactguardSummary(payload(rows), 'challenge');
  assert.equal(result.comparable, true);
  assert.equal(result.cards.length, 3);
  assert.equal(result.cards[0].value, '100.0%');
  assert.match(result.cards[0].detail, /Qwen 3.5 9B/);
  assert.equal(result.cards[1].value, '2.0 s');
  assert.match(result.cards[1].detail, /Qwen 3.5 4B/);
  assert.equal(result.cards[2].value, '90.7%');
  assert.match(result.cards[2].detail, /Nemotron 4B Q8/);
  assert.match(result.takeaway, /1\.9× faster/);
  assert.match(result.takeaway, /6\.7 percentage points less/);
});

test('never rank models collected in separate run cohorts', () => {
  const mixed = rows.map((r, i) => ({
    ...r, provenance: { run_id: i < 2 ? 'qwen-run' : 'nemotron-run', cohort_id: i < 2 ? 'q' : 'n' },
  }));
  const result = redactguardSummary(payload(mixed), 'challenge');
  assert.equal(result.comparable, false);
  assert.equal(result.groups.length, 2);
  assert.equal(result.cards[1].value, '2');
  assert.match(result.takeaway, /separate runs/);
  assert.doesNotMatch(result.takeaway, /highest system recall/);
});

test('only data-backed rows may produce insights, and empty datasets remain empty', () => {
  const unpublished = redactguardSummary(payload(rows, false), 'challenge');
  assert.equal(unpublished.cards.length, 0);
  assert.equal(unpublished.rows.length, 0);
  assert.equal(redactguardSummary(payload(rows), 'healthcare').rows.length, 0);
});

test('model names are accessible and quantization remains available in detail', () => {
  assert.equal(prettyRedactguardModel('qwen3.5-9b-q4km'), 'Qwen 3.5 9B');
  assert.equal(prettyRedactguardModel('nemotron-nano-4b-q8'), 'Nemotron 4B Q8');
});
