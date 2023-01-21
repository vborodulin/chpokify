import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { TIconProps } from '@components/uiKit/Icons/Icon';
import { Text, TTextProps } from '@components/uiKit/Text';

const StyledIcon = styled.span`
  fill: ${({ theme }) => theme.colors.font.primary}
`;

const StyledText = styled(Text)<TTextProps>`
  position: relative;

  &:before {
    bottom: -2px;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    visibility: hidden;
    width: 100%;
  }
`;

const StyledLink = styled(Text)<TTextProps>`
  align-items: center;
  color: ${({ theme }) => theme.colors.font.primary};
  cursor: pointer;
  display: inline-flex;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.font.primary_a_10};

    ${StyledText}:before {
      background-color: ${({ theme }) => theme.colors.font.primary_a_10};
      transform: scaleX(1);
      visibility: visible;
    }

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.font.primary_a_10}
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.font.primary_a_20};

    ${StyledText}:before {
      background-color: ${({ theme }) => theme.colors.font.primary_a_20};
      transform: scaleX(1);
      visibility: visible;
    }

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.font.primary_a_20}
    }
  }
`;

type TAnchorProps = {
  children: string;
  StartIcon?: React.FunctionComponent<TIconProps>;
  EndIcon?: React.FunctionComponent<TIconProps>;
} & React.AnchorHTMLAttributes<any>;

const Anchor = React.forwardRef<any, TAnchorProps>((props, ref) => {
  const {
    StartIcon,
    EndIcon,
    children,
    ...other
  } = props;

  return (
    <StyledLink
      ref={ref}
      forwardedAs="a"
      fontSize={2}
      fontWeight={1}
      {...other}
    >
      {!!StartIcon && (
        <StyledIcon
          as={StartIcon}
          mr={1}
        />
      )}

      <StyledText
        as="span"
      >
        {children}
      </StyledText>

      {!!EndIcon && (
        <StyledIcon
          as={EndIcon}
          ml={1}
        />
      )}
    </StyledLink>
  );
});

Anchor.displayName = 'Anchor';

export type TLinkProps = TTextProps & React.AnchorHTMLAttributes<any> & {
  children: string;
  href?: string;
  as?: string;
  locale?: string | undefined;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  StartIcon?: React.FunctionComponent<TIconProps>;
  EndIcon?: React.FunctionComponent<TIconProps>;
  isExternal?: boolean;
};

const LinkComponent = React.forwardRef<any, TLinkProps>((props, ref) => {
  const {
    StartIcon,
    EndIcon,
    children,
    href,
    as,
    prefetch,
    replace,
    scroll,
    shallow,
    locale,
    ...other
  } = props;

  if (!href) {
    return (
      <Anchor
        StartIcon={StartIcon}
        EndIcon={EndIcon}
        {...other}
      >
        {children}
      </Anchor>
    );
  }

  const isLinkExternal = typeof props.isExternal === 'boolean'
    ? props.isExternal
    : href.startsWith('http');

  if (isLinkExternal) {
    return (
      <Anchor
        forwardedAs="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        StartIcon={StartIcon}
        EndIcon={EndIcon}
        {...other}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <NextLink
      href={href}
      as={as}
      passHref
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <Anchor
        ref={ref}
        StartIcon={StartIcon}
        EndIcon={EndIcon}
        {...other}
      >
        {children}
      </Anchor>
    </NextLink>
  );
});

LinkComponent.displayName = 'LinkComponent';

export {
  LinkComponent,
};
