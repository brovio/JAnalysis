import Papa from 'papaparse';
import { WorkEntry } from '../types/WorkEntry';

export const parseCSV = (file: File): Promise<WorkEntry[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const entries = results.data
            .filter((entry: any) => entry.Date && entry.EntryType)
            .map((entry: any) => ({
              date: entry.Date || '',
              fullName: entry['Full Name'] || '',
              entryType: entry.EntryType || '',
              time: entry.Time || '',
              duration: entry.Duration || '',
              break: entry.Break || '',
              breakType: entry['Break Type'] || '',
              client: entry.Client || '',
              projectCode: entry['Project Code'] || '',
              project: entry.Project || '',
              notes: entry.Notes || '',
              createdOn: entry['Created On'] || '',
              lastEditedBy: entry['Last Edited By'] || '',
              lastEditedOn: entry['Last Edited On'] || ''
            }));
          resolve(entries);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const formatDuration = (duration: string): number => {
  if (!duration) return 0;
  
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  return hours + minutes / 60;
};