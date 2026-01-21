import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppSettings } from '@/context';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Users', icon: <PeopleIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export const DrawerContent = () => {
  const appSettings = useAppSettings();

  return (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <Box sx={{ px: 2, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          OmniGuide
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          Dashboard v1.0 ({appSettings.settings.language})
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
