import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';

import { TPaperProps } from '@components/uiKit/Paper';

import { Layout } from './Layout';

export type TPokerSessionTeamsProps = Partial<TPaperProps>;

const PokerSessionTeams = (props: TPokerSessionTeamsProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const currPokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const canModerate = useSelector(pokerSessionsRepoSelectors.getCanModerate)(
    currPokerSessionId,
    currUserId
  );

  const teams = useSelector(pokerSessionsRepoSelectors.getTeams)(
    currPokerSessionId
  );

  const getTeamScoresTotalSelector = useSelector(pokerSessionsSelectors.getTeamScoreTotal);

  const getTeamScoresTotal = (teamId: TEntityID) =>
    getTeamScoresTotalSelector(currPokerSessionId, teamId);

  return (
    <Layout
      pokerSessionId={currPokerSessionId}
      teams={teams}
      canModerate={canModerate}
      getTeamScoresTotal={getTeamScoresTotal}
      {...other}
    />
  );
};

export {
  PokerSessionTeams,
};
