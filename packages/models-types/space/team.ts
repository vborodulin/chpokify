import { TEntityID } from '../core';

import { TParticipant } from './participant';

export const TEAM_NAME_MIN_LENGTH = 2;
export const TEAM_NAME_MAX_LENGTH = 50;

export type TTeam = {
  _id: TEntityID;
  name: string;
  participantsIds: TEntityID[];
};

export type TTeamShortPreview = {
  _id: TEntityID;
  name: string;
};

export type TTeamWithParticipants = Pick<TTeam, '_id' | 'name'> & {
  participants: TParticipant[]
}
