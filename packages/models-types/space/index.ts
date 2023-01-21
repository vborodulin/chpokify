import { ObjectId } from 'bson';

import { TEntityID } from '../core';

import { TParticipant } from './participant';
import { TTeam } from './team';

export * from './team';
export * from './participant';

export const SPACE_NAME_MIN_LENGTH = 3;
export const SPACE_NAME_MAX_LENGTH = 50;

export type TSpace = {
  _id: string | ObjectId;
  name: string;
  generatedAvatarSvg: string;
  participants: TParticipant[];
  teams: TTeam[];
  customerId?: string;
  isFreeSubscription?: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: TEntityID;
  isDeleted?: boolean;
  deletedAt?: string;
};

export type TSpaceShortPreview = Pick<TSpace, '_id' | 'name'>

export type TSpaceStat = {
  storiesCount: number | null;
  sessionsCount: number | null;
  storyAverageTime: number | null;
  sessionAverageTime: number | null;
};
