import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TDividerProps = TBoxProps;

const Root = styled(Box)<TBoxProps>`
border: none;
flex-shrink: 0;
`;

const Divider = (props: TDividerProps): React.ReactElement | null => (
  <Root
    as="hr"
    height="1px"
    width="100%"
    bg="base.a_30"
    my={0}
    {...props}
  />
);

export {
  Divider,
};
