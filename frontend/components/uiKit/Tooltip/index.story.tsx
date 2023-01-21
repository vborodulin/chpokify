import base from 'paths.macro';
import React from 'react';

import { TooltipDescription } from '@components/uiKit/TooltipDescription';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { getStoryName } from '@lib/getStoryName';

import { Tooltip } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Tooltip>
    <TooltipTitle>
      Tooltip header
    </TooltipTitle>

    <TooltipDescription>
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
    </TooltipDescription>
  </Tooltip>
);
