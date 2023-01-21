import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Caption } from '@components/uiKit/Caption';
import { Text } from '@components/uiKit/Text';

export type TSpaceStatItemProps = Partial<TBoxProps> & {
  title: string;
  value: string;
};

const SpaceStatItem = (props: TSpaceStatItemProps): React.ReactElement | null => {
  const {
    title,
    value,
    ...other
  } = props;

  return (
    <Box
      p={3}
      bg="base.a_10"
      borderRadius={2}
      {...other}
    >
      <Caption
        mb={1}
      >
        {title}
      </Caption>

      <Text
        fontSize={4}
        fontWeight={1}
      >
        {value}
      </Text>
    </Box>
  );
};

export {
  SpaceStatItem,
};
