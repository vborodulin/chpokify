import { TSuccessResponse } from '@chpokify/api-schemas';
import { jiraSchemas } from '@chpokify/api-schemas/jiraSchemas';
import { TJiraField, TJiraProject } from '@chpokify/models-types/core/integrations';

import { api } from '@lib/api';

const getApplicationLink = async () => api.get<TSuccessResponse<jiraSchemas.TGetApplicationLinkResResp>>(
  '/jira/application-link'
);

const oauthMake = async (data: jiraSchemas.TGenOauthTokenReq) =>
  api.post<TSuccessResponse<jiraSchemas.TGenOauthTokenResResp>>(
    '/jira/oauth/token', data
  );

const oauthRemove = async (data: jiraSchemas.TRemoveOauthReq) =>
  api.post<TSuccessResponse<jiraSchemas.TRemoveOauthResResp>>(
    '/jira/oauth/remove',
    data
  );

// @ts-ignore
// eslint-disable-next-line camelcase
const oauthCallback = async (oauth_token: string, oauth_verifier: string) =>
  api.get(
    '/jira/oauth/callback',
    {
      params: {
        oauth_token,
        oauth_verifier,
      },
    }
  );

const boardsListGet = async (data: jiraSchemas.TBoardsListBodyReq) =>
  api.post<TSuccessResponse<jiraSchemas.TBoardsListResResp>>(
    '/jira/boards/list',
    data
  );

const sprintsListGet = async (data: jiraSchemas.TSprintsListBodyReq) =>
  api.post<TSuccessResponse<jiraSchemas.TSprintsListBodyReq>>(
    '/jira/sprints/list',
    data
  );

const issuesImport = async (data: jiraSchemas.TIssuesImportBodyReq) =>
  api.post<TSuccessResponse<jiraSchemas.TIssuesImportResResp>>(
    '/jira/issues/import',
    data
  );

const getFields = async (baseUrl: string) =>
  api.get<TSuccessResponse<TJiraField[]>>(
    `/jira/fields?baseUrl=${baseUrl}`
  );

const getProjects = async (baseUrl: string) =>
  api.get<TSuccessResponse<TJiraProject[]>>(
    `/jira/projects?baseUrl=${baseUrl}`
  );

const jiraApi = {
  getApplicationLink,
  oauthMake,
  oauthRemove,
  oauthCallback,
  boardsListGet,
  sprintsListGet,
  issuesImport,
  getFields,
  getProjects,
};

export {
  jiraApi,
};
