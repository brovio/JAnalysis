import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSettingsStore } from '../store/settingsStore';

export default function Header() {
  const { darkMode, toggleDarkMode, toggleSidebar } = useSettingsStore();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 'bold'
          }}
        >
          JAnalytics
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}