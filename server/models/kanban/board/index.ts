import {
  KANBAN_BOARD_TITLE_MIN_LENGTH,
  KANBAN_BOARD_TITLE_MAX_LENGTH,
  KANBAN_BOARD_DESC_MAX_LENGTH,
  KANBAN_BOARD_DESC_MIN_LENGTH,
} from '@chpokify/models-types';
import mongoose from 'mongoose';

import { KanbanColumnSchema } from '@models/kanban/board/column';
import { kanbanBoardSchemaStatic } from '@models/kanban/board/static';
import { TKanbanBoardDocument, TKanbanBoardModel } from '@models/kanban/board/types';

const KanbanBoardSchema = new mongoose.Schema<TKanbanBoardDocument>({
  title: {
    type: mongoose.Schema.Types.String,
    minlength: KANBAN_BOARD_TITLE_MIN_LENGTH,
    maxlength: KANBAN_BOARD_TITLE_MAX_LENGTH,
    default: 'Default board',
  },
  desc: {
    type: mongoose.Schema.Types.String,
    minlength: KANBAN_BOARD_DESC_MIN_LENGTH,
    maxlength: KANBAN_BOARD_DESC_MAX_LENGTH,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spacer',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  columns: [KanbanColumnSchema],
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
KanbanBoardSchema.index({
  _id: 1,
  spaceId: 1,
  isDeleted: 1,
});

KanbanBoardSchema.index({
  kanbanBoardId: 1,
  isDeleted: 1,
});

KanbanBoardSchema.index({
  spaceId: 1,
  isDeleted: 1,
});

KanbanBoardSchema.index({
  _id: 1,
  isDeleted: 1,
});

KanbanBoardSchema.statics = kanbanBoardSchemaStatic;

const KanbanBoardModel = mongoose.model<TKanbanBoardDocument, TKanbanBoardModel>(
  'KanbanBoard', KanbanBoardSchema
);

export type {
  TKanbanBoardDocument,
  TKanbanBoardModel,
};
export { KanbanBoardModel };
