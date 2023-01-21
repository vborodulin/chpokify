import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Grid } from '@components/uiKit/Grid';
import { IconButton } from '@components/uiKit/IconButton';
import { IconCross, IconEdit } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

export type TSideBarHeaderProps = {};

const SideBarHeader = (props: TSideBarHeaderProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(uiActions.sideBarClose());
  };

  return (
    <Grid
      gridTemplateColumns="1fr auto"
      p={4}
      {...other}
    >
      <Box>
        <Text
          fontSize={2}
          fontWeight={1}
          mb={1}
        >
          Onboarding design
        </Text>

        <Text
          fontSize={2}
        >
          #19
        </Text>
      </Box>

      <Grid
        gridAutoFlow="column"
        alignItems="flex-start"
        gridGap={2}
      >
        <IconButton
          variant="icon"
        >
          <IconEdit />
        </IconButton>

        <IconButton
          variant="icon"
          onClick={handleClose}
        >
          <IconCross />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export {
  SideBarHeader,
};
