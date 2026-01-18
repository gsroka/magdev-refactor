import { useAppSelector } from '@/store/hooks';

export function useTourStep() {
  const currentStep = useAppSelector((state) => state.tour.currentStep);
  const isActive = useAppSelector((state) => state.tour.isActive);

  return { currentStep, isActive };
}
