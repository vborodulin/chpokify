import React from 'react';
import styled from 'styled-components';
import { flexbox, FlexboxProps } from 'styled-system';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TFlexProps = Partial<TBoxProps> & FlexboxProps;

const StyledBox = styled(Box)<TFlexProps>`
${flexbox};
`;

const Flex = React.forwardRef<any, TFlexProps>((props, ref) => {
  const {
    ...other
  } = props;

  return (
    <StyledBox
      ref={ref}
      display="flex"
      {...other}
    />
  );
});

Flex.displayName = 'Flex';

export {
  Flex,
};
