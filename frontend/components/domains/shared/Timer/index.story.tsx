import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Timer } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Timer
    timerId="1"
    isActive={false}
    pastSeconds={0}
  />
);

export const WithPastSeconds = () => (
  <Timer
    timerId="1"
    isActive={false}
    pastSeconds={156}
  />
);

export const Active = () => (
  <Timer
    timerId="1"
    isActive
    pastSeconds={156}
  />
);
