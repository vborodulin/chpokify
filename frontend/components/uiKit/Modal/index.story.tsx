import base from 'paths.macro';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { getStoryName } from '@lib/getStoryName';

import { Modal } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <Modal>
    <PaperHeader>
      Do you want to remove space?
    </PaperHeader>

    <PaperFooter>
      <PaperActions>
        <Button
          variant="negative"
        >
          Remove
        </Button>
      </PaperActions>
    </PaperFooter>
  </Modal>
);
