import base from 'paths.macro';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { PaperFooter } from '@components/uiKit/PaperFooter';

import { getStoryName } from '@lib/getStoryName';

import { PaperActions } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <PaperFooter>
    <PaperActions>
      <Button>
        Save
      </Button>
    </PaperActions>
  </PaperFooter>
);
