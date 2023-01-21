import { TEntityID, TStory } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { ClientError } from '@lib/errors';

import { Layout } from './Layout';

export type TPokerSessionStoryRemoveModalProps = {
  story: TStory;
  onClose: () => void;
};

const PokerSessionStoryRemoveModal = (props: TPokerSessionStoryRemoveModalProps): React.ReactElement | null => {
  const {
    story,
    onClose,
  } = props;

  const dispatch = useAppDispatch();

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const { errGlobalMsg } = useAsyncActionInfo(
    [pokerSessionsActionsTypes.STORY_REMOVE_PENDING],
    []
  );

  const handleSubmit = async (currSpaceId: TEntityID, currPokerSessionId: TEntityID) => {
    const { payload } = await dispatch(pokerSessionsAsyncActions.storyRemove(
      currPokerSessionId,
      story._id
    ));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!spaceId || !pokerSessionId) {
    throw new ClientError('space or poker session is not found');
  }

  return (
    <Layout
      errGlobalMsg={errGlobalMsg}
      onCancel={onClose}
      onSubmit={() => handleSubmit(spaceId, pokerSessionId)}
    />
  );
};

export {
  PokerSessionStoryRemoveModal,
};
