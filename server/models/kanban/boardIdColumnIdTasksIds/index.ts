import mongoose from 'mongoose';

import { TKanbanBoardIdColumnIdTasksIdsDocument, TKanbanBoardIdColumnIdTasksIdsModel } from './types';

const KanbanBoardIdColumnIdTasksIds = new mongoose.Schema<TKanbanBoardIdColumnIdTasksIdsDocument>({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KanbanBoard',
    required: true,
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tasksIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
},
{
  timestamps: true,
  strict: true,
  strictQuery: true,
  minimize: false,
});

/**
 * indexes
 *
 */
KanbanBoardIdColumnIdTasksIds.index({
  boardId: 1,
  isDeleted: 1,
});

KanbanBoardIdColumnIdTasksIds.index({
  boardId: 1,
  columnId: 1,
  isDeleted: 1,
});

const KanbanBoardIdColumnIdTasksIdsModel = mongoose.model<TKanbanBoardIdColumnIdTasksIdsDocument,
  TKanbanBoardIdColumnIdTasksIdsModel>(
    'KanbanBoardIdColumnIdTasksIds', KanbanBoardIdColumnIdTasksIds
  );

export { KanbanBoardIdColumnIdTasksIdsModel };
