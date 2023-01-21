import { TKanbanBoardIdColumnIdTasksIds } from '@chpokify/models-types';
import mongoose from 'mongoose';

type TKanbanBoardIdColumnIdTasksIdsDocument = mongoose.Document & TKanbanBoardIdColumnIdTasksIds;
type TKanbanBoardIdColumnIdTasksIdsModel = mongoose.Model<TKanbanBoardIdColumnIdTasksIdsDocument>

export type{
  TKanbanBoardIdColumnIdTasksIdsDocument,
  TKanbanBoardIdColumnIdTasksIdsModel,
};
