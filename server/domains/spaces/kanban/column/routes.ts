import { kanbanColumnSchemas } from '@chpokify/api-schemas';
import { SPACE_PARTICIPANT_ROLE } from '@chpokify/models-types';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { kanbanColumnControllers } from '@spaces/kanban/column/controllers';
import { kanbanColumnMiddlewares } from '@spaces/kanban/column/middlewares';
import { spacesMiddlewares } from '@spaces/middlewares';

const kanbanColumnRouter = Router();

kanbanColumnRouter.post(
  '/',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  validateMiddleware(kanbanColumnSchemas.createColumnSchema),
  kanbanColumnControllers.create
);

kanbanColumnRouter.use(
  '/:kanbanColumnId',
  kanbanColumnMiddlewares.withColumn('params')
);

kanbanColumnRouter.put(
  '/:kanbanColumnId',
  validateMiddleware(kanbanColumnSchemas.updateColumnSchema),
  kanbanColumnControllers.update
);

kanbanColumnRouter.delete(
  '/:kanbanColumnId',
  spacesMiddlewares.checkHasRole(SPACE_PARTICIPANT_ROLE.ADMIN),
  kanbanColumnControllers.remove
);

export {
  kanbanColumnRouter,
};
