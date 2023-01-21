import {
  KANBAN_COLUMN_TITLE_MAX_LENGTH,
  KANBAN_COLUMN_TITLE_MIN_LENGTH,
} from '@chpokify/models-types';
import mongoose from 'mongoose';

import { TKanbanColumnDocument } from '@models/kanban/board/column/types';

const KanbanColumnSchema = new mongoose.Schema<TKanbanColumnDocument>({
  title: {
    type: mongoose.Schema.Types.String,
    minlength: KANBAN_COLUMN_TITLE_MIN_LENGTH,
    maxlength: KANBAN_COLUMN_TITLE_MAX_LENGTH,
    required: true,
  },
});

KanbanColumnSchema.index({
  _id: 1,
  boardId: 1,
  isDeleted: 1,
});

KanbanColumnSchema.index({
  boardId: 1,
  isDeleted: 1,
});

export { KanbanColumnSchema };
