import { jiraActions } from '@Redux/domains/jira/actions';
import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';

export type TJiraActionsUnion =
  | ReturnType<typeof jiraAsyncActions.applicationLinkGet.pending>
  | ReturnType<typeof jiraAsyncActions.applicationLinkGet.fulfilled>
  | ReturnType<typeof jiraAsyncActions.applicationLinkGet.rejected>
  | ReturnType<typeof jiraAsyncActions.oauthMake.pending>
  | ReturnType<typeof jiraAsyncActions.oauthMake.fulfilled>
  | ReturnType<typeof jiraAsyncActions.oauthMake.rejected>
  | ReturnType<typeof jiraAsyncActions.oauthRemove.pending>
  | ReturnType<typeof jiraAsyncActions.oauthRemove.fulfilled>
  | ReturnType<typeof jiraAsyncActions.oauthRemove.rejected>
  | ReturnType<typeof jiraAsyncActions.oauthCallback.pending>
  | ReturnType<typeof jiraAsyncActions.oauthCallback.fulfilled>
  | ReturnType<typeof jiraAsyncActions.oauthCallback.rejected>
  | ReturnType<typeof jiraAsyncActions.boardsGetList.pending>
  | ReturnType<typeof jiraAsyncActions.boardsGetList.fulfilled>
  | ReturnType<typeof jiraAsyncActions.boardsGetList.rejected>
  | ReturnType<typeof jiraAsyncActions.sprintsGetList.pending>
  | ReturnType<typeof jiraAsyncActions.sprintsGetList.fulfilled>
  | ReturnType<typeof jiraAsyncActions.sprintsGetList.rejected>
  | ReturnType<typeof jiraAsyncActions.issuesImport.rejected>
  | ReturnType<typeof jiraAsyncActions.issuesImport.pending>
  | ReturnType<typeof jiraAsyncActions.issuesImport.fulfilled>
  | ReturnType<typeof jiraAsyncActions.issuesImport.rejected>
  | ReturnType<typeof jiraAsyncActions.getProjects.pending>
  | ReturnType<typeof jiraAsyncActions.getProjects.fulfilled>
  | ReturnType<typeof jiraAsyncActions.getProjects.rejected>

  | ReturnType<typeof jiraAsyncActions.getFields.pending>
  | ReturnType<typeof jiraAsyncActions.getFields.fulfilled>
  | ReturnType<typeof jiraAsyncActions.getFields.rejected>
  | ReturnType<typeof jiraActions.removeJiraProjects>;
