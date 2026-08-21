import assert from 'node:assert/strict';
import test from 'node:test';

import {
  appendJourneyStop,
  interpolateJourneyLength,
} from '../src/scripts/journeyPathModel.mjs';

test('collapses coincident joins into one physical checkpoint', () => {
  const stops = [];
  appendJourneyStop(stops, 100, 80);
  appendJourneyStop(stops, 100.2, 80.2);

  assert.deepEqual(stops, [{ scrollPosition: 100.2, pathLength: 80.2 }]);
});

test('rejects geometry that moves backward in scroll or path space', () => {
  assert.throws(
    () => appendJourneyStop([{ scrollPosition: 100, pathLength: 80 }], 90, 90),
    /scroll checkpoints must be monotonic/,
  );
  assert.throws(
    () => appendJourneyStop([{ scrollPosition: 100, pathLength: 80 }], 110, 70),
    /path checkpoints must be monotonic/,
  );
  assert.throws(
    () => appendJourneyStop([{ scrollPosition: 100, pathLength: 80 }], 100.2, 70),
    /Coincident journey joins must share the same path length/,
  );
});

test('maps a vertical stage directly to the visible scanline', () => {
  const stops = [
    { scrollPosition: 100, pathLength: 0 },
    { scrollPosition: 900, pathLength: 800 },
  ];

  assert.equal(interpolateJourneyLength(stops, 100), 0);
  assert.equal(interpolateJourneyLength(stops, 500), 400);
  assert.equal(interpolateJourneyLength(stops, 900), 800);
});

test('keeps the horizontal handoff centered when its width changes with zoom', () => {
  const narrow = [
    { scrollPosition: 100, pathLength: 0 },
    { scrollPosition: 125, pathLength: 50 },
    { scrollPosition: 175, pathLength: 550 },
    { scrollPosition: 200, pathLength: 600 },
  ];
  const wide = [
    { scrollPosition: 100, pathLength: 0 },
    { scrollPosition: 125, pathLength: 50 },
    { scrollPosition: 175, pathLength: 2450 },
    { scrollPosition: 200, pathLength: 2500 },
  ];

  assert.equal(interpolateJourneyLength(narrow, 150), 300);
  assert.equal(interpolateJourneyLength(wide, 150), 1250);
});

test('remains monotonic during forward and reverse traversal', () => {
  const stops = [
    { scrollPosition: 0, pathLength: 0 },
    { scrollPosition: 100, pathLength: 100 },
    { scrollPosition: 125, pathLength: 140 },
    { scrollPosition: 175, pathLength: 940 },
    { scrollPosition: 200, pathLength: 980 },
    { scrollPosition: 900, pathLength: 1680 },
  ];
  const positions = Array.from({ length: 91 }, (_, index) => index * 10);
  const forward = positions.map((position) => interpolateJourneyLength(stops, position));
  const reverse = [...positions].reverse().map((position) => interpolateJourneyLength(stops, position));

  assert.ok(forward.every((value, index) => index === 0 || value >= forward[index - 1]));
  assert.ok(reverse.every((value, index) => index === 0 || value <= reverse[index - 1]));
});
