import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import {
  BadRequestError,
  ERROR_CODES,
  NotFoundError,
} from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { RetroSessionModel } from '@models/retroSession';
import { SpaceModel } from '@models/space';

const withSessionAndSpace = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest<{ retroSessionId: string }>,
  res
) => {
  const { retroSessionId } = from === 'params' ? req.params : req.body;

  const { value } = coreSchemas.ObjectIdSchema.validate(retroSessionId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'retroSessionId'],
        message: transServer.t('errors.retroSession.invalidId'),
      },
    ]);
  }

  const retroSession = await RetroSessionModel.findById(retroSessionId);

  if (!retroSession) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroSession.notFound'),
        path: ['params', 'retroSessionId'],
      },
    ]);
  }

  const { spaceId } = retroSession;
  const space = await SpaceModel.findById(spaceId);

  if (!space) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.space.notFound'),
        path: ['params', 'retroSession', 'spaceId'],
      },
    ]);
  }

  res.locals.set('space', space);
  res.locals.set('retroSession', retroSession);
});

const withSession = (from: 'params' | 'body') => createHandler(async (
  req: TAppRequest<{ retroSessionId: string }>,
  res
) => {
  const { retroSessionId } = from === 'params' ? req.params : req.body;

  const { value } = coreSchemas.ObjectIdSchema.validate(retroSessionId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'retroSessionId'],
        message: transServer.t('errors.retroSession.invalidId'),
      },
    ]);
  }

  const retroSession = await RetroSessionModel.findById(retroSessionId);

  if (!retroSession) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroSession.notFound'),
        path: ['params', 'retroSessionId'],
      },
    ]);
  }

  res.locals.set('retroSession', retroSession);
});

const retroSessionsMiddlewares = {
  withSessionAndSpace,
  withSession,
};

export {
  retroSessionsMiddlewares,
};
