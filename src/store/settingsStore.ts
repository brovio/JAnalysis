import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  darkMode: boolean;
  sidebarCollapsed: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: true,
      sidebarCollapsed: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'settings-storage',
    }
  )
);