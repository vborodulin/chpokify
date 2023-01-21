import { coreSchemas, retroCardsSchemas, TSuccessVoidResult } from '@chpokify/api-schemas';
import {
  TEntityID,
  TRetroCard,
  TRetroColumn,
  TRetroRelations,
  TSpace,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

export namespace retroRelationsSchemas {

  const CardsIdsSchema = Joi.array()
    .items(coreSchemas.ObjectIdSchema);

  const RetroRelationsSchema = Joi.object({
    templateId: coreSchemas.ObjectIdSchema,
    columnId: coreSchemas.ObjectIdSchema,
    cardsIds: CardsIdsSchema,
  })
    .unknown(true);

  /**
   * CREATE CARD SCHEMA
   */
  export const createCardSchema = Joi.object({
    body: {
      title: retroCardsSchemas.RetroCardSchema.extract('title')
        .required(),
      columnId: RetroRelationsSchema.extract('columnId')
        .required(),
      description: retroCardsSchemas.RetroCardSchema.extract('description'),
      spaceId: coreSchemas.ObjectIdSchema.required(),
      isTopCreate: Joi.bool(),
    },
  })
    .unknown(true);

  export type TCreateCardBodyReq = {
    title: TRetroCard['title'];
    columnId: TRetroRelations['columnId'];
    spaceId: TSpace['_id'];
    isTopCreate: boolean;
    description?: TRetroCard['description'];
  }

  export type TCreateCardResResp = TSuccessVoidResult;

  /**
   * GET_LIST
   */
  export type TGetListResResp = {
    retroRelations: TRetroRelations[];
  }

  /**
   * MOVE CARD IN COLUMN
   */
  export const moveCardInColumnSchema = Joi.object({
    params: {
      columnId: coreSchemas.ObjectIdSchema.required(),
    },
    body: {
      cardId: coreSchemas.ObjectIdSchema.required(),
      cardStartIdx: Joi.number()
        .required(),
      cardFinishIdx: Joi.number()
        .required(),
    },
  })
    .unknown(true);

  export type TMoveCardInColumnBodyReq = {
    cardId: TEntityID,
    cardStartIdx: number,
    cardFinishIdx: number,
  }

  /**
   * MOVE CARD BETWEEN COLUMNS
   */
  export const moveCardBetweenColumnsSchema = Joi.object({
    body: {
      columnStartId: coreSchemas.ObjectIdSchema.required(),
      columnFinishId: coreSchemas.ObjectIdSchema.required(),
      cardId: coreSchemas.ObjectIdSchema.required(),
      cardStartIdx: Joi.number()
        .required(),
      cardFinishIdx: Joi.number()
        .required(),
    },
  })
    .unknown(true);

  export type TMoveCardBetweenColumnsBodyReq = {
    columnStartId: TRetroColumn['_id'],
    columnFinishId: TRetroColumn['_id'],
    cardId: string,
    cardStartIdx: number,
    cardFinishIdx: number,
  }

  /**
   * GET_LIST
   */
  export const getListByTemplatesIdsSchema = Joi.object({
    body: {
      ids: Joi.array()
        .items(coreSchemas.ObjectIdSchema),
    },
  })
    .unknown(true);

  export type TGetListByTemplatesIdsBodyReq = {
    ids: TRetroRelations['_id'][]
  };

  export type TGetListByTemplatesIdsResResp = {
    retroRelations: TRetroRelations[];
  }

}
