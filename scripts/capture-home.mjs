import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.VISUAL_REVIEW_BASE_URL || 'http://127.0.0.1:4321';
const outputDir = path.resolve(process.env.HOME_VISUAL_REVIEW_OUTPUT || 'visual-review-home');
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1100 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-320', width: 320, height: 700 },
];

const selectorFor = (element) => {
  const tag = element.tagName.toLowerCase();
  if (element.id) return `${tag}#${element.id}`;
  const classes = Array.from(element.classList).slice(0, 3);
  return classes.length ? `${tag}.${classes.join('.')}` : tag;
};

const warmRenderedPage = async (page) => {
  const metrics = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
  }));
  const step = Math.max(360, Math.floor(metrics.viewport * 0.8));
  for (let y = 0; y < metrics.height; y += step) {
    await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'auto' }), y);
    await page.waitForTimeout(22);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  await page.waitForTimeout(160);
};

const readDiagnostics = async (page) => page.evaluate(() => {
  const root = document.documentElement;
  const body = document.body;
  const journey = document.querySelector('[data-method-journey]');
  const stages = Array.from(document.querySelectorAll('.method-stage'));
  const actionTargets = Array.from(document.querySelectorAll('.hero-actions a, .primary-button, .secondary-button'))
    .map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        label: node.textContent?.replace(/\s+/g, ' ').trim() || '',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    })
    .filter((item) => item.width < 44 || item.height < 44);

  const smallText = Array.from(body.querySelectorAll('*'))
    .map((element) => {
      const hasDirectText = Array.from(element.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!hasDirectText) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (rect.width <= 1 || rect.height <= 1 || style.display === 'none' || style.visibility === 'hidden') return null;
      const fontSize = Number.parseFloat(style.fontSize);
      if (!Number.isFinite(fontSize) || fontSize >= 14) return null;
      const tag = element.tagName.toLowerCase();
      const classes = Array.from(element.classList).slice(0, 3);
      return {
        selector: element.id ? `${tag}#${element.id}` : classes.length ? `${tag}.${classes.join('.')}` : tag,
        text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
        fontSize: Math.round(fontSize * 100) / 100,
      };
    })
    .filter(Boolean)
    .slice(0, 50);

  const stageVisibility = stages.map((stage) => {
    const copy = stage.querySelector('.stage-copy');
    const visual = stage.querySelector('.stage-visual');
    const copyStyle = copy ? getComputedStyle(copy) : null;
    const visualStyle = visual ? getComputedStyle(visual) : null;
    return {
      id: stage.id || stage.getAttribute('data-stage') || stage.querySelector('.stage-kicker')?.textContent?.trim() || 'stage',
      copyDisplay: copyStyle?.display || null,
      copyVisibility: copyStyle?.visibility || null,
      copyOpacity: copyStyle ? Number.parseFloat(copyStyle.opacity) : null,
      visualDisplay: visualStyle?.display || null,
      visualVisibility: visualStyle?.visibility || null,
      visualOpacity: visualStyle ? Number.parseFloat(visualStyle.opacity) : null,
    };
  });

  return {
    innerWidth: window.innerWidth,
    scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
    horizontalOverflowPx: Math.max(0, Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth),
    h1Count: document.querySelectorAll('h1').length,
    mainCount: document.querySelectorAll('main').length,
    methodPathReady: root.dataset.methodPathReady || null,
    checkpointState: journey?.getAttribute('data-checkpoint-state') || null,
    stageCount: stages.length,
    stageVisibility,
    smallText,
    smallActionTargets: actionTargets,
  };
});

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts?.ready);
    await warmRenderedPage(page);
    const diagnostics = await readDiagnostics(page);
    const screenshotPath = path.join(outputDir, `home__${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    report.push({
      mode: 'normal',
      viewport,
      status: response?.status() ?? null,
      ...diagnostics,
      consoleErrors,
      pageErrors,
      screenshot: path.basename(screenshotPath),
    });

    await page.close();
    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const reducedPage = await reducedContext.newPage();
  const reducedConsoleErrors = [];
  const reducedPageErrors = [];
  reducedPage.on('console', (message) => {
    if (message.type() === 'error') reducedConsoleErrors.push(message.text());
  });
  reducedPage.on('pageerror', (error) => reducedPageErrors.push(error.message));
  const reducedResponse = await reducedPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await reducedPage.evaluate(() => document.fonts?.ready);
  await warmRenderedPage(reducedPage);
  const reducedDiagnostics = await readDiagnostics(reducedPage);
  const reducedScreenshotPath = path.join(outputDir, 'home__mobile-390-reduced-motion.png');
  await reducedPage.screenshot({ path: reducedScreenshotPath, fullPage: true });

  report.push({
    mode: 'reduced-motion',
    viewport: { name: 'mobile-390-reduced-motion', width: 390, height: 844 },
    status: reducedResponse?.status() ?? null,
    ...reducedDiagnostics,
    consoleErrors: reducedConsoleErrors,
    pageErrors: reducedPageErrors,
    screenshot: path.basename(reducedScreenshotPath),
  });

  await reducedPage.close();
  await reducedContext.close();

  // Regression: JEV rows are created at runtime. Astro's scoped CSS does not
  // automatically apply to these elements, so check actual computed layout.
  const jevEvidence = {
    schema_version: 1,
    benchmark: 'jev-vs-llm',
    publication: {
      scope: 'non_restricted_aggregates_only',
      restricted_jev_typesafe_clm_metrics_included: false,
      comparison_status: 'partial_provider_subset',
    },
    experiments: ['routing', 'calibration', 'scaling', 'workflow', 'agent'].map((id) => ({
      id, status: id === 'routing' ? 'published_subset' : 'not_published',
    })),
    routing: {
      status: 'published_subset',
      providers: ['local-korgis'],
      models: [
        { model: 'qwen3.5-9b-q4km', provider: 'local-korgis', accuracy: 0.64, latency_p50_ms: 8300, requests: 77 },
        { model: 'qwen3.5-2b-q4km', provider: 'local-korgis', accuracy: 0.567, latency_p50_ms: 2000, requests: 77 },
        { model: 'nemotron-nano-4b', provider: 'local-korgis', accuracy: 0.5, latency_p50_ms: 6000, requests: 77 },
        { model: 'nemotron-nano-4b-q8', provider: 'local-korgis', accuracy: 0.521, latency_p50_ms: 6100, requests: 77 },
        { model: 'qwen3.5-0.8b-q4km', provider: 'local-korgis', accuracy: 0.25, latency_p50_ms: 704, requests: 24 },
      ],
    },
  };
  const jevLayouts = [];
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000, expectedColumns: 3 },
    { name: 'mobile', width: 390, height: 844, expectedColumns: 2 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.route('**/experiments/jev-vs-llm/results/published/portfolio-summary.json', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(jevEvidence),
      }),
    );
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-track-id="jev-vs-llm-routing"]').click();
    await page.locator('[data-jev-rows] .jev-model-row').first().waitFor({ state: 'visible' });

    const diagnostics = await page.evaluate(() => {
      const row = document.querySelector('[data-jev-rows] .jev-model-row');
      const track = row?.querySelector('.jev-model-row__track');
      const fill = row?.querySelector('.jev-model-row__fill');
      const name = row?.querySelector('.jev-model-row__name');
      const accuracy = row?.querySelector('.jev-model-row__accuracy');
      const latency = row?.querySelector('.jev-model-row__latency');
      const css = row ? getComputedStyle(row) : null;
      const rowChildren = [name, accuracy, latency].map((node) =>
        node?.getBoundingClientRect() || null,
      );
      const mobile = window.innerWidth <= 520;
      return {
        rowCount: document.querySelectorAll('[data-jev-rows] .jev-model-row').length,
        display: css?.display || null,
        renderedColumns: css?.gridTemplateColumns?.split(' ').length ?? 0,
        trackHeight: track?.getBoundingClientRect().height || 0,
        fillWidth: fill?.getBoundingClientRect().width || 0,
        columnsHaveWidth: rowChildren.every((rect) => rect && rect.width > 20),
        columnsAligned: mobile
          ? Boolean(rowChildren[0] && rowChildren[1] && rowChildren[2] &&
              rowChildren[0].bottom <= rowChildren[1].top + 3)
          : Boolean(rowChildren[0] && rowChildren[1] && rowChildren[2] &&
              rowChildren[0].left < rowChildren[1].left &&
              rowChildren[1].left < rowChildren[2].left),
        takeaway: document.querySelector('[data-jev-takeaway-headline]')?.textContent?.trim(),
        horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      };
    });
    jevLayouts.push({ viewport: viewport.name, ...diagnostics });

    await page.locator('[data-jev-summary]').screenshot({
      path: path.join(outputDir, `jev-comparison__${viewport.name}.png`),
    });
    await page.close();
    await context.close();

    if (
      diagnostics.rowCount !== 4 ||
      diagnostics.display !== 'grid' ||
      diagnostics.renderedColumns !== viewport.expectedColumns ||
      diagnostics.trackHeight < 5 ||
      diagnostics.fillWidth < 5 ||
      !diagnostics.columnsHaveWidth ||
      !diagnostics.columnsAligned ||
      !diagnostics.takeaway ||
      diagnostics.horizontalOverflowPx > 0
    ) {
      throw new Error(`JEV visual regression in ${viewport.name}: ${JSON.stringify(diagnostics)}`);
    }
  }
  await fs.writeFile(
    path.join(outputDir, 'jev-layout-check.json'),
    JSON.stringify(jevLayouts, null, 2),
  );
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));

const hiddenReducedStages = (item) => item.mode === 'reduced-motion' && item.stageVisibility.some((stage) =>
  stage.copyDisplay === 'none' ||
  stage.copyVisibility === 'hidden' ||
  (stage.copyOpacity !== null && stage.copyOpacity < 0.99) ||
  stage.visualDisplay === 'none' ||
  stage.visualVisibility === 'hidden' ||
  (stage.visualOpacity !== null && stage.visualOpacity < 0.99)
);

const failures = report.filter((item) =>
  item.status !== 200 ||
  item.horizontalOverflowPx > 0 ||
  item.h1Count !== 1 ||
  item.mainCount !== 1 ||
  item.stageCount !== 4 ||
  !['true', 'fallback'].includes(item.methodPathReady) ||
  !['valid', 'fallback'].includes(item.checkpointState) ||
  item.smallText.length > 0 ||
  item.smallActionTargets.length > 0 ||
  item.consoleErrors.length > 0 ||
  item.pageErrors.length > 0 ||
  hiddenReducedStages(item)
);

console.log(JSON.stringify({ captures: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
