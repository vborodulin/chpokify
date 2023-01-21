import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { DividerWithText } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <DividerWithText>
    or
  </DividerWithText>
);
