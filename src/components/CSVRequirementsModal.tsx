import {
  Modal,
  Box,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CSVRequirementsModalProps {
  open: boolean;
  onClose: () => void;
}

const requirements = [
  'Date',
  'Full Name',
  'EntryType',
  'Time',
  'Duration',
  'Break',
  'Break Type',
  'Client',
  'Project Code',
  'Project',
  'Notes',
  'Created On',
  'Last Edited By',
  'Last Edited On',
];

export default function CSVRequirementsModal({ open, onClose }: CSVRequirementsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="csv-requirements-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: 600,
        }}
      >
        <Paper sx={{ p: 4, position: 'relative' }}>
          <IconButton
            sx={{ position: 'absolute', right: 8, top: 8 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography id="csv-requirements-title" variant="h6" component="h2" gutterBottom>
            CSV Format Requirements
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            Your CSV file should contain the following columns:
          </Typography>
          
          <List dense>
            {requirements.map((req) => (
              <ListItem key={req}>
                <Typography variant="body2">{req}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
}