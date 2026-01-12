import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalOptions<T = unknown> {
  title?: string;
  content: ReactNode | ((props: { resolve: (value: T) => void }) => ReactNode);
  // 함수형 content를 지원하여 컴포넌트 내부에서 resolve를 호출할 수 있게 함
}

interface ModalItem extends ModalOptions {
  id: string;
  resolve: (value: unknown) => void;
}

interface ModalState {
  modals: ModalItem[];
  open: <T>(options: ModalOptions<T>) => Promise<T>;
  close: (id: string, value: unknown) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  open: (options) => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(2, 9);
      set((state) => ({
        modals: [...state.modals, { ...options, id, resolve }],
      }));
    });
  },
  close: (id, value) => {
    set((state) => {
      const modal = state.modals.find((m) => m.id === id);
      modal?.resolve(value);
      return { modals: state.modals.filter((m) => m.id !== id) };
    });
  },
}));