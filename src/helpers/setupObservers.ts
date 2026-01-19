type ThrottledUpdate = () => void;

const OBSERVER_THRESHOLD = [0, 0.5, 1];

export function setupTourObservers(
  targetElement: Element,
  throttledUpdate: ThrottledUpdate,
  rootContainer: HTMLElement | null
) {
  const resizeObserver = new ResizeObserver(throttledUpdate);
  resizeObserver.observe(targetElement);

  if (rootContainer) resizeObserver.observe(rootContainer);

  const intersectionObserver = new IntersectionObserver(throttledUpdate, {
    threshold: OBSERVER_THRESHOLD,
  });
  intersectionObserver.observe(targetElement);

  return { resizeObserver, intersectionObserver };
}
