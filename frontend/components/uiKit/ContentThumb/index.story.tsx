import base from 'paths.macro';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { IconBoard, IconDonut } from '@components/uiKit/Icons';

import { getStoryName } from '@lib/getStoryName';

import { ContentThumb } from './index';

export default {
  title: getStoryName(base),
};

export const Default = () => (
  <ContentThumb
    Icon={IconBoard}
    title="Retro is in development"
    description="We appreciate your interest to our new module, and we’re sure that you’ll have fun when its released!
    You can support us while waiting."
    button={(
      <Button
        StartIcon={IconDonut}
      >
        Donate
      </Button>
    )}
  />
);
