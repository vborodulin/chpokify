import { TKanbanBoard } from '@chpokify/models-types';
import mongoose from 'mongoose';

import { typesHelpers } from '@core/types/helpers';

import { TKanbanColumnDocument } from '@models/kanban/board/column/types';
import { kanbanBoardSchemaStatic } from '@models/kanban/board/static';

type TKanbanBoardDocumentStatic = typeof kanbanBoardSchemaStatic;

export type TKanbanBoardDocument = mongoose.Document & typesHelpers.Override<TKanbanBoard, {
  columns: mongoose.Types.DocumentArray<TKanbanColumnDocument>;
}>;

export type TKanbanBoardModel = mongoose.Model<TKanbanBoardDocument> & TKanbanBoardDocumentStatic;
