import { useCallback, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useStore } from '../store/useStore';
import { parseCSV } from '../utils/csvParser';

interface FileUploadZoneProps {
  onUploadStart?: () => void;
  onUploadSuccess?: () => void;
  onUploadError?: () => void;
}

export default function FileUploadZone({ 
  onUploadStart,
  onUploadSuccess,
  onUploadError 
}: FileUploadZoneProps) {
  const setEntries = useStore(state => state.setEntries);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsLoading(true);
      setError(null);
      onUploadStart?.();

      const file = acceptedFiles[0];
      if (!file) {
        throw new Error('No file selected');
      }

      const entries = await parseCSV(file);
      if (!entries || entries.length === 0) {
        throw new Error('No valid entries found in CSV');
      }

      setEntries(entries);
      
      setTimeout(() => {
        setIsLoading(false);
        onUploadSuccess?.();
      }, 1000);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      setError(error instanceof Error ? error.message : 'Error processing file');
      setIsLoading(false);
      onUploadError?.();
    }
  }, [setEntries, onUploadStart, onUploadSuccess, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    multiple: false,
    disabled: isLoading
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        p: 4,
        cursor: isLoading ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isLoading ? 'grey.300' : 'primary.main',
          bgcolor: isLoading ? 'transparent' : 'action.hover',
        },
        position: 'relative',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input {...getInputProps()} disabled={isLoading} />
      {isLoading ? (
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
  );
}