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
      username: null,
    }}
    defaultValues={{
      username: 'boroda',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    hasChanges={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      username: null,
    }}
    defaultValues={{
      username: 'boroda',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    hasChanges
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      username: null,
    }}
    defaultValues={{
      username: 'boroda',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading
    hasChanges
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      username: null,
    }}
    defaultValues={{
      username: 'boroda',
    }}
    errors={{
      username: {
        type: 'serverError',
        message: 'Username is too short',
      },
    }}
    errGlobalMsg=""
    isLoading={false}
    hasChanges
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorFGlobal = () => (
  <Layout
    formRefs={{
      username: null,
    }}
    defaultValues={{
      username: 'boroda',
    }}
    errors={{}}
    errGlobalMsg="Interval server error"
    isLoading={false}
    hasChanges
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
