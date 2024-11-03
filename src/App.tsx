import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from './store/settingsStore';
import { getTheme } from './theme';
import AppRoutes from './routes';

const queryClient = new QueryClient();

function App() {
  const darkMode = useSettingsStore((state) => state.darkMode);
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;