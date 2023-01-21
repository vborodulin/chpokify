import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { kanbanBoardRelationsAsyncActions } from '@Redux/domains/kanbanBoardRelations/asyncActions';
import { kanbanBoardAsyncActions } from '@Redux/domains/kanbanBoards/asyncActions';
import { kanbanBoardsSelectors } from '@Redux/domains/kanbanBoards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { KanbanColumnAddBtn } from '@components/domains/kanban/buttons/KanbanColumnAddBtn';
import { KanbanBoardDroppable } from '@components/domains/kanban/KanbanBoard/KanbanBoardDroppable';
import { KanbanColumn } from '@components/domains/kanban/KanbanColumn';

import { Grid, TGridProps } from '@components/uiKit/Grid';

type KanbanBoardContentProps = Partial<TGridProps>;

const KanbanBoardContent = (props: KanbanBoardContentProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currBoardId = useSelector(kanbanBoardsSelectors.getCurrBoardId);
  const columnsIds = useSelector(kanbanBoardsSelectors.getColumnsIds);
  const spaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const enhanceUpdateTasksInColumnData = (taskStartIdx: number, taskFinishIdx: number, taskId: TEntityID) =>
    ({
      taskStartIdx,
      taskFinishIdx,
      taskId,
    });

  const moveTaskBetweenColumn = async (
    result: DropResult,
    startColumnId: TEntityID,
    finishColumnId: TEntityID
  ) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    const sendData = {
      columnStartId: startColumnId,
      columnFinishId: finishColumnId,
      taskStartIdx: source.index,
      taskFinishIdx: destination.index,
      taskId: draggableId,
    };

    await dispatch(
      kanbanBoardRelationsAsyncActions.moveTaskBetweenColumns(spaceId, currBoardId, sendData)
    );
  };

  const moveTaskInColumn = async (result: DropResult, startColumnId: TEntityID) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    const sendData = enhanceUpdateTasksInColumnData(source.index, destination.index, draggableId);

    await dispatch(
      kanbanBoardRelationsAsyncActions.moveTaskInColumn(spaceId, currBoardId, startColumnId, sendData)
    );
  };

  const handleSavePositionTask = async (result: DropResult) => {
    const {
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (!startColumnId || !finishColumnId) return;

    if (isEqualsId(startColumnId, finishColumnId)) {
      await moveTaskInColumn(result, startColumnId);
      return;
    }

    await moveTaskBetweenColumn(result, startColumnId, finishColumnId);
  };

  const handleSavePositionColumn = async (result: DropResult) => {
    const {
      draggableId,
      source,
      destination,
    } = result;

    if (!destination) {
      return;
    }

    /**
     * Move column
     */
    const sendData = {
      columnStartIdx: source.index,
      columnFinishIdx: destination.index,
      columnId: draggableId,
    };

    await dispatch(
      kanbanBoardAsyncActions.moveColumn(spaceId, currBoardId, sendData)
    );
  };

  const handleSavePosition = (result: DropResult) => {
    const { type } = result;

    switch (type) {
      case 'task':
        handleSavePositionTask(result);
        break;
      case 'column':
        handleSavePositionColumn(result);
        break;
      default:
        break;
    }
  };

  const handleDragEnd = (result: DropResult) => {
    handleSavePosition(result);
  };

  if (!currBoardId) {
    return null;
  }

  return (
    <KanbanBoardDroppable
      handleDragEnd={handleDragEnd}
    >
      {
        (provided) => (
          <Grid
            gridGap={4}
            flexGrow={1}
            gridAutoFlow="column"
            gridAutoRows="100%"
            justifyContent="flex-start"
            ref={provided.innerRef}
            overflowX="scroll"
            {...provided.droppableProps}
            {...other}
          >
            {
              columnsIds.map((columnId, index) =>
                (
                  <KanbanColumn
                    key={columnId.toString()}
                    columnId={columnId.toString()}
                    spaceId={spaceId}
                    boardId={currBoardId}
                    index={index}
                  />
                ))
            }
            {provided.placeholder}
            <KanbanColumnAddBtn
              canModerate={canModerate}
            />
          </Grid>
        )
      }
    </KanbanBoardDroppable>
  );
};

export {
  KanbanBoardContent,
};
