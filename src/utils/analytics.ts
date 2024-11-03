import { WorkEntry } from '../types/WorkEntry';
import { Analytics } from '../types/Analytics';
import { formatDuration } from './csvParser';

export function calculateAnalytics(entries: WorkEntry[]): Analytics {
  const analytics: Analytics = {
    totalHours: 0,
    staffMembers: [],
    projects: [],
    clients: [],
    clientProjects: {},
    projectHours: {},
    staffHours: {},
  };

  entries.forEach(entry => {
    // Calculate total hours
    const hours = formatDuration(entry.duration);
    analytics.totalHours += hours;

    // Track unique staff members
    if (!analytics.staffMembers.includes(entry.fullName)) {
      analytics.staffMembers.push(entry.fullName);
    }

    // Track unique projects
    if (!analytics.projects.includes(entry.project)) {
      analytics.projects.push(entry.project);
    }

    // Track unique clients
    if (!analytics.clients.includes(entry.client)) {
      analytics.clients.push(entry.client);
    }

    // Track client-project relationships
    if (!analytics.clientProjects[entry.client]) {
      analytics.clientProjects[entry.client] = [];
    }
    if (!analytics.clientProjects[entry.client].includes(entry.project)) {
      analytics.clientProjects[entry.client].push(entry.project);
    }

    // Track project hours
    analytics.projectHours[entry.project] = (analytics.projectHours[entry.project] || 0) + hours;

    // Track staff hours
    analytics.staffHours[entry.fullName] = (analytics.staffHours[entry.fullName] || 0) + hours;
  });

  // Sort arrays
  analytics.staffMembers.sort();
  analytics.projects.sort();
  analytics.clients.sort();

  return analytics;
}