import { arrayHelpers } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersRepoSelectors } from '@Redux/domains/usersRepo/selectors';

import { TBoxProps } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';

import { Layout } from './Layout';

export type TPokerSessionTeamProps = Partial<TBoxProps> & {
  pokerSessionId: TEntityID;
  storyId: TEntityID,
  teamId: TEntityID;
  hasDivider?: boolean;
};

const StoryTeam = (props: TPokerSessionTeamProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    storyId,
    teamId,
    hasDivider,
    ...other
  } = props;

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const cardSetId = useSelector(pokerSessionsSelectors.getCardSetId)(
    pokerSessionId
  );
  const team = useSelector(spacesSelectors.getCurrSpaceTeamById)(teamId);

  const isTeamVotingStory = useSelector(pokerSessionsSelectors.getIsTeamVotingStory)(
    pokerSessionId,
    teamId,
    storyId
  );

  const teamUsersWithParticipants = useSelector(
    usersRepoSelectors.getTeamUsersWithParticipants
  )(
    spaceId,
    team
  );

  if (!team) {
    return null;
  }

  return (
    <>
      <Layout
        pokerSessionId={pokerSessionId}
        cardSetId={cardSetId}
        storyId={storyId}
        team={team}
        isTeamVoting={isTeamVotingStory}
        teamUsersWithParticipants={
          arrayHelpers.normalizeArr(teamUsersWithParticipants, 'participant._id')
        }
        {...other}
      />

      {
        hasDivider && (
          <Divider
            my={4}
          />
        )
      }
    </>
  );
};

export {
  StoryTeam,
};
