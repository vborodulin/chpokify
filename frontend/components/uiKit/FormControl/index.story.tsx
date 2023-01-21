import base from 'paths.macro';
import React from 'react';

import { FormControl } from '@components/uiKit/FormControl';
import { Input } from '@components/uiKit/Input';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <FormControl
    errorMessage="This email is not registered"
    width="240px"
  >
    <Input
      type="email"
      placeholder="Email"
    />
  </FormControl>
);
