import { Box, Typography } from '@mui/material';
import DashboardSection from '../sections/DashboardSection';

interface DashboardViewProps {
  onStartTour: () => void;
  onEndTour: () => void;
}

export default function DashboardView({ onStartTour, onEndTour }: DashboardViewProps) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome Back!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your organization today.
      </Typography>

      <DashboardSection onStartTour={onStartTour} onEndTour={onEndTour} />
    </Box>
  );
}
