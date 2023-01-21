import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Text } from '@components/uiKit/Text';

export type TContentEmptyProps = TBoxProps & {
  children: string;
  actionBtn?: React.ReactElement | null;
};

const ContentEmpty = (props: TContentEmptyProps): React.ReactElement | null => {
  const {
    children,
    actionBtn,
    ...other
  } = props;

  return (
    <Box>
      <Text
        fontSize={2}
        mb={actionBtn ? 4 : 0}
        {...other}
      >
        {children}
      </Text>

      {actionBtn}
    </Box>
  );
};

export {
  ContentEmpty,
};
