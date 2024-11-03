import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Grid } from '@mui/material';
import { useStore } from '../../store/useStore';

interface ClientProjectSelectProps {
  selectedClient: string;
  selectedProject: string;
  selectedStaff: string;
  onClientChange: (event: SelectChangeEvent) => void;
  onProjectChange: (event: SelectChangeEvent) => void;
}

export default function ClientProjectSelect({
  selectedClient,
  selectedProject,
  selectedStaff,
  onClientChange,
  onProjectChange
}: ClientProjectSelectProps) {
  const entries = useStore(state => state.entries);
  
  const staffFilteredEntries = selectedStaff === 'all' 
    ? entries 
    : entries.filter(entry => entry.fullName === selectedStaff);

  const clients = [...new Set(staffFilteredEntries.map(entry => entry.client))]
    .filter(Boolean)
    .sort();

  const projectEntries = staffFilteredEntries.filter(entry => 
    !selectedClient || entry.client === selectedClient
  );

  const projects = [...new Set(projectEntries.map(entry => entry.project))]
    .filter(Boolean)
    .sort();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Client</InputLabel>
          <Select
            value={selectedClient}
            label="Client"
            onChange={onClientChange}
          >
            <MenuItem value="">All Clients</MenuItem>
            {clients.map(client => (
              <MenuItem key={client} value={client}>{client}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Project</InputLabel>
          <Select
            value={selectedProject}
            label="Project"
            onChange={onProjectChange}
            disabled={!selectedClient}
          >
            <MenuItem value="">All Projects</MenuItem>
            {projects.map(project => (
              <MenuItem key={project} value={project}>{project}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}