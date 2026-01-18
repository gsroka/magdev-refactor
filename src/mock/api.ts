import { type User, initialUsers, delayedUser } from './users';

export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    resolve(initialUsers);
  });
};

export const fetchFeaturedUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delayedUser);
    }, 2000);
  });
};

export interface DashboardStats {
  activeUsers: number;
  totalRevenue: string;
  conversionRate: string;
  newSignups: number;
}

export const fetchDashboardStats = (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeUsers: 1284,
        totalRevenue: '$48,294',
        conversionRate: '3.24%',
        newSignups: 147,
      });
    }, 300);
  });
};


