import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface MonthSummaryProps {
  month: string;
  totalHours: number;
  entries: Array<{
    date: string;
    hours: number;
    description: string;
  }>;
}

export default function MonthSummary({ month, totalHours, entries }: MonthSummaryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{month}</Typography>
            <Typography variant="subtitle1">
              Total Hours: {totalHours.toFixed(1)}
            </Typography>
          </Box>
        }
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <List>
            {entries.map((entry, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {entry.date} - {entry.hours.toFixed(1)}h
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {entry.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}