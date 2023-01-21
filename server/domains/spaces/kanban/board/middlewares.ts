import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { KanbanBoardModel } from '@models/kanban';
import { TSpaceDocument } from '@models/space';

const withBoard = createHandler(async (
  req: TAppRequest<{ boardId: string }>,
  res
) => {
  const { params: { boardId } } = req;

  const { value } = coreSchemas.ObjectIdSchema.validate(boardId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'invalidId'],
        message: transServer.t('errors.kanbanBoard.invalidId'),
      },
    ]);
  }

  const space = res.locals.get('space') as TSpaceDocument;

  const kanbanBoard = await KanbanBoardModel.findOne({
    _id: boardId,
    spaceId: space._id,
  });

  if (!kanbanBoard) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.kanbanBoard.notFound'),
        path: ['params', 'boardId'],
      },
    ]);
  }

  res.locals.set('kanbanBoard', kanbanBoard);
});

const kanbanBoardMiddlewares = {
  withBoard,
};

export {
  kanbanBoardMiddlewares,
};
