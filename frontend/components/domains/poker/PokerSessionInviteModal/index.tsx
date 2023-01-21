import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { PokerSessionInviteBtn } from '@components/domains/poker/buttons/PokerSessionInviteBtn';
import { Modal, TModalProps } from '@components/domains/shared/Modal';
import { ParticipantsContent } from '@components/domains/space/Participants/ParticipantsContent';
import { ParticipantsHeader } from '@components/domains/space/Participants/ParticipantsHeader';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type PokerSessionInviteModalProps = TModalProps & {
    onClose: () => void;
    pokerSessionId: TEntityID;
    teamIds: string[];
};

const PokerSessionInviteModal = (props: PokerSessionInviteModalProps): React.ReactElement | null => {
  const {
    onClose,
    pokerSessionId,
    teamIds,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const pokerSession = useSelector(pokerSessionsSelectors.getById)(pokerSessionId);
  const isParticipant = useSelector(pokerSessionsRepoSelectors.getIsUserParticipant)(
    pokerSession,
    currUserId
  );
  const canModerate = useSelector(spacesSelectors.getCanModerate)(
    pokerSession?.spaceId,
    currUserId
  );

  const handleEdit = (userId: TEntityID, participantId: TEntityID) => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.USER_EDIT, {
      participantId,
      userId,
      onSuccess: () => {
        dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_INVITE, {
          pokerSessionId,
          teamIds,
        }));
      },
    }));
  };

  const onSubmit = async () => {
    if (!!pokerSession && isParticipant && canModerate && !pokerSession.storiesIds.length) {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORIES_ADD, {
        preventClose: true,
      }));
      return;
    }

    onClose();
  };

  const renderHeader = () => (
    <PaperHeader>
      <ParticipantsHeader />
    </PaperHeader>
  );

  const renderContent = () => (
    <PaperContent>
      <ParticipantsContent
        onEdit={handleEdit}
      />
      <Divider
        my={6}
      />
      <Text
        fontSize={2}
        mb={4}
      >
        {t('pokerSessionInvite.desc')}
      </Text>
      <PokerSessionInviteBtn
        teamIds={teamIds}
        pokerSessionId={pokerSessionId}
      >
        {t('pokerSessionInvite.copyLinkBtn')}
      </PokerSessionInviteBtn>
    </PaperContent>
  );
  const renderFooter = () => (
    <PaperFooter>
      <Divider
        mb={6}
      />
      <PaperActions>
        <Button
          onClick={onClose}
        >
          {t('pokerSessionInvite.cancelBtn')}
        </Button>
        <Button
          onClick={onSubmit}
          variant="primary"
        >
          {t('pokerSessionInvite.submitBtn')}
        </Button>
      </PaperActions>
    </PaperFooter>
  );
  return (
    <Modal
      {...other}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </Modal>
  );
};

export {
  PokerSessionInviteModal,
};
