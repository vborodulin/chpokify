import { TUserWithParticipant } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

const participants: TUserWithParticipant[] = [
  {
    _id: '5ef5044cc1a037003eca3b7c',
    email: 'borodulin.dev@gmail.com',
    username: 'boroda',
    participant: {
      _id: '5ef5044cc1a037003eca3b7e',
      userId: '5ef5044cc1a037003eca3b7c',
      role: 3,
    },
    role: 1,
  },
  {
    _id: '5efe5d6195d414005ed740b5',
    email: 'mayak@gmail.com',
    username: 'mayak',
    participant: {
      _id: '5efe5da895d414005ed740b8',
      userId: '5efe5d6195d414005ed740b5',
      role: 1,
    },
    role: 1,
  },
];

export const Default = () => (
  <Modal>
    <Layout
      canModerate
      spaceUsersWithParticipants={[]}
      teamParticipantsIds={[]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
      errors={{}}
      errGlobalMsg=""
      hasChanges={false}
      isLoading={false}
      onSetValue={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);

export const Loading = () => (
  <Modal>
    <Layout
      canModerate
      spaceUsersWithParticipants={[]}
      teamParticipantsIds={[]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
      errors={{}}
      errGlobalMsg=""
      hasChanges
      isLoading
      onSetValue={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);

export const ErrorGlobal = () => (
  <Modal>
    <Layout
      canModerate
      spaceUsersWithParticipants={[]}
      teamParticipantsIds={[]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
      errors={{}}
      errGlobalMsg="Interval server error"
      hasChanges
      isLoading
      onSetValue={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);

export const ErrorField = () => (
  <Modal>
    <Layout
      canModerate
      spaceUsersWithParticipants={[]}
      teamParticipantsIds={[]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
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
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);

export const WithParticipants = () => (
  <Modal>
    <Layout
      canModerate
      spaceUsersWithParticipants={participants}
      teamParticipantsIds={[
        '5ef5044cc1a037003eca3b7e',
      ]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
      errors={{}}
      errGlobalMsg=""
      hasChanges={false}
      isLoading={false}
      onSetValue={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);

export const CantModerate = () => (
  <Modal>
    <Layout
      canModerate={false}
      spaceUsersWithParticipants={participants}
      teamParticipantsIds={[
        '5ef5044cc1a037003eca3b7e',
      ]}
      formRefs={{
        name: null,
        participantsIds: null,
      }}
      defaultValues={{
        name: 'RND',
        participantsIds: undefined,
      }}
      errors={{}}
      errGlobalMsg=""
      hasChanges={false}
      isLoading={false}
      onSetValue={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onUpdate={() => {}}
    />
  </Modal>
);
