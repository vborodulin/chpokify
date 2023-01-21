import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { UserWelcome } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <UserWelcome />
);
