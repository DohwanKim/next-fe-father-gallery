import { create } from 'zustand';

export interface LayoutStore {
  isHeaderHideByScroll: boolean;
  setIsHeaderHideByScroll: (isHide: boolean) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
  isHeaderHideByScroll: false,
  setIsHeaderHideByScroll: (isHide) => set({ isHeaderHideByScroll: isHide }),
}));

export default useLayoutStore;
