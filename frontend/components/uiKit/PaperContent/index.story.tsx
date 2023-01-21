import base from 'paths.macro';
import React from 'react';

import { Paper } from '@components/uiKit/Paper';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { getStoryName } from '@lib/getStoryName';

import { PaperContent } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Paper
    variant="card"
  >
    <PaperHeader>
      Enter password
    </PaperHeader>

    <PaperContent>
      Due to security reasons, please enter your curr password.
    </PaperContent>
  </Paper>
);
