import { jiraApi } from '@api/jira';

import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';
import { createAsyncActionCreator } from '@Redux/lib/createAsyncAction';

const applicationLinkGet = createAsyncActionCreator(
  jiraActionTypes.APPLICATION_LINK_GET_PENDING,
  jiraActionTypes.APPLICATION_LINK_GET_FULFILLED,
  jiraActionTypes.APPLICATION_LINK_GET_REJECTED,
  jiraApi.getApplicationLink
);

const oauthMake = createAsyncActionCreator(
  jiraActionTypes.OAUTH_MAKE_PENDING,
  jiraActionTypes.OAUTH_MAKE_FULFILLED,
  jiraActionTypes.OAUTH_MAKE_REJECT,
  jiraApi.oauthMake
);

const oauthCallback = createAsyncActionCreator(
  jiraActionTypes.OAUTH_CALLBACK_PENDING,
  jiraActionTypes.OAUTH_CALLBACK_FULFILLED,
  jiraActionTypes.OAUTH_CALLBACK_REJECTED,
  jiraApi.oauthCallback
);

const oauthRemove = createAsyncActionCreator(
  jiraActionTypes.OAUTH_REMOVE_PENDING,
  jiraActionTypes.OAUTH_REMOVE_FULFILLED,
  jiraActionTypes.OAUTH_REMOVE_REJECTED,
  jiraApi.oauthRemove
);

const boardsGetList = createAsyncActionCreator(
  jiraActionTypes.BOARDS_LIST_GET_PENDING,
  jiraActionTypes.BOARDS_LIST_GET_FULFILLED,
  jiraActionTypes.BOARDS_LIST_GET_REJECTED,
  jiraApi.boardsListGet
);

const sprintsGetList = createAsyncActionCreator(
  jiraActionTypes.SPRINTS_LIST_GET_PENDING,
  jiraActionTypes.SPRINTS_LIST_GET_FULFILLED,
  jiraActionTypes.SPRINTS_LIST_GET_REJECTED,
  jiraApi.sprintsListGet
);

const issuesImport = createAsyncActionCreator(
  jiraActionTypes.ISSUES_IMPORT_PENDING,
  jiraActionTypes.ISSUES_IMPORT_FULFILLED,
  jiraActionTypes.ISSUES_IMPORT_REJECTED,
  jiraApi.issuesImport
);

const getProjects = createAsyncActionCreator(
  jiraActionTypes.PROJECTS_IMPORT_PENDING,
  jiraActionTypes.PROJECTS_IMPORT_FULFILLED,
  jiraActionTypes.PROJECTS_IMPORT_REJECTED,
  jiraApi.getProjects
);

const getFields = createAsyncActionCreator(
  jiraActionTypes.FIELDS_IMPORT_PENDING,
  jiraActionTypes.FIELDS_IMPORT_FULFILLED,
  jiraActionTypes.FIELDS_IMPORT_REJECTED,
  jiraApi.getFields
);

const jiraAsyncActions = {
  applicationLinkGet,
  oauthMake,
  oauthCallback,
  oauthRemove,
  boardsGetList,
  sprintsGetList,
  issuesImport,
  getProjects,
  getFields,
};

export {
  jiraAsyncActions,
};
