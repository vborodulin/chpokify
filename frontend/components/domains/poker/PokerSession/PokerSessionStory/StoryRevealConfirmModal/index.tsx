import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TStoryRevealConfirmModal = {
  pokerSessionId: TEntityID;
  teamId: TEntityID;
  storyId: TEntityID;
  onClose: () => void;
}

const StoryRevealConfirmModal = (props: TStoryRevealConfirmModal) => {
  const {
    pokerSessionId,
    teamId,
    storyId,
    onClose,
  } = props;

  const dispatch = useAppDispatch();

  const spaceId = useSelector(pokerSessionsSelectors.getSpaceId)(
    pokerSessionId
  );
  const team = useSelector(spacesSelectors.getTeamById)(
    spaceId,
    teamId
  );

  const handleSubmit = async () => {
    await dispatch(pokerSessionsAsyncActions.storyTeamRevealCards(
      pokerSessionId,
      storyId,
      teamId
    ));
    onClose();
  };

  return (
    <Layout
      teamName={team?.name || ''}
      onCancel={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export {
  StoryRevealConfirmModal,
};
