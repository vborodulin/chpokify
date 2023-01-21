import { Router } from 'express';

import { authMiddleware } from '@core/middleware/auth';

import { configControllers } from './controllers';

const configRouter = Router();

configRouter.get(
  '/',
  configControllers.getConfig
);

configRouter.get(
  '/user',
  authMiddleware(),
  configControllers.getUserConfig
);

export {
  configRouter,
};
