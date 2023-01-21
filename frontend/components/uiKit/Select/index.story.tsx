import base from 'paths.macro';
import React from 'react';

import { Select } from '@components/uiKit/Select/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Select
    options={[
      {
        label: 'label 1',
        value: 'value 1',
      },
      {
        label: 'label 2',
        value: 'value 2',
      },
      {
        label: 'label 3',
        value: 'value 3',
      },
      {
        label: 'label 4',
        value: 'value 4',
      },
      {
        label: 'label 5',
        value: 'value 5',
      },
      {
        label: 'label 6',
        value: 'value 6',
      },
    ]}
  />
);
