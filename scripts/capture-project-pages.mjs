import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.VISUAL_REVIEW_BASE_URL || 'http://127.0.0.1:4321';
const outputDir = path.resolve(process.env.VISUAL_REVIEW_OUTPUT || 'visual-review');

const legacyPhases = ['decide', 'build', 'test', 'measure', 'decide-again'];
const allRouteSpecs = [
  { route: 'about', anchors: [], subheader: false },
  { route: 'harnex', anchors: ['top', 'architecture', 'runtime', 'evidence', 'status'], subheader: true },
  { route: 'korgis', anchors: ['top', 'architecture', 'runtime-boundary', 'evidence', 'status'], subheader: true, hrefs: ['#top', '#architecture', '#runtime-boundary', '#evidence', '#status'] },
  { route: 'decisio', anchors: ['top', 'architecture', 'runtime', 'evidence', 'status'], subheader: true },
  { route: 'local-asr-server', anchors: legacyPhases, subheader: true },
  { route: 'closedroom', anchors: ['top', 'workflow', 'product', 'architecture', 'evidence'], subheader: true },
  { route: 'aura-finance', anchors: ['top', 'workflow', 'product', 'architecture', 'evidence'], subheader: true },
  { route: 'redact-guard', anchors: ['top', 'workflow', 'product', 'architecture', 'evidence'], subheader: true },
  { route: 'redact-guard-android', anchors: ['top', 'workflow', 'product', 'architecture', 'evidence'], subheader: true },
  { route: 'traffic-monitoring', anchors: legacyPhases, subheader: true },
  { route: 'traffic-monitoring-android', anchors: legacyPhases, subheader: true },
  {
    route: 'experiments',
    anchors: [
      'jev-vs-llm',
      'model-capability-benchmark',
      'redactguard-local-anonymization',
      'vlm-capability-benchmark',
      'image-generation-benchmark',
    ],
    subheader: false,
  },
];

const allViewports = [
  { name: 'mobile-320', width: 320, height: 700 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1100 },
];

const selectedNames = (value) => new Set((value || '').split(',').map((name) => name.trim()).filter(Boolean));
const selectedRoutes = selectedNames(process.env.VISUAL_REVIEW_ROUTES);
const selectedViewports = selectedNames(process.env.VISUAL_REVIEW_VIEWPORTS);
const routeSpecs = selectedRoutes.size
  ? allRouteSpecs.filter((spec) => selectedRoutes.has(spec.route))
  : allRouteSpecs;
const viewports = selectedViewports.size
  ? allViewports.filter((viewport) => selectedViewports.has(viewport.name))
  : allViewports;
if (!routeSpecs.length || !viewports.length) {
  throw new Error('Visual review selection matched no routes or viewports.');
}

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

    for (const spec of routeSpecs) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));

      const url = `${baseUrl}/${spec.route}/`;
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts?.ready);
      await warmRenderedPage(page);

      const diagnostics = await page.evaluate(({ expectedAnchors, requiresSubheader }) => {
        const root = document.documentElement;
        const body = document.body;
        const missingAnchors = expectedAnchors.filter((id) => !document.getElementById(id));
        const links = requiresSubheader
          ? Array.from(document.querySelectorAll('[data-product-subheader] [data-sublink]'))
          : [];

        const smallTargets = links
          .map((node) => {
            const rect = node.getBoundingClientRect();
            return {
              label: node.textContent?.trim() || '',
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((item) => item.width < 48 || item.height < 48);

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

            const overflowRight = Math.max(0, Math.ceil(rect.right - root.clientWidth));
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
          layoutWidth: root.clientWidth,
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          horizontalOverflowPx: Math.max(0, Math.max(root.scrollWidth, body.scrollWidth) - root.clientWidth),
          h1Count: document.querySelectorAll('h1').length,
          mainCount: document.querySelectorAll('main').length,
          missingAnchors,
          subheaderLinkCount: links.length,
          smallTargets,
          overflowingElements,
          smallText,
        };
      }, { expectedAnchors: spec.anchors, requiresSubheader: spec.subheader });

      const screenshotPath = path.join(outputDir, `${spec.route}__${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const sectionNavigation = [];
      if (spec.subheader) {
        await page.evaluate(() => {
          document.documentElement.dataset.visualReviewScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = 'auto';
        });

        const hrefs = spec.hrefs || spec.anchors.map((id) => `#${id}`);
        for (let index = 0; index < spec.anchors.length; index += 1) {
          const anchorId = spec.anchors[index];
          const expectedHref = hrefs[index];

          await page.evaluate((id) => {
            document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'auto' });
          }, anchorId);

          await page.waitForFunction(
            (href) => document
              .querySelector('[data-product-subheader] [aria-current="location"]')
              ?.getAttribute('href') === href,
            expectedHref,
            { timeout: 1500 },
          ).catch(() => null);

          await page.waitForTimeout(80);
          sectionNavigation.push(await page.evaluate(({ href, anchorId }) => {
            const nav = document.querySelector('[data-product-subheader] .subheader-nav');
            const active = document.querySelector(`[data-product-subheader] [data-sublink][href="${href}"]`);
            const navRect = nav?.getBoundingClientRect();
            const activeRect = active?.getBoundingClientRect();
            const activeVisible = Boolean(navRect && activeRect &&
              activeRect.left >= navRect.left - 1 &&
              activeRect.right <= navRect.right + 1);
            return {
              anchorId,
              expectedHref: href,
              activeHref: document
                .querySelector('[data-product-subheader] [aria-current="location"]')
                ?.getAttribute('href') || null,
              activeVisible,
            };
          }, { href: expectedHref, anchorId }));
        }

        await page.evaluate(() => {
          const previous = document.documentElement.dataset.visualReviewScrollBehavior || '';
          document.documentElement.style.scrollBehavior = previous;
          delete document.documentElement.dataset.visualReviewScrollBehavior;
        });
      }

      report.push({
        route: spec.route,
        viewport,
        status: response?.status() ?? null,
        ...diagnostics,
        sectionNavigation,
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
  item.missingAnchors.length > 0 ||
  item.smallTargets.length > 0 ||
  item.smallText.length > 0 ||
  item.sectionNavigation.some((state) => state.activeHref !== state.expectedHref || !state.activeVisible) ||
  item.consoleErrors.length > 0 ||
  item.pageErrors.length > 0
);

console.log(JSON.stringify({ captures: report.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
