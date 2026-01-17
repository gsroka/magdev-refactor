import { useAppDispatch } from './store/hooks';
import { startTour, endTour } from './store/tourSlice';
import AppShell from './layout/AppShell';
import DashboardPage from './pages/DashboardPage';

function App() {
  const dispatch = useAppDispatch();

  const handleStartTour = () => {
    dispatch(startTour());
  };

  const handleEndTour = () => {
    dispatch(endTour());
  };

  return (
    <AppShell
      onStartTour={handleStartTour}
      onEndTour={handleEndTour}
    >
      <DashboardPage
        onStartTour={handleStartTour}
        onEndTour={handleEndTour}
      />
    </AppShell>
  );
}

export default App;


