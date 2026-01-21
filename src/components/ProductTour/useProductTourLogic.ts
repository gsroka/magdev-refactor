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
const FOCUS_DELAY_MS = 100;
const ROOT_ELEMENT_ID = 'root';

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
  const observersRef = useRef<ReturnType<typeof setupTourObservers> | null>(null);

  const totalSteps = steps.length;
  const isValidStep = isActive && currentStep >= 0 && currentStep < totalSteps;
  const currentStepData = isValidStep ? (steps[currentStep] ?? null) : null;
  const isLastStep = currentStep === totalSteps - 1;

  const cleanupObservers = useCallback(() => {
    if (observersRef.current) {
      observersRef.current.resizeObserver.disconnect();
      observersRef.current.intersectionObserver.disconnect();
      observersRef.current = null;
    }
  }, []);

  const updatePosition = useCallback(() => {
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
        tooltipRef.current?.offsetWidth ?? TOOLTIP_WIDTH,
        tooltipRef.current?.offsetHeight ?? TOOLTIP_HEIGHT,
        TOOLTIP_OFFSET
      );

      setTooltipPosition((prev) =>
        prev.top === position.top && prev.left === position.left ? prev : position
      );
      setIsVisible(true);
    });
  }, [currentStepData, isActive]);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      updatePosition();
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    if (!isActive || !currentStepData) {
      setIsVisible(false);
      cleanupObservers();
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener('resize', updatePosition, { signal });
    window.addEventListener('scroll', updatePosition, { signal, capture: true });

    const rootContainer = document.getElementById(ROOT_ELEMENT_ID) ?? document.body;
    const targetElement = document.querySelector(currentStepData.selector);

    if (targetElement) {
      cleanupObservers();
      observersRef.current = setupTourObservers(targetElement, updatePosition, rootContainer);
    }

    const mutationObserver = new MutationObserver(() => {
      const el = document.querySelector(currentStepData.selector);
      if (el && !observersRef.current) {
        observersRef.current = setupTourObservers(el, updatePosition, rootContainer);
        updatePosition();
      } else if (!el && observersRef.current) {
        cleanupObservers();
        setIsVisible(false);
      }
    });

    mutationObserver.observe(rootContainer, { childList: true, subtree: true });

    updatePosition();

    const focusTimer = setTimeout(() => {
      tooltipRef.current?.focus();
    }, FOCUS_DELAY_MS);

    return () => {
      controller.abort();
      mutationObserver.disconnect();
      cleanupObservers();
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }
      clearTimeout(focusTimer);
    };
  }, [currentStepData, isActive, updatePosition, cleanupObservers]);

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
