import { lock, unlock } from 'tua-body-scroll-lock';
import { create } from 'zustand';

export interface LayoutStore {
  isHeaderHide: boolean;
  isMobileHeaderShow: boolean;
  isShowSubMenu: boolean;
  setIsHeaderHide: (isHide: boolean) => void;
  setIsMobileHeaderShow: (isShow: boolean) => void;
  setIsShowSubMenu: (isShow: boolean) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
  isHeaderHide: false,
  isShowSubMenu: false,
  isMobileHeaderShow: false,
  setIsHeaderHide: (isHide) => set({ isHeaderHide: isHide }),
  setIsMobileHeaderShow: (isShow) => {
    if (isShow) {
      lock();
    } else {
      unlock();
    }
    set({ isMobileHeaderShow: isShow });
  },
  setIsShowSubMenu: (isShow) => set({ isShowSubMenu: isShow }),
}));

export default useLayoutStore;
