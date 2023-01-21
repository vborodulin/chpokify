import { domHelpers } from '@chpokify/helpers/dom';

import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

const refreshIntegration = (baseUrl: string) => async (dispatch: TAppDispatch) => {
  const { payload } = await dispatch(jiraAsyncActions.oauthMake({
    baseUrl,
  }));

  if (!getIsRejectedActionPayload(payload)) {
    domHelpers.openNewTab(payload.oauthUrl, 60, 60);
  }
};

export const jiraOperations = {
  refreshIntegration,
};
