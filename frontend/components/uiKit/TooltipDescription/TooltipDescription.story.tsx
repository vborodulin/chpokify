import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { TooltipDescription } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <TooltipDescription>
    Amet minim mollit non deserunt ullamco est sit aliqua
    dolor do amet sint. Velit officia consequat duis enim
    velit mollit. Exercitation veniam consequat sunt nostrud amet.
  </TooltipDescription>
);
