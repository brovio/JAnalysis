import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkEntry } from '../types/WorkEntry';

interface Store {
  entries: WorkEntry[];
  setEntries: (entries: WorkEntry[]) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      entries: [],
      setEntries: (entries) => set({ entries }),
    }),
    {
      name: 'work-entries',
    }
  )
);