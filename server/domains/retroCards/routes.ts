import { retroCardsSchemas } from '@chpokify/api-schemas/retroCardsSchemas';
import { retroCardsControllers } from '@domains/retroCards/controllers';
import { retroCardsMiddlewares } from '@domains/retroCards/middlewares';
import { retroSessionsMiddlewares } from '@domains/retroSessions/middlewares';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

const retroCardsRouter = Router();

retroCardsRouter.post(
  '/list',
  validateMiddleware(retroCardsSchemas.getListSchema),
  retroCardsControllers.getList
);

retroCardsRouter.use(
  '/:retroCardId',
  retroCardsMiddlewares.withRetroCard
);

retroCardsRouter.put(
  '/:retroCardId',
  validateMiddleware(retroCardsSchemas.updateSchema),
  retroCardsControllers.update
);

retroCardsRouter.post(
  '/:retroCardId/votes',
  retroSessionsMiddlewares.withSession('body'),
  validateMiddleware(retroCardsSchemas.addVoteSchema),
  retroCardsControllers.addVote
);

retroCardsRouter.post(
  '/:retroCardId/combined',
  validateMiddleware(retroCardsSchemas.combineCardSchema),
  retroSessionsMiddlewares.withSession('body'),
  retroCardsControllers.combineCard
);

retroCardsRouter.delete(
  '/:retroCardId/votes/:voteId',
  validateMiddleware(retroCardsSchemas.removeVoteSchema),
  retroCardsControllers.removeVote
);

export {
  retroCardsRouter,
};
