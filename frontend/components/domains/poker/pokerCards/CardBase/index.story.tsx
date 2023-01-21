import base from 'paths.macro';
import React from 'react';

import { CardBase } from '@components/domains/poker/pokerCards/CardBase/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <CardBase />
);
