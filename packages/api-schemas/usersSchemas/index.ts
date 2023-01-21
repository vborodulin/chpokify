import {
  TEntityID, TUser, TUserProtected, TUserSettings,
} from '@chpokify/models-types';
import Joi from '@hapi/joi';

import { AuthSchemas } from '../authSchemas';

export namespace usersSchemas {
  // get
  export type TGetResResp = {
    user: TUser,
  };

  // get lis
  export type TGetListBodyReq = {
    ids: TEntityID[];
  };

  export const getListReqSchema = Joi.object({
    body: {
      ids: Joi.array().items(Joi.string()),
    },
  }).unknown(true);

  export type TGetListResResp = {
    users: TUserProtected[]
  }

  // update

  export type TUpdateBodyReq = {
    username?: string;
  };

  export const updateReqSchema = Joi.object({
    body: {
      username: AuthSchemas.UsernameSchema.required(),
    },
  }).unknown(true);

  export type TUpdateResResp = {
    user: TUser
  }

  // update email

  export type TUpdateEmailBodyReq = {
    email: string;
  };

  export const updateEmailSchema = Joi.object({
    body: {
      email: AuthSchemas.EmailSchema.required(),
    },
  }).unknown(true);

  export type TUpdateEmailResResp = {
    user: TUser;
  };

  // update password

  export type TUpdatePasswordBodyReq = {
    // password: string;
    newPassword: string;
    // repeatNewPassword: string;
  }

  export const updatePasswordSchema = Joi.object({
    body: {
      // password: AuthSchemas.PasswordSchema.required(),
      newPassword: AuthSchemas.PasswordSchema.required(),
    },
  }).unknown(true);

  export type TUpdatePasswordResResp = {
    user: TUser
  };

  // update settings

  export type TUpdateSettingsBodyReq = Partial<TUserSettings>;

  export const updateSettingsSchema = Joi.object({
    body: {
      themeType: Joi
        .string()
        .valid('light', 'dark'),
    },
  }).unknown(true);

  export type TUpdateSettingsResResp = {
    user: TUser
  }

  // update onboarding

  export type TUpdateOnboardingBodyReq = Partial<{
    showSpaceOnboarding: boolean;
    showPokerOnboarding: boolean
  }>;

  export const updateOnboardingSchema = Joi.object({
    body: {
      showSpaceOnboarding: Joi.bool(),
      showPokerOnboarding: Joi.bool(),
    },
  }).unknown(true);

  export type TUpdateOnboardingResResp = {
    user: TUser;
  }
}
