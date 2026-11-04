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
      assert.equal(await page.locator('.flyer-continuum, #card-flip, #front-tab, #back-tab').count(), 0);
      assert.equal(await page.locator('a:has-text("Save contact")').count(), 1);
      assert.ok((await page.locator('a:has-text("Save contact")').getAttribute('href'))?.endsWith('/daniele-moltisanti.vcf'));
      assert.ok((await page.locator('.portrait-wrap img').evaluate((img) => img.naturalWidth)) > 500);
      const width = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      assert.ok(width.scroll <= width.viewport + 2, label + ' must not scroll sideways: ' + JSON.stringify(width));

      await page.screenshot({ path: `${outputDir}/${label}-profile.png`, fullPage: true });

      await page.locator('#show-qr').click();
      await page.locator('#qr-overlay').waitFor({ state: 'visible' });
      await page.waitForFunction(() => document.querySelector('#qr-overlay img')?.naturalWidth >= 585, undefined, { timeout: 5000 });
      const qrBounds = await page.locator('#qr-overlay img').boundingBox();
      assert.ok(qrBounds && Math.abs(qrBounds.width - qrBounds.height) <= 2, 'QR must be square for reliable scanning');
      await page.screenshot({ path: `${outputDir}/${label}-qr.png` });
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#qr-overlay').isVisible(), false);

      await page.locator('#share').click();
      await page.waitForFunction(() => window.__lastShared?.url === 'https://daniele21.github.io/connect');
      assert.equal(await page.locator('a:has-text("LinkedIn")').getAttribute('target'), '_blank');

      console.log('PASS /connect: ' + label + ' mobile-first content, contact, QR, share and no overflow');
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
