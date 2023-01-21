import { pokerSessionsSchemas } from '@chpokify/api-schemas';
import { Router } from 'express';

import { validateMiddleware } from '@core/middleware/validate';

import { pokersSessionsMiddlewares } from '../middlewares';

import { playControllers } from './controllers';

const playRouter = Router();

playRouter.use(
  '/stories/:storyId',
  pokersSessionsMiddlewares.withStory
);

playRouter.post(
  '/stories/:storyId/choose-card',
  validateMiddleware(pokerSessionsSchemas.chooseCardsSchema),
  pokersSessionsMiddlewares.withTeam('body', true),
  playControllers.chooseCard
);

export {
  playRouter,
};
