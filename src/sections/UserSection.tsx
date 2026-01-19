import { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import { type User, initialUsers } from '@/mock/users';
import { fetchFeaturedUser } from '@/mock/api';
import { useTourStep } from '@/hooks/useTourStep';
import { Box } from '@mui/material';

export default function UserSection() {
  const tour = useTourStep();

  const [users] = useState<User[]>(initialUsers);
  const [featuredUser, setFeaturedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

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
        currentTourStep={tour.currentStep}
        setCurrentTourStep={tour.setStep}
        isTourActive={tour.isActive}
        users={users}
        featuredUser={featuredUser}
        loading={loading}
      />
    </Box>
  );
}
