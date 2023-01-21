import React from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

const getClipPath = (size: string) => `rect(0, ${size}, ${size}, calc(${size} / 2))`;

type TRootProps = TBoxProps & {
  size: number
};

const RootCenterMixin = css`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Root = styled(Box)<TRootProps>`
animation: rotor-1 3s linear infinite;
height: ${({ size, theme }) => theme.sizes[size]};
width: ${({ size, theme }) => theme.sizes[size]};
${({ isCenter }) => isCenter && RootCenterMixin};
  
@keyframes rotor-1 {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

type TContentProps = TBoxProps & {
  size: number
};

const Content = styled(Box)<TContentProps>`
animation: rotor-2 1s linear infinite;
bottom: 0;
clip: ${({ size, theme }) => getClipPath(theme.sizes[size])};
height: ${({ size, theme }) => theme.sizes[size]};
left: 0;
margin: auto;
position: absolute;
right: 0;
top: 0;
width: ${({ size, theme }) => theme.sizes[size]};

&:after {
  animation: rotor-3 1s linear infinite;
  border: 3px solid currentColor;
  border-radius: 50%;
  bottom: 0;
  box-sizing: border-box;
  clip: ${({ size, theme }) => getClipPath(theme.sizes[size])};
  content: "";
  height: ${({ size, theme }) => theme.sizes[size]};
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ size, theme }) => theme.sizes[size]};
}

@keyframes rotor-2 {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(200deg); }
}

@keyframes rotor-3 {
  0%   { transform: rotate(-140deg); }
  50%  { transform: rotate(-160deg); }
  100% { transform: rotate(140deg); }
}
`;

type TCircularProgressProps = TBoxProps & {
  size?: number,
  color?: string;
  isCenter?: boolean;
};

const CircularProgress: React.FunctionComponent<TCircularProgressProps> = (props) => {
  const {
    size = 6,
    color = 'primary.normal',
    ...other
  } = props;

  return (
    <Root
      size={size}
      color={color}
      {...other}
    >
      <Content
        size={size}
      />
    </Root>
  );
};

export {
  CircularProgress,
};
