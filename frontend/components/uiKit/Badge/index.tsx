import React from 'react';
import styled, { css } from 'styled-components';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TBadgeProps = Partial<TTextProps> & {
  size?: '100' | '200',
};

const rootSize100Mixin = css`
  border-radius: ${({ theme }) => theme.radii[1]};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  height: 16px;
  padding: 0 ${({ theme }) => theme.space[1]};
`;

const rootSize200Mixin = css`
  border-radius: ${({ theme }) => theme.radii[2]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  height: 32px;
  line-height: 32px;
  padding: 0 ${({ theme }) => theme.space[2]};
`;

const rootSizeMixin = (size: TBadgeProps['size']) => {
  switch (size) {
    case '100':
      return rootSize100Mixin;
    case '200':
      return rootSize200Mixin;
    default:
      return rootSize100Mixin;
  }
};

const Root = styled(Text)<TBadgeProps>`
  align-items: center;
  display: inline-flex;
  font-weight: ${({ theme }) => theme.fontWeights[1]};
  justify-content: flex-start;
  line-height:0;
  ${({ size }) => rootSizeMixin(size)};
  width: auto;
`;

const Badge = (props: TBadgeProps): React.ReactElement | null => {
  const {
    size = '100',
    ...other
  } = props;

  return (
    <Root
      bg="positive.normal"
      color="font.invert"
      forwardedAs="span"
      textTransform="uppercase"
      size={size}
      {...other}
    />
  );
};

export {
  Badge,
};
