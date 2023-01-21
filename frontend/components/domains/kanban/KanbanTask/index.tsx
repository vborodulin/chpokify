import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Layout } from './Layout';

export type TKanbanTaskProps = {
  index: number;
  taskId: string;
  columnId:string
};

const KanbanTask = (props: TKanbanTaskProps): React.ReactElement | null => {
  const {
    index,
    taskId,
    columnId,
    ...other
  } = props;

  return (
    <Draggable
      draggableId={taskId}
      index={index}
    >
      {
        (provided) => (
          <Layout
            ref={provided.innerRef}
            taskId={taskId}
            columnId={columnId}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...other}
          />
        )
      }
    </Draggable>
  );
};

export {
  KanbanTask,
};
