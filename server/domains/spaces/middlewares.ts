import { coreSchemas } from '@chpokify/api-schemas';
import { spaceHelpers } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';

import {
  BadRequestError, ERROR_CODES, ForbiddenError, NotFoundError,
} from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { SPACE_PARTICIPANT_ROLE, SpaceModel, TSpaceDocument } from '@models/space';

export type TWithSpace = {
  space: TSpaceDocument;
};

const withSpace = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest,
  res
) => {
  const { spaceId } = from === 'params' ? req.params : req.body;

  const { error } = coreSchemas.ObjectIdSchema.validate(spaceId);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: [from, 'spaceId'],
        message: transServer.t('errors.space.invalidId'),
      },
    ]);
  }

  const space = await SpaceModel.findOne({ _id: spaceId });

  if (!space) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [{
      message: transServer.t('errors.space.notFound'),
      path: [from, 'spaceId'],
    }]);
  }

  res.locals.set('space', space);
});

const checkHasRole = (spaceParticipantRole: SPACE_PARTICIPANT_ROLE) => createHandler(async (
  req: TAppRequest,
  res
) => {
  const { user } = req;
  const space = res.locals.get('space') as TSpaceDocument;

  const roleInSpace = spaceHelpers.getParticipantRole(space, user._id);

  if (roleInSpace < spaceParticipantRole) {
    throw new ForbiddenError(ERROR_CODES.INVALID_PERMISSIONS, [
      {
        message: transServer.t('errors.forbidden'),
        path: ['spaceId'],
      },
    ]);
  }
});

const spacesMiddlewares = {
  withSpace,
  checkHasRole,
};

export {
  spacesMiddlewares,
};
