import { arrayHelpers } from '@chpokify/helpers';
import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

/**
 * root
 */
const getJira = ({ jira }: TAppState) => jira;

/**
 * direct
 */
const getApplicationLinkInfo = createSelector(
  getJira,
  (jira) => jira.applicationLink
);

const getProjects = createSelector(
  getJira,
  (jira) => jira.projects
);
const getFields = createSelector(
  getJira,
  (jira) => jira.fields
);

const getFieldsByBaseUrl = createSelector(
  getFields,
  (fields) => (baseUrl: string | undefined) => {
    if (!baseUrl || arrayHelpers.isEmptyArr(fields[baseUrl])) return [];
    return fields[baseUrl];
  }
);

const jiraSelectors = {
  getApplicationLinkInfo,
  getProjects,
  getFields,
  getFieldsByBaseUrl,
};

export {
  jiraSelectors,
};
