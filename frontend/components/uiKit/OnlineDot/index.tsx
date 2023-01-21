import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TOnlineDotProps = Partial<TBoxProps>;

const OnlineDot = (props: TOnlineDotProps): React.ReactElement | null => (
  <Box
    as="span"
    width="8px"
    height="8px"
    bg="positive.normal"
    borderRadius="999px"
    {...props}
  />
);

export {
  OnlineDot,
};
