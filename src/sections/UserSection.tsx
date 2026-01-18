import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import UserTable from '../components/UserTable';
import ProductTour from '../components/ProductTour/ProductTour';
import { type User, initialUsers } from '@/mock/users';
import { fetchFeaturedUser } from '@/mock/api';
import { useTourStep } from '@/hooks/useTourStep';

export default function UserSection() {
  const [users] = useState<User[]>(initialUsers);
  const [featuredUser, setFeaturedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentStep, isActive } = useTourStep();

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
      {/*TODO: Verify UserTable component*/}
      <UserTable
        users={users}
        featuredUser={featuredUser}
        loading={loading}
        currentTourStep={currentStep}
        setCurrentTourStep={() => {}}
        isTourActive={isActive}
      />
      <ProductTour />
    </Box>
  );
}
