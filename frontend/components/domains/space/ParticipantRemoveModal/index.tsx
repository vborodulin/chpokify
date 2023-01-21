import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TParticipantRemoveModalProps = {
  participantId: TEntityID;
  onClose: () => void;
}

const UserRemoveModal = (props: TParticipantRemoveModalProps): React.ReactElement | null => {
  const {
    participantId,
    onClose,
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    spacesActionsTypes.PARTICIPANTS_REMOVE_PENDING,
  ]);

  const removeErr = useSelector(asyncRejectedSelectors.createErrorSelector)([
    spacesActionsTypes.PARTICIPANTS_REMOVE_PENDING,
  ]);
  const errGlobalMsg = asyncRejectedSelectors.getGlobalErrMsg(removeErr, []);

  const handleSubmit = async () => {
    const { payload } = await dispatch(spacesAsyncActions.participantsRemove(currSpaceId, participantId));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Layout
      errGlobalMsg={errGlobalMsg}
      isLoading={isLoading}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};

export {
  UserRemoveModal,
};
