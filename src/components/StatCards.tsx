import { Card, CardContent, Typography, Box, alpha, Skeleton } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { DashboardStats } from '@/mock/api';
import { useMemo } from 'react';
import SkeletonWrapper from '@/shared/SkeletonWrapper';

const StatCardsSkeleton = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      },
      gap: 3,
      mb: 4,
      minHeight: 140,
    }}
  >
    {[1, 2, 3, 4].map((i) => (
      <Card key={i}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
              <Skeleton
                variant="rectangular"
                width="40%"
                height={32}
                sx={{ mb: 1, borderRadius: 1 }}
              />
              <Skeleton variant="text" width="50%" height={20} />
            </Box>
            <Skeleton
              variant="rectangular"
              width={40}
              height={40}
              sx={{ borderRadius: 2, ml: 2 }}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
);

interface StatCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
  currentTourStep?: number;
  // TODO:
  // isTourActive?: boolean;
  // onTourStepChange?: (step: number) => void;
}

interface StatCardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'secondary';
  trend?: string;
}

export default function StatCards({
  stats,
  loading,
  // TODO: For tests purposes only?
  currentTourStep,
}: StatCardsProps) {
  // localTourStep is used but always returns stale value due to hook bug
  // This demonstrates the custom hook state sync issue - value never updates from Redux

  const cards: StatCardData[] = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: 'Active Users',
        value: stats.activeUsers.toLocaleString(),
        icon: <PeopleIcon />,
        color: 'primary',
        trend: '+12%',
      },
      {
        title: 'Total Revenue',
        value: stats.totalRevenue,
        icon: <AttachMoneyIcon />,
        color: 'success',
        trend: '+8%',
      },
      {
        title: 'Conversion Rate',
        value: stats.conversionRate,
        icon: <TrendingUpIcon />,
        color: 'warning',
        trend: '+2.1%',
      },
      {
        title: 'New Signups',
        value: stats.newSignups,
        icon: <PersonAddIcon />,
        color: 'secondary',
        trend: '+24%',
      },
    ];
  }, [stats]);

  return (
    <SkeletonWrapper loading={loading} fallback={<StatCardsSkeleton />} minHeight={140}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
        className="stat-cards-container"
        // TODO:
        data-tour-step={currentTourStep}
      >
        {cards.map((card, index) => (
          <Card
            key={card.title}
            className={`stat-card stat-card-${index}`}
            onClick={() => {
              console.log('Card clicked:', card.title);
            }}
            sx={{
              position: 'relative',
              overflow: 'visible',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                  {card.trend && (
                    <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                      {card.trend} vs last month
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: (theme) => alpha(theme.palette[card.color].main, 0.08),
                    color: `${card.color}.main`,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </SkeletonWrapper>
  );
}
