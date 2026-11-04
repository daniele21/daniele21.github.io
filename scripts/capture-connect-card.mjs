import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

/** Mobile-first /connect visual and interaction QA. */
const url = process.env.CONNECT_PREVIEW_URL || 'http://127.0.0.1:4321/connect/';
const outputDir = 'visual-review-connect';
const browser = await chromium.launch({ headless: true });
await mkdir(outputDir, { recursive: true });

try {
  for (const { label, viewport } of [
    { label: 'small-mobile', viewport: { width: 360, height: 780 } },
    { label: 'mobile', viewport: { width: 390, height: 844 } },
    { label: 'desktop', viewport: { width: 1200, height: 850 } },
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    try {
      await page.addInitScript(() => {
        Object.defineProperty(navigator, 'share', {
          configurable: true,
          value: async (payload) => { window.__lastShared = payload; },
        });
      });
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200);
      assert.equal(await page.locator('h1.local').innerText(), 'LOCAL-FIRST.');
      assert.equal(await page.locator('.value-row').count(), 3);
      assert.equal(await page.locator('.flyer-continuum, #card-flip, #front-tab, #back-tab, #show-qr, #qr-overlay').count(), 0);
      assert.equal(await page.locator('a:has-text("Save contact")').count(), 1);
      assert.ok((await page.locator('a:has-text("Save contact")').getAttribute('href'))?.endsWith('/daniele-moltisanti.vcf'));
      assert.ok((await page.locator('.portrait-wrap img').evaluate((img) => img.naturalWidth)) > 500);
      const width = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      assert.ok(width.scroll <= width.viewport + 2, label + ' must not scroll sideways: ' + JSON.stringify(width));

      const flow = await page.evaluate(() => ({
        heroBackground: getComputedStyle(document.querySelector('.hero')).backgroundColor,
        detailsBackground: getComputedStyle(document.querySelector('.details')).backgroundColor,
        heroHeight: document.querySelector('.hero').getBoundingClientRect().height,
        href: document.querySelector('.hero-foot')?.getAttribute('href'),
        heading: document.querySelector('#strategy-title')?.textContent,
        timeline: getComputedStyle(document.querySelector('.value-list'), '::before').height,
      }));
      assert.equal(flow.heroBackground, 'rgba(0, 0, 0, 0)', 'Hero should share the same background as details');
      assert.equal(flow.detailsBackground, 'rgba(0, 0, 0, 0)', 'Details should share the same background as hero');
      assert.equal(flow.href, '#strategy-title', 'The reading transition must be navigable');
      assert.ok(flow.heading?.includes('Hands-on execution.'), 'Strategy section should immediately follow hero');
      assert.notEqual(flow.timeline, 'auto', 'Stages should share one connected signal path');
      if (viewport.width < 760) assert.ok(flow.heroHeight < 630, 'Mobile hero should not create a large empty break');

      const actions = await page.evaluate(() => {
        const primary = document.querySelector('.action.primary');
        const linkedin = document.querySelector('.action.linkedin');
        const share = document.querySelector('.action.share');
        if (!(primary && linkedin && share)) return null;
        const get = el => ({ height: el.getBoundingClientRect().height, width: el.getBoundingClientRect().width });
        return { primary: get(primary), linkedin: get(linkedin), share: get(share) };
      });
      assert.ok(actions, 'All three networking CTAs must exist');
      assert.ok(actions.primary.height >= 64, 'Primary action must be a comfortable touch target');
      assert.ok(actions.linkedin.height >= 52 && actions.share.height >= 52, 'Secondary actions must be touch-friendly');
      assert.ok(actions.primary.width > actions.linkedin.width, 'Primary action must be visually dominant');
      assert.ok(Math.abs(actions.linkedin.width - actions.share.width) <= 2, 'Secondary actions should align');
      assert.equal((await page.locator('.action.share').innerText()).trim(), 'Share card');
      assert.ok(await page.locator('.action.primary').isVisible());
      assert.ok(await page.locator('.action.linkedin').isVisible());

      await page.screenshot({ path: `${outputDir}/${label}-profile.png`, fullPage: true });

      await page.locator('#share').click();
      await page.waitForFunction(() => window.__lastShared?.url === 'https://daniele21.github.io/connect');
      assert.equal(await page.locator('a:has-text("LinkedIn")').getAttribute('target'), '_blank');

      console.log('PASS /connect: ' + label + ' mobile-first content, premium CTAs, share and no overflow');
    } finally {
      await page.close();
    }
  }

  // The regular capture loop tests the no-animation accessibility variant.
  // This second pass verifies the opt-in motion journey and contact action feedback.
  const animatedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    recordVideo: { dir: `${outputDir}/motion-preview`, size: { width: 390, height: 844 } },
  });
  const animated = await animatedContext.newPage();
  try {
    await animated.goto(url, { waitUntil: 'networkidle' });
    const heroMotion = await animated.locator('.hero-main').evaluate(
      el => getComputedStyle(el).animationName,
    );
    assert.ok(heroMotion.includes('arrive'), 'The claim should have one short entrance animation');
    const path = animated.locator('.value-list');
    await animated.locator('.value-row').last().evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await animated.waitForFunction(() =>
      document.querySelector('.value-list')?.style.getPropertyValue('--signal-progress') === '1'
      && document.querySelector('.value-row:last-child')?.classList.contains('is-active'),
    );
    const trace = await path.evaluate(el => getComputedStyle(el, '::after').transform);
    assert.notEqual(trace, 'none', 'Journey trace should respond to scrolling');
    await animated.screenshot({ path: `${outputDir}/mobile-active-journey.png`, fullPage: true });
    await animated.waitForTimeout(350);
    const primary = animated.locator('.action.primary');
    await primary.hover();
    await animated.waitForTimeout(300);
    const pressedHover = await primary.evaluate(el => ({
      transform: getComputedStyle(el).transform,
      borderColor: getComputedStyle(el).borderColor,
    }));
    assert.notEqual(pressedHover.transform, 'none', 'Primary CTA should lift subtly on fine-pointer hover');
    await animated.screenshot({ path: `${outputDir}/mobile-premium-ctas.png`, fullPage: true });
    console.log('PASS /connect: one-shot entrance + scroll-reactive trace + premium CTA hover');
  } finally {
    await animated.close();
    await animatedContext.close(); // flush the short motion-preview .webm artifact
  }
} finally {
  await browser.close();
}
