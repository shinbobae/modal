import { create } from 'zustand';


interface ApiData {
  id: number | null;
  title: string | null;
  userId: number | null;
}

interface SetData {
  setId: (id: number | null) => void;
  setTitle: (id: string | null) => void;
  setUserId: (id: number | null) => void;
}

export const useApiStore = create<ApiData & SetData>((set) => ({
  id: null,
  title: null,
  userId: null,
  setId: (id) => set({ id }),
  setTitle: (title) => set({ title }),
  setUserId: (userId) => set({ userId }),
}));