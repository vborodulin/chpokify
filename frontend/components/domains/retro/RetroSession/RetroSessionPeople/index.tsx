import { TUserProtected } from '@chpokify/models-types';
import { curry } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { RetroSessionTeamsEditBtn } from '@components/domains/retro/buttons/RetroSessionTeamsEditBtn';
import { EntityItem } from '@components/domains/shared/EntityItem';
import { Username } from '@components/domains/user/Username';

import { Grid } from '@components/uiKit/Grid';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const RetroSessionPeople = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const people = useSelector(retroSessionRepoSelectors.getPeopleByRetroSessionId)(currRetroSessionId);

  const getCanModerateSpaceSelector = useSelector(spacesSelectors.getCanModerate);
  const getCanModerateSelector = curry(getCanModerateSpaceSelector)(currSpaceId);

  const renderUsername = (user: TUserProtected) => (
    <Username
      isGuest={user.isGuest}
      username={user.username}
      isSpaceModerator={getCanModerateSelector(user._id)}
      fontWeight={1}
    />
  );

  const renderParticipantItem = (user: TUserProtected) => (
    <EntityItem
      key={user._id.toString()}
      borderRadius={2}
      height="auto"
      py={2}
      type="default"
      item={renderUsername(user)}
    />
  );

  const renderPeople = () => {
    if (!people.length) {
      return null;
    }

    return (
      <Grid
        gridGap={3}
        gridTemplateColumns={['1fr', '1fr 1fr']}
      >
        {people.map((p) => renderParticipantItem(p))}
      </Grid>
    );
  };

  if (!canModerate) {
    return null;
  }

  return (
    <>
      <PaperHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize={6}
          fontWeight={1}
        >
          {t('pages.retro.retroSessionPeople.title')}
        </Text>

        <RetroSessionTeamsEditBtn />
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
          mb={4}
        >
          {t('pages.retro.retroSessionPeople.info')}
        </Text>

        {
          renderPeople()
        }
      </PaperContent>

    </>
  );
};

export {
  RetroSessionPeople,
};
