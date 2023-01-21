import React from 'react';
import { useSelector } from 'react-redux';

import { systemSelectors } from '@Redux/domains/system/selectors';
import { uiSelectors } from '@Redux/domains/ui/selectors';

import { useDidmount } from '@components/utils/hooks/useDidmount';
import { usePrevious } from '@components/utils/hooks/usePrevious';
import { SOCKET_STATUS } from '@components/utils/types';

// TODO
const SpaceVisibilitySyncProcessor = (): React.ReactElement | null => {
  // const dispatch = useAppDispatch();

  // const { pathname } = useRouter();
  // const isPendingRef = useRef<boolean>(false);

  // const spaceId = useSelector(spacesSelectors.getCurrSpaceId);

  const isDocumentHidden = useSelector(uiSelectors.getIsDocumentHidden);

  const socketStatus = useSelector(systemSelectors.getSocketStatus);
  const prevSocketStatus = usePrevious(socketStatus);

  // const syncData = async () => {
  //   if (isPendingRef.current) {
  //     return;
  //   }
  //
  //   isPendingRef.current = true;
  //
  //   log.info('[SpaceVisibilitySyncProcessor] syncData');
  //   await dispatch(spacesRepoOperations.getMetaData(spaceId));
  //
  //   isPendingRef.current = false;
  // };

  useDidmount(() => {
    // TODO
    if (!isDocumentHidden) {
      // syncData();
    }
  }, [isDocumentHidden]);

  useDidmount(() => {
    // TODO
    if (socketStatus === SOCKET_STATUS.CONNECTED && prevSocketStatus !== SOCKET_STATUS.NONE) {
      // syncData();
    }
  }, [socketStatus]);

  return null;
};

export {
  SpaceVisibilitySyncProcessor,
};
