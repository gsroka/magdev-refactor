import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatCards from '../components/StatCards';
import UserSection from './UserSection';
import { type DashboardStats, fetchDashboardStats } from '@/mock/api';
import { useTourStep } from '@/hooks/useTourStep';
import ProductTour from '@/components/ProductTour/ProductTour';

export default function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const tour = useTourStep();

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
  }, [tour.isActive]);

  return (
    <Box>
      <StatCards
        stats={stats}
        loading={loading}
        currentTourStep={tour.currentStep}
        setCurrentTourStep={tour.setStep}
        isTourActive={tour.isActive}
      />
      <UserSection />
      {/* @INFO: There is only one page available, so I'll leave it here for now. */}
      <ProductTour {...tour} />
    </Box>
  );
}
