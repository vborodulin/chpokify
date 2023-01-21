import base from 'paths.macro';
import React from 'react';

import { Checkbox } from '@components/uiKit/CheckBox';

import { getStoryName } from '@lib/getStoryName';

import { FormControlLabel } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <FormControlLabel
    label="label"
  >
    <Checkbox
      name="name"
      checked={false}
    />
  </FormControlLabel>
);
