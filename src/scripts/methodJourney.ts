type JourneySegment = {
  host: HTMLElement;
  kind: 'stage' | 'thread';
  yStart: number;
  yEnd: number;
  pathStart: number;
  pathEnd: number;
  alignmentTolerance: number;
};

type StageState = {
  stage: HTMLElement;
  nodeLength: number;
};

type PathSample = {
  y: number;
  length: number;
};

type MethodPathWindow = Window & {
  __methodPathCleanup?: () => void;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const format = (value: number) => value.toFixed(3);

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp01((value - start) / Math.max(0.0001, end - start));
  return progress * progress * (3 - 2 * progress);
};

export function initMethodPath() {
  const methodWindow = window as MethodPathWindow;
  methodWindow.__methodPathCleanup?.();

  const journey = document.querySelector<HTMLElement>('[data-method-journey]');
  const svg = journey?.querySelector<SVGSVGElement>('[data-journey-svg]');
  const guidePath = journey?.querySelector<SVGPathElement>('[data-journey-guide]');
  const progressPath = journey?.querySelector<SVGPathElement>('[data-journey-progress]');
  const stages = journey ? Array.from(journey.querySelectorAll<HTMLElement>('.method-stage')) : [];
  const threads = journey ? Array.from(journey.querySelectorAll<HTMLElement>('[data-method-thread]')) : [];

  if (!journey || !svg || !guidePath || !progressPath || !stages.length) return;

  journey.dataset.methodPathOwner = 'viewport-y-locked-v7';
  document.documentElement.dataset.methodPathReady = 'pending';

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const viewportBreakpoint = window.matchMedia('(max-width: 760px)');

  let journeySegments: JourneySegment[] = [];
  let stageStates: StageState[] = [];
  let pathSamples: PathSample[] = [];
  let totalLength = 1;
  let animationFrame = 0;
  let geometryFrame = 0;
  let resizeSettleTimer = 0;
  let resizeObserver: ResizeObserver | undefined;
  let disposed = false;

  const getViewportPlayhead = () => {
    const visibleTop = Math.max(0, window.visualViewport?.offsetTop ?? 0);
    const visibleHeight = Math.max(0, window.visualViewport?.height ?? window.innerHeight);
    const visibleBottom = visibleTop + visibleHeight;
    const headerBottom = Math.max(
      0,
      document.querySelector<HTMLElement>('#site-header')?.getBoundingClientRect().bottom ?? 0,
    );
    const usableTop = Math.max(visibleTop, headerBottom);
    return usableTop + Math.max(0, visibleBottom - usableTop) * 0.5;
  };

  const lengthForY = (targetY: number) => {
    if (!pathSamples.length) return 0;
    if (targetY <= pathSamples[0].y) return pathSamples[0].length;
    if (targetY >= pathSamples[pathSamples.length - 1].y) return totalLength;

    let low = 0;
    let high = pathSamples.length - 1;

    while (low + 1 < high) {
      const mid = Math.floor((low + high) / 2);
      if (pathSamples[mid].y < targetY) low = mid;
      else high = mid;
    }

    const start = pathSamples[low];
    const end = pathSamples[high];
    const ySpan = Math.max(0.0001, end.y - start.y);
    const progress = clamp01((targetY - start.y) / ySpan);
    return start.length + (end.length - start.length) * progress;
  };

  const measure = () => {
    const journeyRect = journey.getBoundingClientRect();
    const width = Math.max(1, journeyRect.width);
    const height = Math.max(1, journeyRect.height);
    const commands: string[] = [];

    svg.setAttribute('viewBox', `0 0 ${format(width)} ${format(height)}`);

    const stageAnchors = stages.map((stage) => {
      const rail = stage.querySelector<HTMLElement>('.stage-rail') ?? stage;
      const node = stage.querySelector<HTMLElement>('.stage-node');
      const railRect = rail.getBoundingClientRect();
      const nodeRect = node?.getBoundingClientRect();

      return {
        stage,
        x: railRect.left - journeyRect.left,
        railTop: railRect.top - journeyRect.top,
        railBottom: railRect.bottom - journeyRect.top,
        nodeY: nodeRect
          ? nodeRect.top + nodeRect.height / 2 - journeyRect.top
          : railRect.top - journeyRect.top,
      };
    });

    const threadAnchors = threads.map((thread) => {
      const rect = thread.getBoundingClientRect();
      return {
        thread,
        top: rect.top - journeyRect.top,
        bottom: rect.bottom - journeyRect.top,
      };
    });

    const rawSegments: Array<Omit<JourneySegment, 'pathStart' | 'pathEnd'>> = [];

    commands.push(`M ${format(stageAnchors[0].x)} ${format(stageAnchors[0].railTop)}`);

    stageAnchors.forEach((anchor, index) => {
      const previousThread = threadAnchors[index - 1];
      const upcomingThread = threadAnchors[index];
      const stageYStart = previousThread ? previousThread.bottom : anchor.railTop;
      const stageYEnd = upcomingThread ? upcomingThread.top : anchor.railBottom;

      commands.push(`V ${format(stageYEnd)}`);
      rawSegments.push({
        host: anchor.stage,
        kind: 'stage',
        yStart: stageYStart,
        yEnd: stageYEnd,
        alignmentTolerance: 3,
      });

      const thread = threadAnchors[index];
      const nextAnchor = stageAnchors[index + 1];
      if (!thread || !nextAnchor) return;

      const distanceX = nextAnchor.x - anchor.x;
      const isVertical = Math.abs(distanceX) < 1 || viewportBreakpoint.matches;

      if (isVertical) {
        commands.push(`V ${format(thread.bottom)}`);
      } else {
        const threadHeight = Math.max(1, thread.bottom - thread.top);
        const controlOffset = threadHeight * 0.36;
        commands.push(
          `C ${format(anchor.x)} ${format(thread.top + controlOffset)} ` +
          `${format(nextAnchor.x)} ${format(thread.bottom - controlOffset)} ` +
          `${format(nextAnchor.x)} ${format(thread.bottom)}`,
        );
      }

      rawSegments.push({
        host: thread.thread,
        kind: 'thread',
        yStart: thread.top,
        yEnd: thread.bottom,
        alignmentTolerance: isVertical ? 3 : 5,
      });
    });

    const pathData = commands.join(' ');
    guidePath.setAttribute('d', pathData);
    progressPath.setAttribute('d', pathData);

    totalLength = Math.max(1, progressPath.getTotalLength());
    const sampleCount = Math.min(3200, Math.max(900, Math.ceil(height / 1.25)));
    const samples: PathSample[] = [];
    let previousY = Number.NEGATIVE_INFINITY;

    for (let index = 0; index <= sampleCount; index += 1) {
      const length = (totalLength * index) / sampleCount;
      const point = progressPath.getPointAtLength(length);
      const y = Math.max(previousY, point.y);
      samples.push({ y, length });
      previousY = y;
    }

    pathSamples = samples;
    journeySegments = rawSegments.map((segment) => ({
      ...segment,
      pathStart: lengthForY(segment.yStart),
      pathEnd: lengthForY(segment.yEnd),
    }));
    stageStates = stageAnchors.map(({ stage, nodeY }) => ({
      stage,
      nodeLength: lengthForY(nodeY),
    }));

    stageStates.forEach(({ stage, nodeLength }) => {
      stage.dataset.pathNodeLength = format(nodeLength);
    });

    progressPath.setAttribute('stroke-dasharray', '1 1');
    progressPath.dataset.totalLength = format(totalLength);
    progressPath.dataset.mapping = 'viewport-y-locked-v7';
    journey.dataset.checkpointState = 'valid';
  };

  const render = () => {
    if (disposed) return;
    animationFrame = 0;

    const reducedMotion = motionPreference.matches;
    const playheadY = getViewportPlayhead();
    const journeyDocumentTop = journey.getBoundingClientRect().top + window.scrollY;
    const marker = window.scrollY + playheadY;
    const targetJourneyY = marker - journeyDocumentTop;
    const drawnLength = reducedMotion ? totalLength : lengthForY(targetJourneyY);
    const normalizedProgress = clamp01(drawnLength / totalLength);
    const headPoint = progressPath.getPointAtLength(drawnLength);
    const svgRect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const headViewportY = svgRect.top + headPoint.y * (svgRect.height / Math.max(1, viewBox.height));
    const headDeltaY = headViewportY - playheadY;
    const activeSegment = journeySegments.find((segment) => (
      targetJourneyY >= segment.yStart - 0.5 && targetJourneyY <= segment.yEnd + 0.5
    ));

    progressPath.setAttribute(
      'stroke-dashoffset',
      normalizedProgress === 1 ? '0' : (1 - normalizedProgress).toFixed(6),
    );
    progressPath.dataset.drawnLength = format(drawnLength);
    progressPath.dataset.playheadY = format(playheadY);
    progressPath.dataset.headX = format(headPoint.x);
    progressPath.dataset.headY = format(headPoint.y);
    progressPath.dataset.headViewportY = format(headViewportY);
    progressPath.dataset.headDeltaY = format(headDeltaY);
    progressPath.dataset.activeSegment = activeSegment?.kind ?? 'outside';
    progressPath.dataset.alignmentTolerance = activeSegment ? format(activeSegment.alignmentTolerance) : '';
    progressPath.dataset.alignmentState = reducedMotion
      ? 'reduced-motion'
      : activeSegment && Math.abs(headDeltaY) <= activeSegment.alignmentTolerance
        ? 'aligned'
        : activeSegment
          ? 'misaligned'
          : 'outside';

    journey.style.setProperty('--journey-progress', normalizedProgress.toFixed(5));
    journey.style.setProperty('--journey-playhead-y', `${format(playheadY)}px`);

    journeySegments.forEach((segment) => {
      const segmentProgress = clamp01(
        (drawnLength - segment.pathStart) / Math.max(1, segment.pathEnd - segment.pathStart),
      );
      const styleTarget = segment.kind === 'stage'
        ? segment.host.querySelector<HTMLElement>('.stage-rail') ?? segment.host
        : segment.host;

      styleTarget.style.setProperty('--path-progress', segmentProgress.toFixed(4));

      if (segment.kind === 'thread') {
        const copyProgress = reducedMotion ? 1 : smoothstep(0.12, 0.58, segmentProgress);
        segment.host.style.setProperty('--thread-copy-opacity', copyProgress.toFixed(4));
        segment.host.style.setProperty('--thread-copy-y', `${((1 - copyProgress) * 10).toFixed(2)}px`);
        segment.host.classList.toggle('is-visible', segmentProgress > 0.01);
      }
    });

    stageStates.forEach(({ stage, nodeLength }) => {
      const distancePastNode = drawnLength - nodeLength;
      const nodeProgress = reducedMotion ? 1 : smoothstep(0, 34, distancePastNode);
      const copyProgress = reducedMotion ? 1 : smoothstep(12, 132, distancePastNode);
      const visualProgress = reducedMotion ? 1 : smoothstep(56, 230, distancePastNode);
      const copyDirection = stage.classList.contains('stage-left') ? -1 : 1;

      stage.style.setProperty('--node-opacity', nodeProgress.toFixed(4));
      stage.style.setProperty('--node-scale', (0.72 + nodeProgress * 0.28).toFixed(4));
      stage.style.setProperty('--copy-opacity', copyProgress.toFixed(4));
      stage.style.setProperty('--copy-x', `${((1 - copyProgress) * copyDirection * 24).toFixed(2)}px`);
      stage.style.setProperty('--copy-y', `${((1 - copyProgress) * 8).toFixed(2)}px`);
      stage.style.setProperty('--visual-opacity', visualProgress.toFixed(4));
      stage.style.setProperty('--visual-x', `${((1 - visualProgress) * copyDirection * -30).toFixed(2)}px`);
      stage.style.setProperty('--visual-y', `${((1 - visualProgress) * 14).toFixed(2)}px`);
      stage.style.setProperty('--visual-scale', (0.985 + visualProgress * 0.015).toFixed(4));
      stage.classList.toggle('is-entered', nodeProgress > 0.04);
    });

    const activeStage = stageStates.reduce<HTMLElement | undefined>((active, state) => (
      drawnLength >= state.nodeLength ? state.stage : active
    ), undefined);

    stages.forEach((stage) => stage.classList.toggle('is-active', stage === activeStage));
  };

  const requestRender = () => {
    if (disposed || animationFrame) return;
    animationFrame = window.requestAnimationFrame(render);
  };

  const activateStaticFallback = (error: unknown) => {
    document.documentElement.dataset.methodPathReady = 'fallback';
    journey.dataset.checkpointState = 'fallback';
    journey.dataset.checkpointError = error instanceof Error ? error.name : 'UnknownError';
    svg.style.display = 'none';

    threads.forEach((thread) => {
      thread.style.setProperty('--path-progress', '1');
      thread.style.setProperty('--thread-copy-opacity', '1');
      thread.style.setProperty('--thread-copy-y', '0px');
      thread.classList.add('is-visible');
    });

    stages.forEach((stage) => {
      const rail = stage.querySelector<HTMLElement>('.stage-rail') ?? stage;
      rail.style.setProperty('--path-progress', '1');
      stage.style.setProperty('--node-opacity', '1');
      stage.style.setProperty('--node-scale', '1');
      stage.style.setProperty('--copy-opacity', '1');
      stage.style.setProperty('--copy-x', '0px');
      stage.style.setProperty('--copy-y', '0px');
      stage.style.setProperty('--visual-opacity', '1');
      stage.style.setProperty('--visual-x', '0px');
      stage.style.setProperty('--visual-y', '0px');
      stage.style.setProperty('--visual-scale', '1');
      stage.classList.add('is-entered');
    });
  };

  const measureAndRender = () => {
    if (disposed) return;
    geometryFrame = 0;
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;

    try {
      measure();
      render();
    } catch (error) {
      activateStaticFallback(error);
      methodWindow.__methodPathCleanup?.();
    }
  };

  const settleMeasurement = () => {
    resizeSettleTimer = 0;
    if (geometryFrame) window.cancelAnimationFrame(geometryFrame);
    geometryFrame = 0;
    measureAndRender();
  };

  function scheduleMeasurement() {
    if (disposed) return;
    if (geometryFrame) window.cancelAnimationFrame(geometryFrame);
    geometryFrame = window.requestAnimationFrame(measureAndRender);
    if (resizeSettleTimer) window.clearTimeout(resizeSettleTimer);
    resizeSettleTimer = window.setTimeout(settleMeasurement, 120);
  }

  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    if (geometryFrame) window.cancelAnimationFrame(geometryFrame);
    if (resizeSettleTimer) window.clearTimeout(resizeSettleTimer);
    window.removeEventListener('scroll', requestRender);
    window.removeEventListener('resize', scheduleMeasurement);
    window.removeEventListener('load', scheduleMeasurement);
    window.visualViewport?.removeEventListener('resize', scheduleMeasurement);
    window.visualViewport?.removeEventListener('scroll', requestRender);
    motionPreference.removeEventListener('change', requestRender);
    viewportBreakpoint.removeEventListener('change', scheduleMeasurement);
    resizeObserver?.disconnect();
    document.removeEventListener('astro:before-swap', cleanup);
    if (methodWindow.__methodPathCleanup === cleanup) delete methodWindow.__methodPathCleanup;
  };

  methodWindow.__methodPathCleanup = cleanup;

  try {
    measure();
    document.documentElement.dataset.methodPathReady = 'true';
    render();
  } catch (error) {
    activateStaticFallback(error);
    methodWindow.__methodPathCleanup?.();
    return;
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', scheduleMeasurement, { passive: true });
  window.addEventListener('load', scheduleMeasurement, { once: true });
  window.visualViewport?.addEventListener('resize', scheduleMeasurement, { passive: true });
  window.visualViewport?.addEventListener('scroll', requestRender, { passive: true });
  motionPreference.addEventListener('change', requestRender);
  viewportBreakpoint.addEventListener('change', scheduleMeasurement);

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(scheduleMeasurement);
    resizeObserver.observe(journey);
    stages.forEach((stage) => resizeObserver?.observe(stage));
    threads.forEach((thread) => resizeObserver?.observe(thread));
  }

  document.addEventListener('astro:before-swap', cleanup, { once: true });
  document.fonts?.ready.then(() => {
    if (!disposed) scheduleMeasurement();
  });
}
