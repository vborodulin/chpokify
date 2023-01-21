import React from 'react';

import { Divider } from '@components/uiKit/Divider';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

export type TDividerWithTextProps = Partial<TFlexProps> & {
  children: string
};

const DividerWithText = (props: TDividerWithTextProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      {...other}
    >
      <Divider
        flexShrink={0}
        flexGrow={1}
        width="unset"
      />

      <Text
        fontSize={2}
        fontWight={1}
        color="font.d_40"
        whiteSpace="nowrap"
        flexShrink={0}
        mx={2}
      >
        {children}
      </Text>

      <Divider
        flexGrow={1}
        flexShrink={0}
        width="unset"
      />
    </Flex>
  );
};

export {
  DividerWithText,
};
