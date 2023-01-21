import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TIndexSectionProps = TBoxProps;

const IndexSection = (props: TIndexSectionProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <Box
      px={6}
      {...other}
    >
      <Box
        maxWidth="1140px"
        mx="auto"
        py={[
          10,
          15,
          20,
        ]}
      >
        {children}
      </Box>
    </Box>
  );
};

export {
  IndexSection,
};
