import { TEntityID } from '@chpokify/models-types';

const KANBAN_COLUMN_TITLE_MIN_LENGTH = 3;
const KANBAN_COLUMN_TITLE_MAX_LENGTH = 50;

type TKanbanColumn = {
  _id: TEntityID;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

export type{
  TKanbanColumn,
};

export {
  KANBAN_COLUMN_TITLE_MIN_LENGTH,
  KANBAN_COLUMN_TITLE_MAX_LENGTH,
};
