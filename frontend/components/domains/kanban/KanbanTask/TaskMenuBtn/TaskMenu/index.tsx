import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Layout } from './Layout';

export type TTaskMenu = {
  columnId: TEntityID;
  taskId: TEntityID;
};

const TaskMenu = React.forwardRef<any, TTaskMenu>((props, ref) => {
  const {
    taskId,
    columnId,
    ...other
  } = props;
  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currBoardId = useSelector(kanbanBoardsSelectors.getCurrBoardId);

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_TASK_EDIT, {
      kanbanTaskId: taskId,
      spaceId: currSpaceId,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.KANBAN_TASK_REMOVE, {
      kanbanTaskId: taskId,
      kanbanColumnId: columnId,
      kanbanBoardId: currBoardId,
      spaceId: currSpaceId,
    }));
  };

  return (
    <Layout
      ref={ref}
      hasRemoveItem
      hasEditItem
      onEdit={handleEdit}
      onRemove={handleRemove}
      {...other}
    />
  );
});

TaskMenu.displayName = 'TaskMenu';

export {
  TaskMenu,
};
