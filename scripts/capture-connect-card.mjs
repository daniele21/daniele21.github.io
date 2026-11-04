import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

/**
 * Verify the actual rendered /connect experience rather than only its markup:
 * the back must not render as a mirrored copy of the front on mobile.
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
      await page.locator('.card-front img').waitFor({ state: 'visible' });

      await page.screenshot({ path: `${folder}/${label}-front.png`, fullPage: true });

      await page.locator('#back-tab').click();
      await page.waitForFunction(() => {
        const front = document.querySelector('.card-front');
        const back = document.querySelector('.card-back');
        return front && back
          && getComputedStyle(front).visibility === 'hidden'
          && getComputedStyle(back).visibility === 'visible'
          && getComputedStyle(back).opacity === '1';
      });

      const state = await page.evaluate(() => {
        const back = document.querySelector('.card-back img');
        const card = document.querySelector('#card-flip');
        const face = document.querySelector('.card-back');
        const rotator = document.querySelector('.card-rotator');
        return {
          filename: back?.getAttribute('src') || '',
          width: back?.naturalWidth,
          height: back?.naturalHeight,
          visible: face && getComputedStyle(face).visibility,
          transform: rotator && getComputedStyle(rotator).transform,
          caption: document.querySelector('#card-caption')?.textContent,
          pressed: card?.getAttribute('aria-pressed'),
        };
      });
      assert.ok(state.filename.endsWith('/images/network-card-back.png'), 'Back must use the approved Drive artwork');
      assert.equal(state.width, 1672);
      assert.equal(state.height, 941);
      assert.equal(state.visible, 'visible');
      assert.equal(state.transform, 'none', 'The back should never be mirrored by 3D transforms');
      assert.equal(state.caption, '02 / 02 — Back');
      assert.equal(state.pressed, 'true');

      await page.screenshot({ path: `${folder}/${label}-back.png`, fullPage: true });

      await page.locator('#front-tab').click();
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.card-front')).visibility === 'visible');
      assert.equal(await page.locator('#card-caption').textContent(), '01 / 02 — Front');
      console.log(`PASS /connect ${label}: front -> original approved back -> front`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
