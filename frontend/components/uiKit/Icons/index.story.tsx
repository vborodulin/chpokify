import base from 'paths.macro';
import React from 'react';
import shortid from 'shortid';

import { Grid } from '@components/uiKit/Grid';
import * as icons from '@components/uiKit/Icons/index';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Grid
    gridTemplateColumns="repeat(10, auto)"
    gridGap={[4]}
  >
    {
      Object.values(icons).map((Icon) => (
        <Icon
          key={shortid()}
        />
      ))
    }
  </Grid>
);
