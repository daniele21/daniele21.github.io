/**
 * Built-artifact + product-experience smoke suite.
 *
 * This intentionally validates stable UX contracts rather than implementation
 * trivia. Interaction geometry has a focused test in
 * tests/method-journey-contract.test.mjs.
 */

import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const read = (filePath) => fs.readFileSync(path.resolve(filePath), 'utf8');
let errors = 0;

const fail = (message) => {
  console.error(`❌ ${message}`);
  errors += 1;
};

const pass = (message) => console.log(`  ✓ ${message}`);

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run `npm run build` before smoke validation.');
  process.exit(1);
}

const expectedRoutes = [
  'index.html',
  'about/index.html',
  'insights/index.html',
  'local-ai-strategy/index.html',
  'local-ai-infrastructure/index.html',
  'local-ai-use-cases/index.html',
  'local-ai-performance/index.html',
  'redact-guard/index.html',
  'aura-finance/index.html',
  'closedroom/index.html',
  'local-llm-server/index.html',
  'android-local-llm-harness/index.html',
  'local-asr-server/index.html',
  'traffic-monitoring/index.html',
  'traffic-monitoring-android/index.html',
  'performance-lab/index.html',
];

console.log('🔍 1. Static routes');
for (const route of expectedRoutes) {
  const filePath = path.join(distDir, route);
  if (!fs.existsSync(filePath)) fail(`Missing static page: ${route}`);
  else pass(`/${route.replace('/index.html', '').replace('index.html', '')}`);
}

console.log('\n🔍 2. Semantic landmarks and heading hierarchy');
for (const route of expectedRoutes) {
  const filePath = path.join(distDir, route);
  if (!fs.existsSync(filePath)) continue;
  const html = fs.readFileSync(filePath, 'utf8');
  const mains = html.match(/<main\b/gi) || [];
  const h1s = html.match(/<h1\b/gi) || [];
  if (mains.length !== 1) fail(`${route} has ${mains.length} <main> elements; expected 1`);
  if (h1s.length !== 1) fail(`${route} has ${h1s.length} <h1> elements; expected 1`);
}

console.log('\n🔍 3. Landing information architecture');
const landingPath = path.join(distDir, 'index.html');
const landingHtml = fs.readFileSync(landingPath, 'utf8');
const stageCount = (landingHtml.match(/<section class="stage-section method-stage/g) || []).length;
if (stageCount !== 4) fail(`Landing has ${stageCount} method stages; expected 4`);
else pass('Four-stage Decide → Build → Test → Measure journey');

for (const fragment of [
  "HOW I'M TESTING THAT IDEA",
  'id="strategy"',
  'id="infrastructure"',
  'id="evidence"',
  'DECIDE AGAIN',
]) {
  if (!landingHtml.includes(fragment)) fail(`Landing is missing journey fragment: ${fragment}`);
}

const globalProgressPaths = landingHtml.match(/<path class="journey-path-progress"/g) || [];
if (globalProgressPaths.length !== 1) {
  fail(`Landing has ${globalProgressPaths.length} global progress paths; expected exactly 1`);
} else {
  pass('Single global journey progress path');
}

console.log('\n🔍 4. Internal link integrity');
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(distDir);

const internalTargets = new Set();
for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    internalTargets.add(clean);
  }
}

for (const href of internalTargets) {
  const relative = href.replace(/^\//, '').replace(/\/$/, '');
  const candidates = relative
    ? [path.join(distDir, relative), path.join(distDir, relative, 'index.html'), path.join(distDir, `${relative}.html`)]
    : [path.join(distDir, 'index.html')];
  if (!candidates.some((candidate) => fs.existsSync(candidate))) fail(`Broken internal href: ${href}`);
}
if (internalTargets.size) pass(`${internalTargets.size} unique internal targets resolve`);

console.log('\n🔍 5. Product-experience contracts');
const uxContract = JSON.parse(read('design/ux-contract.json'));
const j1 = uxContract.criticalJourneys?.find((journey) => journey.id === 'J1')?.flow ?? '';
for (const stage of ['Decide', 'Build', 'Test', 'Measure', 'Decide Again']) {
  if (!j1.includes(stage)) fail(`J1 UX contract is missing ${stage}`);
}
if (uxContract.designSourceOfTruth?.primary !== 'src/styles/tokens.css') {
  fail('UX contract must identify src/styles/tokens.css as implemented visual-token source of truth');
}

const brandKit = JSON.parse(read('design/brand-kit.json'));
if (brandKit.sourceOfTruth?.tokens !== 'src/styles/tokens.css') {
  fail('Brand kit must point to src/styles/tokens.css as canonical token owner');
}
if (!brandKit.motion?.character || !brandKit.motion?.reducedMotion) {
  fail('Brand kit must define motion character and reduced-motion strategy');
}

const tokenSource = read('src/styles/tokens.css');
for (const token of ['--touch-target-min: 44px', '--border-focus:', '--duration-fast:', '--duration-base:', '--duration-slow:']) {
  if (!tokenSource.includes(token)) fail(`Missing canonical UI token: ${token}`);
}
if (!tokenSource.includes('@media (prefers-reduced-motion: reduce)')) {
  fail('Global reduced-motion override is missing');
}

console.log('\n🔍 6. Responsive navigation and evidence semantics');
const headerSource = read('src/components/landing/LandingHeader.astro');
if (!headerSource.includes('class="mobile-nav"')) fail('Compact mobile navigation is missing');
if (!headerSource.includes('<summary')) fail('Mobile navigation must expose a keyboard-accessible summary control');

const evidenceSource = read('src/components/landing/EvidenceStage.astro');
if (evidenceSource.includes('Conceptual performance profile')) {
  fail('Evidence stage still contains a conceptual chart that can be mistaken for measured evidence');
}
if (!evidenceSource.includes('measurement-grid')) {
  fail('Evidence stage should explain measurement dimensions without fabricated data');
}

console.log('\n🔍 7. Referenced public assets');
const publicAssets = [
  'images/profile-photo.jpg',
  'images/ecosystem.png',
  'images/redact-guard/logo.png',
  'images/aura/logo.png',
  'images/closedroom/logo.png',
  'images/local-llm-server/overview.png',
  'images/harness/architecture-hero.png',
  'images/harness/harness-overview.png',
  'images/redact-guard/redactguard-review.jpg',
  'images/aura-finance/aura-payment-detection.png',
  'images/closedroom/meeting-analysis.jpg',
  'images/traffic-monitoring/overview.png',
  'images/traffic-monitoring-android/overview.png',
  'favicon.png',
];
for (const asset of publicAssets) {
  if (!fs.existsSync(path.resolve('public', asset))) fail(`Missing public asset: ${asset}`);
}

if (errors > 0) {
  console.error(`\n❌ Smoke validation completed with ${errors} error(s).`);
  process.exit(1);
}

console.log('\n✅ Product-experience smoke validation passed.');
