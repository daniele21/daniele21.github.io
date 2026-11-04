import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const get = (name) => readFileSync(path.join(root, name));
const page = get('src/pages/connect.astro').toString('utf8');
const vcard = get('public/daniele-moltisanti.vcf').toString('utf8');

test('native mobile-first /connect is no longer an image collage', () => {
  for (const required of [
    '<h1 class="local">LOCAL-<span>FIRST.</span></h1>',
    'Your AI. Your Data.',
    'Strategic vision.',
    'Hands-on execution.',
    'Strategy meets execution',
    'Value, feasibility',
    'From concept to real products.',
    'Privacy. Independence. Local AI.',
    'LOCAL-FIRST <span class="neq">≠</span>',
    'Cloud where it adds value.',
    '@media (max-width:380px)',
    '@media (min-width:760px)',
    '@media (prefers-reduced-motion:reduce)',
  ]) assert.ok(page.includes(required), 'missing approved brand/content: ' + required);

  for (const forbidden of [
    'flyer-continuum', 'network-card-back.png', 'card-flip',
    'front-tab', 'back-tab', 'rotateY(', 'backface-visibility',
  ]) assert.equal(page.includes(forbidden), false, 'obsolete print-image presentation: ' + forbidden);
});

test('design remains one connected surface rather than visually divided panels', () => {
  assert.ok(page.includes('Deliberately one canvas'));
  assert.ok(page.includes('<a class="hero-foot" href="#strategy-title">'));
  assert.ok(page.includes('.value-list::before {'));
  assert.ok(page.includes('Enterprise AI leadership. Hands-on product building.'));
  for (const old of ['min-height:660px', 'height:330px', 'border-top:1px solid rgba(109,125,198,.23)']) {
    assert.equal(page.includes(old), false, 'old discontinuous layout: ' + old);
  }
});

test('portrait and QR are local optimized assets with correct dimensions', () => {
  const portrait = get('public/images/connect-portrait.webp');
  assert.equal(portrait.toString('ascii', 0, 4), 'RIFF');
  assert.equal(portrait.toString('ascii', 8, 12), 'WEBP');
  const qr = get('public/images/connect-qr.png');
  assert.equal(qr.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(qr.readUInt32BE(16), 585);
  assert.equal(qr.readUInt32BE(20), 585);
  assert.ok(page.includes('src={portraitSrc}'));
  assert.ok(page.includes('src={qrSrc}'));
  assert.ok(page.includes('id="show-qr"'));
  assert.ok(page.includes('id="qr-overlay"'));
});

test('save, share, LinkedIn and portfolio remain available', () => {
  for(const required of [
    'href={vcardUrl}', 'Save contact', 'www.linkedin.com/in/daniele-moltisanti/',
    'navigator.share', 'navigator.clipboard.writeText', 'https://daniele21.github.io/connect',
    'aria-modal="true"', 'Escape', 'id="qr-close"', 'href={portfolioUrl}',
  ]) assert.ok(page.includes(required), 'missing working action: ' + required);
  assert.ok(vcard.includes('BEGIN:VCARD'));
  assert.ok(vcard.includes('FN:Daniele Moltisanti'));
  assert.equal(vcard.includes('Sky Italia'), false);
  assert.equal(page.includes('Sky Italia'), false);
  assert.equal(vcard.includes('TEL:'), false);
});
