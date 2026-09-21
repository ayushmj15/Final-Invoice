import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type HistoryRecord = {
  id: string;
  date: string; // ISO string
  totalRecords: number;
  matchedCount: number;
  mismatchCount: number;
  reviewCount: number;
  missingCount: number;
  fileName: string;
};

interface AppState {
  user: User | null;
  history: HistoryRecord[];
  
  login: (user: User) => void;
  logout: () => void;
  addHistoryRecord: (record: Omit<HistoryRecord, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      history: [],
      
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      addHistoryRecord: (record) => set((state) => ({
        history: [
          {
            ...record,
            id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            date: new Date().toISOString(),
          },
          ...state.history
        ]
      })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'invoicematch-app-storage',
    }
  )
);
