import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { IconChevronDown } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

export type TSpaceNameLayoutProps = Partial<TBoxProps> & {
  spaceName: string
};

const StyledText = styled(Text)`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

const Root = styled(Box)`
align-items: center;
cursor: pointer;
display: inline-flex;

${StyledText} {
  color: ${({ theme }) => theme.colors.font.primary_d_10};
}

svg {
 fill: ${({ theme }) => theme.colors.font.primary_d_10};
}

&:hover {
  ${StyledText} {
    color: ${({ theme }) => theme.colors.font.primary};
  }

  svg {
    fill: ${({ theme }) => theme.colors.font.primary};
  }
}

&:active {
  ${StyledText} {
    color: ${({ theme }) => theme.colors.font.primary_a_10};
  }

  svg {
    fill: ${({ theme }) => theme.colors.font.primary_a_10};
  }
}
`;

const Layout = React.forwardRef<any, TSpaceNameLayoutProps>((props, ref) => {
  const { spaceName, ...other } = props;

  return (
    <Root
      ref={ref}
      role="button"
      {...other}
    >
      <StyledText
        fontSize={4}
        fontWeight={1}
      >
        {spaceName}
      </StyledText>

      <IconChevronDown />
    </Root>
  );
});

export {
  Layout,
};
