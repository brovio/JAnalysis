import { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Tooltip,
  TablePagination
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { WorkEntry } from '../../types/WorkEntry';
import { formatDuration } from '../../utils/csvParser';

interface TaskListProps {
  entries: WorkEntry[];
  pageSize: number;
  infiniteScroll: boolean;
}

export default function TaskList({ entries, pageSize, infiniteScroll }: TaskListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const copyTaskDetails = (entry: WorkEntry) => {
    const details = `Project: ${entry.project}\nClient: ${entry.client}\nStaff: ${entry.fullName}\nDuration: ${entry.duration}\nNotes: ${entry.notes}`;
    navigator.clipboard.writeText(details);
  };

  const displayedEntries = entries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedEntries.map((entry, index) => (
              <TableRow key={`${entry.fullName}-${entry.date}-${index}`}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.fullName}</TableCell>
                <TableCell>{entry.client}</TableCell>
                <TableCell>{entry.project}</TableCell>
                <TableCell>{formatDuration(entry.duration).toFixed(1)}h</TableCell>
                <TableCell>{entry.notes}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy task details">
                    <IconButton onClick={() => copyTaskDetails(entry)} size="small">
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
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Paper>
  );
}