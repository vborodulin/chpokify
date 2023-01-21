import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { usersSelectors } from '@Redux/domains/users/selectors';

import { Avatar, TAvatarProps } from '@components/uiKit/Avatar';

export type TUserAvatarProps = Partial<TAvatarProps> & {
  userId: TEntityID;
};

const UserAvatar = React.forwardRef<any, TUserAvatarProps>((props, ref) => {
  const {
    userId,
    ...other
  } = props;

  const user = useSelector(usersSelectors.getById)(
    userId
  );

  if (!user) {
    return null;
  }

  const {
    username,
    imageUrl,
  } = user;

  return (
    <Avatar
      ref={ref}
      imageUrl={imageUrl}
      {...other}
    >
      {username[0]}
    </Avatar>
  );
});

UserAvatar.displayName = 'UserAvatar';

export {
  UserAvatar,
};
