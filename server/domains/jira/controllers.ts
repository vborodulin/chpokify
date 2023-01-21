import { SUCCESS_VOID_RESULT } from '@chpokify/api-schemas';
import { jiraSchemas } from '@chpokify/api-schemas/jiraSchemas';
import { arrayHelpers } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';
import {
  TJiraApiGetAllBoardsResp,
  TJiraApiGetAllSprintsResp,
  TJiraApiSearchResp,
  TJiraField,
  TJiraProject,
} from '@chpokify/models-types/core/integrations';
import { routing } from '@chpokify/routing';
import { jiraHeleprs } from '@domains/jira/helpers';
import { JiraApi, parseJiraApiError } from '@domains/jira/jiraApi';
import { jiraKeys } from '@domains/jira/jiraKeys';
import { JiraOauth } from '@domains/jira/jiraOauth';
import config from 'config';
import { get, set } from 'lodash';

import { BadRequestError, ERROR_CODES } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { StoryModel } from '@models/story';

import { routesHelpers } from '@routes/helpers';

const getApplicationLink = createHandler(async (
  req,
  res: TAppResponse<jiraSchemas.TGetApplicationLinkResResp>
) => {
  res.locals.result = {
    applicationName: config.get('jira.applicationName'),
    applicationUrl: process.env.CLIENT_DOMAIN as string,
    consumerKey: config.get('jira.consumerKey'),
    consumerName: config.get('jira.consumerName'),
    publicKey: jiraKeys.publicKey,
    consumerCallbackUrl: routesHelpers.getUrl(routing.getJiraCallbackUrl()),
  };
});

const oauthMake = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TGenOauthTokenReq>,
  res: TAppResponse<jiraSchemas.TGenOauthTokenResResp>
) => {
  const {
    baseUrl,
  } = req.body;

  const {
    oauthToken,
    oauthTokenSecret,
  } = await JiraOauth.getOAuthRequestToken(baseUrl);

  set(req, `session.jira.${oauthToken}`, {
    oauthToken,
    oauthTokenSecret,
    baseUrl,
  });

  res.locals.result = {
    token: oauthToken,
    oauthUrl: jiraHeleprs.getAuthorizationUrl(baseUrl, oauthToken),
  };
});

const oauthCallback = createHandler(async (
// eslint-disable-next-line camelcase
  req: TAppRequest<{}, {}, { oauth_token: string, oauth_verifier: string }>,
  res
) => {
  if (!req.session) {
    throw new BadRequestError(transServer.t('errors.session.notFound'));
  }

  const { oauth_token: oauthToken, oauth_verifier: oauthVerifier } = req.query;
  const jiraSession = get(req, 'session.jira', {});

  if (!jiraSession[oauthToken]) {
    throw new BadRequestError(ERROR_CODES.INVALID_PARAM);
  }

  const {
    oauthTokenSecret,
    baseUrl,
  } = jiraSession[oauthToken];

  const {
    accessToken,
    accessTokenSecret,
  } = await JiraOauth.getOAuthAccessToken(
    baseUrl,
    oauthToken,
    oauthTokenSecret,
    oauthVerifier
  );

  const { user } = req;
  user.jiraIntegrations[baseUrl] = {
    baseUrl,
    accessToken,
    accessTokenSecret,
  };

  user.markModified('jiraIntegrations');
  await user.save();

  // @ts-ignore
  req.session.jira[oauthToken] = null;
  res.locals.result = SUCCESS_VOID_RESULT;
});

const oauthRemove = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TRemoveOauthReq>,
  res: TAppResponse<jiraSchemas.TRemoveOauthResResp>
) => {
  const { baseUrl } = req.body;
  const { user } = req;

  delete user.jiraIntegrations[baseUrl];
  user.markModified('jiraIntegrations');
  await user.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const boardsListGet = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TBoardsListBodyReq>,
  res: TAppResponse<jiraSchemas.TBoardsListResResp>
) => {
  const {
    baseUrl,
  } = req.body;
  const { user: { jiraIntegrations } } = req;

  const integration = jiraIntegrations[baseUrl];

  if (!integration) {
    throw new BadRequestError(transServer.t('errors.jiraIntegration.noConnectedDomain'));
  }

  const jiraClient = JiraApi.getInstance(
    baseUrl,
    integration.accessToken,
    integration.accessTokenSecret
  );

  let result: TJiraApiGetAllBoardsResp;

  try {
    result = await jiraClient.getAllBoards() as TJiraApiGetAllBoardsResp;
  } catch (err) {
    throw parseJiraApiError(err);
  }

  res.locals.result = result;
});

