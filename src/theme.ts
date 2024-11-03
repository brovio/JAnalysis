import { createTheme, alpha } from '@mui/material/styles';

// Brovio brand colors
const brovioColors = {
  primary: '#FF4B2B', // Brovio orange/red
  secondary: '#1A1A1A', // Dark gray/black
  background: {
    default: '#121212',
    paper: '#1E1E1E'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0'
  }
};

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: brovioColors.primary,
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: brovioColors.secondary,
      contrastText: '#FFFFFF'
    },
    background: mode === 'dark' ? brovioColors.background : {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: mode === 'dark' ? brovioColors.text : {
      primary: '#1A1A1A',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? brovioColors.background.paper : '#FFFFFF',
          boxShadow: 'none',
          borderBottom: `1px solid ${mode === 'dark' ? alpha('#FFFFFF', 0.1) : alpha('#000000', 0.1)}`
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? brovioColors.background.paper : '#FFFFFF',
          borderRight: `1px solid ${mode === 'dark' ? alpha('#FFFFFF', 0.1) : alpha('#000000', 0.1)}`
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'dark' ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: mode === 'dark' ? `1px solid ${alpha('#FFFFFF', 0.1)}` : 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600
        }
      }
    }
  }
});

export { getTheme };