import { TTeam } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { Layout } from './Layout';

export type TTeamViewModalProps = {
  team: TTeam;
  onClose: () => void;
};

const TeamViewModal = (props: TTeamViewModalProps): React.ReactElement | null => {
  const {
    team,
    onClose,
  } = props;

  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const teamUsers = useSelector(spacesRepoSelectors.getTeamUsers)(
    spaceId,
    team._id
  );

  return (
    <Layout
      teamName={team.name}
      teamUsers={teamUsers}
      onCancel={onClose}
    />
  );
};

export {
  TeamViewModal,
};
