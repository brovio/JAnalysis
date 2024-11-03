import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
  DialogActions,
  Typography,
  Divider,
  Box
} from '@mui/material';
import { useSettingsStore } from '../store/settingsStore';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Settings</Typography>
      </DialogTitle>
      <DialogContent>
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
          <Divider />
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
          <Divider />
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

        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" color="error" gutterBottom>
            Danger Zone
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearData}
            fullWidth
          >
            Clear All Data
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}