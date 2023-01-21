import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { TKanbanBoardDocument } from '@models/kanban/board/types';
import { StoryModel, TStoryDocument } from '@models/story';

const withTask = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest,
  res
) => {
  const { taskId } = from === 'params' ? req.params : req.body;

  const task = await StoryModel.findOne({ _id: taskId }) as TStoryDocument;

  if (!task) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.kanbanBoard.task.notFound'),
      path: [from, 'taskId'],
    }]);
  }

  res.locals.set('task', task);
});

const withColumn = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest,
  res
) => {
  const { kanbanColumnId } = from === 'params' ? req.params : req.body;

  const board = res.locals.get('kanbanBoard') as TKanbanBoardDocument;
  const { value } = coreSchemas.ObjectIdSchema.validate(kanbanColumnId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: [from, 'columnId'],
        message: transServer.t('errors.kanbanBoard.column.invalidId'),
      },
    ]);
  }

  const column = board.columns.id(kanbanColumnId);

  if (!column) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.kanbanBoard.column.notFound'),
      path: ['params', 'columnId'],
    }]);
  }

  res.locals.set('kanbanBoardColumn', column);
});

const kanbanColumnMiddlewares = {
  withTask,
  withColumn,
};

export {
  kanbanColumnMiddlewares,
};
