import base from 'paths.macro';
import React from 'react';

import { Grid } from '@components/uiKit/Grid';
import { IconSearch } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Grid
    gridGap={5}
  >
    <Input
      width="200px"
      placeholder="Placeholder"
    />
    <Input
      width="200px"
      placeholder="Placeholder"
      disabled
    />
    <Input
      width="200px"
      placeholder="Placeholder"
      startAdornment={(
        <IconSearch
          fill="font.d_20"
        />
      )}
      endAdornment={(
        <IconSearch
          fill="font.d_20"
        />
      )}
    />
    <Input
      multiline
      rows={10}
      width="200px"
      placeholder="Placeholder"
    />
  </Grid>
);
