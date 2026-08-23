import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const controller = fs.readFileSync('src/scripts/methodJourney.ts', 'utf8');
const thread = fs.readFileSync('src/components/landing/MethodThread.astro', 'utf8');
const pathLayer = fs.readFileSync('src/components/landing/ContinuousJourneyPath.astro', 'utf8');

test('journey progress is locked to viewport Y rather than scroll/path checkpoints', () => {
  for (const fragment of [
    "journey.dataset.methodPathOwner = 'viewport-y-locked-v7'",
    'const lengthForY = (targetY: number) =>',
    'const targetJourneyY = marker - journeyDocumentTop',
    'const drawnLength = reducedMotion ? totalLength : lengthForY(targetJourneyY)',
    "progressPath.dataset.mapping = 'viewport-y-locked-v7'",
    'progressPath.dataset.headDeltaY = format(headDeltaY)',
  ]) {
    assert.ok(controller.includes(fragment), `missing Y-locked journey contract: ${fragment}`);
  }

  for (const obsoleteFragment of [
    'appendJourneyStop',
    'interpolateJourneyLength',
    'physical-checkpoints-v6',
    'threadScrollSpan * 0.25',
    'threadScrollSpan * 0.75',
  ]) {
    assert.ok(!controller.includes(obsoleteFragment), `obsolete scroll/path mapping remains: ${obsoleteFragment}`);
  }
});

test('desktop handoffs use one continuous cubic S-curve with monotonic vertical progress', () => {
  assert.ok(controller.includes('const controlOffset = threadHeight * 0.36'));
  assert.ok(controller.includes('`C ${format(anchor.x)}'));
  assert.ok(thread.includes('data-path-geometry="s-curve"'));
  assert.ok(thread.includes('M 2 0 C 2 54 98 94 98 148'));
  assert.ok(thread.includes('M 98 0 C 98 54 2 94 2 148'));
  assert.ok(thread.includes('height: 148px'));
});

test('journey has a bounded static fallback and reduced-motion behavior', () => {
  for (const fragment of [
    "window.matchMedia('(prefers-reduced-motion: reduce)')",
    "document.documentElement.dataset.methodPathReady = 'fallback'",
    "journey.dataset.checkpointState = 'fallback'",
    'svg.style.display = \'none\'',
    'ResizeObserver',
    "document.addEventListener('astro:before-swap', cleanup",
    "window.visualViewport?.addEventListener('resize', scheduleMeasurement",
    "window.visualViewport?.addEventListener('scroll', requestRender",
  ]) {
    assert.ok(controller.includes(fragment), `missing lifecycle/fallback contract: ${fragment}`);
  }

  assert.ok(pathLayer.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(thread.includes('@media (prefers-reduced-motion: reduce)'));
});
