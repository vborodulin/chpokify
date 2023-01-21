import base from 'paths.macro';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { IconAdd } from '@components/uiKit/Icons';

import { getStoryName } from '@lib/getStoryName';

export default {
  title: getStoryName(base),
};

const renderRow = (variant: TButtonProps['variant']) => (
  <Flex>
    <Button
      variant={variant}
      mr={1}
    >
      Button
    </Button>

    <Button
      variant={variant}
      mr={1}
      disabled
    >
      Button
    </Button>

    <Button
      variant={variant}
      StartIcon={IconAdd}
      EndIcon={IconAdd}
      mr={1}
    >
      Button
    </Button>

    <Button
      variant={variant}
      StartIcon={IconAdd}
      mr={1}
    />

    <Button
      variant={variant}
      StartIcon={IconAdd}
      isLoading
    >
      Button
    </Button>

    <Button
      variant={variant}
      StartIcon={IconAdd}
      isActive
    >
      Button
    </Button>
  </Flex>
);

export const Default = () => (
  <Grid
    gridGap={2}
  >
    {renderRow('base')}
    {renderRow('primary')}
    {renderRow('primary-outline')}
    {renderRow('negative')}
    {renderRow('shadow')}
  </Grid>
);
