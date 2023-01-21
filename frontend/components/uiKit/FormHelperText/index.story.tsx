import base from 'paths.macro';
import React from 'react';

import { FormHelperText } from '@components/uiKit/FormHelperText/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <FormHelperText
    variant="default"
  >
    Password restoration link has been sent, please check your email.
  </FormHelperText>
);

export const Positive = () => (
  <FormHelperText
    variant="positive"
  >
    Password restoration link has been sent, please check your email.
  </FormHelperText>
);

export const Negative = () => (
  <FormHelperText
    variant="negative"
  >
    Password restoration link has been sent, please check your email.
  </FormHelperText>
);
