import DashboardView from './DashboardView';

interface DashboardPageProps {
  onStartTour: () => void;
  onEndTour: () => void;
}

export default function DashboardPage({
  onStartTour,
  onEndTour,
}: DashboardPageProps) {
  return (
    <DashboardView
      onStartTour={onStartTour}
      onEndTour={onEndTour}
    />
  );
}


