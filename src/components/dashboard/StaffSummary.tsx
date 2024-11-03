import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WorkEntry } from '../../types/WorkEntry';
import { formatDuration } from '../../utils/csvParser';

interface StaffSummaryProps {
  entries: WorkEntry[];
  selectedStaff: string;
}

export default function StaffSummary({ entries, selectedStaff }: StaffSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  const staffStats = entries.reduce((acc, entry) => {
    if (!acc[entry.fullName]) {
      acc[entry.fullName] = {
        totalHours: 0,
        clients: new Set<string>(),
        projects: new Set<string>(),
        entries: 0
      };
    }

    acc[entry.fullName].totalHours += formatDuration(entry.duration);
    acc[entry.fullName].clients.add(entry.client);
    acc[entry.fullName].projects.add(entry.project);
    acc[entry.fullName].entries += 1;

    return acc;
  }, {} as Record<string, {
    totalHours: number;
    clients: Set<string>;
    projects: Set<string>;
    entries: number;
  }>);

  const staffList = Object.entries(staffStats)
    .map(([name, stats]) => ({
      name,
      totalHours: stats.totalHours,
      clients: stats.clients.size,
      projects: stats.projects.size,
      entries: stats.entries,
      averageHoursPerEntry: stats.totalHours / stats.entries
    }))
    .sort((a, b) => b.totalHours - a.totalHours);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Staff Performance
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
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Staff Member</TableCell>
                  <TableCell align="right">Total Hours</TableCell>
                  <TableCell align="right">Clients</TableCell>
                  <TableCell align="right">Projects</TableCell>
                  <TableCell align="right">Entries</TableCell>
                  <TableCell align="right">Avg Hours/Entry</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffList
                  .filter(staff => selectedStaff === 'all' || staff.name === selectedStaff)
                  .map((staff) => (
                    <TableRow key={staff.name}>
                      <TableCell component="th" scope="row">
                        {staff.name}
                      </TableCell>
                      <TableCell align="right">{staff.totalHours.toFixed(1)}h</TableCell>
                      <TableCell align="right">{staff.clients}</TableCell>
                      <TableCell align="right">{staff.projects}</TableCell>
                      <TableCell align="right">{staff.entries}</TableCell>
                      <TableCell align="right">{staff.averageHoursPerEntry.toFixed(1)}h</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </CardContent>
    </Card>
  );
}