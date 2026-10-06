import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.VISUAL_REVIEW_BASE_URL || 'http://127.0.0.1:4321';
const outputDir = path.resolve(process.env.HOME_VISUAL_REVIEW_OUTPUT || 'visual-review-home');
const viewports = [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1100 },
];

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
  const actionTargets = Array.from(document.querySelectorAll(
    '.site-header .brand, .site-header .site-nav a, .site-header .theme-toggle, .site-header .menu-toggle, .hero-actions a, .primary-button, .secondary-button',
  ))
    .map((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      if (
        rect.width <= 1 ||
        rect.height <= 1 ||
        style.display === 'none' ||
        style.visibility === 'hidden'
      ) return null;
      return {
        label: node.textContent?.replace(/\s+/g, ' ').trim() || '',
        width: node.offsetWidth,
        height: node.offsetHeight,
      };
    })
    .filter(Boolean)
    .filter((item) => item.width < 48 || item.height < 48);

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

  const clippedStageContent = stages.flatMap((stage) => {
    const stageRect = stage.getBoundingClientRect();
    return Array.from(stage.querySelectorAll('.stage-copy, .stage-visual, h2, h3, p, a, button, strong'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (
          rect.width <= 1 ||
          rect.height <= 1 ||
          style.display === 'none' ||
          style.visibility === 'hidden'
        ) return null;

        const clippedLeft = Math.max(0, Math.ceil(stageRect.left - rect.left));
        const clippedRight = Math.max(0, Math.ceil(rect.right - stageRect.right));
        if (clippedLeft <= 1 && clippedRight <= 1) return null;

        return {
          stage: stage.id,
          selector: element.id
            ? `${element.tagName.toLowerCase()}#${element.id}`
            : `${element.tagName.toLowerCase()}.${Array.from(element.classList).slice(0, 3).join('.')}`,
          text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
          clippedLeft,
          clippedRight,
        };
      })
      .filter(Boolean);
  }).slice(0, 30);

  return {
    innerWidth: window.innerWidth,
    layoutWidth: root.clientWidth,
    scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
    horizontalOverflowPx: Math.max(0, Math.max(root.scrollWidth, body.scrollWidth) - root.clientWidth),
    h1Count: document.querySelectorAll('h1').length,
    mainCount: document.querySelectorAll('main').length,
    methodPathReady: root.dataset.methodPathReady || null,
    checkpointState: journey?.getAttribute('data-checkpoint-state') || null,
    stageCount: stages.length,
    stageVisibility,
    clippedStageContent,
    smallText,
    smallActionTargets: actionTargets,
  };
});

const checkMobileMenu = async (page, width) => {
  if (width > 980) return null;
  await page.locator('[data-menu-toggle]').click();
  const opened = await page.evaluate(() => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const navigation = document.querySelector('[data-navigation]');
    return toggle?.getAttribute('aria-expanded') === 'true' &&
      getComputedStyle(navigation).display !== 'none' &&
      navigation.querySelector('a') === document.activeElement;
  });
  await page.keyboard.press('Escape');
  const closed = await page.evaluate(() => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const navigation = document.querySelector('[data-navigation]');
    return toggle?.getAttribute('aria-expanded') === 'false' &&
      getComputedStyle(navigation).display === 'none' &&
      toggle === document.activeElement;
  });
  return { opened, closed };
};

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
    : {}),
});
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

    const response = await page.goto(`${baseUrl}/?theme=light`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts?.ready);
    await warmRenderedPage(page);
    const diagnostics = await readDiagnostics(page);
    const screenshotPath = path.join(outputDir, `home__${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    const menuBehavior = await checkMobileMenu(page, viewport.width);

    report.push({
      mode: 'normal',
      viewport,
      status: response?.status() ?? null,
      ...diagnostics,
      menuBehavior,
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
  const reducedResponse = await reducedPage.goto(`${baseUrl}/?theme=light`, { waitUntil: 'networkidle' });
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

  const darkContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark',
  });
  const darkPage = await darkContext.newPage();
  const darkConsoleErrors = [];
  const darkPageErrors = [];
  darkPage.on('console', (message) => {
    if (message.type() === 'error') darkConsoleErrors.push(message.text());
  });
  darkPage.on('pageerror', (error) => darkPageErrors.push(error.message));
  const darkResponse = await darkPage.goto(`${baseUrl}/?theme=dark`, { waitUntil: 'networkidle' });
  await darkPage.evaluate(() => document.fonts?.ready);
  await warmRenderedPage(darkPage);
  const darkDiagnostics = await readDiagnostics(darkPage);
  const darkScreenshotPath = path.join(outputDir, 'home__mobile-390-dark.png');
  await darkPage.screenshot({ path: darkScreenshotPath, fullPage: true });

  report.push({
    mode: 'dark',
    viewport: { name: 'mobile-390-dark', width: 390, height: 844 },
    status: darkResponse?.status() ?? null,
    ...darkDiagnostics,
    consoleErrors: darkConsoleErrors,
    pageErrors: darkPageErrors,
    screenshot: path.basename(darkScreenshotPath),
  });

  await darkPage.close();
  await darkContext.close();
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
  item.clippedStageContent.length > 0 ||
  item.h1Count !== 1 ||
  item.mainCount !== 1 ||
  item.stageCount !== 4 ||
  !['true', 'fallback'].includes(item.methodPathReady) ||
  !['valid', 'fallback'].includes(item.checkpointState) ||
  item.smallText.length > 0 ||
  item.smallActionTargets.length > 0 ||
  (item.menuBehavior && (!item.menuBehavior.opened || !item.menuBehavior.closed)) ||
  item.consoleErrors.length > 0 ||
  item.pageErrors.length > 0 ||
  hiddenReducedStages(item)
);

console.log(JSON.stringify({ captures: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
