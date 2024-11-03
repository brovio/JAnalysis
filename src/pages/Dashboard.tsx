import { Box, Grid, Typography, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useStore } from '../store/useStore';
import StatCard from '../components/dashboard/StatCard';
import ClientProjectSelect from '../components/dashboard/ClientProjectSelect';
import StaffFilter from '../components/dashboard/StaffFilter';
import TaskList from '../components/dashboard/TaskList';
import UploadDialog from '../components/UploadDialog';
import { useState } from 'react';
import { formatDuration } from '../utils/csvParser';

export default function Dashboard() {
  const entries = useStore(state => state.entries);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);

  const filteredEntries = entries.filter(entry => {
    const matchesClient = !selectedClient || entry.client === selectedClient;
    const matchesProject = !selectedProject || entry.project === selectedProject;
    const matchesStaff = selectedStaff === 'all' || entry.fullName === selectedStaff;
    return matchesClient && matchesProject && matchesStaff;
  });

  const totalHours = filteredEntries.reduce((acc, entry) => acc + formatDuration(entry.duration), 0);
  const uniqueStaff = [...new Set(filteredEntries.map(entry => entry.fullName))].length;
  const uniqueProjects = [...new Set(filteredEntries.map(entry => entry.project))].length;
  const uniqueClients = [...new Set(filteredEntries.map(entry => entry.client))].length;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h5">Dashboard Overview</Typography>
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={() => setUploadOpen(true)}
          >
            Upload CSV
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Hours"
            value={`${totalHours.toFixed(1)}h`}
            description="Total hours worked"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Staff"
            value={uniqueStaff}
            description="Number of staff members"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Projects"
            value={uniqueProjects}
            description="Number of ongoing projects"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Clients"
            value={uniqueClients}
            description="Number of active clients"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <ClientProjectSelect
                  selectedClient={selectedClient}
                  selectedProject={selectedProject}
                  selectedStaff={selectedStaff}
                  onClientChange={(e) => {
                    setSelectedClient(e.target.value);
                    setSelectedProject('');
                  }}
                  onProjectChange={(e) => setSelectedProject(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StaffFilter
                  selectedStaff={selectedStaff}
                  onStaffChange={(e) => setSelectedStaff(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TaskList entries={filteredEntries} pageSize={25} infiniteScroll={false} />
        </Grid>
      </Grid>

      <UploadDialog 
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </Box>
  );
}