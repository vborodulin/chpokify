import { domHelpers } from '@chpokify/helpers/dom';
import { pokerSessionHelpers } from '@chpokify/helpers/pokerSession';
import { TEntityID } from '@chpokify/models-types';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const exportCSVAndDownload = (
  pokerSessionId: TEntityID,
  titleSuccess:string
): TAppOperation => async (
  dispatch,
  getState
) => {
  const res = await dispatch(pokerSessionsAsyncActions.exportCSV(
    pokerSessionId
  ));

  const pokerSessionTitle = pokerSessionsSelectors.getTitle(getState())(
    pokerSessionId
  );

  if (!getIsRejectedActionPayload(res.payload)) {
    domHelpers.downloadFile(
      res.payload.file,
      `${pokerSessionHelpers.getExportFilename(pokerSessionTitle)}`,
      titleSuccess
    );
  }
};

const pokerSessionsOperations = {
  exportCSVAndDownload,
};

export {
  pokerSessionsOperations,
};
