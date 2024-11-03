import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Collapse, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WorkEntry } from '../../types/WorkEntry';
import { formatDuration } from '../../utils/csvParser';

interface MonthSummaryProps {
  entries: WorkEntry[];
}

export default function MonthSummary({ entries }: MonthSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  const monthStats = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        totalHours: 0,
        uniqueStaff: new Set(),
        uniqueClients: new Set(),
        uniqueProjects: new Set(),
        entries: 0
      };
    }

    acc[monthKey].totalHours += formatDuration(entry.duration);
    acc[monthKey].uniqueStaff.add(entry.fullName);
    acc[monthKey].uniqueClients.add(entry.client);
    acc[monthKey].uniqueProjects.add(entry.project);
    acc[monthKey].entries += 1;

    return acc;
  }, {} as Record<string, {
    totalHours: number;
    uniqueStaff: Set<string>;
    uniqueClients: Set<string>;
    uniqueProjects: Set<string>;
    entries: number;
  }>);

  const monthList = Object.entries(monthStats)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, stats]) => ({
      month,
      ...stats,
      uniqueStaff: stats.uniqueStaff.size,
      uniqueClients: stats.uniqueClients.size,
      uniqueProjects: stats.uniqueProjects.size
    }));

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            Monthly Overview
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <List>
            {monthList.map((monthData, index) => (
              <div key={monthData.month}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {new Date(monthData.month + '-01').toLocaleString('default', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Total Hours: {monthData.totalHours.toFixed(1)}h
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Staff Members: {monthData.uniqueStaff}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Clients: {monthData.uniqueClients}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Projects: {monthData.uniqueProjects}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Entries: {monthData.entries}
                      </Typography>
                    </Stack>
                  </Box>
                </ListItem>
                {index < monthList.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Collapse>
      </CardContent>
    </Card>
  );
}