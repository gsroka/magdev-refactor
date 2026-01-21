import { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import { type User, initialUsers } from '@/mock/users';
import { fetchFeaturedUser } from '@/mock/api';
import { Box } from '@mui/material';

export default function UserSection() {
  const [users] = useState<User[]>(initialUsers);
  const [featuredUser, setFeaturedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      <UserTable users={users} featuredUser={featuredUser} loading={loading} />
    </Box>
  );
}
