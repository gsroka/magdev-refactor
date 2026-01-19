export interface TooltipPosition {
  top: number;
  left: number;
}

export function calculateTooltipPosition(
  rect: DOMRect,
  position: 'top' | 'bottom' | 'left' | 'right' | undefined,
  tooltipWidth: number,
  tooltipHeight: number,
  offset: number
): TooltipPosition {
  let top;
  let left;

  switch (position) {
    case 'bottom':
      top = rect.bottom + offset;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
    case 'top':
      top = rect.top - tooltipHeight - offset;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.left - tooltipWidth - offset;
      break;
    case 'right':
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.right + offset;
      break;
    default:
      top = rect.bottom + offset;
      left = rect.left;
  }

  const clampTop = Math.max(10, Math.min(top, window.innerHeight - tooltipHeight - 10));
  const clampLeft = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

  return { top: clampTop, left: clampLeft };
};
