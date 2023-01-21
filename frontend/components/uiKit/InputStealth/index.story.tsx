import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { InputStealth } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <InputStealth
    fontSize={11}
    fontWeight={1}
  />
);

export const Disabled = () => (
  <InputStealth
    fontSize={11}
    fontWeight={1}
    disabled
  />
);
