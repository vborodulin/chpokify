import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { Skeleton } from '@components/uiKit/Skeleton';

const PokerSessionSkeleton = (): React.ReactElement | null => (
  <Flex
    height="100%"
    flexGrow={1}
    flexDirection="column"
  >
    <Skeleton
      variant="rect"
      height={52}
      width="100%"
    />

    <Box
      mb={5}
    />

    <Grid
      gridGap={6}
      gridTemplateColumns={[
        '1fr',
        null,
        '1fr 2fr',
        '460px 1fr',
      ]}
      gridTemplateRows="100%"
      alignItems="flex-start"
      flexGrow={1}
    >
      <Skeleton
        variant="rect"
        height="100%"
      />

      <Skeleton
        variant="rect"
        height="100%"
      />
    </Grid>
  </Flex>
);

export {
  PokerSessionSkeleton,
};
