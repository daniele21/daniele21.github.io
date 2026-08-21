/**
 * Insert a physical scroll/path checkpoint while collapsing coincident joins.
 * The array is intentionally mutated so the browser controller can build it
 * alongside the single SVG path without creating a second geometry model.
 *
 * @param {{ scrollPosition: number, pathLength: number }[]} stops
 * @param {number} scrollPosition
 * @param {number} pathLength
 * @param {number} [joinTolerance]
 */
export function appendJourneyStop(stops, scrollPosition, pathLength, joinTolerance = 0.5) {
  const previous = stops[stops.length - 1];
  if (previous && Math.abs(previous.scrollPosition - scrollPosition) <= joinTolerance) {
    if (Math.abs(previous.pathLength - pathLength) > 1) {
      throw new RangeError('Coincident journey joins must share the same path length.');
    }
    previous.scrollPosition = scrollPosition;
    previous.pathLength = pathLength;
    return;
  }

  if (previous && scrollPosition < previous.scrollPosition) {
    throw new RangeError('Journey scroll checkpoints must be monotonic.');
  }

  if (previous && pathLength < previous.pathLength) {
    throw new RangeError('Journey path checkpoints must be monotonic.');
  }

  stops.push({ scrollPosition, pathLength });
}

/**
 * Map the visible document scanline to the matching physical SVG checkpoint.
 * Piecewise-linear interpolation is deliberate: it preserves exact joins and
 * cannot drift when horizontal runs become longer because of viewport zoom.
 *
 * @param {{ scrollPosition: number, pathLength: number }[]} stops
 * @param {number} scrollPosition
 */
export function interpolateJourneyLength(stops, scrollPosition) {
  if (stops.length === 0) return 0;
  if (scrollPosition <= stops[0].scrollPosition) return stops[0].pathLength;
  if (scrollPosition >= stops[stops.length - 1].scrollPosition) {
    return stops[stops.length - 1].pathLength;
  }

  let index = 0;
  while (index < stops.length - 2 && scrollPosition > stops[index + 1].scrollPosition) {
    index += 1;
  }

  const start = stops[index];
  const end = stops[index + 1];
  const width = Math.max(1, end.scrollPosition - start.scrollPosition);
  const progress = Math.min(1, Math.max(0, (scrollPosition - start.scrollPosition) / width));
  return start.pathLength + (end.pathLength - start.pathLength) * progress;
}