const sprintsListGet = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TSprintsListBodyReq>,
  res: TAppResponse<jiraSchemas.TSprintsListResResp>
) => {
  const {
    baseUrl,
    boardId,
  } = req.body;
  const { user: { jiraIntegrations } } = req;

  const integration = jiraIntegrations[baseUrl];

  if (!integration) {
    throw new BadRequestError(transServer.t('errors.jiraIntegration.noConnectedDomain'));
  }

  const jiraClient = JiraApi.getInstance(
    baseUrl,
    integration.accessToken,
    integration.accessTokenSecret
  );

  let result: TJiraApiGetAllSprintsResp;

  try {
    result = await jiraClient.getAllSprints(boardId) as TJiraApiGetAllSprintsResp;
  } catch (err) {
    throw parseJiraApiError(err);
  }

  res.locals.result = result;
});

const issuesImport = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TIssuesImportBodyReq>,
  res: TAppResponse
) => {
  const { jiraIntegrations } = req.user;
  const { spaceId, baseUrl, jql } = req.body;

  const integration = jiraIntegrations[baseUrl];

  if (!integration) {
    throw new BadRequestError(transServer.t('errors.jiraIntegration.noConnectedDomain'));
  }

  const jiraClient = JiraApi.getInstance(
    baseUrl,
    integration.accessToken,
    integration.accessTokenSecret
  );

  let result: TJiraApiSearchResp;

  try {
    result = await jiraClient.searchJira(
      jql || ''
    ) as TJiraApiSearchResp;
  } catch (err) {
    throw parseJiraApiError(err);
  }

  const upsertedStories = await StoryModel.upsertManyFromJira(
    jiraHeleprs.convertJiraIssue(
      baseUrl,
      spaceId,
      result.issues
    )
  );

  res.locals.result = {
    stories: upsertedStories,
  };
});

const getProjects = createHandler(async (
  req: TAppRequest<{}, {}>,
  res: TAppResponse
) => {
  const { query, user: { jiraIntegrations } } = req;
  const baseUrl = query.baseUrl as string;
  const integration = jiraIntegrations[baseUrl];

  if (!integration) {
    throw new BadRequestError(transServer.t('errors.jiraIntegration.noConnectedDomain'));
  }

  const jiraClient = JiraApi.getInstance(
    baseUrl,
    integration.accessToken,
    integration.accessTokenSecret
  );

  let result;

  try {
    result = await jiraClient.listProjects() as TJiraProject[];
  } catch (err) {
    throw parseJiraApiError(err);
  }

  // На данном этапе возвращаем все поля
  res.locals.result = result;
});
const getFields = createHandler(async (
  req: TAppRequest<{}, jiraSchemas.TSprintsListBodyReq>,
  res: TAppResponse
) => {
  const { query, user: { jiraIntegrations } } = req;
  const baseUrl = query.baseUrl as string;
  const integration = jiraIntegrations[baseUrl];

  if (!integration) {
    throw new BadRequestError(transServer.t('errors.jiraIntegration.noConnectedDomain'));
  }

  const jiraClient = JiraApi.getInstance(
    baseUrl,
    integration.accessToken,
    integration.accessTokenSecret
  );

  let result;

  try {
    result = await jiraClient.listFields() as TJiraField[];
  } catch (err) {
    throw parseJiraApiError(err);
  }

  if (!arrayHelpers.isEmptyArr(result)) {
    result = result.filter((item) => item?.schema?.type === 'number' && item?.custom);
  }

  res.locals.result = result;
});

const jiraControllers = {
  getApplicationLink,
  oauthMake,
  oauthCallback,
  oauthRemove,
  boardsListGet,
  sprintsListGet,
  issuesImport,
  getProjects,
  getFields,
};

export {
  jiraControllers,
};
