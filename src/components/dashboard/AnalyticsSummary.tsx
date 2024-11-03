import { Grid, Paper, Typography } from '@mui/material';
import { Analytics } from '../../types/Analytics';

interface AnalyticsSummaryProps {
  analytics: Analytics;
}

export default function AnalyticsSummary({ analytics }: AnalyticsSummaryProps) {
  const summaryItems = [
    {
      title: 'Total Hours',
      value: `${analytics.totalHours.toFixed(1)}h`,
      color: 'primary.main',
    },
    {
      title: 'Active Staff',
      value: analytics.staffMembers.length,
      color: 'success.main',
    },
    {
      title: 'Active Projects',
      value: analytics.projects.length,
      color: 'info.main',
    },
    {
      title: 'Active Clients',
      value: analytics.clients.length,
      color: 'warning.main',
    },
  ];

  return (
    <Grid container spacing={3}>
      {summaryItems.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {item.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: item.color, fontWeight: 'bold' }}
            >
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}