import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

test('homepage UX contract makes outcome hierarchy and path semantics explicit', () => {
  const contract = JSON.parse(read('design/ux-contract.json'));

  assert.equal(contract.designSourceOfTruth.mode, 'code-first');
  assert.equal(contract.experiencePriorities.audienceOrder[0], 'Technical Decision Maker');
  assert.match(contract.experiencePriorities.conflictRule, /thesis comprehension and evidence access/i);
  assert.deepEqual(contract.home.primaryJourney.slice(0, 6), [
    'Hero / thesis',
    'Decide',
    'Build',
    'Test',
    'Measure',
    'Decide again',
  ]);
  assert.equal(contract.home.methodPath.noScrollJacking, true);
  assert.equal(contract.home.methodPath.scrollDirection, 'reversible');
  assert.match(contract.home.methodPath.reducedMotion, /static guide/i);
  assert.match(contract.home.methodPath.javascriptFailure, /show all content/i);
});

test('homepage path is progressive enhancement rather than a visibility dependency', () => {
  const layout = read('src/styles/layout.css');
  const page = read('src/pages/index.astro');

  assert.doesNotMatch(layout, /data-method-path-ready=['"]pending['"][\s\S]{0,240}opacity:\s*0/);
  assert.match(layout, /data-method-path-ready=['"]true['"]/);
  assert.match(page, /activateStaticFallback/);
  assert.match(page, /prefers-reduced-motion:\s*reduce/);
});

test('homepage preserves the declared narrative order', () => {
  const page = read('src/pages/index.astro');
  const components = ['<LandingHero', '<DecisionStage', '<BuildStage', '<TestStage', '<EvidenceStage', '<AboutSignal'];
  let previous = -1;
  for (const component of components) {
    const index = page.indexOf(component);
    assert.ok(index > previous, `${component} should follow the previous narrative surface`);
    previous = index;
  }
});

test('homepage section surfaces alternate through continuous gradients', () => {
  const layout = read('src/styles/layout.css');
  const plane = read('src/components/landing/PlaneTemplate.astro');
  const thread = read('src/components/landing/MethodThread.astro');

  assert.match(layout, /--journey-surface-tint:/);
  assert.match(plane, /plane-section--subtle[\s\S]{0,420}radial-gradient/);
  assert.match(thread, /var\(--journey-surface-tint[\s\S]{0,260}var\(--journey-surface-canvas/);
  assert.match(thread, /dir-rtl[\s\S]{0,260}var\(--journey-surface-canvas[\s\S]{0,260}var\(--journey-surface-tint/);
});

test('DECIDE keeps all architecture trade-offs in value-first swipeable cards', () => {
  const cards = read('src/components/landing/DecisionTable.astro');
  const stage = read('src/components/landing/DecisionStage.astro');

  for (const mode of ["id: 'local'", "id: 'hybrid'", "id: 'cloud'"]) {
    assert.match(cards, new RegExp(mode));
  }

  for (const dimension of ['Privacy', 'Latency', 'Control', 'Models', 'Scale']) {
    assert.match(cards, new RegExp("label: '" + dimension + "'"));
  }

  assert.match(cards, /THE TRADE-OFFS/);
  assert.match(cards, /BEST WHEN/);
  assert.match(cards, /data-decision-viewport/);
  assert.match(cards, /aria-roledescription="carousel"/);
  assert.match(cards, /tabindex="0"/);
  assert.match(cards, /scroll-snap-type: x mandatory/);
  assert.match(cards, /scroll-snap-align: start/);
  assert.match(cards, /@container \(min-width: 900px\)/);
  assert.match(cards, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(cards, /data-decision-prev/);
  assert.match(cards, /data-decision-next/);
  assert.match(cards, /prefers-reduced-motion: reduce/);
  assert.match(cards, /href="#infrastructure"/);
  assert.match(cards, /var\(--accent-blue\)/);
  assert.match(cards, /var\(--accent-violet\)/);
  assert.match(cards, /var\(--accent-teal\)/);
  assert.match(stage, /<DecisionTable \/>/);
  assert.doesNotMatch(cards, /<table|href="https:\/\/www\.linkedin\.com/);
});

test('homepage identity stays in the shared header without duplicating the hero', () => {
  const hero = read('src/components/landing/LandingHero.astro');
  const header = read('src/components/landing/LandingHeader.astro');
  const heroShellRule = hero.match(/\.hero-shell\s*\{([^}]*)\}/)?.[1] ?? '';

  assert.match(hero, /class="shell hero-shell"/);
  assert.doesNotMatch(heroShellRule, /width:\s*100%/);
  assert.doesNotMatch(hero, /identity-strip|identity-avatar/);
  assert.match(header, /class="brand-avatar"/);
  assert.match(header, /src=\{resolveHref\(hero\.identity\.portraitPath\)\}/);
  assert.match(header, /class="brand-name"/);
  assert.match(header, /class="brand-role"/);
});

test('brand contract keeps motion purposeful and user-controlled', () => {
  const brand = JSON.parse(read('design/brand-kit.json'));
  assert.equal(brand.sourceOfTruth.mode, 'code-first');
  assert.match(brand.motion.language, /continuity/i);
  assert.ok(brand.motion.rules.some((rule) => /No scroll-jacking/i.test(rule)));
  assert.ok(brand.motion.rules.some((rule) => /Autoplaying/i.test(rule)));

  const closedRoom = read('src/pages/closedroom.astro');
  assert.doesNotMatch(closedRoom, /setInterval\(/);
});


test('BUILD Architecture Studio preserves device-first hierarchy and shared project data', () => {
  const showcase = read('src/components/landing/BuildSystemsShowcase.astro');
  const stage = read('src/components/landing/BuildStage.astro');
  const data = read('src/content/locales/en/landing.ts');

  assert.match(stage, /<BuildSystemsShowcase\s*\/>/);
  assert.match(showcase, /const runtimeProjects = buildStage\.projects\.filter/);
  assert.match(showcase, /const specializedProjects = buildStage\.projects\.filter/);
  assert.match(showcase, /project\.id === 'korgis' \|\| project\.id === 'harnex'/);
  assert.match(showcase, /Execution environments/);
  assert.match(showcase, /Specialized components/);
  assert.match(showcase, /MAC · DESKTOP & SERVER/);
  assert.match(showcase, /ANDROID · ON-DEVICE/);
  assert.match(showcase, /href=\{hrefFor\(project\.href, project\.external\)\}/);
  assert.match(showcase, /project\.logoPath/);
  assert.match(data, /id: 'korgis'/);
  assert.match(data, /id: 'harnex'/);
  assert.match(data, /id: 'decisio'/);
  assert.match(data, /id: 'local-asr-server'/);
  assert.doesNotMatch(showcase, /VISUAL PLACEHOLDER|visual-placeholder/);
});

test('BUILD uses semantic brand tokens and supports mobile and dark appearance', () => {
  const showcase = read('src/components/landing/BuildSystemsShowcase.astro');

  for (const token of [
    '--accent-blue',
    '--accent-violet',
    '--surface-card',
    '--surface-inverse',
    '--ink-display',
    '--border-medium',
    '--font-display',
  ]) {
    assert.ok(showcase.includes('var(' + token + ')'), 'BUILD must reuse ' + token);
  }

  assert.match(showcase, /:global\(html\[data-theme='dark'\]\)/);
  assert.match(showcase, /@container \(max-width: 740px\)/);
  assert.match(showcase, /@container \(max-width: 420px\)/);
  assert.match(showcase, /prefers-reduced-motion: reduce/);
  assert.match(showcase, /focus-visible/);
  assert.match(showcase, /aria-label=\{'Explore ' \+ project\.title/);
  assert.doesNotMatch(showcase, /<script[\s>]/);
});


test('TEST is a mobile-first gallery of actual project assets and product value', () => {
  const stage = read('src/components/landing/TestStage.astro');
  const gallery = read('src/components/landing/TestProductGallery.astro');
  const data = read('src/content/locales/en/landing.ts');

  assert.match(stage, /<TestProductGallery \/>/);
  assert.match(stage, /id="applications"/);
  assert.doesNotMatch(stage, /<PlaneCardGrid|<ProjectProofCard/);

  assert.match(gallery, /testStage\.applications\.map/);
  assert.match(gallery, /app\.valueHeadline/);
  assert.match(gallery, /app\.logoPath/);
  assert.match(gallery, /app\.imagePath/);
  assert.match(gallery, /app\.infrastructureLabel/);
  assert.match(gallery, /app\.features\.map/);
  assert.match(gallery, /app\.infrastructureLabel/);
  assert.match(gallery, /class="card-footer"/);
  assert.match(gallery, /class="preview-chrome"/);
  assert.doesNotMatch(gallery, /ACTUAL PRODUCT INTERFACE|CONNECTED INFRASTRUCTURE|class="infrastructure-link"/);
  for (const token of ['--font-display', '--font-body', '--text-card-title', '--text-body-sm', '--text-caption',
    '--radius-lg', '--surface-card', '--border-medium', '--ink-display']) {
    assert.ok(gallery.includes('var(' + token + ')'), 'TEST must consume brand token ' + token);
  }
  assert.match(gallery, /href=\{resolveHref\(app\.href\)\}/);
  assert.match(gallery, /src=\{resolveHref\(app\.imagePath\)\}/);
  assert.match(gallery, /scroll-snap-type: x mandatory/);
  assert.match(gallery, /scroll-snap-align: start/);
  assert.match(gallery, /@container \(min-width: 900px\)/);
  assert.match(gallery, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(gallery, /data-test-prev/);
  assert.match(gallery, /data-test-next/);
  assert.match(gallery, /role="region"/);
  assert.match(gallery, /tabindex="0"/);
  assert.match(gallery, /prefers-reduced-motion: reduce/);
  assert.match(gallery, /href="#evidence"/);
  assert.doesNotMatch(gallery, /PLACEHOLDER|mockup|WHAT THIS VALIDATES/);

  for (const asset of [
    'images/redact-guard/logo.png',
    'images/redact-guard/redactguard-doc-preview.jpg',
    'images/aura/logo.png',
    'images/aura-finance/aura-categories-preview.png',
    'images/closedroom/logo.png',
    'images/closedroom/recording-preview.jpg',
  ]) {
    assert.ok(fs.existsSync('public/' + asset), 'TEST project asset must exist: ' + asset);
    assert.ok(data.includes("'" + asset + "'"), 'TEST must reuse canonical media: ' + asset);
  }

  for (const headline of [
    'Sensitive documents. Local processing.',
    'Understand transactions on-device.',
    'Meeting intelligence. Private by default.',
  ]) {
    assert.ok(data.includes(headline), 'Missing product benefit: ' + headline);
  }
});


test('MEASURE is published-first and preserves all evidence provenance on mobile', () => {
  const stage = read('src/components/landing/EvidenceStage.astro');
  const explorer = read('src/components/landing/ExperimentResultsExplorer.astro');
  const data = read('src/content/locales/en/landing.ts');

  assert.match(stage, /<StageRail number=\{4\} side="right" isFinal \/>/);
  assert.match(stage, /<ExperimentResultsExplorer tracks=\{experiments\.tracks \|\| \[\]\} \/>/);
  assert.match(stage, /--font-display/);
  assert.match(stage, /--text-section-title-mobile/);
  assert.match(stage, /--touch-target-min/);

  assert.match(explorer, /sortedTracks = \[\.\.\.tracks\]\.sort/);
  assert.match(explorer, /<h3>Benchmarks<\/h3>/);
  assert.match(explorer, /published<\/span>/);
  assert.match(explorer, /data-published=\{Boolean\(track\.resultUrl\)/);
  assert.match(explorer, /Not published yet/);
  assert.match(explorer, /experiment-tab__availability/);
  assert.match(explorer, /@media \(max-width: 680px\)/);
  assert.match(explorer, /data-experiment-rail/);
  assert.match(explorer, /data-experiment-prev/);
  assert.match(explorer, /data-experiment-next/);
  assert.match(explorer, /experiment-rail-guide/);
  assert.match(explorer, /data-mcb-model-cards/);
  assert.match(explorer, /class="mcb-cards-viewport" role="region" tabindex="0"/);
  assert.match(explorer, /\.experiment-selector\s*\{[\s\S]*?scroll-snap-type: x mandatory/);
  assert.match(explorer, /class="mcb-highlights-viewport" aria-label="Benchmark highlights"/);
  assert.match(explorer, /\.mcb-highlights-viewport\s*\{[\s\S]*?scroll-snap-type: x mandatory/);
  assert.match(explorer, /\.mcb-cards-viewport\s*\{[\s\S]*?scroll-snap-type: x mandatory/);
  assert.match(explorer, /\.run-summary\s*\{[\s\S]*?scroll-snap-type: x proximity/);
  assert.match(explorer, /@media \(max-width: 680px\)/);
  assert.match(explorer, /data-experiment-mobile-select/);
  assert.match(explorer, /mobileSelector\.addEventListener\('change'/);
  assert.match(explorer, /\.experiment-mobile-chooser select/);
  assert.match(explorer, /\.experiment-selector-wrap, \.experiment-rail-guide \{ display: none; \}/);
  assert.match(explorer, /class="mcb-model-cards" role="list" data-mcb-model-cards/);
  assert.match(explorer, /const renderMcbCards = \(points\) =>/);
  // Model insights are rankings computed from reported evidence, never hardcoded winners.
  assert.match(explorer, /const highestQuality = \[\.\.\.published\]\.sort/);
  assert.match(explorer, /const highestLocalQuality = \[\.\.\.localPoints\]\.sort/);
  assert.match(explorer, /const fastestLocal = \[\.\.\.localPoints\]\.sort/);
  assert.match(explorer, /TOP QUALITY/);
  assert.match(explorer, /TOP LOCAL/);
  assert.match(explorer, /<span>Fastest local<\/span>/);
  assert.match(explorer, /QUALITY RANK/);
  assert.match(explorer, /mcb-model-card__role/);
  assert.match(explorer, /mcb-model-card__insight/);
  assert.match(explorer, /mcb-model-card__metric-value/);
  assert.match(explorer, /mcb-model-card__metric-label/);
  assert.match(explorer, /Quality \/ 100/);
  assert.match(explorer, /Median p50/);
  assert.match(explorer, /data-mcb-card/);
  assert.match(explorer, /aria-pressed/);
  assert.match(explorer, /data-mcb-show-all/);
  assert.match(explorer, /class="mcb-explore-details" data-mcb-explore-details/);
  assert.match(explorer, /class="mcb-chart-details" data-mcb-chart-details>/);
  assert.doesNotMatch(explorer, /class="mcb-chart-details" data-mcb-chart-details open/);
  assert.match(explorer, /class="mcb-method-details"/);
  assert.match(explorer, /mcb-explore-details__body/);
  assert.match(explorer, /data-mcb-scope/);
  assert.match(explorer, /\.evidence-panel__result\s*\{\s*padding: 0;/);
  assert.match(explorer, /data-performance-plot/);
  assert.match(explorer, /class="plot-canvas" role="region" tabindex="0"/);
  assert.match(explorer, /class="rg-plot-canvas" role="region" tabindex="0"/);
  assert.match(explorer, /data-rg-matrix-scroll tabindex="0"/);
  assert.match(explorer, /\.plot-canvas \.plot-svg\s*\{[\s\S]*?width: 620px/);
  assert.match(explorer, /var\(--font-display\)/);
  assert.match(explorer, /var\(--font-body\)/);
  assert.match(explorer, /var\(--text-caption\)/);

  // No synthetic summary numbers: actual data still resolves at runtime.
  assert.match(data, /id: 'model-capability'/);
  assert.match(data, /id: 'jev-vs-llm-routing'/);
  assert.match(data, /id: 'redactguard-local-anonymization'/);
  assert.match(data, /id: 'diarization'/);
  assert.match(explorer, /SOURCE UNAVAILABLE/);
  assert.match(explorer, /NO PUBLIC SNAPSHOT YET/);
  assert.match(explorer, /No fallback or invented performance values are shown/);
});


test('homepage uses canonical type roles across every narrative stage', () => {
  const tokens = read('src/styles/tokens.css');
  const layout = read('src/layouts/BaseLayout.astro');
  const reset = read('src/styles/reset.css');
  const plane = read('src/components/landing/PlaneTemplate.astro');
  const evidence = read('src/components/landing/EvidenceStage.astro');
  const about = read('src/components/landing/AboutSignal.astro');

  assert.match(layout, /family=Inter:wght@400;500;600;700;800/);
  assert.match(layout, /Plus\+Jakarta\+Sans:ital,wght@0,500;0,600;0,700;0,800/);
  assert.match(reset, /font-family:\s*var\(--font-body\)/);

  for (const token of [
    '--text-section-title:', '--text-section-title-mobile:',
    '--text-section-intro:', '--text-section-intro-mobile:',
    '--text-card-title:', '--text-feature-title:', '--text-kpi:',
    '--weight-body:', '--weight-medium:', '--weight-label:',
    '--weight-heading:', '--weight-display:',
    '--leading-section-title:', '--tracking-section-title:',
  ]) {
    assert.ok(tokens.includes(token), 'Missing canonical typography role ' + token);
  }

  for (const [name, source] of [['DECIDE/BUILD/TEST', plane], ['MEASURE', evidence], ['ABOUT', about]]) {
    assert.match(source, /font-size:\s*var\(--text-section-title\)/, name + ' should share desktop title scale');
    assert.match(source, /font-size:\s*var\(--text-section-title-mobile\)/, name + ' should share phone title scale');
    assert.match(source, /font-weight:\s*var\(--weight-display\)/, name + ' should use real loaded display weight');
    assert.match(source, /letter-spacing:\s*var\(--tracking-section-title\)/, name + ' should share heading tracking');
    assert.match(source, /font-size:\s*var\(--text-section-intro-mobile\)/, name + ' should share phone intro scale');
  }

  for (const path of [
    'src/components/landing/LandingHero.astro',
    'src/components/landing/DecisionTable.astro',
    'src/components/landing/BuildSystemsShowcase.astro',
    'src/components/landing/TestProductGallery.astro',
    'src/components/landing/ExperimentResultsExplorer.astro',
    'src/components/landing/EvidenceStage.astro',
    'src/components/landing/AboutSignal.astro',
    'src/components/landing/StageRail.astro',
    'src/components/landing/MethodThread.astro',
    'src/components/landing/PlaneTemplate.astro',
    'src/components/layout/SiteHeader.astro',
    'src/components/layout/SiteFooter.astro',
  ]) {
    const source = read(path);
    assert.doesNotMatch(source, /font-weight:\s*(?:4[1-9]\d|5\d\d|6\d\d|7\d\d|8\d\d)\s*;/,
      path + ' must not introduce ad-hoc unsourced weights');
    assert.doesNotMatch(source, /font-family:\s*['"](?:Arial|Helvetica|Roboto|Georgia)/,
      path + ' must not introduce a third non-brand font');
  }

  for (const path of [
    'src/components/landing/DecisionTable.astro',
    'src/components/landing/BuildSystemsShowcase.astro',
    'src/components/landing/TestProductGallery.astro',
    'src/components/landing/ExperimentResultsExplorer.astro',
  ]) {
    const source = read(path);
    assert.match(source, /var\(--text-card-title\)|var\(--text-feature-title\)/,
      path + ' must share canonical card typography');
  }
});


test('MEASURE communicates the source-backed finding before scoped results and comparisons', () => {
  const explorer = read('src/components/landing/ExperimentResultsExplorer.astro');
  const finding = explorer.indexOf('class="evidence-takeaway" data-mcb-takeaway');
  const highlights = explorer.indexOf('class="mcb-highlights-viewport"');
  const scope = explorer.indexOf('class="run-summary" data-mcb-scope');
  const comparison = explorer.indexOf('class="mcb-model-browser"');
  assert.ok(finding > 0 && highlights > finding && comparison > highlights && scope > comparison,
    'finding > at-a-glance metrics > opt-in comparison > methodology scope must be the reading order');
  assert.match(explorer, /<details class="mcb-explore-details"/);
  assert.match(explorer, /<details class="mcb-method-details"/);
  assert.match(explorer, /<strong data-fastest>/);

  assert.match(explorer, /WHAT THE EVIDENCE SHOWS/);
  assert.match(explorer, /data-readout-title/);
  assert.match(explorer, /data-readout/);
  assert.match(explorer, /data-highlight-role="best-overall"/);
  assert.match(explorer, /BEST OVERALL QUALITY/);
  assert.match(explorer, /data-highlight-role="best-local"/);
  assert.match(explorer, /BEST LOCAL QUALITY/);
  assert.doesNotMatch(explorer, /data-highlight-role="fastest-local"/);
  assert.match(explorer, /data-fastest-model/);
  assert.doesNotMatch(explorer, /<span>BALANCE POINT<\/span>/);
  assert.match(explorer, /const fastestLocal = \[\.\.\.localPoints\]\.sort/);
  assert.match(explorer, /button\.dataset\.deployment = point\.deployment === 'api'/);
  assert.match(explorer, /button\.dataset\.insightRole = role === 'TOP QUALITY'/);
  assert.match(explorer, /data-mcb-model-cards/);
  assert.match(explorer, /var\(--measure-spotlight-bg\)/);
  assert.match(explorer, /--measure-spotlight-ink:/);
  assert.match(explorer, /--measure-local-ink:/);
  assert.match(explorer, /--measure-api-ink:/);
  assert.match(explorer, /data-deployment='local'/);
  assert.match(explorer, /data-deployment='api'/);
  assert.match(explorer, /data-highlight-role='best-overall'/);
  assert.match(explorer, /data-highlight-role='best-local'/);
  assert.match(explorer, /\.mcb-fastest-note/);
  assert.match(explorer, /\.evidence-takeaway\[hidden\]/);

  // Use accents to classify origin and priority, never to imply fabricated performance.
  assert.match(explorer, /var\(--accent-blue\)/);
  assert.match(explorer, /var\(--accent-teal\)/);
  assert.match(explorer, /var\(--accent-violet\)/);
  assert.match(explorer, /color-mix\(in srgb/);
  assert.match(explorer, /Local and API latency are not hardware-matched/);
  assert.match(explorer, /No fallback or invented performance values are shown/);
});

test('header switches to compact navigation before desktop links collide', () => {
  const header = read('src/components/layout/SiteHeader.astro');
  assert.match(header, /@media \(max-width: 1700px\)/);
  assert.match(header, /\.menu-toggle \{ display: block; \}/);
  assert.match(header, /\.site-nav\s*\{\s*position: absolute;/);
  assert.match(header, /aria-expanded="false"/);
});
