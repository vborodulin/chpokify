import { coreSchemas, TSuccessVoidResult } from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';
import {
  RETRO_CARD_TITLE_MIN_LENGTH,
  RETRO_CARD_TITLE_MAX_LENGTH,
  RETRO_CARD_DESCRIPTION_MAX_LENGTH,
  TRetroCard,
  TEntityID,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

export namespace retroCardsSchemas {

  const TitleSchema = Joi.string()
    .min(RETRO_CARD_TITLE_MIN_LENGTH)
    .max(RETRO_CARD_TITLE_MAX_LENGTH)
    .empty('')
    .messages({
      'string.min': transServer.t('schemas.pokerSession.title.string.min', {
        min: RETRO_CARD_TITLE_MIN_LENGTH,
        max: RETRO_CARD_TITLE_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.title.string.max', {
        min: RETRO_CARD_TITLE_MIN_LENGTH,
        max: RETRO_CARD_TITLE_MAX_LENGTH,
      }),
    });

  const DescriptionSchema = Joi.string()
    .max(RETRO_CARD_DESCRIPTION_MAX_LENGTH)
    // .empty('')
    .allow('')
    .messages({
      'string.max': transServer.t('schemas.pokerSession.description.string.max', {
        max: RETRO_CARD_DESCRIPTION_MAX_LENGTH,
      }),
    });

  const VotesSchema = Joi.array()
    .items(coreSchemas.ObjectIdSchema);

  export const RetroCardSchema = Joi.object({
    title: TitleSchema,
    description: DescriptionSchema,
    spaceId: coreSchemas.ObjectIdSchema,
    userId: coreSchemas.ObjectIdSchema,
    votes: VotesSchema,
    isCompleted: Joi.boolean(),
  })
    .unknown(true);

  /**
   * CREATE SCHEMA
   */

  export type TCreateBodyReq = {
    title: TRetroCard['title'];
    spaceId: TRetroCard['spaceId'];
    templateId: string;
    columnId: string;
    description?: TRetroCard['description'];
  }

  export type TCreateResResp = {
    retroCard: TRetroCard;
  }

  /**
   * GET_LIST
   */
  export const getListSchema = Joi.object({
    body: {
      ids: Joi.array()
        .items(coreSchemas.ObjectIdSchema),
    },
  })
    .unknown(true);

  export type TGetListBodyReq = {
    ids: TRetroCard['_id'][];
  }
  export type TGetListResResp = {
    retroCards: TRetroCard[];
  }

  /**
   * UPDATE
   */
  export const updateSchema = Joi.object({
    body: {
      title: RetroCardSchema.extract('title'),
      description: RetroCardSchema.extract('description'),
      isCompleted: RetroCardSchema.extract('isCompleted'),
      combinedCardsTitles: Joi.array().items(
        TitleSchema.allow('')
      ),
      combinedCardsDescriptions: Joi.array().items(
        DescriptionSchema
      ),
    },
  })
    .unknown(true);

  export type TUpdateBodyReq = {
    title?: TRetroCard['title'];
    description?: TRetroCard['description'];
    isCompleted?: TRetroCard['isCompleted'];
    combinedCardsTitles?: string[];
    combinedCardsDescriptions?: string[];
  };

  export type TUpdateResResp = {
    retroCard: TRetroCard;
  }

  /**
   * ADD VOTE
   */
  export const addVoteSchema = Joi.object({
    body: {
      voteId: coreSchemas.ObjectIdSchema.required(),
      retroSessionId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

  export type TAddVoteBodyReq = {
    voteId: TEntityID;
    retroSessionId: TEntityID;
  };

  export type TAddVoteResResp = TSuccessVoidResult;

  /**
   * REMOVE VOTE
   */
  export const removeVoteSchema = Joi.object({
    params: {
      retroCardId: coreSchemas.ObjectIdSchema.required(),
      voteId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

  export type TRemoveVoteParamsReq = {
    voteId: TEntityID;
  };

  export type TRemoveVoteResResp = TSuccessVoidResult;

  /**
   * COMBINED CARD
   */
  export const combineCardSchema = Joi.object({
    body: {
      cardId: coreSchemas.ObjectIdSchema.required(),
      columnId: coreSchemas.ObjectIdSchema.required(),
      retroSessionId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

  export type TCombineCardBodyReq = {
    cardId: TRetroCard['_id'];
    columnId: TEntityID;
    retroSessionId: TEntityID;
  };

  export type TCombineCardResResp = TSuccessVoidResult;

}
