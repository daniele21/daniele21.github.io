import { redactguardMatrix, redactguardPareto } from './redactguardEvidence.js';

// Render only public aggregate evidence. Never synthesize values for empty cells.
// A same-run frontier is exploratory and does not establish uniform runtime setup.
export function initializeRedactguardAnalytics(root, data, helpers) {
  const { formatPct, formatSeconds, shortModel, createSvg, setHidden } = helpers;
  const container = root.querySelector('[data-rg-matrix]');
  const scroll = root.querySelector('[data-rg-matrix-scroll]');
  const plotBox = root.querySelector('[data-rg-pareto]');
  const plot = root.querySelector('[data-rg-pareto-plot]');
  const missing = root.querySelector('[data-rg-pareto-missing]');
  const matrix = redactguardMatrix(data);
  let metric = 'system_pii_recall';
  let selectedDataset = null;

  setHidden(container, matrix.models.length === 0);

  function renderMatrix() {
    if (!scroll || !matrix.models.length) return;
    scroll.replaceChildren();

    const table = document.createElement('table');
    table.className = 'rg-matrix-table';
    const caption = document.createElement('caption');
    caption.textContent = 'Published per-model privacy scores by dataset';
    table.appendChild(caption);

    const head = document.createElement('thead');
    const header = document.createElement('tr');
    const modelHeader = document.createElement('th');
    modelHeader.textContent = 'Model';
    modelHeader.scope = 'col';
    header.appendChild(modelHeader);
    for (const dataset of matrix.datasets) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = dataset.title;
      if (dataset.id === selectedDataset) th.classList.add('is-selected');
      header.appendChild(th);
    }
    head.appendChild(header);
    table.appendChild(head);

    const body = document.createElement('tbody');
    for (const model of matrix.cells) {
      const tr = document.createElement('tr');
      const name = document.createElement('th');
      name.scope = 'row';
      name.textContent = shortModel(model.model);
      tr.appendChild(name);
      for (const dataset of matrix.datasets) {
        const td = document.createElement('td');
        const measurement = model.scores[dataset.id];
        const value = measurement && typeof measurement[metric] === 'number' &&
          Number.isFinite(measurement[metric]) ? measurement[metric] : null;
        if (value == null) {
          td.className = 'is-missing';
          td.textContent = '—';
        } else {
          td.textContent = formatPct(value);
          const goodness = metric === 'system_leakage_rate' ? 1 - value : value;
          const tint = Math.round(4 + goodness * 14);
          td.style.background = 'color-mix(in srgb, var(--accent-blue) ' +
            tint + '%, var(--surface-card))';
          td.title = model.model + ' · ' + dataset.title + ' · ' +
            (metric === 'system_leakage_rate' ? 'System leakage' : 'System recall') +
            ': ' + formatPct(value) + ' · ' +
            (measurement.provenance?.run_id || 'unknown run');
        }
        if (dataset.id === selectedDataset) td.classList.add('is-selected');
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }
    table.appendChild(body);
    scroll.appendChild(table);
  }

  for (const button of root.querySelectorAll('[data-rg-metric]')) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.onclick = () => {
      metric = button.dataset.rgMetric === 'system_leakage_rate'
        ? 'system_leakage_rate' : 'system_pii_recall';
      root.querySelectorAll('[data-rg-metric]').forEach((candidate) =>
        candidate.setAttribute('aria-pressed', candidate === button ? 'true' : 'false'),
      );
      renderMatrix();
    };
  }

  function renderPareto(datasetId) {
    const evidence = redactguardPareto(data, datasetId);
    setHidden(plotBox, !evidence.valid);
    setHidden(missing, evidence.valid || !data.publication?.has_published_model_metrics);
    if (!evidence.valid || !(plot instanceof SVGElement)) return;

    plot.replaceChildren();
    const bounds = { left: 58, right: 606, top: 18, bottom: 211 };
    const latencies = evidence.points.map((point) => point.latency);
    const minimum = Math.min(...latencies) * 0.85;
    const maximum = Math.max(...latencies) * 1.12;
    const x = (value) => bounds.left +
      ((value - minimum) / Math.max(1, maximum - minimum)) * (bounds.right - bounds.left);
    const y = (value) => bounds.bottom - value * (bounds.bottom - bounds.top);

    for (const value of [0, 0.25, 0.5, 0.75, 1]) {
      plot.appendChild(createSvg('line', {
        x1: bounds.left, y1: y(value), x2: bounds.right, y2: y(value),
        stroke: 'currentColor', opacity: 0.12,
      }));
      const label = createSvg('text', {
        x: bounds.left - 10, y: y(value) + 4,
        fill: 'currentColor', 'text-anchor': 'end',
        'font-size': 12, opacity: 0.75,
      });
      label.textContent = Math.round(value * 100) + '%';
      plot.appendChild(label);
    }

    if (evidence.frontier.length > 1) {
      plot.appendChild(createSvg('polyline', {
        points: evidence.frontier.map((point) =>
          x(point.latency) + ',' + y(point.quality)).join(' '),
        fill: 'none', stroke: '#3869fb', 'stroke-width': 2,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      }));
    }

    for (const point of evidence.points) {
      const group = createSvg('g');
      const dot = createSvg('circle', {
        cx: x(point.latency), cy: y(point.quality),
        r: point.frontier ? 7 : 5,
        fill: point.frontier ? '#3869fb' : '#9aa8bf',
        stroke: '#fff', 'stroke-width': 2,
      });
      const title = createSvg('title');
      title.textContent = shortModel(point.model) + ': ' +
        formatPct(point.quality) + ' system recall · ' +
        formatSeconds(point.latency) + ' p95';
      group.append(dot, title);
      plot.appendChild(group);
    }

    for (const tick of [minimum, (minimum + maximum) / 2, maximum]) {
      const label = createSvg('text', {
        x: x(tick), y: bounds.bottom + 25,
        fill: 'currentColor', 'text-anchor': 'middle',
        'font-size': 12, opacity: 0.75,
      });
      label.textContent = formatSeconds(tick);
      plot.appendChild(label);
    }
    const note = root.querySelector('[data-rg-pareto-note]');
    if (note) {
      note.textContent = evidence.points.length + ' models in run ' +
        evidence.runId + '. Blue points are non-dominated. ' +
        (evidence.excluded
          ? evidence.excluded + ' measurement(s) from other runs excluded. ' : '') +
        'This is an exploratory within-run comparison; differing runtime conditions ' +
        'can influence latency.';
    }
  }

  return (datasetId) => {
    selectedDataset = datasetId;
    renderMatrix();
    renderPareto(datasetId);
  };
}
