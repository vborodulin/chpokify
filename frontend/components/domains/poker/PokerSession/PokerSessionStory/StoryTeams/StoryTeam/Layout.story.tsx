import {
  SPACE_PARTICIPANT_ROLE, TTeam, TUserWithParticipant, USER_ROLES,
} from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

const team: TTeam = {
  _id: '1',
  name: 'Front-end Product',
  participantsIds: [
    '10',
    '20',
    '30',
  ],
};

const teamUsersWithParticipant: Record<string, TUserWithParticipant> = {
  100: {
    _id: '100',
    username: 'softed',
    email: 'softed@gmail.com',
    role: USER_ROLES.USER,
    showSpaceOnboarding: false,
    showPokerOnboarding: false,
    participant: {
      _id: '1',
      userId: '100',
      role: SPACE_PARTICIPANT_ROLE.PLAYER,
    },
  },
  200: {
    _id: '200',
    username: 'boroda',
    email: 'boroda@gmail.com',
    role: USER_ROLES.USER,
    showSpaceOnboarding: false,
    showPokerOnboarding: false,
    participant: {
      _id: '2',
      userId: '200',
      role: SPACE_PARTICIPANT_ROLE.PLAYER,
    },
  },
  300: {
    _id: '300',
    username: 'rhitin',
    email: 'rhitin@gmail.com',
    role: USER_ROLES.USER,
    showSpaceOnboarding: false,
    showPokerOnboarding: false,
    participant: {
      _id: '3',
      userId: '300',
      role: SPACE_PARTICIPANT_ROLE.PLAYER,
    },
  },
};

export const Default = () => (
  <Layout
    pokerSessionId="1"
    cardSetId="ObjectId"
    storyId="1"
    team={team}
    teamUsersWithParticipants={teamUsersWithParticipant}
    isTeamVoting={false}
  />
);

export const TeamVoting = () => (
  <Layout
    pokerSessionId="1"
    cardSetId="ObjectId"
    storyId="1"
    team={team}
    teamUsersWithParticipants={teamUsersWithParticipant}
    isTeamVoting
  />
);
