import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type KanbanColumnRemoveModalProps = {
  onClose: () => void;
  kanbanColumnId: TEntityID,
  kanbanBoardId: TEntityID,
  spaceId: TEntityID,
};

const KanbanColumnRemoveModal = (props: KanbanColumnRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    kanbanColumnId,
    kanbanBoardId,
    spaceId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    kanbanBoardActionsTypes.REMOVE_COLUMN_PENDING,
  ]);

  const handleRemove = async () => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.removeColumn(spaceId, kanbanBoardId, kanbanColumnId)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal>
      <PaperHeader>
        {t('kanbanColumnRemoveModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('kanbanColumnRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('kanbanColumnRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanColumnRemoveModal,
};
