import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { spacesActions } from '@Redux/domains/spaces/actions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { useDidmount } from '@components/utils/hooks/useDidmount';

const SpaceKickProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const isParticipant = useSelector(spacesSelectors.getIsUserParticipant)(
    currSpaceId,
    currUserId
  );

  const handleKick = async () => {
    if (isParticipant) {
      return;
    }

    dispatch(spacesActions.remove(currSpaceId));
  };

  useDidmount(() => {
    handleKick();
  }, [isParticipant]);

  return null;
};

export {
  SpaceKickProcessor,
};
