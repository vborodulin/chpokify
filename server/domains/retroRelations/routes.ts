import { retroRelationsSchemas } from '@chpokify/api-schemas';
import { retroCardsMiddlewares } from '@domains/retroCards/middlewares';
import { retroTemplateMiddlewares } from '@domains/retroTemplates/middlewares';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { spacesMiddlewares } from '@spaces/middlewares';

import { retroRelationsControllers } from './controllers';
import { retroRelationsMiddlewares } from './middlewares';

const retroRelationsRouter = Router();

retroRelationsRouter.get(
  '/',
  retroRelationsControllers.getListByTemplateId
);

retroRelationsRouter.post(
  '/cards',
  validateMiddleware(retroRelationsSchemas.createCardSchema),
  spacesMiddlewares.withSpace('body'),
  retroTemplateMiddlewares.withColumn('body'),
  retroRelationsMiddlewares.withRelation,
  retroRelationsControllers.createCard
);

retroRelationsRouter.post(
  '/card/move/column/:columnId',
  validateMiddleware(retroRelationsSchemas.moveCardInColumnSchema),
  retroTemplateMiddlewares.withColumn('params'),
  retroRelationsMiddlewares.withRelation,
  retroRelationsControllers.moveCardInColumn
);

retroRelationsRouter.put(
  '/column/:columnId/move/action/card/:retroCardId',
  retroTemplateMiddlewares.withColumn('params'),
  retroCardsMiddlewares.withRetroCard,
  retroRelationsControllers.moveCardInActionColumn
);

retroRelationsRouter.delete(
  '/column/:columnId/card/:retroCardId',
  retroTemplateMiddlewares.withColumn('params'),
  retroRelationsMiddlewares.withRelation,
  retroCardsMiddlewares.withRetroCard,
  retroRelationsControllers.removeCard
);

retroRelationsRouter.post(
  '/card/move/columns',
  validateMiddleware(retroRelationsSchemas.moveCardBetweenColumnsSchema),
  retroRelationsMiddlewares.withRelationsFromMoveTask,
  retroRelationsControllers.moveCardBetweenColumns
);

export {
  retroRelationsRouter,
};
