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
    '<h1 class="local">AI <span>Local-First.</span></h1>',
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

test('motion is purposeful, compositor-friendly, and progressive', () => {
  for (const expected of [
    '--motion-ease:', '@keyframes arrive', '@keyframes lineReveal',
    '.value-list::after {', '--signal-progress', 'requestAnimationFrame(updateJourney)',
    'IntersectionObserver', 'data-motion-reveal', 'prefers-reduced-motion: no-preference',
    'prefers-reduced-motion:reduce', '.secondary-actions { animation: arrive',
  ]) assert.ok(page.includes(expected), 'missing motion feature: ' + expected);
  for (const bad of ['transition: all', 'animation: infinite', 'rotateY(']) {
    assert.equal(page.includes(bad), false, 'disallowed motion: ' + bad);
  }
  assert.ok(page.includes('animation:none!important'), 'reduced motion must disable animation');
  assert.ok(page.includes('!motionPreference.matches'), 'motion JS should respect user settings');
});

test('portrait remains optimized and QR components are removed', () => {
  const portrait = get('public/images/connect-portrait.webp');
  assert.equal(portrait.toString('ascii', 0, 4), 'RIFF');
  assert.equal(portrait.toString('ascii', 8, 12), 'WEBP');
  assert.ok(page.includes('src={portraitSrc}'));
  for (const removed of ['qr-overlay', 'show-qr', 'qr-dialog', 'qrSrc', 'setQRVisible']) {
    assert.equal(page.includes(removed), false, 'QR feature must be absent: ' + removed);
  }
});

test('contact CTAs have meaningful hierarchy and accessible names', () => {
  for (const expected of [
    'class="action primary"', 'class="secondary-actions"', 'class="action linkedin"',
    'class="action share"', 'id="share"', 'action__icon', 'action__copy',
    'Add to your contacts', 'Share card', 'min-height: 66px',
    'min-height: 55px', 'focus-visible', '@media (hover:hover) and (pointer:fine)',
  ]) assert.ok(page.includes(expected), 'missing premium CTA requirement: ' + expected);
});

test('save, share, LinkedIn and portfolio remain available', () => {
  for(const required of [
    'href={vcardUrl}', 'Save contact', 'www.linkedin.com/in/daniele-moltisanti/',
    'navigator.share', 'navigator.clipboard.writeText', 'https://daniele21.github.io/connect',
    'id="share"', 'href={portfolioUrl}',
  ]) assert.ok(page.includes(required), 'missing working action: ' + required);
  assert.ok(vcard.includes('BEGIN:VCARD'));
  assert.ok(vcard.includes('FN:Daniele Moltisanti'));
  assert.equal(vcard.includes('Sky Italia'), false);
  assert.equal(page.includes('Sky Italia'), false);
  assert.equal(vcard.includes('TEL:'), false);
});
