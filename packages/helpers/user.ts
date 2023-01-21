import { TUser, USER_ROLES, USERNAME_CHAR_PATTERN } from '@chpokify/models-types';
import shortid from 'shortid';

const getRole = (user?: TUser | null): USER_ROLES => {
  if (!user) {
    return USER_ROLES.GUEST;
  }

  return user.role;
};

const getUsernameFromEmail = (email: string) => {
  const username = email.split('@')[0] || shortid();
  return username.split('').map((char) => {
    if (new RegExp(USERNAME_CHAR_PATTERN).test(char)) {
      return char;
    }

    return '';
  }).join('');
};

export const userHelpers = {
  getRole,
  getUsernameFromEmail,
};
