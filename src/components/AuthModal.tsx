import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from '@mui/material';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export default function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const handleGuestLogin = () => {
    onLogin('guest', 'guest');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Paper sx={{ p: 4 }}>
          <Typography id="auth-modal-title" variant="h6" component="h2" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </form>
          
          <Divider sx={{ my: 3 }}>or</Divider>
          
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}