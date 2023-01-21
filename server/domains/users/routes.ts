import { usersSchemas } from '@chpokify/api-schemas';
import { Router } from 'express';

import { authMiddleware } from '@core/middleware/auth';
import { validateMiddleware } from '@core/middleware/validate';

import { usersController } from '@users/controllers';
import { usersMiddleware } from '@users/middleware';

const usersRouter = Router();

usersRouter.use(
  '/',
  authMiddleware()
);

usersRouter.post(
  '/list',
  validateMiddleware(usersSchemas.getListReqSchema),
  usersController.getList
);

usersRouter.use(
  '/:userId',
  usersMiddleware.withUser
);

usersRouter.get(
  '/:userId',
  usersController.get
);

usersRouter.patch(
  '/:userId',
  validateMiddleware(usersSchemas.updateReqSchema),
  usersMiddleware.checkIsMe,
  usersController.update
);

usersRouter.patch(
  '/:userId/password',
  validateMiddleware(usersSchemas.updatePasswordSchema),
  usersMiddleware.checkIsMe,
  usersController.updatePassword
);

usersRouter.patch(
  '/:userId/email',
  validateMiddleware(usersSchemas.updateEmailSchema),
  usersMiddleware.checkIsMe,
  usersController.updateEmail
);

usersRouter.use(
  '/:userId/settings',
  validateMiddleware(usersSchemas.updateSettingsSchema),
  usersMiddleware.checkIsMe,
  usersController.updateSettings
);

usersRouter.use(
  '/:userId/onboarding',
  validateMiddleware(usersSchemas.updateOnboardingSchema),
  usersMiddleware.checkIsMe,
  usersController.updateOnboarding
);

export {
  usersRouter,
};
