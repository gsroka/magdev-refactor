import { tourSteps, useProductTourLogic } from '@/components/ProductTour/useProductTourLogic';
import { ProductTourView } from '@/components/ProductTour/ProductTourView';

interface ProductTourProps {
  currentStep: number;
  isActive: boolean;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
}

export default function ProductTour({
  currentStep,
  isActive,
  nextStep,
  prevStep,
  endTour,
}: ProductTourProps) {
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
