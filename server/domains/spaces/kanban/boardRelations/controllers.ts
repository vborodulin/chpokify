import {
  kanbanBoardIdColumnIdTasksIdsSchemas,
  SUCCESS_VOID_RESULT,
  TSuccessVoidResult,
} from '@chpokify/api-schemas';

import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { KanbanBoardIdColumnIdTasksIdsModel } from '@models/kanban';
import { TKanbanBoardDocument } from '@models/kanban/board';
import { TKanbanBoardIdColumnIdTasksIdsDocument } from '@models/kanban/boardIdColumnIdTasksIds/types';
import { TSpaceDocument } from '@models/space';
import { StoryModel } from '@models/story';

import { KanbanBoardRelationsService } from '@spaces/kanban/boardRelations/services';

const getManyByBoard = createHandler(async (
  req: TAppRequest<{}>,
  res: TAppResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TGetManyResResp>
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;

  const boardRelations = await KanbanBoardIdColumnIdTasksIdsModel.find({
    boardId: board._id,
  },
  [
    'tasksIds',
    'boardId',
    'columnId',
  ]);

  res.locals.result = {
    boardRelations,
  };
});

const createTask = createHandler(async (
  req: TAppRequest<{}, kanbanBoardIdColumnIdTasksIdsSchemas.TCreateBodyReq>,
  res: TAppResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TCreateResResp>
) => {
  const {
    title,
    description,
  } = req.body;

  const space = res.locals.get('space') as TSpaceDocument;
  const boardRelations = res.locals.get('kanbanBoardRelations') as TKanbanBoardIdColumnIdTasksIdsDocument;

  const nextId = await StoryModel.getNextId(space._id);
  const task = StoryModel.createNew(space._id, {
    title,
    description,
    id: nextId,
  });

  boardRelations.tasksIds.push(task._id);

  await Promise.all([
    boardRelations.save(),
    task.save(),
  ]);

  res.locals.result = {
    boardRelations,
  };
});

const moveTaskInColumn = createHandler(async (
  req: TAppRequest<{}, kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    taskStartIdx,
    taskFinishIdx,
    taskId,
  } = req.body;

  const boardRelations = res.locals.get('kanbanBoardRelations') as TKanbanBoardIdColumnIdTasksIdsDocument;

  const boardRelationsService = new KanbanBoardRelationsService(boardRelations);

  boardRelationsService.moveTaskInColumn(taskId, taskStartIdx, taskFinishIdx);

  await boardRelations.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const moveTaskBetweenColumns = createHandler(async (
  req: TAppRequest<{}, kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBetweenColumnsBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    taskStartIdx,
    taskFinishIdx,
    taskId,
  } = req.body;

  const kanbanBoardRelationsFromColumnStart = res.locals.get('kanbanBoardRelationsFromColumnStart') as
        TKanbanBoardIdColumnIdTasksIdsDocument;
  const kanbanBoardRelationsFromColumnFinish = res.locals.get('kanbanBoardRelationsFromColumnFinish') as
        TKanbanBoardIdColumnIdTasksIdsDocument;

  KanbanBoardRelationsService.moveTaskInBetweenColumns(
    kanbanBoardRelationsFromColumnStart,
    kanbanBoardRelationsFromColumnFinish,
    { taskId, taskStartIdx, taskFinishIdx }
  );

  await Promise.all([
    kanbanBoardRelationsFromColumnStart.save(),
    kanbanBoardRelationsFromColumnFinish.save(),
  ]);

  res.locals.result = SUCCESS_VOID_RESULT;
});

const removeTask = createHandler(async (
  req: TAppRequest<{ taskId: string }>,
  res: TAppResponse<kanbanBoardIdColumnIdTasksIdsSchemas.TRemoveTaskResResp>
) => {
  const { taskId } = req.params;
  const boardRelations = res.locals.get('kanbanBoardRelations') as TKanbanBoardIdColumnIdTasksIdsDocument;

  const boardRelationsService = new KanbanBoardRelationsService(boardRelations);

  boardRelationsService.removeTask(taskId);

  await Promise.all([
    boardRelations.save(),
  ]);

  res.locals.result = {
    boardRelations,
  };
});

export const kanbanBoardRelationsControllers = {
  createTask,
  getManyByBoard,
  moveTaskInColumn,
  moveTaskBetweenColumns,
  removeTask,
};
