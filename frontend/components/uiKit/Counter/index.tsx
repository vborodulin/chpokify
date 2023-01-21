import React from 'react';

import { Flex } from '@components/uiKit/Flex';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TCounterProps = {
  count: number,
  textProps?: Partial<TTextProps>;
};

const Counter = (props: TCounterProps): React.ReactElement | null => {
  const {
    count,
    textProps,
  } = props;

  return (
    <Flex
      px={1}
      borderRadius="2em"
      minWidth="24px"
      backgroundColor="base.a_30"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        as="span"
        fontSize={1}
        color="font.d_10"
        {...textProps}
      >
        {count}
      </Text>
    </Flex>
  );
};

export {
  Counter,
};
