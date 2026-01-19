import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface TourStep {
  selector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const tourSteps: readonly TourStep[] = [
  {
    selector: '.tour-trigger-button',
    title: 'Welcome to OmniGuide!',
    content: 'Click here anytime to restart the product tour.',
    position: 'bottom',
  },
  {
    selector: '.stat-card-0',
    title: 'Your Key Metrics',
    content: 'This card shows your active users. Keep an eye on this KPI!',
    position: 'bottom',
  },
  {
    selector: '.add-user-button',
    title: 'Add New Users',
    content: 'Click here to add new users to your organization.',
    position: 'left',
  },
  {
    selector: '.user-table-container',
    title: 'User Management',
    content: 'View and manage all your users in this table.',
    position: 'top',
  },
  {
    selector: '.featured-user-row',
    title: 'Featured User!',
    content: 'This is a VIP user that was just added to the system.',
    position: 'top',
  },
  {
    selector: '.notifications-button',
    title: 'Notifications',
    content: "Check your notifications here. You're all caught up!",
    position: 'bottom',
  },
];

interface UseProductTourLogicProps {
  currentStep: number;
  isActive: boolean;
}

export interface ProductTourState {
  tooltipPosition: { top: number; left: number };
  targetRect: DOMRect | null;
  isVisible: boolean;
  currentStepData: TourStep | null;
  isLastStep: boolean;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 180;
const TOOLTIP_OFFSET = 12;
const OBSERVER_THROTTLE_MS = 100;
const OBSERVER_THRESHOLD = [0, 0.5, 1];
const OBSERVER_ELEMENT = 'root';

export function useProductTourLogic({
  currentStep,
  isActive,
}: UseProductTourLogicProps): ProductTourState & {
  tooltipRef: React.RefObject<HTMLDivElement>;
} {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef<number | null>(null);

  const currentStepData = useMemo(() => {
    if (!isActive || currentStep < 0 || currentStep >= tourSteps.length) {
      return null;
    }
    const step = tourSteps.at(currentStep) ?? null;
    return step;
  }, [currentStep, isActive]);

  const isLastStep = currentStep === tourSteps.length - 1;

  const throttledUpdate = useCallback(() => {
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    rAFRef.current = requestAnimationFrame(() => {
      if (!isActive || !currentStepData) {
        setIsVisible(false);
        return;
      }

      const targetElement = document.querySelector(currentStepData.selector);
      if (!targetElement) {
        setIsVisible(false);
        setTargetRect(null);
        return;
      }

      const rect = targetElement.getBoundingClientRect();

      setTargetRect((prev) => {
        if (
          prev &&
          prev.top === rect.top &&
          prev.left === rect.left &&
          prev.width === rect.width &&
          prev.height === rect.height
        ) {
          return prev;
        }
        return rect;
      });

      const tooltipWidth = TOOLTIP_WIDTH;
      const tooltipHeight = TOOLTIP_HEIGHT;
      const offset = TOOLTIP_OFFSET;

      let top;
      let left;

      switch (currentStepData.position) {
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

      top = Math.max(10, Math.min(top, window.innerHeight - tooltipHeight - 10));
      left = Math.max(10, Math.min(left, window.innerWidth - tooltipWidth - 10));

      setTooltipPosition({ top, left });
      setIsVisible(true);
    });
  }, [currentStepData, isActive]);

  useEffect(() => {
    if (!isActive || !currentStepData) {
      setIsVisible(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('resize', throttledUpdate, { signal });
    window.addEventListener('scroll', throttledUpdate, { signal, capture: true });

    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;

    const setupObservers = (el: Element) => {
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();

      resizeObserver = new ResizeObserver(throttledUpdate);
      resizeObserver.observe(el);

      const rootEl = document.getElementById(OBSERVER_ELEMENT);
      if (rootEl) resizeObserver.observe(rootEl);

      intersectionObserver = new IntersectionObserver(throttledUpdate, {
        threshold: OBSERVER_THRESHOLD,
      });
      intersectionObserver.observe(el);
    };

    const rootContainer = document.getElementById('root') ?? document.body;
    const mutationObserver = new MutationObserver(() => {
      if (!currentStepData) return;

      const targetElement = document.querySelector(currentStepData.selector);
      if (targetElement) {
        setupObservers(targetElement);
        throttledUpdate();
      } else if (isVisible) {
        setIsVisible(false);
      }
    });

    mutationObserver.observe(rootContainer, { childList: true, subtree: true });

    const initialTarget = document.querySelector(currentStepData.selector);
    if (initialTarget) {
      setupObservers(initialTarget);
    }

    throttledUpdate();

    const focusTimer = setTimeout(() => {
      tooltipRef.current?.focus();
    }, OBSERVER_THROTTLE_MS);

    return () => {
      controller.abort();
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      clearTimeout(focusTimer);
    };
  }, [currentStepData, isActive, throttledUpdate, isVisible]);

  return {
    tooltipPosition,
    targetRect,
    isVisible,
    currentStepData,
    isLastStep,
    tooltipRef,
  };
}
