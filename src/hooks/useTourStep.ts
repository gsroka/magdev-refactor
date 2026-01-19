import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { endTour, nextStep, prevStep, setCurrentStep, startTour } from '@/store/tourSlice';

export function useTourStep() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.tour.currentStep);
  const isActive = useAppSelector((state) => state.tour.isActive);

  const handleNext = useCallback(() => dispatch(nextStep()), [dispatch]);
  const handlePrev = useCallback(() => dispatch(prevStep()), [dispatch]);
  const handleEnd = useCallback(() => dispatch(endTour()), [dispatch]);
  const handleStart = useCallback(() => dispatch(startTour()), [dispatch]);
  const handleSetStep = useCallback((step: number) => dispatch(setCurrentStep(step)), [dispatch]);

  return useMemo(
    () => ({
      currentStep,
      isActive,
      nextStep: handleNext,
      prevStep: handlePrev,
      endTour: handleEnd,
      startTour: handleStart,
      setStep: handleSetStep,
    }),
    [currentStep, isActive, handleNext, handlePrev, handleEnd, handleStart, handleSetStep]
  );
}
