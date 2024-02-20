import { create } from 'zustand';

import { ModalState } from '@/types/modal.type';

export interface ModalStore {
  modalState: ModalState;
  modalBtnDisabled: boolean;
  modalCancelHandler: () => void;
  modalConfirmHandler: () => void;
  setModalState: (modalState: ModalState) => void;
  setBtnDisabled: (state: boolean) => void;
}

const useModalStore = create<ModalStore>((set, get) => ({
  modalBtnDisabled: false,
  modalState: {
    isOpened: false,
    options: {
      msg: '',
      title: '',
    },
    resolve: undefined,
    type: undefined,
  },
  modalCancelHandler: () => {
    const getModalState = get().modalState;
    set((prev) => ({
      ...prev,
      modalState: {
        ...prev.modalState,
        isOpened: false,
      },
    }));
    if (getModalState.resolve) {
      getModalState.resolve(false);
    }
  },
  modalConfirmHandler: () => {
    const getModalState = get().modalState;
    set((prev) => ({
      ...prev,
      modalState: {
        ...prev.modalState,
        isOpened: false,
      },
    }));
    if (getModalState.resolve) {
      getModalState.resolve(true);
    }
  },
  setModalState: (modalState) => set((prev) => ({ ...prev, modalState })),
  setBtnDisabled: (state) =>
    set((prev) => ({ ...prev, modalBtnDisabled: state })),
}));

export default useModalStore;
