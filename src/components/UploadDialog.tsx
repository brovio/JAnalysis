import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useStore } from '../store/useStore';
import { parseCSV } from '../utils/csvParser';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setEntries = useStore(state => state.setEntries);

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setUploading(true);
      setError(null);
      const file = acceptedFiles[0];
      const entries = await parseCSV(file);
      setEntries(entries);
      onClose();
    } catch (error) {
      console.error('Error parsing CSV:', error);
      setError(error instanceof Error ? error.message : 'Error processing file');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false,
    disabled: uploading
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Upload CSV File</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 4,
            cursor: uploading ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'center',
            '&:hover': {
              borderColor: uploading ? 'grey.300' : 'primary.main',
              bgcolor: uploading ? 'transparent' : 'action.hover',
            },
            position: 'relative',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input {...getInputProps()} disabled={uploading} />
          {uploading ? (
            <>
              <CircularProgress size={48} sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Processing your data...
              </Typography>
              <Typography color="text.secondary">
                Please wait while we analyze your file
              </Typography>
            </>
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
              </Typography>
              <Typography color="text.secondary">
                or click to select file
              </Typography>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}