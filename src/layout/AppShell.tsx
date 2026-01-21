import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAppDispatch } from '@/store/hooks';
import { startTour } from '@/store/tourSlice';
import { DrawerContent } from './DrawerContent';

const DRAWER_WIDTH = 240;

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const dispatch = useAppDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.custom.drawerBackground,
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
            onClick={() => dispatch(startTour())}
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
        <DrawerContent />
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
        <DrawerContent />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          mt: '64px',
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100dvh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
