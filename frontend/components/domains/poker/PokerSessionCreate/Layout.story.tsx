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
    canModerate
    onSubmit={() => {}}
  />
);

export const CantModerate = () => (
  <Layout
    formRefs={{
      title: null,
    }}
    canModerate={false}
    onSubmit={() => {}}
  />
);
