import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

/**
 * Visual QA for the continuous two-image business card.
 * Both approved flyer sides must be visible and aligned in the same column.
 */
const url = process.env.CONNECT_PREVIEW_URL || 'http://127.0.0.1:4321/connect/';
const folder = 'visual-review-connect';
const browser = await chromium.launch({ headless: true });

try {
  await mkdir(folder, { recursive: true });

  for (const { label, viewport } of [
    { label: 'mobile', viewport: { width: 390, height: 844 } },
    { label: 'desktop', viewport: { width: 1200, height: 850 } },
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, 'Digital card should load: ' + label);
      await page.locator('.flyer-front').waitFor({ state: 'visible' });
      await page.locator('.flyer-back').waitFor({ state: 'visible' });

      const state = await page.evaluate(() => {
        const front = document.querySelector('.flyer-front');
        const back = document.querySelector('.flyer-back');
        if (!front || !back) return null;
        const a = front.getBoundingClientRect();
        const b = back.getBoundingClientRect();
        const rect = (r) => ({
          top: r.top, bottom: r.bottom, left: r.left, right: r.right,
          width: r.width, height: r.height,
        });
        return {
          front: { src: front.getAttribute('src'), complete: front.complete, width: front.naturalWidth, height: front.naturalHeight, rect: rect(a) },
          back: { src: back.getAttribute('src'), complete: back.complete, width: back.naturalWidth, height: back.naturalHeight, rect: rect(b) },
          seam: getComputedStyle(back).marginTop,
          frontClip: getComputedStyle(front).clipPath,
          backClip: getComputedStyle(back).clipPath,
        };
      });

      assert.ok(state, 'Both flyer images must exist');
      assert.ok(state.front.src.endsWith('/images/network-card-front.png'));
      assert.ok(state.back.src.endsWith('/images/network-card-back.png'));
      assert.ok(state.front.complete && state.back.complete, 'Images must finish loading');
      assert.equal(state.front.width, 1050);
      assert.equal(state.front.height, 600);
      assert.equal(state.back.width, 1672);
      assert.equal(state.back.height, 941);
      assert.ok(Math.abs(state.front.rect.left - state.back.rect.left) <= 1, 'Left edges must align');
      assert.ok(Math.abs(state.front.rect.width - state.back.rect.width) <= 1, 'Cards must have the same rendered width');
      assert.ok(state.back.rect.top > state.front.rect.top, 'The back should follow the front');
      assert.ok(state.back.rect.top < state.front.rect.bottom, 'The two sides should overlap slightly for visual continuity');
      assert.ok(state.frontClip.includes('inset('), 'Front outer export margin should be clipped');
      assert.ok(state.backClip.includes('inset('), 'Back outer export margin should be clipped');
      assert.equal(await page.locator('#front-tab, #back-tab, #card-flip').count(), 0);
      assert.equal(await page.locator('.action-primary').count(), 1);

      await page.screenshot({ path: `${folder}/${label}-continuous-front-back.png`, fullPage: true });
      console.log(`PASS /connect ${label}: both original images aligned and joined continuously`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
