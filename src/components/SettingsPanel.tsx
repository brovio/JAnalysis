import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSettingsStore } from '../store/settingsStore';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const theme = useTheme();
  const {
    darkMode,
    signupEnabled,
    uploadEnabled,
    toggleDarkMode,
    toggleSignup,
    toggleUpload,
    clearData
  } = useSettingsStore();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearData();
      onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          p: 3,
          bgcolor: theme.palette.background.paper
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Settings
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        <ListItem>
          <ListItemText 
            primary="Dark Mode" 
            secondary="Toggle dark/light theme"
          />
          <Switch
            edge="end"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Enable Signup" 
            secondary="Allow new user registration"
          />
          <Switch
            edge="end"
            checked={signupEnabled}
            onChange={toggleSignup}
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Enable File Upload" 
            secondary="Allow CSV file uploads"
          />
          <Switch
            edge="end"
            checked={uploadEnabled}
            onChange={toggleUpload}
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="subtitle2" color="error" gutterBottom>
          Danger Zone
        </Typography>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleClearData}
          sx={{ mt: 1 }}
        >
          Clear All Data
        </Button>
      </Box>
    </Drawer>
  );
}