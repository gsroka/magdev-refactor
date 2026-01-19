import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateTooltipPosition } from '@/helpers/positionTooltip';
import { setupTourObservers } from '@/helpers/setupObservers';

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
    return tourSteps.at(currentStep) ?? null;
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

      const position = calculateTooltipPosition(
        rect,
        currentStepData.position,
        TOOLTIP_WIDTH,
        TOOLTIP_HEIGHT,
        TOOLTIP_OFFSET
      );

      setTooltipPosition(position);
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

    const rootContainer = document.getElementById(OBSERVER_ELEMENT) ?? document.body;
    const targetElement = document.querySelector(currentStepData.selector);

    let observers: ReturnType<typeof setupTourObservers> | null = null;
    if (targetElement) {
      observers = setupTourObservers(targetElement, throttledUpdate, rootContainer);
    }
    const mutationObserver = new MutationObserver(() => {
      const el = document.querySelector(currentStepData.selector);
      if (el && !observers) {
        observers = setupTourObservers(el, throttledUpdate, rootContainer);
        throttledUpdate();
      } else if (!el && isVisible) {
        setIsVisible(false);
      }
    });

    mutationObserver.observe(rootContainer, { childList: true, subtree: true });

    throttledUpdate();

    const focusTimer = setTimeout(() => {
      tooltipRef.current?.focus();
    }, OBSERVER_THROTTLE_MS);

    return () => {
      controller.abort();
      mutationObserver.disconnect();
      observers?.resizeObserver.disconnect();
      observers?.intersectionObserver.disconnect();
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
