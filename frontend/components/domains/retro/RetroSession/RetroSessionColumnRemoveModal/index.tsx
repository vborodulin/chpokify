import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';
import { retroTemplatesAsyncActions } from '@Redux/domains/retroTemplates/asyncActions';
import { retroTemplatesSelectors } from '@Redux/domains/retroTemplates/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TRetroColumnRemoveModalProps = Partial<TModalProps> & {
  onClose: () => void;
  retroColumnId: TEntityID,
};

const RetroColumnRemoveModal = (props: TRetroColumnRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    retroColumnId,
  } = props;
  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const curRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const curRetroTemplateId = useSelector(retroTemplatesSelectors.getCurrId);
  const column = useSelector(retroTemplatesSelectors.getColumnById)(retroColumnId);
  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    retroTemplatesActionsTypes.REMOVE_COLUMN_PENDING,
  ]);

  const handleRemove = async () => {
    const { payload } = await dispatch(
      retroTemplatesAsyncActions.removeColumn(curRetroSessionId, curRetroTemplateId, retroColumnId)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  if (!column) {
    return null;
  }

  return (
    <Modal>
      <PaperHeader
        mb={0}
      >
        {t('pages.retro.removeColumnModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('pages.retro.removeColumnModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('pages.retro.removeColumnModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  RetroColumnRemoveModal,
};
