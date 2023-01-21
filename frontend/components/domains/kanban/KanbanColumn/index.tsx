import { TEntityID } from '@chpokify/models-types';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { kanbanBoardRelationsSelectors } from '@Redux/domains/kanbanBoardRelations/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';

import { KanbanTask } from '@components/domains/kanban/KanbanTask';
import { KanbanTaskCreate } from '@components/domains/kanban/KanbanTaskCreate';

import { Box } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { IconAdd } from '@components/uiKit/Icons';

import { ColumnHeader } from './ColumnHeader';

type TKanbanColumnProps = {
  spaceId: TEntityID,
  boardId: TEntityID,
  columnId: string,
  index: number;
};

const KanbanColumn = React.memo((props: TKanbanColumnProps): React.ReactElement | null => {
  const {
    columnId,
    index,
    spaceId,
    boardId,
  } = props;

  const tasksIdsFromColumn = [];

  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const columnFromRelations = useSelector(kanbanBoardRelationsSelectors.getByColumnById)(columnId);
  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleToggleAddTask = () => {
    if (!canModerate) {
      return;
    }

    setIsAddOpen((prevVal) => !prevVal);
  };

  const handleCancelAddTask = () => {
    setIsAddOpen(false);
  };

  if (!columnFromRelations) {
    return null;
  }

  return (
    <Draggable
      draggableId={columnId}
      index={index}
    >
      {
        (providedColumn) => (
          <Flex
            maxWidth={['280px', '356px']}
            minWidth={['280px', '356px']}
            flexDirection="column"
            ref={providedColumn.innerRef}
            {...providedColumn.draggableProps}
          >
            <ColumnHeader
              columnId={columnId}
              mb={2}
              {...providedColumn.dragHandleProps}
            />
            <Box>
              <Droppable
                droppableId={columnId}
                type="task"
              >
                {
                  (provided) => (
                    <Grid
                      paddingY={!tasksIdsFromColumn.length ? 1 : 0}
                      gridGap={2}
                      flexGrow={1}
                      alignContent="flex-start"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        columnFromRelations.tasksIds.map((taskId, taskIndex) => (
                          <KanbanTask
                            key={taskId.toString()}
                            taskId={taskId.toString()}
                            index={taskIndex}
                            columnId={columnId}
                          />
                        ))
                       }
                      {provided.placeholder}
                    </Grid>
                  )
                }
              </Droppable>
              {
                isAddOpen && (
                  <KanbanTaskCreate
                    mt={2}
                    borderRadius={2}
                    spaceId={spaceId}
                    boardId={boardId}
                    columnId={columnId}
                    onCancel={handleCancelAddTask}
                  />
                )
              }
              {
                canModerate
                && (
                  <Button
                    mt={2}
                    onClick={handleToggleAddTask}
                    startIcon={(
                      <IconAdd />
                    )}
                    fullWidth
                  />
                )
              }
            </Box>
          </Flex>
        )
      }
    </Draggable>
  );
});

export {
  KanbanColumn,
};
