import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { TooltipTitle } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <TooltipTitle>
    Tooltip title
  </TooltipTitle>
);
