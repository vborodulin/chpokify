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
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    isFulfilled={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const HasChanges = () => (
  <Layout
    formRefs={{
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    isFulfilled={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges
    isLoading
    isFulfilled={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{
      password: {
        type: 'serverError',
        message: 'Password is too weak',
      },
    }}
    errGlobalMsg=""
    hasChanges
    isLoading={false}
    isFulfilled={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    hasChanges
    isLoading={false}
    isFulfilled={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Fulfilled = () => (
  <Layout
    formRefs={{
      password: null,
      newPassword: null,
      repeatNewPassword: null,
    }}
    errors={{}}
    errGlobalMsg=""
    hasChanges={false}
    isLoading={false}
    isFulfilled
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
