import { TEntityID, TUserWithParticipant } from '@chpokify/models-types';
import { curry } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { usersRepoSelectors } from '@Redux/domains/usersRepo/selectors';

import { EntityItem } from '@components/domains/shared/EntityItem';
import { Username } from '@components/domains/user/Username';

import { Grid } from '@components/uiKit/Grid';
import { Text, TTextProps } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TParticipantsContentProps = Partial<TTextProps> & {
  onEdit: (participantId: TEntityID, userId: TEntityID) => void;
};

const ParticipantsContent = (props: TParticipantsContentProps): React.ReactElement | null => {
  const {
    onEdit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const users = useSelector(usersRepoSelectors.getUsersInSpaceWithParticipants)(
    currSpaceId
  );
  const getCanModerateSpaceSelector = useSelector(spacesSelectors.getCanModerate);
  const getCanModerateSelector = curry(getCanModerateSpaceSelector)(currSpaceId);

  const renderUsername = (user: TUserWithParticipant) => (
    <Username
      isGuest={user.isGuest}
      username={user.username}
      isSpaceModerator={getCanModerateSelector(user._id)}
    />
  );

  const renderParticipantItem = (user: TUserWithParticipant) => {
    if (canModerate) {
      return (
        <EntityItem
          key={user._id.toString()}
          type="button"
          item={renderUsername(user)}
          onClick={() => onEdit(user._id, user.participant._id)}
        />
      );
    }

    return (
      <EntityItem
        key={user._id.toString()}
        type="default"
        item={renderUsername(user)}
      />
    );
  };

  const renderParticipants = () => {
    if (!users.length) {
      return null;
    }

    return (
      <Grid
        gridGap={3}
        gridTemplateColumns={['1fr', '1fr 1fr']}
      >
        {users.map((user) => renderParticipantItem(user))}
      </Grid>
    );
  };

  return (
    <>
      <Text
        fontSize={2}
        mb={4}
      >
        {t('members.description')}
      </Text>
      {
        renderParticipants()
      }
    </>
  );
};

export { ParticipantsContent };
