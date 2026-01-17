import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

export function useTourStep() {
  const step = useAppSelector((state) => state.tour.currentStep);
  const [localStep] = useState(step);

  return localStep;
}
