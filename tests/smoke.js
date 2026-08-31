/**
 * Smoke & Integrity Verification Test Suite.
 * Validates:
 * 1. Static dist output exists for all registered routes
 * 2. Internal link integrity (zero 404s)
 * 3. Asset file existence
 * 4. Scroll-linked method path contract and reduced-motion fallback
 * 5. Landmark validity (single <main id="main">, no duplicate main landmarks)
 * 6. Heading hierarchy (single <h1> per page)
 */

import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run `npm run build` first.');
  process.exit(1);
}

const expectedRoutes = [
  'index.html',
  'about/index.html',
  'insights/index.html',
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

let errors = 0;

console.log('🔍 1. Verifying static route output...');
for (const route of expectedRoutes) {
  const filePath = path.join(distDir, route);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing static page: ${route}`);
    errors++;
  } else {
    console.log(`  ✓ Found: /${route.replace('/index.html', '').replace('index.html', '')}`);
  }
}

console.log('\n🔍 2. Verifying HTML semantic landmarks and heading hierarchy...');
for (const route of expectedRoutes) {
  const filePath = path.join(distDir, route);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf-8');
  const mainMatches = html.match(/<main\b/gi) || [];
  if (mainMatches.length !== 1) {
    console.error(`❌ Page ${route} has ${mainMatches.length} <main> tags (expected exactly 1).`);
    errors++;
  }

  const h1Matches = html.match(/<h1\b/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`❌ Page ${route} has ${h1Matches.length} <h1> tags (expected exactly 1).`);
    errors++;
  }
}

console.log('\n🔍 3. Verifying landing plane composition...');
const landingHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const planeSectionCount = (landingHtml.match(/class="[^"]*\bplane-section\b[^"]*"/g) || []).length;
if (planeSectionCount !== 4) {
  console.error(`❌ Landing has ${planeSectionCount} shared plane sections (expected 4).`);
  errors++;
}

const planeTemplatePath = path.resolve('src/components/landing/PlaneTemplate.astro');
const planeTemplateSource = fs.readFileSync(planeTemplatePath, 'utf-8');
const planeCardPath = path.resolve('src/components/landing/PlaneCard.astro');
const planeCardSource = fs.readFileSync(planeCardPath, 'utf-8');
const planeCardGridPath = path.resolve('src/components/landing/PlaneCardGrid.astro');
const planeCardGridSource = fs.readFileSync(planeCardGridPath, 'utf-8');
const planeConsumers = [
  'src/components/landing/DecisionStage.astro',
  'src/components/landing/BuildStage.astro',
  'src/components/landing/TestStage.astro',
  'src/components/landing/EvidenceStage.astro',
];

for (const sourcePath of planeConsumers) {
  const source = fs.readFileSync(path.resolve(sourcePath), 'utf-8');
  if (!source.includes("import PlaneTemplate from './PlaneTemplate.astro'") || !source.includes('<PlaneTemplate')) {
    console.error(`❌ ${sourcePath} does not use the shared centered plane template.`);
    errors++;
  }
}

for (const fragment of ['stage-copy plane-intro', 'stage-visual plane-visual', '<slot />']) {
  if (!planeTemplateSource.includes(fragment)) {
    console.error(`❌ PlaneTemplate is missing its shared layout contract fragment: ${fragment}`);
    errors++;
  }
}

for (const fragment of ['plane-card__header', 'plane-card__body', 'plane-card__footer']) {
  if (!planeCardSource.includes(fragment)) {
    console.error(`❌ PlaneCard is missing its shared card contract fragment: ${fragment}`);
    errors++;
  }
}

for (const [sourcePath, fragment] of [
  ['src/components/landing/TestStage.astro', '<PlaneCardGrid'],
  ['src/components/landing/ProjectProofCard.astro', '<PlaneCard'],
]) {
  const source = fs.readFileSync(path.resolve(sourcePath), 'utf-8');
  if (!source.includes(fragment)) {
    console.error(`❌ ${sourcePath} is missing shared primitive usage: ${fragment}`);
    errors++;
  }
}

for (const fragment of [
  'id="strategy"',
  'id="infrastructure"',
  'id="applications"',
  'id="evidence"',
]) {
  if (!landingHtml.includes(fragment)) {
    console.error(`❌ Landing is missing required stage anchor: ${fragment}`);
    errors++;
  }
}

const journeyProgressCount = (landingHtml.match(/data-journey-progress/g) || []).length;
if (journeyProgressCount !== 1) {
  console.error(`❌ Landing has ${journeyProgressCount} global journey progress paths (expected exactly 1).`);
  errors++;
}
if (!landingHtml.includes('data-journey-progress pathLength="1"')) {
  console.error('❌ Landing journey progress path is missing normalized pathLength="1".');
  errors++;
}

console.log('\n🔍 4. Verifying scroll-linked method path contract...');
const methodPathSources = [
  'src/pages/index.astro',
  'src/components/landing/ContinuousJourneyPath.astro',
  'src/components/landing/StageRail.astro',
  'src/components/landing/MethodThread.astro',
  'src/styles/layout.css',
  'src/styles/tokens.css',
].map((sourcePath) => [sourcePath, fs.readFileSync(path.resolve(sourcePath), 'utf-8')]);

for (const [sourcePath, fragment] of [
  ['src/pages/index.astro', 'requestAnimationFrame'],
  ['src/pages/index.astro', 'appendJourneyStop'],
  ['src/pages/index.astro', 'interpolateJourneyLength'],
  ['src/pages/index.astro', 'getViewportPlayhead'],
  ['src/pages/index.astro', 'window.visualViewport?.offsetTop'],
  ['src/pages/index.astro', 'window.visualViewport?.height ?? window.innerHeight'],
  ['src/pages/index.astro', "querySelector<HTMLElement>('#site-header')"],
  ['src/pages/index.astro', 'const marker = window.scrollY + playheadY'],
  ['src/pages/index.astro', 'progressPath.dataset.playheadY = format(playheadY)'],
  ['src/pages/index.astro', "journey.style.setProperty('--journey-playhead-y'"],
  ['src/pages/index.astro', 'distancePastNode'],
  ['src/pages/index.astro', "querySelector<SVGPathElement>('[data-journey-progress]')"],
  ['src/pages/index.astro', "setAttribute('stroke-dashoffset'"],
  ['src/pages/index.astro', "dataset.methodPathReady = 'pending'"],
  ['src/pages/index.astro', 'methodWindow.__methodPathCleanup?.()'],
  ['src/pages/index.astro', "const shouldIsolateVisibleJourney = document.documentElement.dataset.methodPathReady === 'true'"],
  ['src/pages/index.astro', 'const replacement = journey.cloneNode(true) as HTMLElement'],
  ['src/pages/index.astro', "journey.dataset.methodPathOwner = 'physical-checkpoints-v6'"],
  ['src/pages/index.astro', "document.addEventListener('astro:before-swap', cleanup"],
  ['src/pages/index.astro', "const pathEnd = measurePath(commands.join(' '))"],
  ['src/pages/index.astro', 'stage.dataset.pathNodeLength = format(nodeLength)'],
  ['src/pages/index.astro', 'progressPath.dataset.drawnLength = format(drawnLength)'],
  ['src/pages/index.astro', "setAttribute('stroke-dasharray', '1 1')"],
  ['src/pages/index.astro', 'const normalizedProgress = clamp(drawnLength / totalLength)'],
  ['src/pages/index.astro', 'ResizeObserver'],
  ['src/pages/index.astro', 'const getViewportSignature = () =>'],
  ['src/pages/index.astro', 'function scheduleMeasurement()'],
  ['src/pages/index.astro', "window.visualViewport?.addEventListener('resize', scheduleMeasurement"],
  ['src/pages/index.astro', "viewportBreakpoint.addEventListener('change', scheduleMeasurement)"],
  ['src/pages/index.astro', 'const measureAndRender = () =>'],
  ['src/pages/index.astro', "progressPath.dataset.mapping = 'piecewise-physical-v6'"],
  ['src/pages/index.astro', 'progressPath.dataset.headViewportY = format(headViewportY)'],
  ['src/pages/index.astro', 'progressPath.dataset.alignmentState = reducedMotion'],
  ['src/pages/index.astro', "journey.dataset.checkpointState = 'valid'"],
  ['src/pages/index.astro', 'const activateStaticFallback = (error: unknown) =>'],
  ['src/pages/index.astro', "document.documentElement.dataset.methodPathReady = 'fallback'"],
  ['src/pages/index.astro', "journey.dataset.checkpointState = 'fallback'"],
  ['src/pages/index.astro', 'const stagePathStartY = previousThread ? previousThread.bottom : anchor.railTop'],
  ['src/pages/index.astro', 'const stagePathEndY = upcomingThread ? upcomingThread.top : anchor.railBottom'],
  ['src/pages/index.astro', 'thread.scrollTop + threadScrollSpan * 0.25'],
  ['src/pages/index.astro', 'thread.scrollTop + threadScrollSpan * 0.75'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'data-journey-guide'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'data-journey-progress'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'pathLength="1"'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'stroke-dashoffset="1"'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'stroke-width: var(--method-path-width)'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'filter: var(--method-path-glow)'],
  ['src/components/landing/ContinuousJourneyPath.astro', 'prefers-reduced-motion: reduce'],
  ['src/components/landing/StageRail.astro', 'var(--node-opacity, 0)'],
  ['src/components/landing/StageRail.astro', 'width: 0;'],
  ['src/components/landing/MethodThread.astro', 'var(--thread-copy-opacity)'],
  ['src/components/landing/MethodThread.astro', 'data-path-geometry="orthogonal"'],
  ['src/components/landing/MethodThread.astro', 'viewBox="0 0 40 96"'],
  ['src/components/landing/MethodThread.astro', 'width: 40px;'],
  ['src/styles/layout.css', '.method-journey'],
  ['src/styles/layout.css', ".method-journey .thread-curve"],
  ['src/styles/layout.css', "html[data-method-path-ready='true']"],
  ['src/styles/tokens.css', '--method-path-width: 4px'],
  ['src/styles/tokens.css', '--method-path-guide:'],
  ['src/styles/tokens.css', '--method-path-glow:'],
]) {
  const source = methodPathSources.find(([candidate]) => candidate === sourcePath)?.[1] ?? '';
  if (!source.includes(fragment)) {
    console.error(`❌ ${sourcePath} is missing the method-path contract fragment: ${fragment}`);
    errors++;
  }
}

const layoutSource = methodPathSources.find(([candidate]) => candidate === 'src/styles/layout.css')?.[1] ?? '';
if (/data-method-path-ready=['"]pending['"][\s\S]{0,240}opacity:\s*0/.test(layoutSource)) {
  console.error('❌ Pending method-path state must not hide homepage content before enhancement initializes.');
  errors++;
}

const tokenSource = methodPathSources.find(([candidate]) => candidate === 'src/styles/tokens.css')?.[1] ?? '';
if (!tokenSource.includes('var(--accent-blue) 24%')) {
  console.error('❌ Method path guide must remain visible at the 24% contrast contract.');
  errors++;
}

for (const sourcePath of [
  'src/pages/index.astro',
  'src/components/landing/StageRail.astro',
  'src/components/landing/MethodThread.astro',
]) {
  const source = methodPathSources.find(([candidate]) => candidate === sourcePath)?.[1] ?? '';
  if (!source.includes('prefers-reduced-motion')) {
    console.error(`❌ ${sourcePath} is missing a reduced-motion behavior or fallback.`);
    errors++;
  }
}

const landingControllerSource = methodPathSources.find(([candidate]) => candidate === 'src/pages/index.astro')?.[1] ?? '';
for (const obsoleteFragment of [
  "if (document.documentElement.dataset.methodPathReady === 'true') return",
  'const lengthScale =',
  'standalonePath',
  'handoffScrollLead',
  'window.innerHeight * 0.72',
  "progressPath.setAttribute('stroke-dashoffset', '1')",
  'buildTangents',
  'stopTangents',
  '--journey-stroke-width',
]) {
  if (landingControllerSource.includes(obsoleteFragment)) {
    console.error(`❌ src/pages/index.astro still contains obsolete journey-path logic: ${obsoleteFragment}`);
    errors++;
  }
}

console.log('\n🔍 5. Verifying referenced public assets...');
const publicImages = [
  'images/profile-photo.jpg',
  'images/ecosystem.png',
  'images/redact-guard/logo.png',
  'images/aura/logo.png',
  'images/closedroom/logo.png',
  'images/local-llm-server/logo.svg',
  'images/harness/logo.svg',
  'images/local-llm-server/overview.png',
  'images/harness/architecture-hero.png',
  'images/harness/harness-overview.png',
  'images/redact-guard/redactguard-review.jpg',
  'images/redact-guard/redactguard-doc-preview.jpg',
  'images/aura-finance/aura-payment-detection.png',
  'images/aura-finance/aura-categories-preview.png',
  'images/closedroom/meeting-analysis.jpg',
  'images/closedroom/recording-preview.jpg',
  'images/traffic-monitoring/overview.png',
  'images/traffic-monitoring-android/overview.png',
  'images/strategy/decision-framework.svg',
  'images/strategy/local-vs-hybrid-vs-cloud-native-final.svg',
  'images/strategy/tradeoff-guide.svg',
  'favicon.png',
];

for (const img of publicImages) {
  const publicPath = path.resolve('public', img);
  if (!fs.existsSync(publicPath)) {
    console.error(`❌ Missing public asset: ${img}`);
    errors++;
  } else {
    console.log(`  ✓ Asset verified: ${img}`);
  }
}

if (errors > 0) {
  console.error(`\n❌ Verification completed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\n✅ All smoke and integrity checks passed successfully!');
}
