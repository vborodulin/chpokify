import { typesHelpers } from '@chpokify/helpers/types';
import React from 'react';
import styled, { css } from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

const rootContainedHoverMixin = css`
  border-radius: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.d_30};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.d_20};
  }
`;

const rootVariantIconMixin = css`
  & > * {
    width: 20px;
    height: 20px;
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.primary.a_10};
    }
  }

  &:active {
    svg {
      fill: ${({ theme }) => theme.colors.primary.a_20};
    }
  }
`;

const getVariant = ({ variant }: TIconButtonProps) => {
  switch (variant) {
    case 'icon':
      return rootVariantIconMixin;
    case 'contained':
      return rootContainedHoverMixin;
    default:
      return '';
  }
};

const Root = styled(Flex)<TIconButtonProps>`
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  justify-content: center;
  ${getVariant};
`;

export type TIconButtonProps = typesHelpers.Override<Partial<TFlexProps>, {
  variant: 'contained' | 'icon'
  isHover: boolean;
}>;

const IconButton = React.forwardRef<any, TIconButtonProps>((props, ref) => {
  const {
    variant = 'contained',
    ...other
  } = props;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Root
      ref={ref}
      role="button"
      variant={variant}
      display="inline-flex"
      onMouseDown={handleMouseDown}
      {...other}
    />
  );
});

IconButton.displayName = 'IconButton';

export {
  IconButton,
};
