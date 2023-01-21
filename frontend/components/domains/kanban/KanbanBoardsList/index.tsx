import React from 'react';
import { useSelector } from 'react-redux';

import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { KanbanBoardsListItem } from '@components/domains/kanban/KanbanBoardsList/KanbanBoardsListItem';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TKanbanBoardsListProps = Partial<TBoxProps> & {
};

const KanbanBoardsList = (props: TKanbanBoardsListProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const boards = useSelector(kanbanBoardsSelectors.getEntitiesList);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  return (
    <Box
      {...other}
    >
      {
        boards.map((board) => (
          <KanbanBoardsListItem
            key={board._id.toString()}
            board={board}
            spaceId={currSpaceId}
            canModerate={canModerate}
          />
        ))
      }
    </Box>
  );
};

export {
  KanbanBoardsList,
};
