import React from 'react';
import { useSelector } from 'react-redux';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { TIconButtonProps } from '@components/uiKit/IconButton';
import { Modal as ModalCommon, TModalProps as TModalCommonProps } from '@components/uiKit/Modal';

export type TModalProps = TModalCommonProps & {
  closeBtnCss?: TIconButtonProps
};

const Modal = React.forwardRef<any, TModalProps>((props, ref) => {
  const {
    preventClose,
    ...other
  } = props;

  const dispatch = useAppDispatch();
  const preventCloseModal = useSelector(uiSelectors.getPreventCloseModal);

  const handleClose = () => {
    dispatch(uiActions.modalHide());
  };

  return (
    <ModalCommon
      ref={ref}
      preventClose={preventClose || preventCloseModal}
      onClose={handleClose}
      {...other}
    />
  );
});

Modal.displayName = 'Modal';

export {
  Modal,
};
