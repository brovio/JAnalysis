import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { WorkEntry } from '../../types/WorkEntry';
import { formatDuration } from '../../utils/csvParser';

interface ProjectTableProps {
  entries: WorkEntry[];
}

export default function ProjectTable({ entries }: ProjectTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleCopyTasks = (projectEntries: WorkEntry[]) => {
    const tasksText = projectEntries
      .map(entry => `${entry.project}: ${entry.notes}`)
      .join('\n');
    navigator.clipboard.writeText(tasksText);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Staff</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.fullName}</TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>{entry.notes}</TableCell>
                  <TableCell>
                    <Tooltip title="Copy Tasks">
                      <IconButton
                        onClick={() => handleCopyTasks([entry])}
                        size="small"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={entries.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}