import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.VISUAL_REVIEW_BASE_URL || 'http://127.0.0.1:4321';
const outputDir = path.resolve(process.env.VISUAL_REVIEW_OUTPUT || 'visual-review');

const routes = [
  'android-local-llm-harness',
  'local-llm-server',
  'local-asr-server',
  'closedroom',
  'aura-finance',
  'redact-guard',
  'performance-lab',
  'traffic-monitoring',
  'traffic-monitoring-android',
];

const phaseIds = ['decide', 'build', 'test', 'measure', 'decide-again'];
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1100 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-320', width: 320, height: 700 },
];

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

    for (const route of routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));

      const url = `${baseUrl}/${route}/`;
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts?.ready);

      const diagnostics = await page.evaluate((expectedPhaseIds) => {
        const root = document.documentElement;
        const body = document.body;
        const missingPhases = expectedPhaseIds.filter((id) => !document.getElementById(id));
        const links = Array.from(document.querySelectorAll('[data-product-subheader] [data-sublink]'));
        const smallTargets = links
          .map((node) => {
            const rect = node.getBoundingClientRect();
            return {
              label: node.textContent?.trim() || '',
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((item) => item.width < 44 || item.height < 44);

        const selectorFor = (element) => {
          const tag = element.tagName.toLowerCase();
          if (element.id) return `${tag}#${element.id}`;
          const classes = Array.from(element.classList).slice(0, 3);
          return classes.length ? `${tag}.${classes.join('.')}` : tag;
        };

        const overflowingElements = Array.from(body.querySelectorAll('*'))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (
              rect.width <= 1 ||
              rect.height <= 1 ||
              style.display === 'none' ||
              style.visibility === 'hidden'
            ) return null;

            const overflowRight = Math.max(0, Math.ceil(rect.right - window.innerWidth));
            const overflowLeft = Math.max(0, Math.ceil(-rect.left));
            if (overflowRight <= 1 && overflowLeft <= 1) return null;

            return {
              selector: selectorFor(element),
              text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              overflowRight,
              overflowLeft,
            };
          })
          .filter(Boolean)
          .sort((a, b) => Math.max(b.overflowRight, b.overflowLeft) - Math.max(a.overflowRight, a.overflowLeft))
          .slice(0, 24);

        const smallText = Array.from(body.querySelectorAll('*'))
          .map((element) => {
            const hasDirectText = Array.from(element.childNodes).some(
              (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
            );
            if (!hasDirectText) return null;

            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (
              rect.width <= 1 ||
              rect.height <= 1 ||
              style.display === 'none' ||
              style.visibility === 'hidden'
            ) return null;

            const fontSize = Number.parseFloat(style.fontSize);
            if (!Number.isFinite(fontSize) || fontSize >= 14) return null;

            return {
              selector: selectorFor(element),
              text: (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
              fontSize: Math.round(fontSize * 100) / 100,
            };
          })
          .filter(Boolean)
          .slice(0, 40);

        return {
          innerWidth: window.innerWidth,
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          horizontalOverflowPx: Math.max(0, Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth),
          h1Count: document.querySelectorAll('h1').length,
          mainCount: document.querySelectorAll('main').length,
          missingPhases,
          subheaderLinkCount: links.length,
          smallTargets,
          overflowingElements,
          smallText,
        };
      }, phaseIds);

      const screenshotPath = path.join(outputDir, `${route}__${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const phaseNavigation = [];
      for (const phaseId of phaseIds) {
        await page.evaluate((id) => {
          document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' });
        }, phaseId);
        await page.waitForTimeout(120);
        phaseNavigation.push({
          phaseId,
          activeHref: await page.locator('[data-product-subheader] [aria-current="location"]').getAttribute('href').catch(() => null),
        });
      }

      report.push({
        route,
        viewport,
        status: response?.status() ?? null,
        ...diagnostics,
        phaseNavigation,
        consoleErrors,
        pageErrors,
        screenshot: path.basename(screenshotPath),
      });

      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));

const failures = report.filter((item) =>
  item.status !== 200 ||
  item.horizontalOverflowPx > 0 ||
  item.h1Count !== 1 ||
  item.mainCount !== 1 ||
  item.missingPhases.length > 0 ||
  item.smallTargets.length > 0 ||
  item.phaseNavigation.some((state) => state.activeHref !== `#${state.phaseId}`) ||
  item.pageErrors.length > 0
);

console.log(JSON.stringify({ captures: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
