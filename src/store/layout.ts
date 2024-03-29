import { create } from 'zustand';

export interface LayoutStore {
  isHeaderHide: boolean;
  isShowSubMenu: boolean;
  setIsHeaderHide: (isHide: boolean) => void;
  setIsShowSubMenu: (isShow: boolean) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
  isHeaderHide: false,
  isShowSubMenu: false,
  setIsHeaderHide: (isHide) => set({ isHeaderHide: isHide }),
  setIsShowSubMenu: (isShow) => set({ isShowSubMenu: isShow }),
}));

export default useLayoutStore;
