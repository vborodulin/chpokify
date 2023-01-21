import React from 'react';
import { css } from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TInstructionProps = TFlexProps & {
  textProps?: TTextProps;
  title: string;
  icon: React.ReactElement;
  onClickBox: () => void;
};

const Instruction: React.FunctionComponent<TInstructionProps> = (props) => {
  const {
    onClickBox,
    title,
    textProps,
    icon,
    ...otherProps
  } = props;
  return (
    <Flex
      alignItems="center"
      bg="primary.d_40"
      borderRadius={2}
      px={4}
      py={3}
      onClick={onClickBox}
      css={css`cursor: pointer;`}
      {...otherProps}
    >
      {
        React.cloneElement(icon, {
          width: '32px',
          height: '32px',
          mr: 3,
        })
      }
      <Text
        fontSize={2}
        color="font.d_10"
        {...textProps}
      >
        {title}
      </Text>
    </Flex>
  );
};

export { Instruction };
