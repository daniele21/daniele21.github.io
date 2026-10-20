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

// Exercise the actual control presented at each viewport (native select on phones).
const selectExperiment = async (page, id) => {
  const tab = page.locator('[data-experiment-tab][data-track-id="' + id + '"]');
  if (await tab.isVisible()) {
    await tab.click();
    return;
  }
  const index = await tab.evaluate((element) =>
    [...document.querySelectorAll('[data-experiment-tab]')].indexOf(element)
  );
  if (index < 0) throw new Error('Missing experiment: ' + id);
  await page.locator('[data-experiment-mobile-select]').selectOption(String(index));
};

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
      const style = getComputedStyle(node);
      if (!rect.width || !rect.height || style.display === 'none' || style.visibility === 'hidden') return null;
      return {
        label: node.textContent?.replace(/\s+/g, ' ').trim() || '',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    })
    .filter((item) => item && (item.width < 44 || item.height < 44));

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
    .slice(0, 150);

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

  // DECIDE: verify actual mobile horizontal movement and desktop comparison.
  // Screenshots are review artifacts, not a replacement for DOM/interaction assertions.
  const decisionChecks = [];
  for (const viewport of [
    { name: 'mobile-320', width: 320, height: 700 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 1100 },
  ]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      try {
        await page.goto(baseUrl + '/?theme=' + theme, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts?.ready);
        const surface = page.locator('#strategy [data-decision-cards]');
        const initial = await page.evaluate(() => {
          const region = document.querySelector('#strategy [data-decision-viewport]');
          const cards = [...document.querySelectorAll('#strategy [data-mode]')];
          return {
            theme: document.documentElement.dataset.theme,
            modeOrder: cards.map((el) => el.dataset.mode),
            factorsPerCard: cards.map((el) => el.querySelectorAll('.factor').length),
            snap: region ? getComputedStyle(region).scrollSnapType : null,
            railScrolls: region ? region.scrollWidth > region.clientWidth + 5 : false,
            pageOverflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            cardTextSizes: cards.flatMap((card) =>
              [...card.querySelectorAll('p, h4, span, dt, dd')]
                .filter((el) => el.getBoundingClientRect().height > 0 &&
                  [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()))
                .map((el) => Number.parseFloat(getComputedStyle(el).fontSize))
            ),
          };
        });

        await surface.screenshot({
          path: path.join(outputDir, 'decide__' + viewport.name + '__' + theme + '.png'),
        });

        let advancedToSecond = true;
        let advancedToThird = true;
        if (viewport.width < 1000) {
          await page.locator('[data-decision-next]').click();
          await page.waitForFunction(() =>
            document.querySelector('[data-decision-current]')?.textContent?.trim() === '02'
          );
          advancedToSecond = await page.locator('[data-decision-current]').textContent() === '02';
          await page.locator('[data-decision-next]').click();
          await page.waitForFunction(() =>
            document.querySelector('[data-decision-current]')?.textContent?.trim() === '03'
          );
          advancedToThird = await page.locator('[data-decision-current]').textContent() === '03';
        }

        const check = { viewport: viewport.name, ...initial, advancedToSecond, advancedToThird };
        decisionChecks.push(check);
        if (
          initial.theme !== theme ||
          initial.modeOrder.join(',') !== 'local,hybrid,cloud' ||
          initial.factorsPerCard.some((count) => count !== 5) ||
          initial.pageOverflowPx > 0 ||
          initial.cardTextSizes.some((size) => !Number.isFinite(size) || size < 14) ||
          (viewport.width < 1000 && (!initial.railScrolls || !initial.snap.includes('mandatory'))) ||
          (viewport.width === 1440 && initial.railScrolls) ||
          !advancedToSecond || !advancedToThird
        ) {
          throw new Error('DECIDE responsive carousel regression: ' + JSON.stringify(check));
        }
      } finally {
        await page.close();
        await context.close();
      }
    }
  }
  await fs.writeFile(path.join(outputDir, 'decide-card-check.json'), JSON.stringify(decisionChecks, null, 2));

  // TEST: capture the real logos/screenshots and exercise the mobile card rail.
  const testGalleryChecks = [];
  for (const viewport of [
    { name: 'mobile-320', width: 320, height: 700 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 1100 },
  ]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      try {
        await page.goto(baseUrl + '/?theme=' + theme, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts?.ready);
        const surface = page.locator('#applications [data-test-gallery]');
        await surface.scrollIntoViewIfNeeded();
        await page.evaluate(async () => {
          const images = [...document.querySelectorAll('#applications .gallery-card img')];
          await Promise.all(images.map(async (image) => {
            image.loading = 'eager';
            try { await image.decode(); } catch { /* captured as naturalWidth = 0 */ }
          }));
        });

        const diagnostics = await page.evaluate(() => {
          const root = document.querySelector('#applications [data-test-gallery]');
          const rail = root?.querySelector('[data-test-viewport]');
          const slides = [...(root?.querySelectorAll('.gallery-slide') ?? [])];
          const images = [...(root?.querySelectorAll('.gallery-card img') ?? [])];
          const labels = [...(root?.querySelectorAll('.gallery-card h4, .gallery-card p, .gallery-card span') ?? [])];
          return {
            theme: document.documentElement.dataset.theme,
            applications: slides.map((node) => node.getAttribute('data-application')),
            sources: images.map((node) => node.getAttribute('src')),
            brokenImages: images.filter((img) => !img.complete || !img.naturalWidth).map((img) => img.src),
            linksValid: slides.every((slide) => {
              const link = slide.querySelector('.gallery-card');
              return link?.getAttribute('href')?.startsWith('/') && link?.getAttribute('href') !== '/';
            }),
            scrollSnap: rail ? getComputedStyle(rail).scrollSnapType : '',
            railScrolls: rail ? rail.scrollWidth > rail.clientWidth + 5 : false,
            pageOverflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            cardHeights: slides.map((slide) =>
              Math.round(slide.querySelector('.gallery-card')?.getBoundingClientRect().height || 0)),
            screenshotHeights: slides.map((slide) =>
              Math.round(slide.querySelector('.preview-window')?.getBoundingClientRect().height || 0)),
            typography: {
              heading: getComputedStyle(root.querySelector('.value-headline')).fontFamily,
              appName: getComputedStyle(root.querySelector('.app-name')).fontFamily,
              question: getComputedStyle(root.querySelector('.product-question')).fontFamily,
              metadata: getComputedStyle(root.querySelector('.app-category')).fontFamily,
              chips: getComputedStyle(root.querySelector('.feature-chip')).fontFamily,
              headlineWeight: getComputedStyle(root.querySelector('.value-headline')).fontWeight,
            },
            tinyLabels: labels
              .filter((node) => node.getBoundingClientRect().height > 0 &&
                [...node.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) &&
                Number.parseFloat(getComputedStyle(node).fontSize) < 14)
              .map((node) => node.textContent?.trim().slice(0, 50)),
          };
        });
        await surface.screenshot({
          path: path.join(outputDir, 'test__' + viewport.name + '__' + theme + '.png'),
        });

        let reachedSecond = true;
        let reachedThird = true;
        if (viewport.width < 1000) {
          await page.locator('[data-test-next]').click();
          await page.waitForFunction(() => document.querySelector('[data-test-current]')?.textContent?.trim() === '02');
          reachedSecond = (await page.locator('[data-test-current]').textContent())?.trim() === '02';
          await page.locator('[data-test-next]').click();
          await page.waitForFunction(() => document.querySelector('[data-test-current]')?.textContent?.trim() === '03');
          reachedThird = (await page.locator('[data-test-current]').textContent())?.trim() === '03';
        }

        const check = { viewport: viewport.name, ...diagnostics, reachedSecond, reachedThird };
        testGalleryChecks.push(check);
        if (
          diagnostics.theme !== theme ||
          diagnostics.applications.join(',') !== 'redact-guard,aura-finance,closedroom' ||
          diagnostics.sources.length !== 6 ||
          diagnostics.brokenImages.length !== 0 ||
          !diagnostics.linksValid ||
          diagnostics.pageOverflowPx > 0 ||
          diagnostics.tinyLabels.length > 0 ||
          diagnostics.cardHeights.some((height) =>
            height <= 0 || height > (viewport.width === 320 ? 760 : viewport.width === 390 ? 710 : 660)) ||
          diagnostics.screenshotHeights.some((height) => height < 150 || height > 185) ||
          !diagnostics.typography.heading.includes('Plus Jakarta Sans') ||
          !diagnostics.typography.appName.includes('Plus Jakarta Sans') ||
          !diagnostics.typography.question.includes('Inter') ||
          !diagnostics.typography.metadata.includes('Inter') ||
          !diagnostics.typography.chips.includes('Inter') ||
          (viewport.width < 1000 && (!diagnostics.railScrolls || !diagnostics.scrollSnap.includes('mandatory'))) ||
          (viewport.width === 1440 && diagnostics.railScrolls) ||
          !reachedSecond || !reachedThird
        ) {
          throw new Error('TEST gallery visual/asset regression: ' + JSON.stringify(check));
        }
      } finally {
        await page.close();
        await context.close();
      }
    }
  }
  await fs.writeFile(
    path.join(outputDir, 'test-gallery-check.json'),
    JSON.stringify(testGalleryChecks, null, 2),
  );

  // MEASURE: editorial phone layout, real-data model comparisons and honest empty states.
  const measureChecks = [];
  for (const viewport of [
    { name: 'mobile-320', width: 320, height: 700 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 1100 },
  ]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      try {
        await page.goto(baseUrl + '/?theme=' + theme, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts?.ready);
        const stage = page.locator('#evidence .experiment-explorer');
        await stage.scrollIntoViewIfNeeded();
        const diagnostics = await page.evaluate(() => {
          const root = document.querySelector('#evidence .experiment-explorer');
          const tabs = [...root.querySelectorAll('[data-experiment-tab]')];
          const rail = root.querySelector('[data-experiment-rail]');
          const highlights = root.querySelector('.mcb-highlights-viewport');
          const modelRail = root.querySelector('.mcb-cards-viewport');
          const modelCard = root.querySelector('[data-mcb-model-cards] [data-mcb-card]');
          const cardSections = modelCard
            ? ['topline', 'identity', 'metrics'].map(name =>
                modelCard.querySelector('.mcb-model-card__' + name)?.getBoundingClientRect()).filter(Boolean)
            : [];
          const modelCardGaps = cardSections.slice(1).map((rect, index) =>
            Math.max(0, rect.top - cardSections[index].bottom));
          const modelMetrics = modelCard
            ? [...modelCard.querySelectorAll('.mcb-model-card__metric')].map(node => ({
                value: node.querySelector('.mcb-model-card__metric-value')?.textContent?.trim(),
                label: node.querySelector('.mcb-model-card__metric-label')?.textContent?.trim(),
              }))
            : [];
          const scope = root.querySelector('.run-summary');
          const story = root.querySelector('[data-mcb-story]');
          const details = root.querySelector('[data-mcb-chart-details]');
          const takeaway = root.querySelector('[data-mcb-takeaway]');
          const summary = root.querySelector('.run-summary');
          const svg = root.querySelector('[data-performance-plot]');
          const titles = [...root.querySelectorAll('h3, h4, .experiment-mobile-chooser label')];
          return {
            theme: document.documentElement.dataset.theme,
            pageOverflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            selectedTab: tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.trackId,
            publishedCount: tabs.filter((t) => t.dataset.published === 'true').length,
            unpublishedCount: tabs.filter((t) => t.dataset.published === 'false').length,
            benchmarkRailVisible: rail ? getComputedStyle(rail).display !== 'none' : false,
            benchmarkScrolls: rail ? rail.scrollWidth > rail.clientWidth + 5 : false,
            benchmarkSnap: rail ? getComputedStyle(rail).scrollSnapType : '',
            benchmarkCardWidths: tabs.map(t => Math.round(t.getBoundingClientRect().width)),
            selectedIndex: tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'),
            highlightScrolls: highlights ? highlights.scrollWidth > highlights.clientWidth + 5 : false,
            highlightLayout: highlights ? {
              width: highlights.getBoundingClientRect().width,
              clientWidth: highlights.clientWidth,
              scrollWidth: highlights.scrollWidth,
              overflowX: getComputedStyle(highlights).overflowX,
              trackWidth: highlights.firstElementChild?.getBoundingClientRect().width,
              trackDisplay: highlights.firstElementChild ? getComputedStyle(highlights.firstElementChild).display : null,
              cardWidths: [...highlights.querySelectorAll('.highlight')].map(el => el.getBoundingClientRect().width),
            } : null,
            modelScrolls: modelRail ? modelRail.scrollWidth > modelRail.clientWidth + 5 : false,
            modelCardInsight: modelCard ? {
              role: modelCard.querySelector('.mcb-model-card__role')?.textContent?.trim(),
              description: modelCard.querySelector('.mcb-model-card__insight')?.textContent?.trim(),
              name: modelCard.querySelector('.mcb-model-card__name')?.textContent?.trim(),
              cardHeight: Math.round(modelCard.getBoundingClientRect().height),
              cardWidth: Math.round(modelCard.getBoundingClientRect().width),
              largestInternalGap: Math.round(Math.max(0, ...modelCardGaps)),
              metrics: modelMetrics,
              display: getComputedStyle(modelCard).display,
              roleFontPx: Number.parseFloat(getComputedStyle(modelCard.querySelector('.mcb-model-card__role')).fontSize),
            } : null,
            scopeScrolls: scope ? scope.scrollWidth > scope.clientWidth + 5 : false,
            storyVisible: story ? !story.hidden && !root.querySelector('[data-evidence-result]').hidden : false,
            chartOpen: Boolean(details?.open),
            chartKeyboardFocusable: Boolean(root.querySelector('.plot-canvas[tabindex="0"]')),
            chartMinWidth: svg ? getComputedStyle(svg).minWidth : '',
            evidenceWidth: root.getBoundingClientRect().width,
            modelCardCount: root.querySelectorAll('[data-mcb-model-cards] [data-mcb-card]').length,
            summaryDisplay: getComputedStyle(summary).display,
            headingFamily: getComputedStyle(root.querySelector('.evidence-panel__header h3')).fontFamily,
            fonts: titles.filter((t) => t.getBoundingClientRect().height > 0).map((t) => Number.parseFloat(getComputedStyle(t).fontSize)),
            takeawayBeforeModels: Boolean(takeaway?.compareDocumentPosition(story) & Node.DOCUMENT_POSITION_FOLLOWING),
          };
        });

        await page.locator('#evidence').screenshot({
          path: path.join(outputDir, 'measure__' + viewport.name + '__' + theme + '.png'),
        });

        const isMobile = viewport.width <= 390;
        let filtersWork = true;
        let showAllWorks = true;
        if (isMobile && diagnostics.storyVisible && diagnostics.modelCardCount > 3) {
          filtersWork = false; // Regression: initial list must be compact.
        } else if (isMobile && diagnostics.storyVisible && diagnostics.modelCardCount > 0) {
          const localFilter = page.locator('.mcb-list-filters [data-mcb-filter="local"]');
          await localFilter.click();
          filtersWork = (await localFilter.getAttribute('aria-pressed')) === 'true';
          const showAll = page.locator('[data-mcb-show-all]');
          if (await showAll.isVisible()) {
            await showAll.click();
            showAllWorks = (await showAll.getAttribute('aria-expanded')) === 'true';
          }
          await page.locator('[data-mcb-chart-details] summary').click();
          const expanded = await page.locator('[data-mcb-chart-details]').evaluate((el) => el.open);
          filtersWork = filtersWork && expanded;
        }

        let arrowNavigationWorks = true;
        let swipeWorks = true;
        if (isMobile) {
          const first = diagnostics.selectedTab;
          await page.locator('[data-experiment-next]').click();
          await page.waitForFunction((previous) =>
            document.querySelector('[data-experiment-tab][aria-selected="true"]')?.dataset.trackId !== previous,
            first,
          );
          const moved = await page.locator('[data-experiment-tab][aria-selected="true"]').getAttribute('data-track-id');
          await page.locator('[data-experiment-prev]').click();
          const back = await page.locator('[data-experiment-tab][aria-selected="true"]').getAttribute('data-track-id');
          arrowNavigationWorks = moved !== first && back === first;
          const rail = page.locator('[data-experiment-rail]');
          await rail.evaluate((node) => node.scrollTo({ left: node.scrollWidth, behavior: 'instant' }));
          swipeWorks = await rail.evaluate((node) => node.scrollLeft > 10);
        }

        await selectExperiment(page, 'vlm-capability');
        const unpublished = await page.evaluate(() => {
          const root = document.querySelector('#evidence .experiment-explorer');
          return {
            selected: root.querySelector('[aria-selected="true"]')?.dataset.trackId,
            emptyVisible: !root.querySelector('[data-evidence-empty]').hidden,
            resultHidden: root.querySelector('[data-evidence-result]').hidden,
          };
        });

        const check = { viewport: viewport.name, ...diagnostics, filtersWork, showAllWorks, arrowNavigationWorks, swipeWorks, unpublished };
        measureChecks.push(check);
        if (
          diagnostics.theme !== theme ||
          diagnostics.pageOverflowPx > 0 ||
          diagnostics.publishedCount !== 3 ||
          diagnostics.unpublishedCount !== 3 ||
          diagnostics.fonts.some((size) => size < 14) ||
          !diagnostics.chartKeyboardFocusable ||
          !diagnostics.headingFamily.includes('Plus Jakarta Sans') ||
          !diagnostics.takeawayBeforeModels ||
          (isMobile && (!diagnostics.benchmarkRailVisible || !diagnostics.benchmarkScrolls)) ||
          (isMobile && !diagnostics.benchmarkSnap.includes('mandatory')) ||
          (isMobile && diagnostics.benchmarkCardWidths.some(width => width < 150)) ||
          (isMobile && diagnostics.storyVisible && (!diagnostics.highlightScrolls ||
            diagnostics.highlightLayout?.cardWidths?.some(width => width > diagnostics.evidenceWidth))) ||
          (isMobile && diagnostics.storyVisible && !diagnostics.scopeScrolls) ||
          (isMobile && diagnostics.storyVisible && diagnostics.modelCardCount > 1 && !diagnostics.modelScrolls) ||
          (isMobile && diagnostics.storyVisible && diagnostics.modelCardCount > 0 && (
            !diagnostics.modelCardInsight?.role ||
            !diagnostics.modelCardInsight?.description ||
            !diagnostics.modelCardInsight?.name ||
            diagnostics.modelCardInsight.display !== 'grid' ||
            diagnostics.modelCardInsight.cardHeight > 250 ||
            diagnostics.modelCardInsight.largestInternalGap > 20 ||
            diagnostics.modelCardInsight.roleFontPx < 14 ||
            diagnostics.modelCardInsight.metrics?.length !== 2 ||
            diagnostics.modelCardInsight.metrics[0]?.label !== 'Quality / 100' ||
            diagnostics.modelCardInsight.metrics[1]?.label !== 'Median p50' ||
            !diagnostics.modelCardInsight.metrics[0]?.value ||
            !diagnostics.modelCardInsight.metrics[1]?.value
          )) ||
          !arrowNavigationWorks ||
          !swipeWorks ||
          (isMobile && diagnostics.evidenceWidth < viewport.width * 0.72) ||
          (isMobile && diagnostics.chartOpen) ||
          (isMobile && Number.parseFloat(diagnostics.chartMinWidth) < 620) ||
          (isMobile && diagnostics.summaryDisplay !== 'flex') ||
          (isMobile && diagnostics.storyVisible && diagnostics.modelCardCount === 0) ||
          !filtersWork ||
          !showAllWorks ||
          unpublished.selected !== 'vlm-capability' ||
          !unpublished.emptyVisible ||
          !unpublished.resultHidden
        ) {
          throw new Error('MEASURE editorial mobile regression: ' + JSON.stringify(check));
        }
      } finally {
        await page.close();
        await context.close();
      }
    }
  }
  await fs.writeFile(path.join(outputDir, 'measure-mobile-check.json'), JSON.stringify(measureChecks, null, 2));

  // The BUILD redesign must be inspected in both themes, independently of
  // the whole-page journey animation. Element captures make visual PR review
  // practical without changing how navigation or the method path works.
  const buildShowcaseChecks = [];
  for (const viewport of [
    { name: 'desktop-1440', width: 1440, height: 1100 },
    { name: 'mobile-390', width: 390, height: 844 },
  ]) {
    for (const theme of ['light', 'dark']) {
      const buildContext = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      });
      const buildPage = await buildContext.newPage();
      try {
        await buildPage.goto(baseUrl + '/?theme=' + theme, { waitUntil: 'networkidle' });
        await buildPage.evaluate(() => document.fonts?.ready);
        const diagnostics = await buildPage.evaluate(() => {
          const showcase = document.querySelector('#infrastructure .systems-showcase');
          const runtimes = Array.from(showcase?.querySelectorAll('.runtime-card') ?? []);
          const primitives = Array.from(showcase?.querySelectorAll('.primitive') ?? []);
          return {
            theme: document.documentElement.dataset.theme,
            runtimeIds: runtimes.map((card) => card.getAttribute('data-system')),
            primitiveIds: primitives.map((card) => card.getAttribute('data-system')),
            validLinks: [...runtimes, ...primitives].every(
              (card) => card.getAttribute('href')?.startsWith('/') && card.getAttribute('href') !== '/'
            ),
            horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            narrowText: [...(showcase?.querySelectorAll('p, h3, h4, span') ?? [])]
              .filter((node) => {
                const rect = node.getBoundingClientRect();
                const style = getComputedStyle(node);
                return rect.width > 0 && rect.height > 0 &&
                  style.visibility !== 'hidden' &&
                  Number.parseFloat(style.fontSize) < 14 &&
                  [...node.childNodes].some((child) => child.nodeType === Node.TEXT_NODE && child.textContent?.trim());
              }).map((node) => node.className || node.tagName.toLowerCase()),
          };
        });
        const record = { viewport: viewport.name, ...diagnostics };
        buildShowcaseChecks.push(record);
        await buildPage.locator('#infrastructure .systems-showcase').screenshot({
          path: path.join(outputDir, 'build__' + viewport.name + '__' + theme + '.png'),
        });
        if (
          diagnostics.theme !== theme ||
          diagnostics.runtimeIds.join(',') !== 'korgis,harnex' ||
          diagnostics.primitiveIds.join(',') !== 'decisio,local-asr-server' ||
          !diagnostics.validLinks ||
          diagnostics.horizontalOverflowPx !== 0 ||
          diagnostics.narrowText.length > 0
        ) {
          throw new Error('BUILD brand/responsive visual regression: ' + JSON.stringify(record));
        }
      } finally {
        await buildPage.close();
        await buildContext.close();
      }
    }
  }
  await fs.writeFile(
    path.join(outputDir, 'build-showcase-check.json'),
    JSON.stringify(buildShowcaseChecks, null, 2),
  );

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
  const matchedMcbEvidence = {
    cells: [
      { model_key: 'gpt-5.6-luna', capability_id: 'intent-classification',
        primary_metric: 'accuracy', primary_value: 0.8246753246753247,
        sample_count: 154, benchmark_signature: 'same-mcb-benchmark', deployment: 'api' },
      { model_key: 'jev-1.13.0', capability_id: 'intent-classification',
        primary_metric: 'accuracy', primary_value: 0.7467532467532467,
        sample_count: 154, benchmark_signature: 'same-mcb-benchmark', deployment: 'api' },
      { model_key: 'decisio-qwen3.5-4b-q4km', capability_id: 'intent-classification',
        primary_metric: 'accuracy', primary_value: 0.7012987012987013,
        sample_count: 154, benchmark_signature: 'same-mcb-benchmark', deployment: 'local' },
      { model_key: 'qwen3.5-9b-q4km', capability_id: 'intent-classification',
        primary_metric: 'accuracy', primary_value: 0.6948051948051948,
        sample_count: 154, benchmark_signature: 'same-mcb-benchmark', deployment: 'local' },
      { model_key: 'jev-other', capability_id: 'intent-classification',
        primary_metric: 'accuracy', primary_value: 0.99,
        sample_count: 77, benchmark_signature: 'unrelated', deployment: 'api' },
    ],
    models: [],
    capabilities: [],
    frontier: { points: [] },
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
    await page.route('**/experiments/model-capability-benchmark/results/published/models-overview.json', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(matchedMcbEvidence),
      }),
    );
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await selectExperiment(page, 'jev-vs-llm-routing');
    await page.locator('[data-jev-mcb-rows] .jev-mcb-row').first().waitFor({ state: 'visible' });

    const bridge = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('[data-jev-mcb-rows] .jev-mcb-row')];
      const labels = rows.map((row) => row.textContent || '');
      const sourceNote = document.querySelector('[data-jev-mcb-meta]')?.textContent || '';
      const details = document.querySelector('[data-jev-local-details]');
      const row = rows[0];
      return {
        names: labels,
        count: rows.length,
        consistentSource: sourceNote.includes('154') && sourceNote.includes('shared benchmark signature'),
        grid: row ? getComputedStyle(row).display : null,
        localInitiallyClosed: details instanceof HTMLDetailsElement && !details.open,
      };
    });
    if (
      bridge.count !== 4 ||
      bridge.grid !== 'grid' ||
      !bridge.names.some((name) => name.includes('JEV 1.13.0') && name.includes('74.7%')) ||
      !bridge.names.some((name) => name.includes('GPT-5.6 Luna') && name.includes('82.5%')) ||
      !bridge.consistentSource ||
      !bridge.localInitiallyClosed
    ) {
      throw new Error(`Missing or non-comparable JEV/GPT benchmark bridge on ${viewport.name}: ${JSON.stringify(bridge)}`);
    }

    await page.locator('[data-jev-summary]').screenshot({
      path: path.join(outputDir, `jev-mcb-bridge__${viewport.name}.png`),
    });
    await page.locator('[data-jev-local-details] summary').click();
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

  const redactionEvidence = {
    schema_version: 1,
    benchmark: 'redactguard-local-anonymization',
    publication: {
      status: 'dataset_evidence_only',
      has_published_model_metrics: false,
      contains_raw_pii: false,
    },
    datasets: [
      { id: 'smoke', title: 'Smoke', kind: 'smoke',
        focus: 'Contract and pipeline checks', cases: 20,
        source_path: 'experiments/redactguard-local-anonymization/data/smoke/cases.jsonl',
        results_status: 'no_published_run' },
      { id: 'healthcare', title: 'Healthcare', kind: 'challenge',
        focus: 'Clinical and sensitive PII', cases: 48,
        source_path: 'experiments/redactguard-local-anonymization/data/healthcare/cases.jsonl',
        results_status: 'no_published_run' },
      { id: 'ambiguous', title: 'Ambiguous PII', kind: 'challenge',
        focus: 'Context-dependent private vs public data', cases: 48,
        source_path: 'experiments/redactguard-local-anonymization/data/ambiguous/cases.jsonl',
        results_status: 'no_published_run' },
      { id: 'challenge', title: 'Hard cases', kind: 'challenge',
        focus: 'Semantic ambiguity and difficult PII', cases: 46,
        source_path: 'experiments/redactguard-local-anonymization/data/challenge/cases.jsonl',
        results_status: 'no_published_run' },
      { id: 'document-e2e', title: 'Document E2E', kind: 'documents',
        focus: 'Extraction plus privacy evaluation', cases: 5,
        source_path: 'experiments/redactguard-local-anonymization/data/documents/manifest.jsonl',
        results_status: 'no_published_run' },
      { id: 'realistic', title: 'Realistic documents', kind: 'documents',
        focus: 'Heterogeneous formats and annotated PII', documents: 11, gold_spans: 1566,
        source_path: 'experiments/redactguard-local-anonymization/data/realistic/annotations/summary.json',
        results_status: 'no_published_run' },
    ],
    models: [],
  };
  const redactionLayouts = [];
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 950 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.route('**/redactguard-local-anonymization/results/published/portfolio-summary.json',
      (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(redactionEvidence),
      }),
    );
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await selectExperiment(page, 'redactguard-local-anonymization');
    await page.locator('[data-rg-dataset="realistic"]').waitFor({ state: 'visible' });

    const before = await page.evaluate(() => ({
      count: document.querySelector('[data-rg-count]')?.textContent?.trim(),
      spans: document.querySelector('[data-rg-extra]')?.textContent?.trim(),
      pills: document.querySelectorAll('[data-rg-datasets] button').length,
      resultHidden: document.querySelector('[data-rg-comparison]')?.hidden,
      pendingVisible: !document.querySelector('[data-rg-no-models]')?.hidden,
      activeStyle: getComputedStyle(
        document.querySelector('[data-rg-dataset="realistic"]'),
      ).backgroundColor,
      overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    }));
    await page.locator('[data-rg-dataset="healthcare"]').click();
    const after = await page.evaluate(() => ({
      count: document.querySelector('[data-rg-count]')?.textContent?.trim(),
      title: document.querySelector('[data-rg-dataset-name]')?.textContent?.trim(),
      active: document.querySelector('[data-rg-dataset="healthcare"]')?.getAttribute('aria-pressed'),
    }));

    redactionLayouts.push({ viewport: viewport.name, before, after });
    if (
      before.count !== '11' ||
      before.spans !== '1,566 gold PII spans' ||
      before.pills !== 6 ||
      !before.resultHidden ||
      !before.pendingVisible ||
      before.overflow > 0 ||
      after.count !== '48' ||
      after.title !== 'Healthcare' ||
      after.active !== 'true'
    ) {
      throw new Error(`RedactGuard public evidence visual regression: ${JSON.stringify({ viewport, before, after })}`);
    }

    await page.locator('[data-rg-summary]').screenshot({
      path: path.join(outputDir, 'redactguard-evidence__' + viewport.name + '.png'),
    });

    // Synthetic metrics are test fixtures ONLY. No numerical model quality
    // figures are checked into the published RedactGuard evidence artifact.
    const row = (model, dataset, cohort, recall, leakage, latency) => ({
      model, dataset, cases: 48,
      pii_recall: recall,
      system_pii_recall: recall,
      system_leakage_rate: leakage,
      precision: 0.93,
      latency_p95_ms: latency,
      provenance: {
        run_id: cohort, cohort_id: cohort,
        comparison_scope: 'same_run_exploratory',
      },
    });
    await page.close();
    const measuredEvidence = {
      ...redactionEvidence,
      publication: {
        ...redactionEvidence.publication,
        status: 'model_aggregates_published',
        has_published_model_metrics: true,
      },
      models: [
        row('test-qwen', 'healthcare', 'hc-one', 0.84, 0.16, 760),
        row('test-nemotron', 'healthcare', 'hc-one', 0.91, 0.09, 1200),
        row('test-qwen', 'ambiguous', 'amb-one', 0.66, 0.34, 900),
      ],
    };
    // Independent browser page: fixture modes must not share UI state.
    const measuredPage = await context.newPage();
    await measuredPage.route('**/redactguard-local-anonymization/results/published/portfolio-summary.json',
      (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(measuredEvidence),
      }),
    );
    await measuredPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
    await selectExperiment(measuredPage, 'redactguard-local-anonymization');
    // This fixture has no Challenge run. Explicitly choose Healthcare
    // before asserting measured insights, rather than assuming a winner exists.
    await measuredPage.locator('[data-rg-dataset="healthcare"]').waitFor({ state: 'visible' });
    await measuredPage.locator('[data-rg-dataset="healthcare"]').click();
    await measuredPage.locator('[data-rg-insights] .rg-insight-card').first().waitFor({ state: 'visible', timeout: 12000 });
    await measuredPage.locator('[data-rg-advanced] summary').click();
    await measuredPage.locator('[data-rg-matrix-scroll] table').waitFor({ state: 'visible' });

    const modelPreview = await measuredPage.evaluate(() => ({
      insightCards: document.querySelectorAll('[data-rg-insights] .rg-insight-card').length,
      comparisonRows: document.querySelectorAll('[data-rg-model-rows] .rg-model-row').length,
      recallTracks: document.querySelectorAll('[data-rg-model-rows] .rg-measure--recall .rg-measure__track').length,
      summaryTitle: document.querySelector('[data-rg-takeaway-text]')?.textContent || '',
      visibleGrid: getComputedStyle(document.querySelector('[data-rg-model-rows] .rg-model-row')).display,
    }));
    if (modelPreview.insightCards !== 3 || modelPreview.comparisonRows !== 2 ||
        modelPreview.recallTracks !== 2 || modelPreview.visibleGrid !== 'grid') {
      throw new Error('RedactGuard insight-first model rows regressed: ' + JSON.stringify(modelPreview));
    }
    const measured = await measuredPage.evaluate(() => ({
      matrixVisible: !document.querySelector('[data-rg-matrix]').hidden,
      rows: document.querySelectorAll('[data-rg-matrix-scroll] tbody tr').length,
      cells: document.querySelector('[data-rg-matrix-scroll]')?.textContent,
      paretoVisible: !document.querySelector('[data-rg-pareto]').hidden,
      dots: document.querySelectorAll('[data-rg-pareto-plot] circle').length,
      overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    }));
    if (!measured.matrixVisible || measured.rows !== 2 ||
        !measured.cells.includes('84.0%') ||
        !measured.paretoVisible || measured.dots !== 2 ||
        measured.overflow !== 0) {
      throw new Error('Measured RedactGuard UI regression in ' +
        viewport.name + ': ' + JSON.stringify(measured));
    }
    await measuredPage.locator('[data-rg-metric="system_leakage_rate"]').click();
    const leakage = await measuredPage.locator('[data-rg-matrix-scroll]').textContent();
    if (!leakage.includes('16.0%') || !leakage.includes('9.0%')) {
      throw new Error('RedactGuard metric toggle failed in ' + viewport.name);
    }
    await measuredPage.locator('[data-rg-summary]').screenshot({
      path: path.join(outputDir, 'redactguard-measured-fixture__' + viewport.name + '.png'),
    });
    await measuredPage.locator('[data-rg-dataset="ambiguous"]').click();
    const crossRun = await measuredPage.evaluate(() => ({
      paretoHidden: document.querySelector('[data-rg-pareto]').hidden,
      pendingVisible: !document.querySelector('[data-rg-pareto-missing]').hidden,
    }));
    if (!crossRun.paretoHidden || !crossRun.pendingVisible) {
      throw new Error('RedactGuard incorrectly drew an unpaired Pareto: ' +
        JSON.stringify(crossRun));
    }
    await measuredPage.close();
    await context.close();
  }
  await fs.writeFile(
    path.join(outputDir, 'redactguard-layout-check.json'),
    JSON.stringify(redactionLayouts, null, 2),
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
