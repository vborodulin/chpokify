import { pokerCardDecksSchemas } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';

import { ERROR_CODES, ForbiddenError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import {
  PokerCardDeckModel,
} from '@models/pokerCardDeck';
import {
  TPokerCardDeckDocument,
} from '@models/pokerCardDeck/types';
import { TSpaceDocument } from '@models/space';

const getList = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerCardDecksSchemas.TGetListResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const cardDecks = await PokerCardDeckModel.find({
    $or: [
      { default: true },
      { spaceId: space._id },
    ],
  }, ['title', 'cards', 'default', 'isDeleted', 'createdAt']);

  res.locals.result = {
    cardDecks,
  };
});

const getListWithDeleted = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerCardDecksSchemas.TGetListResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;
  const cardDecks = await PokerCardDeckModel.find({
    $or: [
      { default: true },
      { spaceId: space._id },
    ],
    withDeleted: true,
  }, ['title', 'cards', 'default', 'isDeleted']);

  res.locals.result = {
    cardDecks,
  };
});

const create = createHandler(async (
  req: TAppRequest<{}, pokerCardDecksSchemas.TCreateBodyReq>,
  res: TAppResponse<pokerCardDecksSchemas.TCreateResResp>
) => {
  const space = res.locals.get('space') as TSpaceDocument;

  const cardDeck = PokerCardDeckModel.createNew(req.body, space._id);

  await cardDeck.save();

  res.locals.result = {
    cardDeck,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, pokerCardDecksSchemas.TUpdateBodyReq>,
  res: TAppResponse<pokerCardDecksSchemas.TUpdateResResp>
) => {
  const { body } = req;
  const cardDeck = res.locals.get('cardDeck') as TPokerCardDeckDocument;

  if (cardDeck.default) {
    throw new ForbiddenError(ERROR_CODES.INVALID_PERMISSIONS, [
      {
        message: transServer.t('errors.forbidden'),
        path: ['params', 'cardDeck'],
      },
    ]);
  }

  cardDeck.set(body);

  await cardDeck.save();
  res.locals.result = {
    cardDeck,
  };
});

const remove = createHandler(async (
  req: TAppRequest,
  res: TAppResponse<pokerCardDecksSchemas.TRemoveResResp>
) => {
  const cardDeck = res.locals.get('cardDeck') as TPokerCardDeckDocument;

  if (cardDeck.default) {
    throw new ForbiddenError(ERROR_CODES.INVALID_PERMISSIONS, [
      {
        message: transServer.t('errors.forbidden'),
        path: ['params', 'cardDeck'],
      },
    ]);
  }

  await cardDeck.remove();

  res.locals.result = {
    cardDeckId: cardDeck._id,
  };
});

export const pokerCardDeckControllers = {
  getList,
  getListWithDeleted,
  create,
  update,
  remove,
};
