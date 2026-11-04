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

test('digital business card uses the supplied, equally sized Canva artwork', () => {
  assert.deepEqual(readPngSize('public/images/network-card-front.png'), [1050, 600]);
  assert.deepEqual(readPngSize('public/images/network-card-back.png'), [1050, 600]);
  assert.match(cardPage, /network-card-front\.png/);
  assert.match(cardPage, /network-card-back\.png/);
  assert.match(cardPage, /aspect-ratio: 1050 \/ 600/);
});

test('digital card supports flipping, sharing and saving the contact', () => {
  assert.match(cardPage, /card-flip/);
  assert.match(cardPage, /setFlipped/);
  assert.match(cardPage, /navigator\.share/);
  assert.match(cardPage, /navigator\.clipboard/);
  assert.match(cardPage, /daniele-moltisanti\.vcf/);
  assert.match(cardPage, /www\.linkedin\.com\/in\/daniele-moltisanti/);
  assert.match(cardPage, /prefers-reduced-motion/);
});

test('digital contact avoids exposing employment affiliation and personal phone', () => {
  const vcf = get('public/daniele-moltisanti.vcf').toString('utf8');
  assert.match(vcf, /BEGIN:VCARD/);
  assert.match(vcf, /FN:Daniele Moltisanti/);
  assert.doesNotMatch(vcf, /Sky Italia|TEL:/);
  assert.doesNotMatch(cardPage, /Sky Italia/);
});
