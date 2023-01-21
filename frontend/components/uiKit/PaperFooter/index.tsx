import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

type TPaperFooterProps = Partial<TBoxProps>;

const Root = styled(Box)<TBoxProps>`
margin-top: ${({ theme }) => theme.space[6]};

&:empty {
  margin: ${({ theme }) => theme.space[0]};
}
`;

const PaperFooter = (props: TPaperFooterProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  if (!children) {
    return null;
  }

  return (
    <Root
      {...other}
    >
      {children}
    </Root>
  );
};

export {
  PaperFooter,
};
