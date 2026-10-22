import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('src/pages/about.astro', 'utf8');
const content = fs.readFileSync('src/content/locales/en/about.ts', 'utf8');
const types = fs.readFileSync('src/types/about.ts', 'utf8');

test('About tells a coherent story with a single hero and a full evidence-to-product journey', () => {
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.match(page, /hero\.titleLead/);
  assert.match(page, /hero\.titleClose/);

  for (const section of [
    'story-title', 'impact-title', 'projects-title',
    'principles-title', 'beyond-title', 'direction-title',
  ]) {
    assert.ok(page.includes('id="' + section + '"'), 'Missing section: ' + section);
  }

  assert.match(page, /href="#projects"/);
  assert.match(page, /aria-labelledby="projects-title"/);
  assert.match(page, /prefers-reduced-motion: reduce/);
});

test('About represents CV claims accurately, without misleading awards or job titles', () => {
  assert.match(content, /Principal Data Scientist & AI Strategy Lead/);
  assert.match(content, /6/);
  assert.match(content, /70%/);
  assert.match(content, /150\+/);
  assert.match(content, /ML projects reviewed/);
  assert.match(content, /80 articles/);
  assert.match(content, /Nova 111/);

  for (const unsupported of [
    /five.nines/i,
    /CVPR/i,
    /Gold Impact Writer/i,
    /150\+ (mentees|people mentored|projects mentored)/i,
    /Data Scientist Manager/i,
    /70B.*competitive/i,
    /guarantee true data sovereignty/i,
  ]) {
    assert.doesNotMatch(content, unsupported);
  }
});

test('Independent experiments point to published project pages, not imaginary results', () => {
  const routes = ['/korgis', '/harnex', '/local-asr-server', '/redact-guard', '/closedroom', '/aura-finance'];
  for (const route of routes) {
    assert.ok(content.includes("href: '" + route + "'"), 'Missing internal project link: ' + route);
  }
  assert.match(content, /not a claim that every approach is production-ready/);
  assert.match(content, /Local-first is not local-only/);
  assert.match(content, /What I build to learn/);
  assert.match(types, /category: 'Infrastructure' \| 'Application'/);
  assert.match(page, /href=\{route\(project\.href\)\}/);
});
