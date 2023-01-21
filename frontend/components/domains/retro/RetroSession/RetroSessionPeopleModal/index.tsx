import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionPeople } from '@components/domains/retro/RetroSession/RetroSessionPeople';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

type TRetroSessionPeopleModalProps = Partial<TModalProps> & {};

const RetroSessionPeopleModal = (props: TRetroSessionPeopleModalProps) => {
  const { ...other } = props;

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!canModerate) {
    return null;
  }

  return (
    <Modal
      variant="card"
      {...other}
    >
      <RetroSessionPeople />
    </Modal>
  );
};

export {
  RetroSessionPeopleModal,
};
