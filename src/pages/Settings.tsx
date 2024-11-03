import { Box, Card, CardContent, Typography, Switch, Button } from '@mui/material';
import { useSettingsStore } from '../store/settingsStore';

export default function Settings() {
  const {
    darkMode,
    sidebarCollapsed,
    signupEnabled,
    uploadEnabled,
    toggleDarkMode,
    toggleSidebar,
    toggleSignup,
    toggleUpload,
    clearData
  } = useSettingsStore();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Dark Mode</Typography>
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Collapse Sidebar</Typography>
              <Switch checked={sidebarCollapsed} onChange={toggleSidebar} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Enable Signup</Typography>
              <Switch checked={signupEnabled} onChange={toggleSignup} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Enable File Upload</Typography>
              <Switch checked={uploadEnabled} onChange={toggleUpload} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="error" 
                onClick={clearData}
                fullWidth
              >
                Clear All Data
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}