import React from 'react';
import styled, { css } from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TListItemProps = Partial<TFlexProps> & {
  isButton?: boolean;
  disabled?: boolean;
};

const buttonActiveMixin = css`
  &:active {
    border-color:${({ theme }) => theme.colors.primary.normal};
    opacity:1;
  }  
`;
const buttonHoverMixin = css`
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.d_40};
        text-decoration: none;
      }
`;
const buttonMixin = css`
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  outline: 0;
  position: relative;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
 
`;
const rootDisabledMixin = css`
     cursor: not-allowed;
     opacity: 0.4;
`;

const Root = styled(Flex)<TListItemProps>`
  ${({ isButton }) => (isButton && buttonMixin)};
  ${({ disabled }) => (disabled && rootDisabledMixin)};
  ${({ disabled, isButton }) => ((!disabled && isButton) && [buttonActiveMixin, buttonHoverMixin])};
 
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  position: relative;
  text-align: left;
  text-decoration: none;
  width: 100%;
`;

const ListItem = (props: TListItemProps): React.ReactElement | null => {
  const { ...other } = props;
  return (
    <Root
      {...other}
    />
  );
};

export {
  ListItem,
};
