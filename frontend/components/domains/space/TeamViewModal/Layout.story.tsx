import { USER_ROLES } from '@chpokify/models-types';
import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Layout } from './Layout';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Layout
    teamName="RND"
    teamUsers={[
      {
        _id: '1',
        username: 'boroda',
        email: 'boroda@gmail.com',
        role: USER_ROLES.USER,
      },
    ]}
    onCancel={() => {}}
  />
);
