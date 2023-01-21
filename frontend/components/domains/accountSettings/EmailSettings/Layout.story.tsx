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
      email: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    errors={{
      email: {
        type: 'serverError',
        message: 'Email is invalid',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      email: null,
    }}
    defaultValues={{
      email: 'boroda@gmail.com',
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
