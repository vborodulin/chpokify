import { TEntityID } from '@chpokify/models-types/core';
import { TJiraIssue } from '@chpokify/models-types/core/integrations';
import { TStory } from '@chpokify/models-types/story';
import { URL } from 'url';

const getRequestTokenUrl = (baseUrl: string): string => {
  const baseUrlObj = new URL(baseUrl);
  baseUrlObj.pathname = '/plugins/servlet/oauth/request-token';

  return baseUrlObj.toString();
};

const getAccessTokenUrl = (baseUrl: string): string => {
  const baseUrlObj = new URL(baseUrl);
  baseUrlObj.pathname = '/plugins/servlet/oauth/access-token';

  return baseUrlObj.toString();
};

const getAuthorizationUrl = (baseUrl: string, token: string): string => {
  const baseUrlObj = new URL(baseUrl);
  baseUrlObj.pathname = '/plugins/servlet/oauth/authorize';
  baseUrlObj.searchParams.append('oauth_token', token);

  return baseUrlObj.toString();
};

const getIssueUrl = (baseUrl: string, issueKey: string): string => {
  const baseUrlObj = new URL(baseUrl);
  baseUrlObj.pathname = `/browse/${issueKey}`;

  return baseUrlObj.toString();
};

const convertJiraIssue = (
  baseUrl: string,
  spaceId: TEntityID,
  issues: TJiraIssue[]
): Omit<TStory, '_id' | 'id'>[] => issues.map((issue) => ({
  spaceId,
  title: `${issue.fields.summary} ${getIssueUrl(baseUrl, issue.key)}`,
  jiraData: issue,
}));

const jiraHeleprs = {
  getRequestTokenUrl,
  getAccessTokenUrl,
  getAuthorizationUrl,
  getIssueUrl,
  convertJiraIssue,
};

export {
  jiraHeleprs,
};
