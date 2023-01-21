import { kanbanBoardSchemas, SUCCESS_VOID_RESULT, TSuccessVoidResult } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { KanbanBoardModel } from '@models/kanban';
import { TKanbanBoardDocument } from '@models/kanban/board/types';
import { TSpaceDocument } from '@models/space';

const get = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<kanbanBoardSchemas.TGetBoardResResp>
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  res.locals.result = {
    board,
  };
});

const getMany = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<kanbanBoardSchemas.TGetManyBoardsResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const boards = await KanbanBoardModel.find({
    spaceId: space._id,
  });

  res.locals.result = {
    boards,
  };
});

const create = createHandler(async (
  req: TAppRequest<{}, kanbanBoardSchemas.TCreateBoardBodyReq>,
  res: TAppResponse<kanbanBoardSchemas.TCreateBoardResResp>
) => {
  const {
    body,
    user,
  } = req;
  const space = res.locals.get('space') as TSpaceDocument;

  const board = KanbanBoardModel.createNew({
    ...body,
    spaceId: space._id,
    userId: user._id,
  });

  await board.save();

  res.locals.result = {
    board,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, kanbanBoardSchemas.TUpdateBoardBodyReq>,
  res: TAppResponse<kanbanBoardSchemas.TUpdateBoardResResp>
) => {
  const { body } = req;

  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;

  board.set(body);

  await board.save();

  res.locals.result = {
    board,
  };
});

const moveColumn = createHandler(async (
  req: TAppRequest<{}, kanbanBoardSchemas.TMoveColumnBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    columnStartIdx,
    columnFinishIdx,
    columnId,
  } = req.body;

  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const column = board.columns.id(columnId);

  if (!column) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.kanbanBoard.column.notFound'),
        path: ['body', 'columnId'],
      },
    ]);
  }

  const newColumns = Array.from(board.columns);

  newColumns.splice(columnStartIdx, 1);
  newColumns.splice(columnFinishIdx, 0, column);

  board.set({ columns: newColumns });

  await board.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<kanbanBoardSchemas.TRemoveBoardResResp>
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  await board.remove();

  res.locals.result = {
    boardId: board._id,
  };
});

export const kanbanBoardsControllers = {
  get,
  getMany,
  create,
  update,
  remove,
  moveColumn,
};
