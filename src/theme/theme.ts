import {
  type Components,
  createTheme,
  type PaletteOptions,
  type Theme,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      drawerBackground: string;
      drawerText: string;
      drawerMuted: string;
      featuredBackground: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      drawerBackground: string;
      drawerText: string;
      drawerMuted: string;
      featuredBackground: string;
    };
  }
}

const customPalette: PaletteOptions = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#fff',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#fff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  custom: {
    drawerBackground: '#1e293b',
    drawerText: '#e2e8f0',
    drawerMuted: '#94a3b8',
    featuredBackground: '#fffde7',
  },
};

const componentOverrides: Components<Omit<Theme, 'components'>> = {
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.custom.drawerBackground,
        color: theme.palette.custom.drawerText,
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 600,
        backgroundColor: '#f8fafc',
      },
    },
  },
};

const theme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: componentOverrides,
});

export default theme;
