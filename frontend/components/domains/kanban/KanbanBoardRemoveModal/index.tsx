import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncPendingSelectors } from '@Redux/domains/asyncInfo/pending/selectors';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TKanbanBoardRemoveModalProps = TModalProps & {
  onClose: () => void;
  boardId: TEntityID,
};

const KanbanBoardRemoveModal = (props: TKanbanBoardRemoveModalProps): React.ReactElement | null => {
  const {
    onClose,
    boardId,
    spaceId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(asyncPendingSelectors.createPendingSelector)([
    kanbanBoardActionsTypes.REMOVE_PENDING,
  ]);

  const handleRemove = async () => {
    const { payload } = await dispatch(
      kanbanBoardAsyncActions.remove(spaceId, boardId)
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal>
      <PaperHeader
        mb={0}
      >
        {t('kanbanBoardRemoveModal.title')}
      </PaperHeader>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('kanbanBoardRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={handleRemove}
          >
            {t('kanbanBoardRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  KanbanBoardRemoveModal,
};
