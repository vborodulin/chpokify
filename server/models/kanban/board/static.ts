import { TKanbanBoard } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TKanbanBoardModel } from '@models/kanban/board/types';

function createNew(this: TKanbanBoardModel, other: Partial<TKanbanBoard>) {
  return new this({
    _id: new mongoose.Types.ObjectId(),
    columnsIds: [],
    ...other,
  });
}

const kanbanBoardSchemaStatic = {
  createNew,
};
export {
  kanbanBoardSchemaStatic,
};
