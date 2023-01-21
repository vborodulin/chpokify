import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { SpaceCreateTeamBtn } from '@components/domains/space/buttons/SpaceCreateTeamBtn';

const TeamsFooter = (): React.ReactElement | null => {
  const cantModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  if (!cantModerate) {
    return null;
  }

  return <SpaceCreateTeamBtn />;
};

export { TeamsFooter };
