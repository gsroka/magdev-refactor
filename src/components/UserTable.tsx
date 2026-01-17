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
  Skeleton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '../mock/users';

interface UserTableProps {
  users: User[];
  featuredUser: User | null;
  loading: boolean;
  currentTourStep: number;
  setCurrentTourStep: (step: number) => void;
  isTourActive: boolean;
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

export default function UserTable({
  users,
  featuredUser,
  loading,
}: UserTableProps) {
  // Combine users with featured user (if loaded)
  const allUsers = featuredUser ? [...users, featuredUser] : users;

  if (loading && users.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Skeleton variant="rectangular" height={300} />
      </Paper>
    );
  }

  return (
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
                    backgroundColor: '#fffde7',
                    '& td': { fontWeight: 500 },
                  }),
                }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                  {user.id === 99 && (
                    <Chip
                      label="NEW"
                      size="small"
                      color="primary"
                      sx={{ ml: 1, height: 20 }}
                    />
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
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
  );
}


