import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionsRelationsActionsTypes } from '@Redux/domains/retroSessionsRelations/actionsTypes';
import { retroSessionsRelationsAsyncActions } from '@Redux/domains/retroSessionsRelations/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TRetroCardRemoveModalProps = Partial<TModalProps> & {
  retroCardId: TEntityID,
  retroColumnId: TEntityID,
};

const RetroCardRemoveModal = (props: TRetroCardRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    retroCardId,
    retroColumnId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    retroSessionsRelationsActionsTypes.REMOVE_CARD_PENDING,
  ]);

  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const retroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const retroCard = useSelector(retroSessionsCardsSelectors.getById)(retroCardId);

  const handleRemove = async () => {
    if (!retroCard) {
      return;
    }

    const { payload } = await dispatch(
      retroSessionsRelationsAsyncActions.removeCard(retroSessionId, retroTemplateId, retroColumnId, retroCard._id)
    );

    if (!getIsRejectedActionPayload(payload) && onClose) {
      dispatch(uiActions.modalPreventCloseSet(false));
      onClose();
    }
  };

  if (!retroCard) {
    return null;
  }

  return (
    <Modal>
      <PaperHeader
        mb={0}
      >
        {t('pages.retro.removeCardModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('pages.retro.removeCardModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('pages.retro.removeCardModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroCardRemoveModal,
};
