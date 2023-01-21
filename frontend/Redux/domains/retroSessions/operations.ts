import { retroSessionHelpers } from '@chpokify/helpers';
import { domHelpers } from '@chpokify/helpers/dom';
import { TEntityID } from '@chpokify/models-types';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionRelationsOperations } from '@Redux/domains/retroSessionsRelations/operations';
import { retroSessionsTemplatesOperations } from '@Redux/domains/retroTemplates/operations';
import { spacesRepoOperations } from '@Redux/domains/spacesRepo/operations';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppOperation } from '@Redux/types';

const exportsCardsActionCSV = (
  retroSessionId: TEntityID,
  titleSuccess: string
): TAppOperation => async (
  dispatch,
  getState
) => {
  const res = await dispatch(retroSessionsAsyncActions.exportsCardsActionCSV(retroSessionId));

  const retroSessionTitle = retroSessionsSelectors.getTitle(getState());

  if (!getIsRejectedActionPayload(res.payload)) {
    domHelpers.downloadFile(
      res.payload.file,
      `${retroSessionHelpers.getExportFilename(retroSessionTitle)}`,
      titleSuccess
    );
  }
};

const getInitialData = (spaceId:TEntityID, limit?:string): TAppOperation => async (dispatch) => {
  await Promise.all([
    dispatch(spacesRepoOperations.getMetaData(spaceId)),
    dispatch(retroSessionsAsyncActions.getList(spaceId, { limit })),
    dispatch(retroSessionsAsyncActions.getCountAll(spaceId)),
  ]);

  await Promise.all([
    dispatch(retroSessionsTemplatesOperations.getList()),
    dispatch(retroSessionRelationsOperations.getListByTemplatesIds()),
  ]);

  await dispatch(retroSessionRelationsOperations.getCardsActionsList());
};

export const retroSessionsOperations = {
  exportsCardsActionCSV,
  getInitialData,
};
