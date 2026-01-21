type UpdatePosition = () => void;

const OBSERVER_THRESHOLD = [0, 0.5, 1];

export function setupTourObservers(
  targetElement: Element,
  updatePosition: UpdatePosition,
  rootContainer: HTMLElement | null
) {
  const resizeObserver = new ResizeObserver(updatePosition);
  resizeObserver.observe(targetElement);

  if (rootContainer) resizeObserver.observe(rootContainer);

  const intersectionObserver = new IntersectionObserver(updatePosition, {
    threshold: OBSERVER_THRESHOLD,
  });
  intersectionObserver.observe(targetElement);

  return { resizeObserver, intersectionObserver };
}
