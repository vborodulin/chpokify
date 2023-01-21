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
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the '
        + 'restricted route /users/ daily and wasting crawling budget',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
    onRemove={() => {}}
  />
);

export const Loading = () => (
  <Layout
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the '
        + 'restricted route /users/ daily and wasting crawling budget',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading
    onCancel={() => {}}
    onSubmit={() => {}}
    onRemove={() => {}}
  />
);

export const ErrorField = () => (
  <Layout
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the '
        + 'restricted route /users/ daily and wasting crawling budget',
    }}
    errors={{
      title: {
        type: 'serverError',
        message: 'Too short',
      },
    }}
    errGlobalMsg=""
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
    onRemove={() => {}}
  />
);

export const ErrorGlobal = () => (
  <Layout
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the '
        + 'restricted route /users/ daily and wasting crawling budget',
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    isLoading={false}
    onCancel={() => {}}
    onSubmit={() => {}}
    onRemove={() => {}}
  />
);
