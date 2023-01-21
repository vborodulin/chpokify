import React from 'react';
import {
  DragDropContext, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';

import { TYPE_DRAG_DROP } from '@components/domains/retro/RetroSession/types';

type TRetroSessionDroppableProps = {
  handleDragEnd: (result: DropResult) => void,
  children: (provided: DroppableProvided) => React.ReactElement;
};

const RetroSessionDroppable = (props: TRetroSessionDroppableProps): React.ReactElement | null => {
  const {
    children,
    handleDragEnd,
  } = props;

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <Droppable
        droppableId="retroSession"
        direction="horizontal"
        type={TYPE_DRAG_DROP.column}
      >
        {(provided) => children(provided)}
      </Droppable>
    </DragDropContext>
  );
};

export {
  RetroSessionDroppable,
};
