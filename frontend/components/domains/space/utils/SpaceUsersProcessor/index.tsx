import React from 'react';
import { useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { usersAsyncActions } from '@Redux/domains/users/asyncActions';
import { useAppDispatch } from '@Redux/hooks';

import { useDidmount } from '@components/utils/hooks/useDidmount';

const SpaceUsersProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const space = useSelector(spacesSelectors.getCurrSpace);
  const spaceUsersIds = useSelector(spacesSelectors.getUsersIds)(
    space?._id
  );

  useDidmount(() => {
    dispatch(usersAsyncActions.getList({
      ids: spaceUsersIds,
    }));
  }, [JSON.stringify(spaceUsersIds)]);

  return null;
};

export {
  SpaceUsersProcessor,
};
