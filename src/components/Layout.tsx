import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSettingsStore } from '../store/settingsStore';
import Header from './Header';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 240;

export default function Layout() {
  const sidebarCollapsed = useSettingsStore(state => state.sidebarCollapsed);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Sidebar width={DRAWER_WIDTH} collapsed={sidebarCollapsed} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarCollapsed ? 64 : DRAWER_WIDTH}px)` },
          ml: { sm: `${sidebarCollapsed ? 64 : DRAWER_WIDTH}px` },
          mt: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}