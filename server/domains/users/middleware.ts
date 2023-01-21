import { coreSchemas } from '@chpokify/api-schemas';
import { isEqualsId } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';

import {
  BadRequestError,
  ERROR_CODES,
  ForbiddenError,
  NotFoundError,
} from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { TUserDocument, UserModel } from '@models/user';

const withUser = createHandler(async (
  req,
  res
) => {
  const { userId } = req.params;

  const { error } = coreSchemas.ObjectIdSchema.validate(userId);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'userId'],
        message: transServer.t('errors.user.invalidId'),
      },
    ]);
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        path: ['params', 'userId'],
        message: transServer.t('errors.user.notFound'),
      },
    ]);
  }

  res.locals.set('user', user);
});

const checkIsMe = createHandler(async (
  req: TAppRequest,
  res
) => {
  const { user } = req;
  const updatedUser = res.locals.get('user') as TUserDocument;

  if (!isEqualsId(user._id, updatedUser._id)) {
    throw new ForbiddenError(ERROR_CODES.INVALID_PERMISSIONS, [
      {
        message: transServer.t('errors.forbidden'),
        path: ['userId'],
      },
    ]);
  }
});

export const usersMiddleware = {
  withUser,
  checkIsMe,
};
