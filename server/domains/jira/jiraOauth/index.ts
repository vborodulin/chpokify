import { ExtensibleError } from '@chpokify/helpers/errors';
import { transServer } from '@chpokify/i18n';
import { SUPPORT_EMAIL } from '@chpokify/models-types/info';
import { routing } from '@chpokify/routing';
import { jiraHeleprs } from '@domains/jira/helpers';
import { jiraKeys } from '@domains/jira/jiraKeys';
import { JIRA_AUTH_SIGNATURE_METHOD, JIRA_OAUTH_VERSION } from '@domains/jira/types';
import config from 'config';
import { OAuth } from 'oauth';

import { routesHelpers } from '@routes/helpers';

type TJiraOuathError = {
  statusCode: number;
  data?: any;
}

const getJiraOauthErrorMsg = (statusCode: number, data: string) => {
  if (statusCode === 404 || !statusCode) {
    return transServer.t('errors.jiraOauth.notFoundUrl');
  }

  return transServer.t('errors.jiraOauth.common', {
    error: data,
    supportEmail: SUPPORT_EMAIL,
  });
};

export const parseJiraOauthError = (error: TJiraOuathError): ExtensibleError => {
  const { statusCode, data } = error;

  return new ExtensibleError(
    getJiraOauthErrorMsg(statusCode, data),
    [],
    statusCode || 404
  );
};

const getInstance = (baseUrl: string) => new OAuth(
  jiraHeleprs.getRequestTokenUrl(baseUrl),
  jiraHeleprs.getAccessTokenUrl(baseUrl),
  config.get('jira.consumerKey'),
  jiraKeys.privateKey,
  JIRA_OAUTH_VERSION,
  routesHelpers.getUrl(routing.getJiraCallbackUrl()),
  JIRA_AUTH_SIGNATURE_METHOD
);

const getOAuthRequestToken = async (baseUrl: string) => new Promise<{
  oauthToken: string
  oauthTokenSecret: string
}>((resolve, reject) => {
  const oauth = getInstance(baseUrl);

  oauth.getOAuthRequestToken((
    err, oauthToken, oauthTokenSecret
  ) => {
    if (err) {
      reject(parseJiraOauthError(err));
    }

    return resolve({
      oauthToken,
      oauthTokenSecret,
    });
  });
});

const getOAuthAccessToken = async (
  baseUrl: string,
  oauthToken: string,
  oauthTokenSecret: string,
  oauthVerifier: string
) => new Promise<{
  accessToken: string,
  accessTokenSecret: string
}>((
  resolve,
  reject
) => {
  const oauth = getInstance(baseUrl);

  oauth.getOAuthAccessToken(
    oauthToken,
    oauthTokenSecret,
    oauthVerifier,
    (err, accessToken, accessTokenSecret) => {
      if (err) {
        return reject(parseJiraOauthError(err));
      }

      return resolve({
        accessToken,
        accessTokenSecret,
      });
    }
  );
});

const JiraOauth = {
  getOAuthRequestToken,
  getOAuthAccessToken,
};

export {
  JiraOauth,
};
