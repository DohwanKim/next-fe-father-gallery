'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useModalStore from '@/store/modal';

const Modal = () => {
  const { isOpened, options } = useModalStore((state) => state.modalState);
  const isDisabled = useModalStore((state) => state.modalBtnDisabled);
  const cancelHandler = useModalStore((state) => state.modalCancelHandler);
  const confirmHandler = useModalStore((state) => state.modalConfirmHandler);

  return (
    <AlertDialog open={isOpened}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title || '알림'}</AlertDialogTitle>
          <AlertDialogDescription>
            {options.description || ''}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!options.isHideCancel && (
            <AlertDialogCancel onClick={cancelHandler}>
              {options.customCancelText || '취소'}
            </AlertDialogCancel>
          )}
          {!options.isHideConfirm && (
            <AlertDialogAction disabled={isDisabled} onClick={confirmHandler}>
              {options.customConfirmText || '확인'}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
