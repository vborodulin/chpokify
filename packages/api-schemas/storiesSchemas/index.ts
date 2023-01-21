import { transServer } from '@chpokify/i18n';
import {
  STORY_TITLE_MAX_LENGTH,
  STORY_DESCRIPTION_MAX_LENGTH,
  TEntityID,
  TStory,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { coreSchemas, TSuccessVoidResult } from '../coreSchemas';

export namespace storiesSchemas {
  export const storySchema = Joi.object({
    spaceId: coreSchemas.ObjectIdSchema.required(),
    title: Joi.string()
      .max(STORY_TITLE_MAX_LENGTH)
      .required()
      .messages({
        'string.max': transServer.t('schemas.story.title.string.max', {
          max: STORY_TITLE_MAX_LENGTH,
        }),
        'string.empty': transServer.t('schemas.story.title.string.empty'),
      }),
    description: Joi.string()
      .max(STORY_DESCRIPTION_MAX_LENGTH)
      .optional()
      .allow('')
      .messages({
        'string.max': transServer.t('schemas.story.description.string.max', {
          max: STORY_DESCRIPTION_MAX_LENGTH,
        }),
      }),
  });

  export const createSchema = Joi.object({
    body: {
      title: storySchema.extract('title'),
    },
  })
    .unknown(true);

  export const createManySchema = Joi.object({
    body: {
      stories: Joi.array()
        .items(Joi.object({
          title: storySchema.extract('title'),
        })),
    },
  })
    .unknown(true);

  export const getManySchema = Joi.object({
    body: {
      ids: Joi.array()
        .items(coreSchemas.ObjectIdSchema),
    },
  })
    .unknown(true);

  export const updateSchema = Joi.object({
    body: {
      title: storySchema.extract('title'),
      description: storySchema.extract('description'),
    },
  })
    .unknown(true);
  /**
   * Create
   */
  export type TCreateBodyReq = {
    title: TStory['title'];
  }

  export type TCreateResResp = {
    story: TStory;
  }
  /**
   * Create many
   */
  export type TCreateManyBodyReq = {
    stories: { title: string }[]
  }
  export type TCreateManyResResp = {
    stories: TStory[];
  }
  /**
   * Get Many
   */
  export type TGetManyBodyReq = {
    ids: TEntityID[];
  };
  export type TGetListResResp = {
    stories: TStory[];
  }
  export type TGetManyResResp = {
    stories: TStory[];
  };
  /**
   * Get
   */
  export type TGetResResp = {
    story: TStory
  }
  /**
   * Remove
   */
  export type TRemoveResResp = TSuccessVoidResult;

  /**
   * Update
   */
  export type TUpdateBodyReq = {
    title: TStory['title'];
    description?: TStory['description'];
  }

  export type TUpdateResResp = {
    story: TStory
  }
}
