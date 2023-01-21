import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { RetroSessionColumnActions } from '@components/domains/retro/RetroSession/RetroSessionColumnActions';
import { TModalProps } from '@components/domains/shared/Modal';

import { Modal as ModalCommon } from '@components/uiKit/Modal';
import { ModalContainer } from '@components/uiKit/ModalContainer';

type TRetroSessionColumnActionsModalProps = TModalProps & {}

const RetroSessionColumnActionsModal = (props: TRetroSessionColumnActionsModalProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const preventCloseModal = useSelector(uiSelectors.getPreventCloseModal);
  const hasAnyPoppersOpen = useSelector(uiSelectors.getHasAnyPoppersOpen);

  const handleClose = () => {
    if (hasAnyPoppersOpen || preventCloseModal) {
      return;
    }

    dispatch(retroSessionsActions.columnActionsSidebarToggle());
  };

  return (
    <ModalContainer
      preventClose={preventCloseModal}
      preventBodyShift={false}
      isOpen
      {...other}
    >
      <ModalCommon
        preventClose={preventCloseModal}
        borderRadius={2}
        maxWidth="100%"
        onClose={handleClose}
      >
        <RetroSessionColumnActions
          width="100%"
          p={0}
        />
      </ModalCommon>
    </ModalContainer>
  );
};

export {
  RetroSessionColumnActionsModal,
};
