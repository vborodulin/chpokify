import base from 'paths.macro';
import React from 'react';

import { Checkbox } from '@components/uiKit/CheckBox';
import { FormControlLabel } from '@components/uiKit/FormControlLabel';

import { getStoryName } from '@lib/getStoryName';

import { FormGroup } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <FormGroup>
    <FormControlLabel
      label="Label One"
    >
      <Checkbox
        name="one"
      />
    </FormControlLabel>

    <FormControlLabel
      label="Label Two"
    >
      <Checkbox
        name="two"
      />
    </FormControlLabel>
  </FormGroup>
);
