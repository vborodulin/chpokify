import base from 'paths.macro';
import React from 'react';

import { getStoryName } from '@lib/getStoryName';

import { CopyBtn } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <CopyBtn
    variant="primary"
    getCopyText={() => 'Hello, world!'}
  >
    Copy link
  </CopyBtn>
);
