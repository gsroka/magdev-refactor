import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import StatCards from '../components/StatCards';
import UserSection from './UserSection';
import { type DashboardStats, fetchDashboardStats } from '../mock/api';

interface DashboardSectionProps {
  onStartTour: () => void;
  onEndTour: () => void;
}

export default function DashboardSection({ onStartTour, onEndTour }: DashboardSectionProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const tourState = useAppSelector((state) => ({
    currentStep: state.tour.currentStep,
    isActive: state.tour.isActive,
  }));

  useEffect(() => {
    fetchDashboardStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      });
  }, [tourState.isActive]);

  return (
    <Box>
      <StatCards
        stats={stats}
        loading={loading}
        currentTourStep={tourState.currentStep}
        setCurrentTourStep={() => {}}
        isTourActive={tourState.isActive}
      />

      <UserSection onStartTour={onStartTour} onEndTour={onEndTour} />
    </Box>
  );
}
