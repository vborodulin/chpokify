import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TPokerTeamVoteBnProps = Partial<TLayoutProps> & {
  pokerSessionId: TEntityID,
  storyId: TEntityID,
  teamId: TEntityID;
  spaceId: TEntityID,
};

const PokerTeamVoteBn = (props: TPokerTeamVoteBnProps): React.ReactElement | null => {
  const {
    spaceId,
    pokerSessionId,
    storyId,
    teamId,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const team = useSelector(spacesSelectors.getTeamById)(
    spaceId,
    teamId
  );

  const isStoryActive = useSelector(pokerSessionsSelectors.getIsStoryActive)(
    pokerSessionId,
    storyId
  );

  const isTeamVoting = useSelector(pokerSessionsSelectors.getIsTeamVoting)(
    pokerSessionId,
    teamId
  );

  const teamResult = useSelector(pokerSessionsSelectors.getTeamResultByStory)(
    pokerSessionId,
    storyId,
    teamId
  );

  const handleStartVote = async () => {
    if (!pokerSessionId) {
      return null;
    }

    await dispatch(pokerSessionsAsyncActions.storyVoteTeam(
      pokerSessionId,
      storyId,
      {
        teamId,
      }
    ));
  };

  const handleCancelVote = async () => {
    if (!pokerSessionId) {
      return null;
    }

    await dispatch(pokerSessionsAsyncActions.storyVoteCancelTeam(
      pokerSessionId,
      storyId,
      {
        teamId,
      }
    ));
  };

  return (
    <Layout
      canModerate={canModerate}
      teamScores={teamResult?.scores}
      hasTeamParticipants={!!team?.participantsIds?.length}
      isStoryActive={isStoryActive}
      isTeamVoting={isTeamVoting}
      onStartVote={handleStartVote}
      onCancelVote={handleCancelVote}
      {...other}
    />
  );
};

export {
  PokerTeamVoteBn,
};
