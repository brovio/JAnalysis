import { createTheme } from '@mui/material/styles';

const brovioColors = {
  primary: {
    main: '#FF4B26',
    light: '#FF7352',
    dark: '#CC3C1E',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#1A1A1A',
    light: '#333333',
    dark: '#000000',
    contrastText: '#FFFFFF'
  }
};

const darkTheme = {
  background: {
    default: '#121212',
    paper: '#1E1E1E'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3'
  }
};

const lightTheme = {
  background: {
    default: '#F8F9FA',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#666666'
  }
};

export const getTheme = (mode: 'light' | 'dark') => {
  const colors = mode === 'dark' ? darkTheme : lightTheme;
  
  return createTheme({
    palette: {
      mode,
      primary: brovioColors.primary,
      secondary: brovioColors.secondary,
      background: colors.background,
      text: colors.text
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.01em'
      },
      h6: {
        fontWeight: 600
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 600
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: colors.background.paper
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.paper,
            backgroundImage: 'none'
          }
        }
      }
    }
  });
};