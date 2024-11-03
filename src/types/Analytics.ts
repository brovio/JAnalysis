export interface Analytics {
  totalHours: number;
  staffMembers: string[];
  projects: string[];
  clients: string[];
  clientProjects: {
    [client: string]: string[];
  };
  projectHours: {
    [project: string]: number;
  };
  staffHours: {
    [staff: string]: number;
  };
}