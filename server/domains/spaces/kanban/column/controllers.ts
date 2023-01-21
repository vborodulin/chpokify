import {
  kanbanColumnSchemas,
} from '@chpokify/api-schemas';
import { ObjectID } from 'bson';

import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { KanbanBoardIdColumnIdTasksIdsModel } from '@models/kanban';
import { TKanbanColumnDocument } from '@models/kanban/board/column/types';
import { TKanbanBoardDocument } from '@models/kanban/board/types';

const create = createHandler(async (
  req: TAppRequest<{}, kanbanColumnSchemas.TCreateColumnBodyReq>,
  res: TAppResponse<kanbanColumnSchemas.TCreateColumnResResp>
) => {
  const { title } = req.body;

  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;

  const column = board.columns.create({
    _id: new ObjectID(),
    title,
  });

  const boardRelations = new KanbanBoardIdColumnIdTasksIdsModel({
    boardId: board._id,
    columnId: column._id,
    tasksIds: [],
  });

  board.columns.push(column);

  await Promise.all([
    boardRelations.save(),
    board.save(),
  ]);

  res.locals.result = {
    board,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, kanbanColumnSchemas.TUpdateColumnBodyReq>,
  res: TAppResponse<kanbanColumnSchemas.TUpdateColumnResResp>
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const column = res.locals.get('kanbanBoardColumn') as TKanbanColumnDocument;

  column.set(req.body);

  await board.save();

  res.locals.result = {
    board,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<kanbanColumnSchemas.TRemoveColumnResResp>
) => {
  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const column = res.locals.get('kanbanBoardColumn') as TKanbanColumnDocument;

  await Promise.all([
    column.remove(),
    KanbanBoardIdColumnIdTasksIdsModel.remove({
      boardId: board._id,
      columnId: column._id,
    }),
  ]);

  await board.save();

  res.locals.result = {
    board,
  };
});

export const kanbanColumnControllers = {
  create,
  update,
  remove,
};
