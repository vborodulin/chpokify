import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { useDidmount } from '@components/utils/hooks/useDidmount';
import { useInterval } from '@components/utils/hooks/useInterval';

const PokerUserInSessionProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const isPendingRef = useRef<boolean>(false);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);

  const userSetOnlineInterval = useSelector(configSelectors.getPokerUserSetOnlineInterval);

  const isDocumentHidden = useSelector(uiSelectors.getIsDocumentHidden);

  const setUserInSession = async () => {
    if (!pokerSessionId || isPendingRef.current) {
      return;
    }

    isPendingRef.current = true;

    await dispatch(pokerSessionsAsyncActions.setInSession(pokerSessionId));

    isPendingRef.current = false;
  };

  useDidmount(() => {
    if (!isDocumentHidden) {
      setUserInSession();
    }
  }, [isDocumentHidden]);

  useInterval(
    'interval',
    setUserInSession,
    userSetOnlineInterval,
    true
  );

  return null;
};

export {
  PokerUserInSessionProcessor,
};
