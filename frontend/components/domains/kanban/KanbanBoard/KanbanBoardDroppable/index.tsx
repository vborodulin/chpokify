import React from 'react';
import {
  DragDropContext, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';

type TKanbanBoardDroppableProps = {
  handleDragEnd: (result: DropResult) => void,
  children: (provided: DroppableProvided) => React.ReactElement;
};

const KanbanBoardDroppable = (props: TKanbanBoardDroppableProps): React.ReactElement | null => {
  const {
    children,
    handleDragEnd,
  } = props;

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId="board"
        direction="horizontal"
        // @ts-ignore
        type="column"
      >
        {(provided) => children(provided)}
      </Droppable>
    </DragDropContext>
  );
};

export {
  KanbanBoardDroppable,
};
