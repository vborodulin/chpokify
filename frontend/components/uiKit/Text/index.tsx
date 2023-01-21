import React from 'react';
import styled, { css } from 'styled-components';
import { system, typography, TypographyProps } from 'styled-system';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TTextProps = TBoxProps & TypographyProps & {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>,
  ellipses?: boolean;
  canHover?: boolean;
};

const ellipsesMixin = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const canHoverMixin = css`
  &:hover {
    color: ${({ theme }) => theme.colors.primary.normal};
    cursor: pointer;
  }
`;

const StyledText = styled(Box)<TTextProps>`
  ${typography};
  ${system({
    whiteSpace: {
      property: 'whiteSpace',
    },
    wordBreak: {
      property: 'wordBreak',
    },
    textTransform: {
      property: 'textTransform',
    },
    pointerEvents: {
      property: 'pointerEvents',
    },
    textDecoration: {
      property: 'textDecoration',
    },
  })}
  ${({ ellipses }) => (ellipses && ellipsesMixin)};
  ${({ canHover }) => (canHover && canHoverMixin)};

  font-family: ${({ theme }) => theme.fontFamily[0]};
  word-break: break-word;

  &:empty {
    display: none;
  }
`;

const Text = React.forwardRef<any, TTextProps>((props, ref) => {
  const {
    color = 'font.normal',
    fontSize = '200px',
    lineHeight = 0,
    fontWeight = 0,
    ellipses,
    as = 'p',
    ...other
  } = props;

  return (
    <StyledText
      ref={ref}
      color={color}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      ellipses={ellipses}
      as={as}
      {...other}
    />
  );
});

Text.displayName = 'Text';

export {
  Text,
};
