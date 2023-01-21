import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { StoryEditForm } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <StoryEditForm
    formId="StoryEditForm"
    formRefs={{
      title: null,
    }}
    defaultValues={{}}
    errors={{}}
    errGlobalMsg=""
    isLoading={false}
    onSubmit={() => {}}
  />
);

export const IsLoading = () => (
  <StoryEditForm
    formId="StoryEditForm"
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the restricted '
        + 'route /users/ daily and wasting crawling budget',
    }}
    errors={{}}
    errGlobalMsg=""
    isLoading
    onSubmit={() => {
    }}
  />
);

export const ErrorField = () => (
  <StoryEditForm
    formId="StoryEditForm"
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the restricted '
        + 'route /users/ daily and wasting crawling budget',
    }}
    errors={{
      title: {
        type: 'serverError',
        message: 'Invalid title',
      },
    }}
    errGlobalMsg=""
    isLoading={false}
    onSubmit={() => {
    }}
  />
);

export const ErrorGlobal = () => (
  <StoryEditForm
    formId="StoryEditForm"
    formRefs={{
      title: null,
    }}
    defaultValues={{
      title: 'Solve the problem with SE Bots trying to crawl the restricted '
        + 'route /users/ daily and wasting crawling budget',
    }}
    errors={{}}
    errGlobalMsg="Internal server error"
    isLoading={false}
    onSubmit={() => {
    }}
  />
);
