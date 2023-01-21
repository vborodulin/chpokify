import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { InputPassword } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <InputPassword
    name="password"
    placeholder="password"
  />
);
