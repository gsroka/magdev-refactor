import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import UserTable from '../components/UserTable';
import ProductTour from '../components/ProductTour/ProductTour';
import { type User, initialUsers } from '../mock/users';
import { fetchFeaturedUser } from '../mock/api';

interface UserSectionProps {
  onStartTour: () => void;
  onEndTour: () => void;
}

export default function UserSection({
  onEndTour,
}: UserSectionProps) {
  const [users] = useState<User[]>(initialUsers);
  const [featuredUser, setFeaturedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const tourState = useAppSelector((state) => ({
    currentStep: state.tour.currentStep,
    isActive: state.tour.isActive,
  }));

  useEffect(() => {
    setLoading(true);
    fetchFeaturedUser()
      .then((user) => {
        setFeaturedUser(user);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch featured user:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <UserTable
        users={users}
        featuredUser={featuredUser}
        loading={loading}
        currentTourStep={tourState.currentStep}
        setCurrentTourStep={() => {}}
        isTourActive={tourState.isActive}
      />

      <ProductTour
        onEndTour={onEndTour}
      />
    </Box>
  );
}


