import { USER_ROLES } from '@chpokify/models-types';
import { Router } from 'express';

import { authMiddleware } from '@core/middleware/auth';

import { statsController } from './controllers';

const statsRouter = Router();

statsRouter.get(
  '/admins',
  authMiddleware(USER_ROLES.ADMIN),
  statsController.getAdmins
);

statsRouter.get(
  '/spaces',
  authMiddleware(USER_ROLES.ADMIN),
  statsController.getSpaces
);

export {
  statsRouter,
};
