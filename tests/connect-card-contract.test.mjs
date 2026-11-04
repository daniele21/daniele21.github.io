import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const get = (p) => readFileSync(path.join(root, p));
const cardPage = get('src/pages/connect.astro').toString('utf8');

function readPngSize(filePath) {
  const bytes = get(filePath);
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'PNG signature');
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

test('approved flyer assets remain unchanged in the digital card', () => {
  assert.deepEqual(readPngSize('public/images/network-card-front.png'), [1050, 600]);
  assert.deepEqual(readPngSize('public/images/network-card-back.png'), [1672, 941]);
  assert.match(cardPage, /network-card-front\\.png/);
  assert.match(cardPage, /network-card-back\\.png/);
});

test('front and back are stacked in a continuous, responsive layout', () => {
  const front = cardPage.indexOf('class="flyer-image flyer-front"');
  const back = cardPage.indexOf('class="flyer-image flyer-back"');
  assert.ok(front >= 0 && back > front, 'the approved back should follow the front');
  for (const required of [
    '.flyer-continuum {',
    'width: 100%;',
    'height: auto;',
    'object-fit: contain;',
    'margin-top: -2.5%;',
    'mask-image: linear-gradient(to bottom, #000 0%, #000 96%, transparent 100%)',
    'mask-image: linear-gradient(to bottom, transparent 0%, #000 4%, #000 100%)',
  ]) assert.ok(cardPage.includes(required), 'missing responsive visual continuity: ' + required);
  for (const forbidden of ['id="card-flip"', 'id="front-tab"', 'id="back-tab"', 'rotateY(', 'setFlipped(', 'backface-visibility']) {
    assert.equal(cardPage.includes(forbidden), false, 'outdated flip behavior: ' + forbidden);
  }
});

test('digital card shares link and provides contact + portfolio without employer affiliation', () => {
  const vcf = get('public/daniele-moltisanti.vcf').toString('utf8');
  assert.match(cardPage, /navigator\\.share/);
  assert.match(cardPage, /navigator\\.clipboard/);
  assert.match(cardPage, /daniele-moltisanti\\.vcf/);
  assert.match(cardPage, /www\\.linkedin\\.com\\/in\\/daniele-moltisanti/);
  assert.match(vcf, /FN:Daniele Moltisanti/);
  assert.doesNotMatch(vcf, /Sky Italia|TEL:/);
  assert.doesNotMatch(cardPage, /Sky Italia/);
});
