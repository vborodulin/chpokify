import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TPokerStoryStartBtnProps = Partial<TLayoutProps> & {
  storyId: TEntityID;
};

const PokerStoryStartBtn = (props: TPokerStoryStartBtnProps): React.ReactElement | null => {
  const {
    storyId,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const hasTeams = useSelector(pokerSessionsSelectors.getHasTeams)(
    pokerSessionId
  );

  const isActive = useSelector(pokerSessionsSelectors.getIsStoryActive)(
    pokerSessionId,
    storyId
  );

  const playStory = async () => {
    await dispatch(pokerSessionsAsyncActions.storyStart(
      pokerSessionId,
      storyId
    ));
  };

  const handleStart = async () => {
    if (!pokerSessionId) {
      return;
    }

    await playStory();
  };

  const handleStop = async () => {
    if (!pokerSessionId) {
      return;
    }

    await dispatch(pokerSessionsAsyncActions.storyStop(
      pokerSessionId,
      storyId
    ));
  };

  return (
    <Layout
      canModerate={canModerate}
      hasTeams={hasTeams}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      {...other}
    />
  );
};

export {
  PokerStoryStartBtn,
};
