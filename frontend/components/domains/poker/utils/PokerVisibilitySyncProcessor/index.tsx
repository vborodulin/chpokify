import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesAsyncActions } from '@Redux/domains/stories/asyncActions';
import { systemSelectors } from '@Redux/domains/system/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { useDidmount } from '@components/utils/hooks/useDidmount';
import { usePrevious } from '@components/utils/hooks/usePrevious';
import { SOCKET_STATUS } from '@components/utils/types';

const PokerVisibilitySyncProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const isPendingRef = useRef<boolean>(false);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const spaceId = useSelector(pokerSessionsSelectors.getSpaceId)(
    pokerSessionId
  );

  const isDocumentHidden = useSelector(uiSelectors.getIsDocumentHidden);

  const socketStatus = useSelector(systemSelectors.getSocketStatus);
  const prevSocketStatus = usePrevious(socketStatus);

  const syncData = async () => {
    if (!pokerSessionId || !spaceId || isPendingRef.current) {
      return;
    }

    isPendingRef.current = true;

    const { payload } = await dispatch(
      await dispatch(pokerSessionsAsyncActions.get(pokerSessionId))
    );

    if (getIsRejectedActionPayload(payload)) {
      return;
    }

    await dispatch(
      storiesAsyncActions.getMany(
        spaceId,
        {
          ids: payload.pokerSession.storiesIds,
        }
      )
    );

    isPendingRef.current = false;
  };

  useDidmount(() => {
    if (!isDocumentHidden) {
      syncData();
    }
  }, [isDocumentHidden]);

  useDidmount(() => {
    if (socketStatus === SOCKET_STATUS.CONNECTED && prevSocketStatus !== SOCKET_STATUS.NONE) {
      syncData();
    }
  }, [socketStatus]);

  return null;
};

export {
  PokerVisibilitySyncProcessor,
};
