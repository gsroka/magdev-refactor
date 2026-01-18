export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

export const initialUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    role: 'Editor',
    status: 'Active',
    joinDate: '2023-03-22',
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol.williams@company.com',
    role: 'Viewer',
    status: 'Inactive',
    joinDate: '2023-05-10',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'Editor',
    status: 'Active',
    joinDate: '2023-07-01',
  },
  {
    id: 5,
    name: 'Eva Martinez',
    email: 'eva.martinez@company.com',
    role: 'Viewer',
    status: 'Pending',
    joinDate: '2024-01-05',
  },
];

// This "special" user only appears after a delayed API call
export const delayedUser: User = {
  id: 99,
  name: 'Featured User (New!)',
  email: 'featured@company.com',
  role: 'VIP',
  status: 'Active',
  joinDate: '2024-12-01',
};
