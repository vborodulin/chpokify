import { TEntityID } from '@chpokify/models-types';

type TKanbanBoardIdColumnIdTasksIds = {
  _id: TEntityID;
  boardId: TEntityID;
  columnId: TEntityID;
  tasksIds: TEntityID[];
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

export type{
  TKanbanBoardIdColumnIdTasksIds,
};
