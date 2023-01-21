import React from 'react';
import styled from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TListItemTextProps = Partial<TTextProps> & {
  children: string;
  textProps?: Partial<TTextProps>;
};

const Root = styled(Flex)<TFlexProps>`
  flex: 1 1 auto;
  margin: ${({ theme }) => theme.space[1]} 0;
  min-width: 0;
`;

const ListItemText = (props: TListItemTextProps): React.ReactElement | null => {
  const {
    children,
    textProps = {},
    ...other
  } = props;

  return (
    <Root
      {...other}
    >
      <Text
        fontSize={2}
        {...textProps}
      >
        {children}
      </Text>
    </Root>
  );
};

export {
  ListItemText,
};
