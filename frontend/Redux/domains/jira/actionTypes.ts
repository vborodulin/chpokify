const jiraActionTypes = {
  APPLICATION_LINK_GET_PENDING: 'jira/applicationLink/pending',
  APPLICATION_LINK_GET_FULFILLED: 'jira/applicationLink/fulfilled',
  APPLICATION_LINK_GET_REJECTED: 'jira/applicationLink/rejected',

  OAUTH_MAKE_PENDING: 'jira/oauth/make/pending',
  OAUTH_MAKE_FULFILLED: 'jira/oauth/make/fulfilled',
  OAUTH_MAKE_REJECT: 'jira/oauth/make/rejected',

  OAUTH_REMOVE_PENDING: 'jira/oauth/remove/pending',
  OAUTH_REMOVE_FULFILLED: 'jira/oauth/remove/fulfilled',
  OAUTH_REMOVE_REJECTED: 'jira/oauth/remove/rejected',

  OAUTH_CALLBACK_PENDING: 'jira/oauth/callback/pending',
  OAUTH_CALLBACK_FULFILLED: 'jira/oauth/callback/fulfilled',
  OAUTH_CALLBACK_REJECTED: 'jira/oauth/callback/rejected',

  BOARDS_LIST_GET_PENDING: 'jira/boards/list/get/pending',
  BOARDS_LIST_GET_FULFILLED: 'jira/boards/list/get/fulfilled',
  BOARDS_LIST_GET_REJECTED: 'jira/boards/list/get/rejected',

  SPRINTS_LIST_GET_PENDING: 'jira/sprints/list/get/pending',
  SPRINTS_LIST_GET_FULFILLED: 'jira/sprints/list/get/fulfilled',
  SPRINTS_LIST_GET_REJECTED: 'jira/sprints/list/get/rejected',

  ISSUES_IMPORT_PENDING: 'jira/issues/import/pending',
  ISSUES_IMPORT_FULFILLED: 'jira/issues/import/fulfilled',
  ISSUES_IMPORT_REJECTED: 'jira/issues/import/rejected',

  PROJECTS_IMPORT_PENDING: 'jira/projects/pending',
  PROJECTS_IMPORT_FULFILLED: 'jira/projects/fulfilled',
  PROJECTS_IMPORT_REJECTED: 'jira/projects/rejected',

  FIELDS_IMPORT_PENDING: 'jira/fields/pending',
  FIELDS_IMPORT_FULFILLED: 'jira/fields/fulfilled',
  FIELDS_IMPORT_REJECTED: 'jira/fields/rejected',

  PROJECTS_IMPORT_REMOVE: 'jira/projects/remove',

} as const;

export {
  jiraActionTypes,
};
