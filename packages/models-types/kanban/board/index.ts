import { TEntityID } from '@chpokify/models-types';

import { TKanbanColumn } from '../column';

const KANBAN_BOARD_TITLE_MIN_LENGTH = 3;
const KANBAN_BOARD_TITLE_MAX_LENGTH = 50;

const KANBAN_BOARD_DESC_MIN_LENGTH = 3;
const KANBAN_BOARD_DESC_MAX_LENGTH = 150;

export type TKanbanBoard = {
  _id: TEntityID;
  title: string;
  desc?: string;
  spaceId: TEntityID;
  userId: TEntityID;
  columns: TKanbanColumn[];
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
};

export {
  KANBAN_BOARD_TITLE_MIN_LENGTH,
  KANBAN_BOARD_TITLE_MAX_LENGTH,
  KANBAN_BOARD_DESC_MIN_LENGTH,
  KANBAN_BOARD_DESC_MAX_LENGTH,
};
