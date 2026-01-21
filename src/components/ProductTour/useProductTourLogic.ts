import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateTooltipPosition } from '@/helpers/positionTooltip';
import { setupTourObservers } from '@/helpers/setupObservers';
import type { TourStep } from './tourSteps';

interface UseProductTourLogicProps {
  currentStep: number;
  isActive: boolean;
  steps: readonly TourStep[];
}

export interface ProductTourState {
  tooltipPosition: { top: number; left: number };
  targetRect: DOMRect | null;
  isVisible: boolean;
  currentStepData: TourStep | null;
  isLastStep: boolean;
  tooltipRef: React.RefObject<HTMLDivElement>;
  totalSteps: number;
  currentStepIndex: number;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 180;
const TOOLTIP_OFFSET = 12;
const OBSERVER_THROTTLE_MS = 100;
const OBSERVER_ELEMENT = 'root';

export function useProductTourLogic({
  currentStep,
  isActive,
  steps,
}: UseProductTourLogicProps): ProductTourState {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef<number | null>(null);

  const totalSteps = steps.length;
  const isValidStep = isActive && currentStep >= 0 && currentStep < totalSteps;
  const currentStepData = isValidStep ? (steps[currentStep] ?? null) : null;
  const isLastStep = currentStep === totalSteps - 1;

  const throttledUpdate = useCallback(() => {
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current);
    }

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

      setTooltipPosition((prev) =>
        prev.top === position.top && prev.left === position.left ? prev : position
      );
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
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }
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
    totalSteps,
    currentStepIndex: currentStep,
  };
}
