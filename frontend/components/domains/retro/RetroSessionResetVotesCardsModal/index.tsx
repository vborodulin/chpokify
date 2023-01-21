import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { retroSessionsActionsTypes } from '@Redux/domains/retroSessions/actionsTypes';
import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TRetroSessionResetVotesCardsModalProps = Partial<TModalProps> & {
  retroSessionId: string;
  onClose: () => void;
};

const RetroSessionResetVotesCardsModal = (props: TRetroSessionResetVotesCardsModalProps): React.ReactElement | null => {
  const {
    onClose,
    retroSessionId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    retroSessionsActionsTypes.RESET_VOTES_CARDS_PENDING,
  ]);

  const retroSession = useSelector(retroSessionsSelectors.getById)(retroSessionId);

  const handleRemove = async () => {
    if (!retroSession) {
      return;
    }

    const { payload } = await dispatch(
      retroSessionsAsyncActions.resetVotesCards(retroSession._id)
    );

    if (!getIsRejectedActionPayload(payload) && onClose) {
      onClose();
    }
  };

  if (!retroSession) {
    return null;
  }

  return (
    <Modal>
      <PaperHeader
        mb={0}
      >
        {t('pages.retro.resetVotesCardsModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('pages.retro.resetVotesCardsModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('pages.retro.resetVotesCardsModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroSessionResetVotesCardsModal,
};
