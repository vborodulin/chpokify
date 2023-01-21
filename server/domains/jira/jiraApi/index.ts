import { ExtensibleError } from '@chpokify/helpers/errors';
import { transServer } from '@chpokify/i18n';
import { SUPPORT_EMAIL } from '@chpokify/models-types/info';
import { jiraKeys } from '@domains/jira/jiraKeys';
import { JIRA_AUTH_SIGNATURE_METHOD } from '@domains/jira/types';
import config from 'config';
import Jira from 'jira-client';
import url from 'url';

import { FIXME } from '@core/types/helpers';

export const getJiraApiErrorMsg = (statusCode: number, error: string) => {
  if (statusCode === 401) {
    if (error.includes('oauth_problem=token_rejected')) {
      return transServer.t('errors.jiraApi.tokenRejected', {
        error,
        supportEmail: SUPPORT_EMAIL,
      });
    }

    return transServer.t('errors.jiraApi.auth', {
      error,
      supportEmail: SUPPORT_EMAIL,
    });
  }

  if (statusCode === 400
    && error.includes('It is not on the appropriate screen, or unknown')) {
    return transServer.t('errors.jiraApi.fieldNotScreen', {
      error,
      supportEmal: SUPPORT_EMAIL,
    });
  }

  return transServer.t('errors.jiraApi.common', {
    error,
    supportEmal: SUPPORT_EMAIL,
  });
};

export const parseJiraApiError = (err: FIXME): ExtensibleError => {
  const {
    statusCode,
    error,
  } = err;

  return new ExtensibleError(
    getJiraApiErrorMsg(statusCode, error),
    [],
    statusCode
  );
};

const getInstance = (baseUrl: string, accessToken: string, accessTokenSecret: string) => {
  const {
    protocol,
    host,
  } = url.parse(baseUrl);

  if (!protocol || !host) {
    throw new Error('invalid jira base url');
  }

  return new Jira({
    protocol,
    host,
    apiVersion: '2',
    strictSSL: false,
    oauth: {
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
      consumer_key: config.get('jira.consumerKey'),
      consumer_secret: jiraKeys.privateKey,
      signature_method: JIRA_AUTH_SIGNATURE_METHOD,
    },
  });
};

const JiraApi = {
  getInstance,
};

export {
  JiraApi,
};
