import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatCards from '../components/StatCards';
import UserSection from './UserSection';
import { type DashboardStats, fetchDashboardStats } from '@/mock/api';
import { useTourStep } from '@/hooks/useTourStep';

export default function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const { currentStep, isActive } = useTourStep();

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
  }, [isActive]);

  return (
    <Box>
      <StatCards
        stats={stats}
        loading={loading}
        currentTourStep={currentStep}
        setCurrentTourStep={() => {}}
        isTourActive={isActive}
      />

      <UserSection />
    </Box>
  );
}
