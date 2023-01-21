import { kanbanBoardSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { kanbanBoardsControllers } from '@spaces/kanban/board/controllers';
import { kanbanBoardRelationsRouter } from '@spaces/kanban/boardRelations/routes';
import { kanbanColumnRouter } from '@spaces/kanban/column/routes';
import { spacesMiddlewares } from '@spaces/middlewares';

import { kanbanBoardMiddlewares } from './middlewares';

const kanbanBoardRouter = Router();

kanbanBoardRouter.get(
  '/',
  kanbanBoardsControllers.getMany
);

kanbanBoardRouter.post(
  '/',
  validateMiddleware(kanbanBoardSchemas.createBoardSchema),
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  kanbanBoardsControllers.create
);

kanbanBoardRouter.use(
  '/:boardId',
  kanbanBoardMiddlewares.withBoard
);

kanbanBoardRouter.get(
  '/:boardId',
  kanbanBoardsControllers.get
);

kanbanBoardRouter.put(
  '/:boardId',
  validateMiddleware(kanbanBoardSchemas.updateBoardSchema),
  kanbanBoardsControllers.update
);

kanbanBoardRouter.put(
  '/:boardId/move/column',
  validateMiddleware(kanbanBoardSchemas.moveColumnSchema),
  kanbanBoardsControllers.moveColumn
);

kanbanBoardRouter.delete(
  '/:boardId',
  kanbanBoardsControllers.remove
);

kanbanBoardRouter.use(
  '/:boardId/relations',
  kanbanBoardRelationsRouter
);

kanbanBoardRouter.use(
  '/:boardId/columns',
  kanbanColumnRouter
);

export {
  kanbanBoardRouter,
};
