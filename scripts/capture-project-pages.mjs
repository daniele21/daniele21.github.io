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

      const diagnostics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const phaseIds = ['decide', 'build', 'test', 'measure', 'decide-again'];
        const missingPhases = phaseIds.filter((id) => !document.getElementById(id));
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

        return {
          innerWidth: window.innerWidth,
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          horizontalOverflowPx: Math.max(0, Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth),
          h1Count: document.querySelectorAll('h1').length,
          mainCount: document.querySelectorAll('main').length,
          missingPhases,
          subheaderLinkCount: links.length,
          smallTargets,
        };
      });

      const screenshotPath = path.join(outputDir, `${route}__${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      report.push({
        route,
        viewport,
        status: response?.status() ?? null,
        ...diagnostics,
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
  item.pageErrors.length > 0
);

console.log(JSON.stringify({ captures: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
