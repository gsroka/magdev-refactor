import { ReactNode } from 'react';

interface TourState {
  currentTourStep: number;
  setCurrentTourStep: (step: number) => void;
  isTourActive: boolean;
  onStartTour: () => void;
  onEndTour: () => void;
}

interface TourPropsWrapperProps {
  tourState: TourState;
  children: (tourState: TourState) => ReactNode;
}

export default function TourPropsWrapper({
  tourState,
  children,
}: TourPropsWrapperProps) {
  const transformedState = {
    currentTourStep: tourState.currentTourStep,
    setCurrentTourStep: tourState.setCurrentTourStep,
    isTourActive: tourState.isTourActive,
    onStartTour: tourState.onStartTour,
    onEndTour: tourState.onEndTour,
  };

  return <>{children(transformedState)}</>;
}
