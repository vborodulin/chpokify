import { TUserWithParticipant } from '@chpokify/models-types';
import { curry } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersRepoSelectors } from '@Redux/domains/usersRepo/selectors';

import { EntityItem } from '@components/domains/shared/EntityItem';
import { Username } from '@components/domains/user/Username';

import { Divider } from '@components/uiKit/Divider';
import { Grid, TGridProps } from '@components/uiKit/Grid';

type PokerSessionInviteParticipantsProps = TGridProps & {
  teamIds: string[]
};

const PokerSessionInviteParticipants = (props: PokerSessionInviteParticipantsProps): React.ReactElement | null => {
  const {
    teamIds,
    ...other
  } = props;

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const getCanModerateSpaceSelector = useSelector(spacesSelectors.getCanModerate);
  const getCanModerateSelector = curry(getCanModerateSpaceSelector)(currSpaceId);
  const getUserTeamsSelector = useSelector(spacesSelectors.getUserTeams);
  const spaceUsersWithParticipants = useSelector(usersRepoSelectors.getUsersInSpaceWithParticipants)(
    currSpaceId
  );
  const spaceUsersWithoutTeamDuplicate = spaceUsersWithParticipants.filter((userParticipant) => {
    const userTeams = getUserTeamsSelector(currSpaceId, userParticipant._id);
    return userTeams && userTeams?.find((team) => teamIds.includes(team._id.toString()));
  });

  if (!spaceUsersWithoutTeamDuplicate.length) {
    return null;
  }

  const renderUsername = (user: TUserWithParticipant) => (
    <Username
      isGuest={user.isGuest}
      username={user.username}
      isSpaceModerator={getCanModerateSelector(user._id)}
    />
  );

  const renderParticipantItem = (user: TUserWithParticipant) => (
    <EntityItem
      key={user._id.toString()}
      type="default"
      item={renderUsername(user)}
    />
  );
  return (
    <>
      <Grid
        {...other}
      >
        {spaceUsersWithoutTeamDuplicate.map((user) => renderParticipantItem(user))}
      </Grid>
      <Divider
        mb={6}
      />
    </>
  );
};

export {
  PokerSessionInviteParticipants,
};
