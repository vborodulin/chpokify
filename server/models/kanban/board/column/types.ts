import { TKanbanColumn } from '@chpokify/models-types';
import mongoose from 'mongoose';

type TKanbanColumnDocument = mongoose.Document & TKanbanColumn;

export type {
  TKanbanColumnDocument,
};
