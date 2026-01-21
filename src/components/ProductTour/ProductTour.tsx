import { useProductTourLogic } from '@/components/ProductTour/useProductTourLogic';
import { ProductTourView } from '@/components/ProductTour/ProductTourView';
import { useTourStep } from '@/hooks/useTourStep';
import type { TourStep } from '@/components/ProductTour/tourSteps';

interface ProductTourProps {
  steps: readonly TourStep[];
}

export default function ProductTour({ steps }: ProductTourProps) {
  const { currentStep, isActive, nextStep, prevStep, endTour } = useTourStep();

  const {
    isVisible,
    currentStepData,
    tooltipPosition,
    targetRect,
    isLastStep,
    tooltipRef,
    totalSteps,
    currentStepIndex,
  } = useProductTourLogic({ currentStep, isActive, steps });

  if (!isVisible || !currentStepData) {
    return null;
  }

  return (
    <ProductTourView
      tooltipPosition={tooltipPosition}
      targetRect={targetRect}
      currentStepData={currentStepData}
      isLastStep={isLastStep}
      tooltipRef={tooltipRef}
      onEnd={endTour}
      onNext={nextStep}
      onPrev={prevStep}
      totalSteps={totalSteps}
      currentStepIndex={currentStepIndex}
    />
  );
}
