import { lazy, Suspense, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import StatCards from '../components/StatCards';
import UserSection from './UserSection';
import { type DashboardStats, fetchDashboardStats } from '@/mock/api';
import { useAppSelector } from '@/store/hooks';

const ProductTour = lazy(() => import('@/components/ProductTour/ProductTour'));

export default function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const currentStep = useAppSelector((state) => state.tour.currentStep);
  const isActive = useAppSelector((state) => state.tour.isActive);

  // const handleSetStep = useCallback(
  //   (step: number) => {
  //     dispatch(setCurrentStep(step));
  //   },
  //   [dispatch]
  // );

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
  }, []);

  return (
    <Box>
      <StatCards
        stats={stats}
        loading={loading}
        currentTourStep={currentStep}
        // onTourStepChange={handleSetStep}
        // isTourActive={isActive}
      />
      <UserSection />
      {/* @INFO: There is only one page available, so I'll leave it here for now. */}
      {isActive && (
        <Suspense fallback={null}>
          <ProductTour />
        </Suspense>
      )}
    </Box>
  );
}
