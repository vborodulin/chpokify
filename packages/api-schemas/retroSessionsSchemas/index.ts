import { transServer } from '@chpokify/i18n';
import {
  TEntityID,
  TRetroSession,
  TInviteRetroSessionTokenPayload,
  RETRO_TEMPLATE_TYPE,
  RETRO_SESSION_TITLE_MIN_LENGTH,
  RETRO_SESSION_TITLE_MAX_LENGTH,
  RETRO_SESSION_DESC_MAX_LENGTH,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { coreSchemas } from '../coreSchemas';

export namespace retroSessionsSchemas {
  export const TitleSchema = Joi.string()
    .min(RETRO_SESSION_TITLE_MIN_LENGTH)
    .max(RETRO_SESSION_TITLE_MAX_LENGTH)
    .empty('')
    .messages({
      'string.min': transServer.t('schemas.pokerSession.title.string.min', {
        min: RETRO_SESSION_TITLE_MIN_LENGTH,
        max: RETRO_SESSION_TITLE_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.pokerSession.title.string.max', {
        min: RETRO_SESSION_TITLE_MIN_LENGTH,
        max: RETRO_SESSION_TITLE_MAX_LENGTH,
      }),
    });

  export const DescriptionSchema = Joi.string()
    .max(RETRO_SESSION_DESC_MAX_LENGTH)
    .empty('')
    .messages({
      'string.max': transServer.t('schemas.pokerSession.description.string.max', {
        max: RETRO_SESSION_DESC_MAX_LENGTH,
      }),
    });

  export const TeamIdsSchema = Joi.array()
    .items(coreSchemas.ObjectIdSchema);

  export const TemplateTypeSchema = Joi.string()
    .valid(
      RETRO_TEMPLATE_TYPE.CUSTOM,
      RETRO_TEMPLATE_TYPE.MAD_SAD_GLAD,
      RETRO_TEMPLATE_TYPE.START_STOP_CONTINUE,
      RETRO_TEMPLATE_TYPE.WENT_WELL_GO_WELL
    );

  const RetroSessionSchema = Joi.object({
    title: TitleSchema,
    description: DescriptionSchema,
    spaceId: coreSchemas.ObjectIdSchema,
    templateId: coreSchemas.ObjectIdSchema,
    teamsIds: TeamIdsSchema,
    canEditCards: Joi.boolean(),
    canMoveCards: Joi.boolean(),
    isHiddenCards: Joi.boolean(),
    isHiddenUserNameCards: Joi.boolean(),
    isDisableVotingCards: Joi.boolean(),
    isHiddenVoteCountCards: Joi.boolean(),
    isHiddenDescriptionCards: Joi.boolean(),
    isOneVoteCards: Joi.boolean(),
    isSortByVotesCount: Joi.boolean(),
    maxVotesCard: Joi.number(),
  })
    .unknown(true);

  /**
   * GET LIST SCHEMA
   */
  export const getListSchema = Joi.object({
    query: {
      limit: Joi.number(),
    },
  })
    .unknown(true);

  export type TGetListQueryReq = {
    limit?: string;
  };

  /**
   * CREATE SCHEMA
   */
  export const createSchema = Joi.object({
    body: {
      title: RetroSessionSchema.extract('title')
        .required(),
      description: RetroSessionSchema.extract('description')
        .optional(),
      templateType: TemplateTypeSchema,
      spaceId: coreSchemas.ObjectIdSchema.required(),
    },
  })
    .unknown(true);

  export type TCreateBodyReq = {
    spaceId: TRetroSession['spaceId'];
    templateType: RETRO_TEMPLATE_TYPE;
    title?: TRetroSession['title'];
    description?: TRetroSession['description'];
  }

  export type TCreateResResp = {
    retroSession: TRetroSession;
  }
  /**
   * UPDATE
   */
  export type TUpdateBodyReq = {
    title?: TRetroSession['title'];
    templateType?: RETRO_TEMPLATE_TYPE;
    description?: TRetroSession['description'];
    teamsIds?: TEntityID[];
    maxVotesCard?: TRetroSession['maxVotesCard'];
    isHiddenCards?: TRetroSession['isHiddenCards'];
    isHiddenUserNameCards?: TRetroSession['isHiddenUserNameCards'];
    canEditCards?: TRetroSession['canEditCards'];
    canMoveCards?: TRetroSession['canMoveCards'];
    isDisableVotingCards?: TRetroSession['isDisableVotingCards'];
    isHiddenVoteCountCards?: TRetroSession['isHiddenVoteCountCards'];
    isHiddenDescriptionCards?: TRetroSession['isHiddenDescriptionCards'];
    isOneVoteCards?: TRetroSession['isOneVoteCards'];
    isSortByVotesCount?: TRetroSession['isSortByVotesCount'];
  };

  export type TUpdateResResp = {
    retroSession: TRetroSession;
  };

  export const updateSchema = Joi.object({
    body: {
      title: RetroSessionSchema.extract('title'),
      description: RetroSessionSchema.extract('description'),
      teamsIds: RetroSessionSchema.extract('teamsIds'),
      maxVotesCard: RetroSessionSchema.extract('maxVotesCard'),
      canEditCards: RetroSessionSchema.extract('canEditCards'),
      canMoveCards: RetroSessionSchema.extract('canMoveCards'),
      isDisableVotingCards: RetroSessionSchema.extract('isDisableVotingCards'),
      isOneVoteCards: RetroSessionSchema.extract('isOneVoteCards'),
      isSortByVotesCount: RetroSessionSchema.extract('isSortByVotesCount'),
      isHiddenCards: RetroSessionSchema.extract('isHiddenCards'),
      isHiddenUserNameCards: RetroSessionSchema.extract('isHiddenUserNameCards'),
      isHiddenVoteCountCards: RetroSessionSchema.extract('isHiddenVoteCountCards'),
      isHiddenDescriptionCards: RetroSessionSchema.extract('isHiddenDescriptionCards'),
    },
  })
    .unknown(true);

  /**
   * INVITE
   */
  export const inviteGenSchema = Joi.object({
    body: {
      teamsIds: TeamIdsSchema.required(),
      locale: Joi.string()
        .required(),
    },
  })
    .unknown(true);

  export type TValidateInviteBodyReq = {
    token: string;
  }

  export type TGenInviteBodyReq = {
    teamsIds: TEntityID[];
    locale: string
  }

  export type TGenInviteResResp = {
    url: string;
  };

  export type TValidateInviteResResp = {
    inviteTokenPayload: TInviteRetroSessionTokenPayload
  };

  /**
   * INVITE VALIDATE
   */
  const inviteSpaceTokenSchema = Joi
    .string()
    .messages({
      'string.empty': transServer.t('schemas.retroSession.inviteToken.string.empty'),
    });

  export const validateInviteReqSchema = Joi.object({
    body: {
      token: inviteSpaceTokenSchema.required(),
    },
  })
    .unknown(true);

  /**
   * GET
   */
  export type TGetResResp = {
    retroSession: TRetroSession;
  }
  /**
   * GET_LIST
   */
  export type TGetListResResp = {
    retroSessions: TRetroSession[];
  }

  /**
   * COUNT GET LIST
   */
  export type TGetCountResResp = {
    count: number;
  }
  /**
   * REMOVE
   */
  export type TRemoveResResp = {
    retroSessionId: TRetroSession['_id'];
  };

}
