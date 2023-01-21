import { transServer } from '@chpokify/i18n';
import {
  RETRO_COLUMN_TITLE_MIN_LENGTH,
  RETRO_COLUMN_TITLE_MAX_LENGTH,
  TRetroTemplate,
  TRetroColumn,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { coreSchemas } from '../coreSchemas';

export namespace retroTemplateSchemas {

  const TitleColumnSchema = Joi.string()
    .min(RETRO_COLUMN_TITLE_MIN_LENGTH)
    .max(RETRO_COLUMN_TITLE_MAX_LENGTH)
    .empty('')
    .messages({
      'string.min': transServer.t('schemas.pokerSession.title.string.min', {
        min: RETRO_COLUMN_TITLE_MIN_LENGTH,
        max: RETRO_COLUMN_TITLE_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.title.string.max', {
        min: RETRO_COLUMN_TITLE_MIN_LENGTH,
        max: RETRO_COLUMN_TITLE_MAX_LENGTH,
      }),
    });

  const RetroColumnSchema = Joi.object({
    title: TitleColumnSchema,
    isAction: Joi.boolean(),
  });

  /**
   * CREATE_COLUMN
   */
  export type TCreateColumnBodyReq = {
    title:TRetroColumn['title'];
    isAction?:TRetroColumn['isAction'];
  };

  export type TCreateColumnResResp = {
    retroTemplate: TRetroTemplate;
  }

  export const createColumnSchema = Joi.object({
    body: {
      title: RetroColumnSchema.extract('title').required(),
      isAction: RetroColumnSchema.extract('isAction'),
    },
  })
    .unknown(true);

  /**
   * UPDATE COLUMN
   */
  export type TUpdateColumnBodyReq = {
    title:TRetroColumn['title']
  };

  export type TUpdateColumnResResp = {
    retroTemplate: TRetroTemplate;
  }

  export const updateColumnSchema = Joi.object({
    body: {
      title: RetroColumnSchema.extract('title'),
    },
  })
    .unknown(true);

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
    ids:TRetroTemplate['_id'][]
  };
  export type TGetListResResp = {
    retroTemplates: TRetroTemplate[];
  }

  /**
   * GET
   */
  export type TGetResResp = {
    retroTemplate: TRetroTemplate;
  }

  /**
   * REMOVE_COLUMN
   */
  export type TRemoveColumnResResp = {
    retroTemplate: TRetroTemplate;
  }

  /**
   * MOVE COLUMN
   */
  export const moveColumnSchema = Joi.object({
    body: {
      columnStartIdx: Joi.number()
        .required(),
      columnFinishIdx: Joi.number()
        .required(),
      columnId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

  export type TMoveColumnBodyReq = {
    columnStartIdx: number;
    columnFinishIdx: number;
    columnId: TRetroTemplate['_id'];
  }

}
