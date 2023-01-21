import { TEntityID, TUserWithParticipant } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { EntityItem } from '@components/domains/shared/EntityItem';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';
import { Username } from '@components/domains/user/Username';

import { Button } from '@components/uiKit/Button';
import { Grid } from '@components/uiKit/Grid';
import { IconAddUser } from '@components/uiKit/Icons';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TParticipantsLayoutProps = Partial<TPaperProps> & {
  currUserId: TEntityID | undefined;
  users: TUserWithParticipant[];
  getCanModerateSelector: (userId: TEntityID | undefined) => boolean;
  onEdit: (participantId: TEntityID, userId: TEntityID) => void;
  onInvite: () => void;
};

const Layout = (props: TParticipantsLayoutProps): React.ReactElement | null => {
  const {
    currUserId,
    users,
    getCanModerateSelector,
    onEdit,
    onInvite,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const canMeModerate = getCanModerateSelector(currUserId);

  const renderUsername = (user: TUserWithParticipant) => (
    <Username
      isGuest={user.isGuest}
      username={user.username}
      isSpaceModerator={getCanModerateSelector(user._id)}
    />
  );

  const renderParticipantItem = (user: TUserWithParticipant) => {
    if (canMeModerate) {
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

  const renderInviteButton = () => {
    if (canMeModerate) {
      return (
        <Button
          data-tut-space={SPACE_ONBOARDING_STEP_ID.INVITE_BTN}
          variant="primary-outline"
          StartIcon={IconAddUser}
          onClick={onInvite}
        >
          {t('people.inviteBtn')}
        </Button>
      );
    }

    return null;
  };

  return (
    <Paper
      variant="card"
      data-tut-space={SPACE_ONBOARDING_STEP_ID.PARTICIPANTS}
      {...other}
    >
      <PaperHeader>
        {t('people.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
          mb={4}
        >
          {t('people.description')}
        </Text>

        {renderParticipants()}
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          {renderInviteButton()}
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
