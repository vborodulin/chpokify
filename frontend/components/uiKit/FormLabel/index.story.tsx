import base from 'paths.macro';
import React from 'react';

import { FormControl } from '@components/uiKit/FormControl';
import { Input } from '@components/uiKit/Input';

import { getStoryName } from '@lib/getStoryName';

import { FormLabel } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <FormControl>
    <FormLabel>
      Username
    </FormLabel>
    <Input />
  </FormControl>
);
