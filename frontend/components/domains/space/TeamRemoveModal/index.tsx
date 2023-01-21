import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { spacesAsyncActions } from '@Redux/domains/spaces/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { Layout } from './Layout';

type TTeamRemoveModalProps = {
  teamId: string;
  onClose: () => void;
}

const TeamRemoveModal = (props: TTeamRemoveModalProps) => {
  const { teamId, onClose } = props;

  const dispatch = useDispatch<TAppDispatch>();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const { isLoading, errGlobalMsg } = useAsyncActionInfo(
    [spacesActionsTypes.TEAMS_REMOVE_PENDING]
  );

  const handleRemove = async () => {
    const { payload } = await dispatch(spacesAsyncActions.teamsRemove(currSpaceId, teamId));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Layout
      errGlobalMsg={errGlobalMsg}
      isLoading={isLoading}
      onCancel={onClose}
      onRemove={handleRemove}
    />
  );
};

export {
  TeamRemoveModal,
};
