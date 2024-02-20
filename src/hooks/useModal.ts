import { useCallback } from 'react';

import useStore from '@/store/modal';
import { AlertFunction, AlertService } from '@/types/modal.type';

export const useModal = (): AlertService => {
  const setAlert = useStore((state) => state.setModalState);
  const setIsDisabled = useStore((state) => state.setBtnDisabled);
  const alertDialog: AlertFunction = useCallback(
    (options) =>
      new Promise((resolve) => {
        setAlert({
          isOpened: true,
          options,
          resolve,
        });
      }),
    [setAlert],
  );

  return {
    alertDialog,
    setIsDisabled,
  };
};
