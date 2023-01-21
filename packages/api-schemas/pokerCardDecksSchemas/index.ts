import { transServer } from '@chpokify/i18n';
import {
  TEntityID,
  TPokerCardDeck,
  CARD_DECK_TITLE_MAX_LENGTH,
  CARD_DECK_TITLE_MIN_LENGTH,
  CARD_DECK_VALUE_MAX_LENGTH,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { coreSchemas } from '../coreSchemas';

export namespace pokerCardDecksSchemas {
  export const TitleSchema = Joi.string()
    .min(CARD_DECK_TITLE_MIN_LENGTH)
    .max(CARD_DECK_TITLE_MAX_LENGTH)
    .messages({
      'string.empty': transServer.t('schemas.pokerCardDeck.title.string.empty'),
      'string.min': transServer.t('schemas.pokerSession.title.string.min', {
        min: CARD_DECK_TITLE_MIN_LENGTH,
        max: CARD_DECK_TITLE_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.title.string.max', {
        min: CARD_DECK_TITLE_MIN_LENGTH,
        max: CARD_DECK_TITLE_MAX_LENGTH,
      }),
    });

  const Cards = Joi.object()
    .keys({
      _id: Joi.string()
        .required(),
      value: Joi.number()
        .allow(null)
        .max(CARD_DECK_VALUE_MAX_LENGTH)
        .messages({
          'number.base': transServer.t('schemas.pokerCardDeck.cards.value.number.empty'),
          'number.empty': transServer.t('schemas.pokerCardDeck.cards.value.number.empty'),
          'number.max': transServer.t('schemas.pokerCardDeck.cards.value.number.maxValue'),
        })
        .required(),
      type: Joi.number()
        .required(),
      default: Joi.bool(),
      name: Joi.string()
        .messages({ 'string.empty': transServer.t('schemas.pokerCardDeck.cards.label.string.empty') }),
      icon: Joi.string(),
    });

  export const CardsSchema = Joi.array()
    .min(4)
    .message(transServer.t('schemas.pokerCardDeck.cards.array.empty'))
    .items(Cards);

  export const CreateSchema = Joi.object({
    body: {
      title: TitleSchema.required(),
      cards: CardsSchema.required(),
    },
  })
    .unknown(true);

  export const UpdateSchema = Joi.object({
    params: {
      id: coreSchemas.ObjectIdSchema.required(),
    },
    body: {
      title: TitleSchema,
      cards: CardsSchema,
    },
  })
    .unknown(true);

  export type TRemoveResResp = {
    cardDeckId: TEntityID
  }
  export type TCreateResResp = {
    cardDeck: TPokerCardDeck & { _id: string };
  };
  export type TUpdateResResp = {
    cardDeck: TPokerCardDeck & { _id: string };
  };
  export type TGetListResResp = {
    cardDecks: TPokerCardDeck[];
  }
  export type TCreateBodyReq = {
    title: TPokerCardDeck['title'];
    cards: TPokerCardDeck['cards']
  }
  export type TUpdateBodyReq = {
    title?: TPokerCardDeck['title'];
    cards?: TPokerCardDeck['cards']
  }
}
