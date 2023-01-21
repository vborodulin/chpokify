import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionSettingsEditForm } from '@components/domains/retro/RetroSession/RetroSessionSettingsEditForm';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { PaperContent } from '@components/uiKit/PaperContent';

type TRetroSessionSettingsModalProps = Partial<TModalProps> & {};

const RetroSessionSettingsModal = (props: TRetroSessionSettingsModalProps) => {
  const { ...other } = props;

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <Modal
      p={0}
      {...other}
    >
      <PaperContent>
        <RetroSessionSettingsEditForm />
      </PaperContent>
    </Modal>
  );
};

export {
  RetroSessionSettingsModal,
};
