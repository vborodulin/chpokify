import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { Counter } from './index';

export default {
  title: getStoryName(base),
};

export const Digit1 = () => (
  <Counter
    count={1}
  />
);

export const Digit2 = () => (
  <Counter
    count={10}
  />
);

export const Digit3 = () => (
  <Counter
    count={100}
  />
);

export const Digit4 = () => (
  <Counter
    count={9999}
  />
);
