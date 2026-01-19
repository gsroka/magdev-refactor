import { tourSteps, useProductTourLogic } from '@/components/ProductTour/useProductTourLogic';
import { ProductTourView } from '@/components/ProductTour/ProductTourView';
import { useTourStep } from '@/hooks/useTourStep';

export default function ProductTour() {
  const { currentStep, isActive, nextStep, prevStep, endTour } = useTourStep();

  const logic = useProductTourLogic({ currentStep, isActive });

  if (!logic.isVisible || !logic.currentStepData) {
    return null;
  }

  return (
    <ProductTourView
      tooltipPosition={logic.tooltipPosition}
      targetRect={logic.targetRect}
      currentStepData={logic.currentStepData}
      isLastStep={logic.isLastStep}
      tooltipRef={logic.tooltipRef}
      onEnd={endTour}
      onNext={nextStep}
      onPrev={prevStep}
      totalSteps={tourSteps.length}
      currentStepIndex={currentStep}
    />
  );
}
