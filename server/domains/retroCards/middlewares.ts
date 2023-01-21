import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { RetroCardModel } from '@models/retroCard';
import { TSpaceDocument } from '@models/space';

const withRetroCard = createHandler(async (
  req: TAppRequest<{ retroCardId: string }>,
  res
) => {
  const { params: { retroCardId } } = req;

  const { value } = coreSchemas.ObjectIdSchema.validate(retroCardId);

  if (!value) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'retroCardId'],
        message: transServer.t('errors.retroCard.invalidId'),
      },
    ]);
  }

  const space = res.locals.get('space') as TSpaceDocument;

  const retroCard = await RetroCardModel.findOne({
    _id: retroCardId,
    spaceId: space._id,
  });

  if (!retroCard) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroCard.notFound'),
        path: ['params', 'retroCardId'],
      },
    ]);
  }

  res.locals.set('retroCard', retroCard);
});

const retroCardsMiddlewares = {
  withRetroCard,
};

export {
  retroCardsMiddlewares,
};
