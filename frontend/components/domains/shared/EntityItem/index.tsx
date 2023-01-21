import Link, { LinkProps } from 'next/link';
import React from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Spacer } from '@components/uiKit/Spacer';
import { Text, TTextProps } from '@components/uiKit/Text';

import { NeverError } from '@lib/errors';

import { stylesMixins } from '@styles';

const Title = styled(Text)<TTextProps>`
${stylesMixins.textEllipsis()};

flex-grow: 1;
font-size: ${({ theme }) => theme.fontSizes[2]};
line-height: 24px;
margin-right: ${({ theme }) => theme.space[3]};
`;

const StartAdornment = styled(Box)<TBoxProps>`
color: ${({ theme }) => theme.colors.font.primary_d_20} !important;
fill: ${({ theme }) => theme.colors.font.primary_d_20} !important;
flex-grow: 0;
flex-shrink: 0;
margin-right: ${({ theme }) => theme.space[1]};
`;

const EndAdornment = styled(Text)<TTextProps>`
color: ${({ theme }) => theme.colors.font.primary_d_20};
fill: ${({ theme }) => theme.colors.font.primary_d_20};
flex-grow: 0;
flex-shrink: 0;
`;

type TRootProps = TFlexProps & {
  canHover: boolean;
}

const rootMixinCanInteract = (canHover: boolean) => {
  if (canHover) {
    return css`
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.base.a_20};
      }
    `;
  }

  return '';
};

const Root = styled(Flex)<TRootProps>`
${({ canHover }) => rootMixinCanInteract(canHover)};

align-items: center;
background-color: ${({ theme }) => theme.colors.base.a_10};
display: inline-flex;
flex-flow: row nowrap;
justify-content: space-between;
position: relative;
user-select: none;
`;

export type TEntityItemGeneralProps = Partial<Omit<TFlexProps, 'role'>> & {
  item: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: string;
}

export type TEntityItemDefaultProps = TEntityItemGeneralProps & {
  type: 'default'
}

export type TEntityItemLinkProps = TEntityItemGeneralProps & {
  type: 'link';
  linkProps: LinkProps,
  HoverIcon?: React.FunctionComponent;
  onClick?: () => void;
};

export type TEntityItemButtonProps = TEntityItemGeneralProps & {
  type: 'button';
  HoverIcon?: React.FunctionComponent;
  onClick?: () => void;
}

export type TEntityItemProps =
  | TEntityItemDefaultProps
  | TEntityItemLinkProps
  | TEntityItemButtonProps;

const EntityItem = (props: TEntityItemProps): React.ReactElement | null => {
  const {
    type,
    item,
    startAdornment = null,
    endAdornment = null,
    ...other
  } = props;

  const renderTitle = () => {
    if (typeof item === 'string') {
      return (
        <Title
          forwardedAs="p"
        >
          {item}
        </Title>
      );
    }

    return item;
  };

  const renderStartAdornment = () => {
    if (!startAdornment) {
      return null;
    }

    return (
      <StartAdornment>
        {startAdornment}
      </StartAdornment>
    );
  };

  const renderContent = () => (
    <>
      {renderStartAdornment()}

      <Spacer
        mr={3}
      >
        {renderTitle()}
      </Spacer>

      <EndAdornment
        fontSize={2}
      >
        {endAdornment}
      </EndAdornment>
    </>
  );

  switch (type) {
    case 'default':
      return (
        <Root
          borderRadius={1}
          height="40px"
          py={0}
          px={3}
          canHover={false}
          {...other}
        >
          {renderContent()}
        </Root>
      );

    case 'link': {
      const { linkProps } = props as TEntityItemLinkProps;

      return (
        // @ts-ignore
        <Link
          {...linkProps}
        >
          <Root
            as="a"
            canHover
            borderRadius={1}
            height="40px"
            py={0}
            px={3}
            onClick={props.onClick}
            {...other}
          >
            {renderContent()}
          </Root>
        </Link>
      );
    }

    case 'button':
      return (
        <Root
          role="button"
          canHover
          height="40px"
          py={0}
          px={3}
          onClick={props.onClick}
          borderRadius={1}
          {...other}
        >
          {renderContent()}
        </Root>
      );
    default:
      throw new NeverError(type);
  }
};

export {
  EntityItem,
};
