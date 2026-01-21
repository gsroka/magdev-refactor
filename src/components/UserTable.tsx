import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { User } from '@/mock/users';
import { useMemo } from 'react';
import SkeletonWrapper from '@/shared/SkeletonWrapper';
import { Skeleton } from '@mui/material';

const UserTableSkeleton = () => (
  <Box sx={{ minHeight: 450 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
      <Skeleton variant="text" width={200} height={32} />
      <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['Name', 'Email', 'Role', 'Status', 'Date', 'Actions'].map((head) => (
              <TableCell key={head}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <TableRow key={row}>
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <TableCell key={col}>
                  <Skeleton variant="text" height={24} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

interface UserTableProps {
  users: User[];
  featuredUser: User | null;
  loading: boolean;
}

const getStatusColor = (status: User['status']) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'error';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

export default function UserTable({ users, featuredUser, loading }: UserTableProps) {
  const allUsers = useMemo(
    () => (featuredUser ? [...users, featuredUser] : users),
    [users, featuredUser]
  );

  return (
    <SkeletonWrapper loading={loading} fallback={<UserTableSkeleton />} minHeight={450}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            className="add-user-button"
            onClick={() => {
              console.log('Add user clicked');
            }}
          >
            Add User
          </Button>
        </Box>
        <TableContainer component={Paper} className="user-table-container">
          <Table className="user-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className={`user-row ${user.id === 99 ? 'featured-user-row' : ''}`}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    ...(user.id === 99 && {
                      backgroundColor: 'custom.featuredBackground',
                      '& td': { fontWeight: 500 },
                    }),
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                    {user.id === 99 && (
                      <Chip label="NEW" size="small" color="primary" sx={{ ml: 1, height: 20 }} />
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip label={user.status} color={getStatusColor(user.status)} size="small" />
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      className="edit-user-button"
                      onClick={() => {
                        console.log('Edit user:', user.id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SkeletonWrapper>
  );
}
