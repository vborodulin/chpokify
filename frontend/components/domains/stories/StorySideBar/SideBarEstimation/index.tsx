import React from 'react';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { IconButton } from '@components/uiKit/IconButton';
import { IconSettingsOutline } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

export type TSideBarTimeTrackingProps = {};

const SideBarEstimation = (props: TSideBarTimeTrackingProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <Box
      p={4}
      {...other}
    >
      <Grid
        gridTemplateColumns="1fr auto"
        mb={1}
      >
        <Text
          fontSize={2}
        >
          Estimation
        </Text>

        <IconButton
          variant="icon"
        >
          <IconSettingsOutline />
        </IconButton>
      </Grid>

      <Flex>
        <Text
          fontSize={2}
          color="font.d_20"
        >
          None
        </Text>
      </Flex>
    </Box>
  );
};

export {
  SideBarEstimation,
};
