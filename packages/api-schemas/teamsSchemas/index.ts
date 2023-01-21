import { transServer } from '@chpokify/i18n';
import {
  TEAM_NAME_MAX_LENGTH, TEAM_NAME_MIN_LENGTH, TEntityID, TSpace, TTeam,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { coreSchemas } from '../coreSchemas';

export namespace teamsSchemas {
  const teamNameSchema = Joi.string()
    .min(TEAM_NAME_MIN_LENGTH)
    .max(TEAM_NAME_MAX_LENGTH)
    .messages({
      'string.min': transServer.t('schemas.team.name.string.min', {
        min: TEAM_NAME_MIN_LENGTH,
        max: TEAM_NAME_MAX_LENGTH,
      }),
      'string.max': transServer.t('schemas.team.name.string.max', {
        min: TEAM_NAME_MIN_LENGTH,
        max: TEAM_NAME_MAX_LENGTH,
      }),
      'string.empty': transServer.t('schemas.team.name.string.empty'),
    });

  const participantsIdsSchema = Joi.array()
    .items(Joi.string());

  // create

  export type TCreateBodyReq = {
    name: string;
    participantsIds: TTeam['participantsIds'];
    _id?: TEntityID;
  };

  export const createSchema = Joi.object({
    body: {
      _id: coreSchemas.ObjectIdSchema,
      name: teamNameSchema.required(),
      participantsIds: participantsIdsSchema.required(),
    },
  }).unknown(true);

  export type TCreateResResp = {
    space: TSpace
  };

  // update

  export type TUpdateBodyReq = {
    name?: string;
    participantsIds?: string[];
  }

  export const updateReqSchemas = Joi.object({
    body: Joi.object({
      name: teamNameSchema.required(),
      participantsIds: participantsIdsSchema,
    }),
  }).unknown(true);

  export type TUpdateResResp = {
    space: TSpace
  }

  // delete

  export type TDeleteResResp = {
    space: TSpace
  };
}
