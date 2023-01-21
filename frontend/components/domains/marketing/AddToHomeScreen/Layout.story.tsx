import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    isShow
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);

export const Hidden = () => (
  <Layout
    isShow={false}
    onCancel={() => {}}
    onSubmit={() => {}}
  />
);
