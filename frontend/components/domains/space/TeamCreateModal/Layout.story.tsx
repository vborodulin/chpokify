import { SPACE_PARTICIPANT_ROLE, USER_ROLES } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[]}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const WithParticipants = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[
      {
        _id: '1',
        username: 'bortoda',
        role: USER_ROLES.USER,
        email: '',
        participant: {
          _id: '10',
          userId: '1',
          role: SPACE_PARTICIPANT_ROLE.PLAYER,
        },
      },
    ]}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[]}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[]}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[]}
    errors={{
      name: {
        type: 'serverError',
        message: 'Name is too short',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      name: null,
      participantsIds: null,
    }}
    spaceUsersWithParticipants={[]}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading
    onSetValue={() => {}}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
