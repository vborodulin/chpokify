import { TEntityID } from '@chpokify/models-types';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';

const useCurrUserPokerSessionInfo = (pokerSessionId: TEntityID) => {
  const pokerSession = useSelector(pokerSessionsSelectors.getById)(
    pokerSessionId
  );

  const space = useSelector(spacesSelectors.getById)(
    pokerSession?.spaceId
  );

  const activeStoryId = useSelector(pokerSessionsSelectors.getActiveStoryId)(
    pokerSession?._id
  );

  const activeStory = useSelector(storiesSelectors.getById)(
    activeStoryId
  );

  const teams = useSelector(pokerSessionsRepoSelectors.getMyTeams);
  const team = useSelector(pokerSessionsRepoSelectors.getNextIsTeamVoting)(teams);

  const votingCardId = useSelector(pokerSessionsRepoSelectors.getMyVotingCardId)(
    team?._id
  );

  const isVoting = useSelector(pokerSessionsSelectors.getIsTeamVoting)(
    pokerSession?._id,
    team?._id
  );

  const duration = useSelector(pokerSessionsSelectors.getDurationInSec)(
    pokerSession?._id
  );

  return {
    space,
    pokerSession,
    duration,
    activeStory,
    teams,
    team,
    votingCardId,
    isVoting,
  };
};

export {
  useCurrUserPokerSessionInfo,
};
