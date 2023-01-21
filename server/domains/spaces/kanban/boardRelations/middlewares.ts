import { kanbanBoardIdColumnIdTasksIdsSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { KanbanBoardIdColumnIdTasksIdsModel } from '@models/kanban';
import { TKanbanColumnDocument } from '@models/kanban/board/column/types';
import { TKanbanBoardDocument } from '@models/kanban/board/types';

const checkAlreadyExists = createHandler(async (
  req: TAppRequest,
  res
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const column = res.locals.get('kanbanBoardColumn') as TKanbanColumnDocument;

  const boardRelations = await KanbanBoardIdColumnIdTasksIdsModel.findOne({
    boardId: board._id,
    columnId: column._id,
  });

  if (!boardRelations) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        message: transServer.t('errors.kanbanBoardRelations.notFound'),
        path: ['boardId', 'columnId'],
      },
    ]);
  }

  res.locals.set('kanbanBoardRelations', boardRelations);
});

const withRelation = createHandler(async (
  req: TAppRequest,
  res
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const column = res.locals.get('kanbanBoardColumn') as TKanbanColumnDocument;

  const boardRelations = await KanbanBoardIdColumnIdTasksIdsModel.findOne({
    boardId: board._id,
    columnId: column._id,
  });

  if (!boardRelations) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        message: transServer.t('errors.kanbanBoardRelations.notFound'),
        path: ['boardId', 'columnId'],
      },
    ]);
  }

  res.locals.set('kanbanBoardRelations', boardRelations);
});

const withRelationsFromMoveTask = createHandler(async (
  req: TAppRequest<{}, kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBetweenColumnsBodyReq>,
  res
) => {
  const {
    columnFinishId,
    columnStartId,
  } = req.body;

  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;

  const boardId = board._id;

  const [boardRelationsFromColumnStart, boardRelationsFromColumnFinish] = await Promise.all([
    KanbanBoardIdColumnIdTasksIdsModel.findOne({
      boardId,
      columnId: columnStartId,

    }),
    KanbanBoardIdColumnIdTasksIdsModel.findOne({
      boardId,
      columnId: columnFinishId,
    }),
  ]);

  if (!boardRelationsFromColumnStart || !boardRelationsFromColumnFinish) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.kanbanBoardRelations.notFound'),
        path: ['boardId', 'columnId'],
      },
    ]);
  }

  res.locals.set('kanbanBoardRelationsFromColumnStart', boardRelationsFromColumnStart);
  res.locals.set('kanbanBoardRelationsFromColumnFinish', boardRelationsFromColumnFinish);
});

const kanbanBoardRelationsMiddlewares = {
  checkAlreadyExists,
  withRelation,
  withRelationsFromMoveTask,
};

export {
  kanbanBoardRelationsMiddlewares,
};
