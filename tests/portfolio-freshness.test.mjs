import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

test('canonical portfolio narrative is periodically re-verified against project repositories', () => {
  const source = read('src/content/portfolio.ts');
  const match = source.match(/lastVerified:\s*'([0-9]{4}-[0-9]{2}-[0-9]{2})'/);
  assert.ok(match, 'portfolio.ts must expose a lastVerified YYYY-MM-DD date');

  const verifiedAt = new Date(`${match[1]}T00:00:00Z`);
  const now = new Date();
  const ageDays = (now.getTime() - verifiedAt.getTime()) / 86_400_000;

  assert.ok(ageDays >= -1, 'portfolio verification date must not be materially in the future');
  assert.ok(
    ageDays <= 45,
    `portfolio narrative is ${Math.floor(ageDays)} days old; re-check project READMEs/current-state docs and refresh lastVerified`,
  );
});

test('canonical portfolio content does not revive retired public positioning', () => {
  const portfolio = read('src/content/portfolio.ts');
  const landing = read('src/content/locales/en/landing.ts');

  assert.doesNotMatch(portfolio, /Performance Lab/);
  assert.doesNotMatch(landing, /id:\s*'performance-lab'/);
  assert.doesNotMatch(landing, /Can personal transactions be categorized on-device/);
  assert.doesNotMatch(landing, /On-device semantic extraction coupled with deterministic financial math/);
});
