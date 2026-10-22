// RedactGuard portfolio presentation rules. Source figures are always public
// aggregate run measurements; fixture/dataset counts never become quality scores.
const fraction = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;

const finiteMs = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

export function redactguardRows(data, datasetId) {
  if (!data?.publication?.has_published_model_metrics || !Array.isArray(data?.models)) {
    return [];
  }
  const dataset = data.datasets?.find((item) => item.id === datasetId);
  if (!dataset) return [];
  const expected = dataset.cases ?? dataset.documents;
  return data.models.filter((row) =>
    row?.dataset === datasetId &&
    typeof row.model === 'string' &&
    row.model.trim().length > 0 &&
    row.cases === expected &&
    fraction(row.pii_recall) &&
    fraction(row.system_leakage_rate) &&
    row.provenance?.run_id,
  );
}

export function redactguardMatrix(data) {
  if (!data?.publication?.has_published_model_metrics) {
    return { datasets: [], models: [], cells: [] };
  }
  const datasets = (data.datasets || []).filter((d) =>
    redactguardRows(data, d.id).length > 0 && d.kind !== 'smoke',
  );
  const models = [...new Set(datasets.flatMap((d) =>
    redactguardRows(data, d.id).map((row) => row.model),
  ))].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  const cells = models.map((model) => ({
    model,
    scores: Object.fromEntries(datasets.map((dataset) => {
      const matches = redactguardRows(data, dataset.id).filter((row) => row.model === model);
      // Two runs of one model on one dataset are not arbitrarily averaged.
      const row = matches.length === 1 ? matches[0] : null;
      return [dataset.id, row];
    })),
  }));
  return { datasets, models, cells };
}

export function redactguardPareto(data, datasetId) {
  const eligible = redactguardRows(data, datasetId)
    .filter((row) =>
      fraction(row.system_pii_recall) &&
      finiteMs(row.latency_p95_ms) &&
      typeof row.provenance?.cohort_id === 'string' &&
      row.provenance?.comparison_scope === 'same_run_exploratory',
    );
  const cohorts = new Map();
  eligible.forEach((row) => {
    const key = row.provenance.cohort_id + '/' + row.provenance.run_id;
    if (!cohorts.has(key)) cohorts.set(key, []);
    cohorts.get(key).push(row);
  });
  const groups = [...cohorts.values()].sort((a, b) =>
    b.length - a.length || a[0].provenance.run_id.localeCompare(b[0].provenance.run_id),
  );
  const matched = groups[0] || [];
  if (matched.length < 2) {
    return {
      valid: false,
      reason: 'At least two models with measured p95 latency and system PII recall in the same complete run are required.',
      excluded: eligible.length,
      points: [],
      frontier: [],
    };
  }
  const points = matched.map((row) => {
    const dominated = matched.some((peer) =>
      peer !== row &&
      peer.latency_p95_ms <= row.latency_p95_ms &&
      peer.system_pii_recall >= row.system_pii_recall &&
      (peer.latency_p95_ms < row.latency_p95_ms ||
        peer.system_pii_recall > row.system_pii_recall),
    );
    return {
      model: row.model,
      latency: row.latency_p95_ms,
      quality: row.system_pii_recall,
      leakage: row.system_leakage_rate,
      frontier: !dominated,
    };
  });
  return {
    valid: true,
    points,
    frontier: points.filter((row) => row.frontier).sort((a, b) => a.latency - b.latency),
    excluded: eligible.length - matched.length,
    runId: matched[0].provenance.run_id,
    cohortId: matched[0].provenance.cohort_id,
    provisional: true, // Same-run evidence is not a guarantee of identical runtime conditions.
  };
}
