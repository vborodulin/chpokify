import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { TButtonProps } from '@components/uiKit/Button';

import { Layout } from './Layout';

export type TPokerStoryVoteAllBtnProps = Partial<TButtonProps> & {
    storyId: TEntityID
};

const PokerStoryVoteAllBtn = (props: TPokerStoryVoteAllBtnProps): React.ReactElement | null => {
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

  const isStoryActive = useSelector(pokerSessionsSelectors.getIsStoryActive)(
    pokerSessionId,
    storyId
  );

  const isStoryVoting = useSelector(pokerSessionsSelectors.getIsStoryVoting)(
    pokerSessionId,
    storyId
  );

  const handleStartVoteAll = async () => {
    if (!pokerSessionId) {
      return;
    }

    await dispatch(pokerSessionsAsyncActions.storyVoteAll(
      pokerSessionId,
      storyId
    ));
  };

  return (
    <Layout
      canModerate={canModerate}
      hasTeams={hasTeams}
      isStoryActive={isStoryActive}
      isStoryVoting={isStoryVoting}
      onStartVoteAll={handleStartVoteAll}
      {...other}
    />
  );
};

export {
  PokerStoryVoteAllBtn,
};
