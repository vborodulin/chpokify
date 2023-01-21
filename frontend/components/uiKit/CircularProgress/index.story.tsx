import base from 'paths.macro';
import React from 'react';

import { CircularProgress } from '@components/uiKit/CircularProgress';
import { Grid } from '@components/uiKit/Grid';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Grid>
    <CircularProgress />
    <CircularProgress
      size={8}
    />
    <CircularProgress
      size={10}
    />
    <CircularProgress
      size={12}
    />
    <CircularProgress
      size={14}
    />
    <CircularProgress
      size={16}
    />
  </Grid>
);
