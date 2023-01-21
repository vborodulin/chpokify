import { TEntityID } from '../core';

enum INVITE_USER_TO {
  POKER,
  RETRO
}

type TResetPasswordTokenPayload = {
  email: string
};

type TLogInGuest = {
  email: string;
  teamId: TEntityID
  inviteToken: string;
  inviteTo: INVITE_USER_TO
};

export {
  INVITE_USER_TO,
};

export type{
  TLogInGuest,
  TResetPasswordTokenPayload,
};
