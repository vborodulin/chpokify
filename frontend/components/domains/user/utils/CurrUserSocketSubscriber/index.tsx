import { isEqualsId } from '@chpokify/helpers';
import { TUser } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { usersActions } from '@Redux/domains/users/actions';
import { useAppDispatch } from '@Redux/hooks';

import { useSocketSubscribe } from '@components/utils/socket/useSocketSubscribe';

const CurrUserSocketSubscriber = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const currUserId = useSelector(authSelectors.getCurrUserId);

  useSocketSubscribe(
    currUserId ? `user:${currUserId}` : '',
    (data: { user: TUser }) => {
      const { user } = data;

      if (!isEqualsId(user._id, currUserId)) {
        return;
      }

      dispatch(usersActions.upsert(user));
    }
  );

  return null;
};

export {
  CurrUserSocketSubscriber,
};
