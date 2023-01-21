import { coreSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { BadRequestError, ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest } from '@core/types';

import { PokerCardDeckModel } from '@models/pokerCardDeck';

const withCardDeck = () => createHandler(async (
  req: TAppRequest<{ id: string }>,
  res
) => {
  const {
    params: { id },
  } = req;

  const { error } = coreSchemas.ObjectIdSchema.validate(id);

  if (error) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM, [
      {
        path: ['params', 'pokerCardDeck'],
        message: transServer.t('errors.pokerCardDeck.invalidId'),
      },
    ]);
  }

  const cardDeck = await PokerCardDeckModel.findOne({
    _id: id,
  });

  if (!cardDeck) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.pokerCardDeck.notFound'),
        path: ['params', 'pokerCardDeck'],
      },
    ]);
  }

  res.locals.set('cardDeck', cardDeck);
});

const cardDecksMiddlewares = {
  withCardDeck,
};

export {
  cardDecksMiddlewares,
};
