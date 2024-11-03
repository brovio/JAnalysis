import { Paper, Typography, Box } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}