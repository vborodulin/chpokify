import base from 'paths.macro';
import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Grid } from '@components/uiKit/Grid/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Grid
    gridTemplateColumns="1fr 1fr 1fr"
    gridAutoRows={200}
    gridGap={2}
  >
    <Box
      bg="primary.normal"
    />
    <Box
      bg="primary.normal"
    />
    <Box
      bg="primary.normal"
    />
    <Box
      bg="primary.normal"
    />
    <Box
      bg="primary.normal"
    />
    <Box
      bg="primary.normal"
    />
  </Grid>
);
