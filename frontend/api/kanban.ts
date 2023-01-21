import {
  TSuccessResponse,
  kanbanBoardSchemas,
  kanbanColumnSchemas,
  kanbanBoardIdColumnIdTasksIdsSchemas,
  TSuccessVoidResult,
} from '@chpokify/api-schemas';
import { TEntityID } from '@chpokify/models-types';

import { api } from '@lib/api';

const getListBoards = async (spaceId: TEntityID) =>
  api.get<TSuccessResponse<kanbanBoardSchemas.TGetManyBoardsResResp>>(
    `/spaces/${spaceId}/kanban/boards`
  );

const getBoard = async (spaceId: TEntityID, boardId: TEntityID) =>
  api.get<TSuccessResponse<kanbanBoardSchemas.TGetBoardResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}`
  );

const createBoard = async (spaceId: TEntityID, data: kanbanBoardSchemas.TCreateBoardBodyReq) =>
  api.post<TSuccessResponse<kanbanBoardSchemas.TCreateBoardResResp>>(
    `/spaces/${spaceId}/kanban/boards`,
    data
  );

const updateBoard = async (spaceId: TEntityID, boardId: TEntityID, data: kanbanBoardSchemas.TUpdateBoardBodyReq) =>
  api.put<TSuccessResponse<kanbanBoardSchemas.TUpdateBoardResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}`,
    data
  );

const moveColumnInBoard = async (
  spaceId: TEntityID,
  boardId: TEntityID,
  data: kanbanBoardSchemas.TMoveColumnBodyReq
) =>
  api.put<TSuccessResponse<TSuccessVoidResult>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/move/column`,
    data
  );

const removeBoard = async (spaceId: TEntityID, boardId: TEntityID) =>
  api.delete<TSuccessResponse<kanbanBoardSchemas.TRemoveBoardResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}`
  );

const createColumn = async (spaceId: TEntityID, boardId: TEntityID, data: kanbanColumnSchemas.TCreateColumnBodyReq) =>
  api.post<TSuccessResponse<kanbanColumnSchemas.TCreateColumnResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/columns`,
    data
  );

const updateColumn = async (spaceId: TEntityID, boardId: TEntityID, columnId: TEntityID,
  data: kanbanColumnSchemas.TUpdateColumnBodyReq) =>
  api.put<TSuccessResponse<kanbanColumnSchemas.TUpdateColumnResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/columns/${columnId}`,
    data
  );

const moveTaskInColumn = async (
  spaceId: TEntityID,
  boardId: TEntityID,
  kanbanColumnId: TEntityID,
  data: kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBodyReq
) =>
  api.put<TSuccessResponse<TSuccessVoidResult>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/relations/columns/${kanbanColumnId}/move/task`,
    data
  );

const moveTaskBetweenColumns = async (
  spaceId: TEntityID,
  boardId: TEntityID,
  data: any
) =>
  api.post<TSuccessResponse<TSuccessVoidResult>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/relations/columns/move/task`,
    data
  );

const removeColumn = async (spaceId: TEntityID, boardId: TEntityID, columnId: TEntityID) =>
  api.delete<TSuccessResponse<kanbanColumnSchemas.TRemoveColumnResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/columns/${columnId}`
  );

const createTask = async (
  spaceId: TEntityID,
  boardId: TEntityID,
  columnId: TEntityID,
  data: kanbanBoardIdColumnIdTasksIdsSchemas.TCreateBodyReq) =>
  api.post<TSuccessResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TCreateResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/relations/columns/${columnId}/tasks`,
    data
  );

const getListBoardRelations = async (spaceId: TEntityID, boardId: TEntityID) =>
  api.get<TSuccessResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TGetManyResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/relations`
  );

const removeTask = async (spaceId: TEntityID, boardId: TEntityID, columnId: TEntityID, taskId: TEntityID) =>
  api.delete<TSuccessResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TRemoveTaskResResp>>(
    `/spaces/${spaceId}/kanban/boards/${boardId}/relations/columns/${columnId}/tasks/${taskId}`
  );

export const kanbanApi = {
  getListBoards,
  getBoard,

  createBoard,
  updateBoard,
  moveColumnInBoard,
  removeBoard,

  createColumn,
  updateColumn,
  removeColumn,

  getListBoardRelations,
  createTask,
  moveTaskInColumn,
  moveTaskBetweenColumns,
  removeTask,
};
