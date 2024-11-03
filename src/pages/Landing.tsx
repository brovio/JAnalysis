import { useState } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FileUploadZone from '../components/FileUploadZone';
import AuthModal from '../components/AuthModal';
import CSVRequirementsModal from '../components/CSVRequirementsModal';

export default function Landing() {
  const [authOpen, setAuthOpen] = useState(false);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    if (username === 'peeko' && password === 'peekopro' || 
        username === 'guest' && password === 'guest') {
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Welcome to JAnalytics
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          align="center" 
          sx={{ mb: 4 }}
        >
          Transform your CSV data into actionable insights
        </Typography>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            width: '100%',
            maxWidth: 1200,
            px: 2
          }}
        >
          <Paper 
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Login
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => setAuthOpen(true)}
              sx={{ width: '100%' }}
            >
              Sign In
            </Button>
          </Paper>

          <Paper 
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Quick Upload
            </Typography>
            <FileUploadZone />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setRequirementsOpen(true)}
              sx={{ mt: 1 }}
            >
              CSV Format Requirements
            </Button>
          </Paper>
        </Box>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onLogin={handleLogin}
        />

        <CSVRequirementsModal
          open={requirementsOpen}
          onClose={() => setRequirementsOpen(false)}
        />
      </Box>
    </Container>
  );
}