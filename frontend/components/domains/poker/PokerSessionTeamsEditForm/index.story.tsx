import { TTeam } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { PokerSessionTeamEditForm } from './index';

export default {
  title: getStoryName(base),
};

const teams: TTeam[] = [
  {
    _id: '1',
    name: 'RND',
    participantsIds: [],
  },
  {
    _id: '2',
    name: 'Product',
    participantsIds: [],
  },
];

export const Default = () => (
  <PokerSessionTeamEditForm
    formId="PokerSessionTeamEditForm"
    teams={teams}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    hasTeamHint={false}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <PokerSessionTeamEditForm
    formId="PokerSessionTeamEditForm"
    teams={teams}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{
      teamsIds: [
        {
          type: 'serverError',
          message: 'Internal server error',
        },
      ],
    }}
    errGlobalMsg=""
    isLoading={false}
    hasTeamHint={false}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <PokerSessionTeamEditForm
    formId="PokerSessionTeamEditForm"
    teams={teams}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading
    onSubmit={() => {}}
    hasTeamHint={false}
  />
);

export const EmptyTeams = () => (
  <PokerSessionTeamEditForm
    formId="PokerSessionTeamEditForm"
    teams={[]}
    defaultValue={{
      teamsIds: [],
    }}
    formRefs={{
      teamsIds: null,
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    onSubmit={() => {}}
    hasTeamHint={false}
  />
);
