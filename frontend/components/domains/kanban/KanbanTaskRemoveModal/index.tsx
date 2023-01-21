import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { kanbanBoardRelationActionsTypes } from '@Redux/domains/kanbanBoardRelations/actionsTypes';
import { kanbanBoardRelationsAsyncActions } from '@Redux/domains/kanbanBoardRelations/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type KanbanTaskRemoveModalProps = {
  onClose: () => void;
  kanbanColumnId: TEntityID,
  kanbanBoardId: TEntityID,
  kanbanTaskId: TEntityID,
  spaceId: TEntityID,
};

const KanbanTaskRemoveModal = (props: KanbanTaskRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    kanbanColumnId,
    kanbanBoardId,
    kanbanTaskId,
    spaceId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    kanbanBoardRelationActionsTypes.REMOVE_TASK_PENDING,
  ]);

  const handleRemove = async () => {
    const { payload } = await dispatch(
      kanbanBoardRelationsAsyncActions.removeTask(spaceId, kanbanBoardId, kanbanColumnId, kanbanTaskId)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal>
      <PaperHeader>
        {t('kanbanTaskRemoveModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('kanbanTaskRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('kanbanTaskRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanTaskRemoveModal,
};
