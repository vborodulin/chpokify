import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';

const removeJiraProjects = (baseUrl: string) => ({
  type: jiraActionTypes.PROJECTS_IMPORT_REMOVE,
  payload: { baseUrl },
}) as const;

export const jiraActions = {
  removeJiraProjects,
};
