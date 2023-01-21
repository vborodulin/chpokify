import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { kanbanBoardActionsTypes } from '@Redux/domains/kanbanBoards/actionsTypes';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';

import { KanbanBoardCreateBtn } from '@components/domains/kanban/buttons/KanbanCreateBoardBtn';
import { KanbanBoardsList } from '@components/domains/kanban/KanbanBoardsList';
import { KanbanThumb } from '@components/domains/kanban/KanbanThumb';
import { NotFound } from '@components/domains/layouts/NotFound';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { Flex } from '@components/uiKit/Flex';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

const KanbanIndex = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const countBoards = useSelector(kanbanBoardsSelectors.getCount);

  const boardsApiErr = useSelector(asyncRejectedSelectors.createErrorSelector)(
    [kanbanBoardActionsTypes.GET_LIST_PENDING]
  );

  if (boardsApiErr) {
    return (
      <NotFound />
    );
  }

  if (!countBoards) {
    return (
      <ContentCenter>
        <KanbanThumb />
      </ContentCenter>
    );
  }

  return (
    <Paper
      variant="card"
      width={['100%', '50%']}
      marginX="auto"
      my={6}
    >
      <PaperHeader>
        <Flex
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            as="h3"
            fontSize={6}
            fontWeight={1}
          >
            {t('kanban.boards.title')}
          </Text>

          <KanbanBoardCreateBtn />
        </Flex>

      </PaperHeader>

      <PaperContent>
        <KanbanBoardsList />
      </PaperContent>
    </Paper>
  );
};

export {
  KanbanIndex,
};
