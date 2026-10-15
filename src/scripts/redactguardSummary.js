// Use per-run comparisons only: two equally sized datasets are not the same run.
import { redactguardRows } from './redactguardEvidence.js';

export const prettyRedactguardModel = (name) => {
  const normalized = String(name || '').toLowerCase();
  const size = normalized.match(/(?:qwen3[.]5|nemotron-nano)-(\d+)b/);
  if (normalized.startsWith('qwen3.5-') && size) return 'Qwen 3.5 ' + size[1] + 'B';
  if (normalized.startsWith('nemotron-nano-') && size) {
    return 'Nemotron ' + size[1] + 'B' + (normalized.endsWith('-q8') ? ' Q8' : '');
  }
  return String(name).replace(/-q4km$/, ' Q4').replace(/-q8$/, ' Q8');
};

const percentage = (value) => (value * 100).toFixed(1) + '%';
const seconds = (milliseconds) => (milliseconds / 1000).toFixed(milliseconds < 10_000 ? 1 : 0) + ' s';

export function redactguardSummary(data, datasetId) {
  const rows = redactguardRows(data, datasetId)
    .filter((row) =>
      Number.isFinite(row.system_pii_recall) &&
      row.system_pii_recall >= 0 && row.system_pii_recall <= 1 &&
      Number.isFinite(row.precision) &&
      Number.isFinite(row.latency_p95_ms) && row.latency_p95_ms > 0 &&
      typeof row.provenance?.cohort_id === 'string' &&
      typeof row.provenance?.run_id === 'string',
    );
  const map = new Map();
  rows.forEach((row) => {
    const key = row.provenance.run_id + '/' + row.provenance.cohort_id;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  });
  const groups = [...map.values()].map((group) => ({
    key: group[0].provenance.cohort_id,
    runId: group[0].provenance.run_id,
    models: [...group].sort((a, b) => b.system_pii_recall - a.system_pii_recall),
  })).sort((a, b) => b.models.length - a.models.length ||
    a.key.localeCompare(b.key));

  const comparable = groups.length === 1 && rows.length >= 2;
  if (!rows.length) {
    return { rows: [], groups: [], comparable: false, cards: [], takeaway: null };
  }
  if (!comparable) {
    return {
      rows, groups, comparable: false,
      cards: [
        { label: 'Measured variants', value: String(rows.length), detail: 'Across this dataset', tone: 'blue' },
        { label: 'Separate run cohorts', value: String(groups.length), detail: 'Do not rank across runs', tone: 'violet' },
        { label: 'Evaluation scope', value: String(rows[0].cases), detail: 'Attempts per model', tone: 'neutral' },
      ],
      takeaway: 'These models were measured in separate runs. Compare results within each run group; a cross-run winner would be misleading.',
    };
  }
  const sorted = groups[0].models;
  const highestRecall = [...sorted].sort((a, b) =>
    b.system_pii_recall - a.system_pii_recall ||
    a.system_leakage_rate - b.system_leakage_rate)[0];
  const fastest = [...sorted].sort((a, b) => a.latency_p95_ms - b.latency_p95_ms)[0];
  const mostPrecise = [...sorted].sort((a, b) => b.precision - a.precision)[0];
  const fasterLoss = (highestRecall.system_pii_recall - fastest.system_pii_recall) * 100;
  const speedup = highestRecall.latency_p95_ms / fastest.latency_p95_ms;
  const takeaway = highestRecall.model === fastest.model
    ? prettyRedactguardModel(highestRecall.model) +
      ' leads on both system recall and observed p95 latency in this run.'
    : prettyRedactguardModel(highestRecall.model) + ' has the highest system recall (' +
      percentage(highestRecall.system_pii_recall) + '). ' +
      prettyRedactguardModel(fastest.model) + ' responds ' + speedup.toFixed(1) +
      '× faster on observed p95, with ' + fasterLoss.toFixed(1) +
      ' percentage points less system recall.';
  return {
    rows, groups, comparable: true, takeaway,
    cards: [
      { label: 'Highest system recall', value: percentage(highestRecall.system_pii_recall),
        detail: prettyRedactguardModel(highestRecall.model) +
          ' · ' + percentage(highestRecall.system_leakage_rate) + ' leakage', tone: 'blue' },
      { label: 'Shortest observed p95', value: seconds(fastest.latency_p95_ms),
        detail: prettyRedactguardModel(fastest.model) +
          ' · ' + percentage(fastest.system_pii_recall) + ' recall', tone: 'violet' },
      { label: 'Highest precision', value: percentage(mostPrecise.precision),
        detail: prettyRedactguardModel(mostPrecise.model) +
          ' · within this run', tone: 'teal' },
    ],
    highlightIds: {
      privacy: highestRecall.model,
      fastest: fastest.model,
      precision: mostPrecise.model,
    },
  };
}
