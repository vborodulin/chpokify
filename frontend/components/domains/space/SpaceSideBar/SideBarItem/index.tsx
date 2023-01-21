import React from 'react';
import styled, { css } from 'styled-components';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TSideBarItemProps = TGridProps & {
  isActive?: boolean;
  canInteract?: boolean;
};

export const SideBarItemText = styled(Text)<TTextProps>`
  font-size: ${({ theme }) => theme.fontSizes[2]};
`;

export const SideBarItemAdornment = styled(Flex)<TFlexProps>`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
`;

const rootActiveMixin = css<TSideBarItemProps>`
  background-color: ${({ theme }) => theme.colors.primary.d_40};
`;

const rootCanInteractMixin = css<TSideBarItemProps>`
  cursor: pointer;

  &:hover {
    ${rootActiveMixin};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.d_30};
  }

  ${({ isActive }) => isActive && rootActiveMixin};
`;

const Root = styled(Grid)<TSideBarItemProps>`
  user-select: none;
  ${({ canInteract }) => canInteract && rootCanInteractMixin};
`;

const SideBarItem = React.forwardRef<any, TSideBarItemProps>((props, ref) => {
  const {
    children,
    canInteract = true,
    onClick,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent) => {
    dispatch(uiActions.spaceSideBarClose());

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Root
      ref={ref}
      justifyContent="flex-start"
      alignItems="center"
      gridTemplateColumns="auto 1fr"
      gridGap={2}
      p={2}
      canInteract={canInteract}
      onClick={handleClick}
      mb={2}
      borderRadius={2}
      {...other}
    >
      {children}
    </Root>
  );
});

export {
  SideBarItem,
};
