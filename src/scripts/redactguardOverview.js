import { redactguardSummary, prettyRedactguardModel } from './redactguardSummary.js';

export function renderRedactguardOverview(root, data, datasetId, helpers) {
  const { formatPct, formatSeconds, setHidden } = helpers;
  const summary = redactguardSummary(data, datasetId);
  const insights = root.querySelector('[data-rg-insights]');
  const takeaway = root.querySelector('[data-rg-takeaway]');
  const takeawayText = root.querySelector('[data-rg-takeaway-text]');
  const comparison = root.querySelector('[data-rg-comparison]');
  const note = root.querySelector('[data-rg-comparison-note]');
  const rows = root.querySelector('[data-rg-model-rows]');
  const advanced = root.querySelector('[data-rg-advanced]');
  if (!(insights instanceof HTMLElement) || !(rows instanceof HTMLElement)) return summary;

  const make = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = String(text);
    return node;
  };
  const bar = (label, value, role) => {
    const wrap = make('div', 'rg-measure rg-measure--' + role);
    const head = make('div', 'rg-measure__head');
    head.append(make('span', '', label), make('strong', '', formatPct(value)));
    const track = make('div', 'rg-measure__track');
    track.setAttribute('aria-hidden', 'true');
    const fill = make('span', 'rg-measure__fill');
    fill.style.width = (value * 100).toFixed(1) + '%';
    track.appendChild(fill);
    wrap.append(head, track);
    return wrap;
  };

  insights.replaceChildren();
  rows.replaceChildren();
  for (const card of summary.cards) {
    const element = make('div', 'rg-insight-card rg-insight-card--' + card.tone);
    element.append(
      make('span', 'rg-insight-card__label', card.label),
      make('strong', 'rg-insight-card__value', card.value),
      make('span', 'rg-insight-card__detail', card.detail),
    );
    insights.appendChild(element);
  }
  setHidden(insights, !summary.cards.length);
  setHidden(takeaway, !summary.takeaway);
  if (takeawayText) takeawayText.textContent = summary.takeaway || '';
  setHidden(comparison, !summary.rows.length);
  if (note) {
    note.textContent = summary.comparable
      ? summary.rows.length + ' models · same evaluation run'
      : summary.groups.length + ' separate run groups · no cross-run ranking';
  }
  if (advanced) setHidden(advanced, !data?.models?.length);

  summary.groups.forEach((group, groupIndex) => {
    if (!summary.comparable) {
      const groupTitle = make('div', 'rg-model-group');
      groupTitle.append(
        make('span', 'rg-model-group__label', 'Run group ' + (groupIndex + 1)),
        make('small', '', group.models.length + ' models measured together'),
      );
      rows.appendChild(groupTitle);
    }
    group.models.forEach((entry) => {
      const row = make('div', 'rg-model-row');
      row.setAttribute('role', 'listitem');
      const identity = make('div', 'rg-model-row__identity');
      identity.appendChild(make('strong', '', prettyRedactguardModel(entry.model)));
      const meta = entry.model.match(/(q4km|q8)$/i);
      identity.appendChild(make('small', '', meta?.[1].toUpperCase() === 'Q4KM' ? 'Q4_K_M' : meta ? 'Q8' : 'Local model'));
      if (summary.comparable && summary.highlightIds?.privacy === entry.model) {
        identity.appendChild(make('span', 'rg-model-row__highlight', 'Highest recall'));
      }
      const measures = make('div', 'rg-model-row__measures');
      measures.append(
        bar('System recall', entry.system_pii_recall, 'recall'),
        bar('System leakage', entry.system_leakage_rate, 'leakage'),
      );
      const runtime = make('div', 'rg-model-row__runtime');
      runtime.append(
        make('span', 'rg-model-row__runtime-label', 'Observed p95'),
        make('strong', 'rg-model-row__runtime-value',
          Number.isFinite(entry.latency_p95_ms) ? formatSeconds(entry.latency_p95_ms) : '—'),
        make('small', 'rg-model-row__runtime-detail',
          'Precision ' + formatPct(entry.precision) +
          ' · success ' + formatPct(entry.inference_success_rate)),
      );
      row.append(identity, measures, runtime);
      rows.appendChild(row);
    });
  });
  return summary;
}
