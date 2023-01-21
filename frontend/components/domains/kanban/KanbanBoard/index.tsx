import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';

import { KanbanBoardContent } from '@components/domains/kanban/KanbanBoard/KanbanBoardContent';
import { KanbanBoardHeader } from '@components/domains/kanban/KanbanBoard/KanbanBoardHeader';
import { NotFound } from '@components/domains/layouts/NotFound';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { Flex } from '@components/uiKit/Flex';

import { TRANS } from '@components/utils/types';

const KanbanBoard = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const currKanbanBoardId = useSelector(kanbanBoardsSelectors.getCurrBoardId);
  const boardApiErr = useSelector(asyncRejectedSelectors.createErrorSelector)(
    [kanbanBoardActionsTypes.GET_PENDING]
  );

  if (boardApiErr) {
    return (
      <NotFound />
    );
  }

  if (!currKanbanBoardId) {
    return (
      <ContentCenter>
        <ContentEmpty>
          {t('kanban.board.empty')}
        </ContentEmpty>
      </ContentCenter>
    );
  }

  return (
    <Flex
      flexGrow={1}
      flexDirection="column"
      mt={6}
    >
      <KanbanBoardHeader />
      <KanbanBoardContent />
    </Flex>
  );
};

export {
  KanbanBoard,
};
