import React from 'react';
import styled from 'styled-components';

import { Flex } from '@components/uiKit/Flex';
import { TSpacerProps } from '@components/uiKit/Spacer';
import { Switcher, TSwitcherProps } from '@components/uiKit/Switcher';
import { Text } from '@components/uiKit/Text';

export type TSwitcherWithTextProps = Omit<TSwitcherProps, 'onChange'> & {
  onClickBox: () => void;
  boxCss?: Record<string, any>
  textCss?: Record<string, any>
};

const Root = styled(Flex)<TSpacerProps>`
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;

const SwitcherWithText: React.FunctionComponent<TSwitcherWithTextProps> = (props) => {
  const {
    onClickBox,
    id,
    name,
    checked,
    boxCss,
    textCss,
    title,
  } = props;

  return (
    <Root
      onClick={onClickBox}
      {...boxCss}
    >
      <Text
        htmlFor={id}
        forwardedAs="label"
        fontSize={2}
        fontWeight={1}
        mr={2}
        {...textCss}
      >
        {title}
      </Text>

      <Switcher
        onClick={(e) => {
          e.stopPropagation();
        }}
        id={id}
        name={name}
        checked={checked}
        onChange={onClickBox}
      />
    </Root>
  );
};

export { SwitcherWithText };
