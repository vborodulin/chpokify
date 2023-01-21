import { kanbanBoardIdColumnIdTasksIdsSchemas } from '@chpokify/api-schemas';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { SPACE_PARTICIPANT_ROLE } from '@models/space';

import { kanbanBoardRelationsControllers } from '@spaces/kanban/boardRelations/controllers';
import { kanbanBoardRelationsMiddlewares } from '@spaces/kanban/boardRelations/middlewares';
import { kanbanColumnMiddlewares } from '@spaces/kanban/column/middlewares';
import { spacesMiddlewares } from '@spaces/middlewares';

const kanbanBoardRelationsRouter = Router();

kanbanBoardRelationsRouter.get(
  '/',
  kanbanBoardRelationsControllers.getManyByBoard
);

kanbanBoardRelationsRouter.post(
  '/columns/move/task',
  kanbanBoardRelationsMiddlewares.withRelationsFromMoveTask,
  validateMiddleware(kanbanBoardIdColumnIdTasksIdsSchemas.moveTaskBetweenColumnsSchema),
  kanbanBoardRelationsControllers.moveTaskBetweenColumns
);

kanbanBoardRelationsRouter.use(
  '/columns/:kanbanColumnId',
  kanbanColumnMiddlewares.withColumn('params')
);

kanbanBoardRelationsRouter.post(
  '/columns/:kanbanColumnId/tasks',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  kanbanBoardRelationsMiddlewares.checkAlreadyExists,
  validateMiddleware(kanbanBoardIdColumnIdTasksIdsSchemas.createTaskSchema),
  kanbanBoardRelationsControllers.createTask
);

kanbanBoardRelationsRouter.put(
  '/columns/:kanbanColumnId/move/task',
  kanbanBoardRelationsMiddlewares.withRelation,
  validateMiddleware(kanbanBoardIdColumnIdTasksIdsSchemas.moveTaskSchema),
  kanbanBoardRelationsControllers.moveTaskInColumn
);

kanbanBoardRelationsRouter.delete(
  '/columns/:kanbanColumnId/tasks/:taskId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  kanbanBoardRelationsMiddlewares.withRelation,
  kanbanBoardRelationsControllers.removeTask
);

export {
  kanbanBoardRelationsRouter,
};
