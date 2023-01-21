import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { pokerCardDecksAsyncActions } from '@Redux/domains/pokerCardDecks/asyncActions';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type CardDecksRemoveModalProps = {
  onClose: () => void;
  cardDeckId: TEntityID
  spaceId: TEntityID
};

const PokerCardDecksRemoveModal = (props: CardDecksRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    cardDeckId,
    spaceId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    pokerSessionsActionsTypes.REMOVE_PENDING,
  ]);

  const handleOnClose = () => {
    onClose();
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_CARD_DECKS_EDIT, {
      cardDeckId,
    }));
  };

  const handleRemove = async () => {
    const { payload } = await dispatch(
      pokerCardDecksAsyncActions.remove(cardDeckId, spaceId)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal>
      <PaperHeader>
        {t('cardDecks.deleteModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={handleOnClose}
          >
            {t('cardDecks.deleteModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('cardDecks.deleteModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  PokerCardDecksRemoveModal,
};
