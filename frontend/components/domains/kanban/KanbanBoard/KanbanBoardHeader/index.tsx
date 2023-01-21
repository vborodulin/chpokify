import React from 'react';
import { useSelector } from 'react-redux';

import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { KanbanBoardActions } from '@components/domains/kanban/KanbanBoard/KanbanBoardHeader/KanbanBoardActions';
import { KanbanBoardTitle } from '@components/domains/kanban/KanbanBoard/KanbanBoardHeader/KanbanBoardTitle';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

type TKanbanBoardHeaderProps = Partial<TFlexProps>;

const KanbanBoardHeader = (props: TKanbanBoardHeaderProps): React.ReactElement | null => {
  const { ...other } = props;

  const dispatch = useAppDispatch();

  const currKanbanBoard = useSelector(kanbanBoardsSelectors.getCurrBoard);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const onClickEditModal = () => {
    if (!canModerate || !currKanbanBoard?._id) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_BOARD_EDIT, {
      boardId: currKanbanBoard._id,
      spaceId: currSpaceId,
    }));
  };

  if (!currKanbanBoard) {
    return null;
  }

  return (
    <Flex
      mb={4}
      alignItems="center"
      gap={3}
      justifyContent="space-between"
      {...other}
    >
      <KanbanBoardTitle
        canModerate={canModerate}
        onClickEditModal={onClickEditModal}
        title={currKanbanBoard.title}
      />
      <KanbanBoardActions
        spaceId={currSpaceId}
        boardId={currKanbanBoard._id}
        canModerate={canModerate}
      />
    </Flex>
  );
};

export {
  KanbanBoardHeader,
};
