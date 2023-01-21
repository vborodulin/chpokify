import { TEntityID } from '../core';

import { TSpaceShortPreview, TTeamShortPreview } from './index';

export enum SPACE_PARTICIPANT_ROLE {
  GUEST,
  PLAYER,
  ADMIN,
}

export type TInviteTokenPayload = {
  space: TSpaceShortPreview,
  team: TTeamShortPreview | null;
  email: string;
};

export type TParticipant = {
  _id: TEntityID;
  userId: TEntityID;
  role: SPACE_PARTICIPANT_ROLE;
};
