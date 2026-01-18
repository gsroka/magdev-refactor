import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { DashboardStats } from '../mock/api';
import { useTourStep } from '../hooks/useTourStep';

interface StatCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
  currentTourStep: number;
  setCurrentTourStep: (step: number) => void;
  isTourActive: boolean;
}

interface StatCardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

export default function StatCards({ stats, loading }: StatCardsProps) {
  const localTourStep = useTourStep();
  // localTourStep is used but always returns stale value due to hook bug
  // This demonstrates the custom hook state sync issue - value never updates from Redux

  const cards: StatCardData[] = stats
    ? [
        {
          title: 'Active Users',
          value: stats.activeUsers.toLocaleString(),
          icon: <PeopleIcon />,
          color: '#1976d2',
          trend: '+12%',
        },
        {
          title: 'Total Revenue',
          value: stats.totalRevenue,
          icon: <AttachMoneyIcon />,
          color: '#2e7d32',
          trend: '+8%',
        },
        {
          title: 'Conversion Rate',
          value: stats.conversionRate,
          icon: <TrendingUpIcon />,
          color: '#ed6c02',
          trend: '+2.1%',
        },
        {
          title: 'New Signups',
          value: stats.newSignups,
          icon: <PersonAddIcon />,
          color: '#9c27b0',
          trend: '+24%',
        },
      ]
    : [];

  if (loading) {
    return (
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
      >
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" height={40} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
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
      data-tour-step={localTourStep}
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
                  <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 500 }}>
                    {card.trend} vs last month
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: `${card.color}15`,
                  color: card.color,
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
  );
}
