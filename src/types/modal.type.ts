import { ReactNode } from 'react';

interface ModalOptions {
  title?: string;
  description?: ReactNode;
  isHideCancel?: boolean;
  isHideConfirm?: boolean;
  customCancelText?: string;
  customConfirmText?: string;
}

export type ModalTypes = 'alert' | 'confirm' | 'popup';

export interface ModalState {
  type?: ModalTypes;
  isOpened?: boolean;
  options: ModalOptions;
  resolve?: (res?: boolean) => void;
}

export type AlertFunction = (
  options: ModalOptions,
) => Promise<undefined | boolean>;

export type AlertService = {
  alertDialog: AlertFunction;
  setIsDisabled: (state: boolean) => void;
};
