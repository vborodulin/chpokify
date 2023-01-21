import { urlHelpers } from '@chpokify/helpers/url';
import { transServer } from '@chpokify/i18n';
import {
  JQL_MAX_LENGTH,
  TJiraApiGetAllBoardsResp,
  TJiraApiGetAllSprintsResp,
  TJiraApplicationLink,
} from '@chpokify/models-types/core/integrations';
import { TStory } from '@chpokify/models-types/story';
import Joi from '@hapi/joi';

import { coreSchemas, TSuccessVoidResult } from '../coreSchemas';

export namespace jiraSchemas {
  export const JIRA_BASE_URL_SCHEMA = Joi.string()
    .pattern(new RegExp(urlHelpers.urlPattern))
    .messages({
      'string.empty': transServer.t('schemas.jiraIntegration.baseUrl.string.empty'),
      'string.pattern.base': transServer.t('schemas.jiraIntegration.baseUrl.string.pattern.base'),
    });

  const JIRA_JQL_SCHEMA = Joi.string()
    .empty('')
    .max(JQL_MAX_LENGTH)
    .messages({
      'string.max': transServer.t('schemas.jiraIntegration.jql.string.max', {
        max: JQL_MAX_LENGTH,
      }),
    });

  // get application link settings
  export type TGetApplicationLinkResResp = TJiraApplicationLink;

  // gen oauth token
  export type TGenOauthTokenReq = {
    baseUrl: string;
  };

  export const genOauthSchemaReq = Joi.object({
    body: Joi.object({
      baseUrl: JIRA_BASE_URL_SCHEMA.required(),
    }),
  }).unknown();

  export type TGenOauthTokenResResp = {
    token: string;
    oauthUrl: string
  };

  // remove oauth token
  export type TRemoveOauthReq = {
    baseUrl: string;
  }

  export const removeOauthSchemaReq = Joi.object({
    body: Joi.object({
      baseUrl: JIRA_BASE_URL_SCHEMA.required(),
    }),
  }).unknown();

  export type TRemoveOauthResResp = TSuccessVoidResult;

  // boards list
  export type TBoardsListBodyReq = {
    baseUrl: string;
  };

  export type TBoardsListResResp = TJiraApiGetAllBoardsResp;

  // sprints list
  export type TSprintsListBodyReq = {
    baseUrl: string;
    boardId: string;
  }

  // projects list
  export type TProjectsListQueryReq = {
    query:{
      baseUrl: string;
    }

  }

  export type TSprintsListResResp = TJiraApiGetAllSprintsResp;

  // import issues
  export type TIssuesImportBodyReq = {
    spaceId: string;
    baseUrl: string;
    jql?: string;
  }

  export const issuesImportSchemaReq = Joi.object({
    body: {
      spaceId: coreSchemas.ObjectIdSchema.required(),
      baseUrl: JIRA_BASE_URL_SCHEMA.required(),
      jql: JIRA_JQL_SCHEMA,
    },
  }).unknown();

  export const issuesFieldUpdateSchemaReq = Joi.object({
    body: {
      spaceId: coreSchemas.ObjectIdSchema.required(),
      field: JIRA_BASE_URL_SCHEMA.required(),
    },
  }).unknown();

  export const importFieldsSchemaReq = Joi.object({
    body: {
      baseUrl: JIRA_BASE_URL_SCHEMA.required(),
    },
  }).unknown();

  export const baseUrlQuerySchemaReq = Joi.object({
    query: {
      baseUrl: JIRA_BASE_URL_SCHEMA.required(),
    },
  }).unknown();

  export const fieldParamsSchemaReq = Joi.object({
    params: {
      fieldId: Joi.string().required(),
    },
  }).unknown();

  export type TIssuesImportResResp = {
    stories: TStory[];
  }
}
