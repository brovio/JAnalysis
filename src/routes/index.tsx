import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Staff from '../pages/Staff';
import Clients from '../pages/Clients';
import Projects from '../pages/Projects';
import Reports from '../pages/Reports';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}