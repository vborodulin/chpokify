import React from 'react';
import styled from 'styled-components';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TTooltipTitleProps = Partial<TTextProps> & {
  children: React.ReactNode
};

const StyledText = styled(Text)<TTextProps>`
&:last-child {
  margin-bottom: 0;
}
`;

const TooltipTitle = (props: TTooltipTitleProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <StyledText
      fontSize={3}
      fontWeight={1}
      mb={3}
      color="font.invert"
      {...other}
    >
      {children}
    </StyledText>
  );
};

export {
  TooltipTitle,
};
