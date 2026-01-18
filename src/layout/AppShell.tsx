import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppSettings } from '../context/AppSettingsContext';

const DRAWER_WIDTH = 240;

interface AppShellProps {
  children: React.ReactNode;
  onStartTour: () => void;
  onEndTour: () => void;
}

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Users', icon: <PeopleIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

export default function AppShell({ children, onStartTour }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const appSettings = useAppSettings();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto', mt: 2 }}>
      <Box sx={{ px: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '-0.5px' }}>
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: '#fff',
          color: '#1e293b',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {/* Tour trigger button - target for ProductTour */}
          <Button
            variant="outlined"
            startIcon={<HelpOutlineIcon />}
            onClick={onStartTour}
            sx={{ mr: 2 }}
            className="tour-trigger-button"
          >
            Start Tour
          </Button>

          <IconButton color="inherit" className="notifications-button">
            <NotificationsIcon />
          </IconButton>

          <Avatar sx={{ ml: 2, width: 32, height: 32, bgcolor: '#1976d2' }} className="user-avatar">
            U
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          mt: '64px',
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
