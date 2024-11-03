import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  width: number;
  collapsed: boolean;
}

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/staff', label: 'Staff', icon: PeopleIcon },
  { path: '/clients', label: 'Clients', icon: BusinessIcon },
  { path: '/projects', label: 'Projects', icon: AssignmentIcon },
  { path: '/reports', label: 'Reports', icon: BarChartIcon },
];

export default function Sidebar({ width, collapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 64 : width,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
          mt: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <List>
        {menuItems.map(({ path, label, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => navigate(path)}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 3,
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary={label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}