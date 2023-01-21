import React from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Image } from '@components/uiKit/Image';
import { Text, TTextProps } from '@components/uiKit/Text';

import { NeverError } from '@lib/errors';

export type TAvatarProps = Partial<TBoxProps> & {
  variant: 'circle' | 'rounded';
  dimension: '50' | '100' | '200' | '300';
  svg?: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  children?: string | React.ReactElement;
}

type TTitleProps = TTextProps & {
  dimension: TAvatarProps['dimension']
}

const dimension50TitleMixin = css`
font-size: ${({ theme }) => theme.fontSizes[3]};
`;

const dimension100TitleMixin = css`
font-size: ${({ theme }) => theme.fontSizes[3]};
`;

const dimension200TitleMixin = css`
font-size: ${({ theme }) => theme.fontSizes[5]};
`;

const dimension300TitleMixin = css`
font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const dimensionTitleMixin = ({ dimension }: TTitleProps) => {
  switch (dimension) {
    case '50':
      return dimension50TitleMixin;
    case '100':
      return dimension100TitleMixin;
    case '200':
      return dimension200TitleMixin;
    case '300':
      return dimension300TitleMixin;
    default:
      throw new NeverError(dimension);
  }
};

const Title = styled(Text)<TTitleProps>`
${dimensionTitleMixin};
color: ${({ theme }) => theme.colors.font.invert};

line-height: 1;
text-transform: uppercase;
`;

type TRootProps = TBoxProps & {
  variant: TAvatarProps['variant'];
  dimension: TAvatarProps['dimension'];
}

const dimension50RootMixin = css`
  height: 24px;
  width: 24px;
`;

const dimension100RootMixin = css`
  height: 36px;
  width: 36px;
`;

const dimension200RootMixin = css`
  height: 48px;
  width: 48px;
`;

const dimension300RootMixin = css`
  height: 96px;
  width: 96px;
`;

const dimensionRootMixin = ({ dimension } : TRootProps) => {
  switch (dimension) {
    case '50':
      return dimension50RootMixin;
    case '100':
      return dimension100RootMixin;
    case '200':
      return dimension200RootMixin;
    case '300':
      return dimension300RootMixin;
    default:
      throw new NeverError(dimension);
  }
};

const variantCircleRootMixin = css`
border-radius: ${({ theme }) => theme.radii[5]};
`;

const variantRoundedRootMixin = css`
border-radius: ${({ theme }) => theme.radii[1]};
`;

const variantRootMixin = ({ variant }: TRootProps) => {
  switch (variant) {
    case 'circle':
      return variantCircleRootMixin;
    case 'rounded':
      return variantRoundedRootMixin;
    default:
      throw new NeverError(variant);
  }
};

const Root = styled(Box)<TRootProps>`
${dimensionRootMixin};
${variantRootMixin};

align-items: center;
display: flex;
justify-content: center;
overflow: hidden;
position: relative;
`;

const Avatar = React.forwardRef<any, TAvatarProps>((props, ref) => {
  const {
    variant,
    dimension,
    children,
    svg,
    icon,
    imageUrl,
    ...other
  } = props;

  const renderContent = () => {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          title="Avatar"
          alt="User avatar"
          loading="eager"
        />
      );
    }

    if (icon) {
      return icon;
    }

    if (children) {
      if (typeof children === 'string') {
        return (
          <Title
            dimension={dimension}
          >
            {children}
          </Title>
        );
      }

      return children;
    }

    return null;
  };

  const getRootProps = (): TRootProps => {
    const rootProps: TRootProps = {
      ref,
      variant,
      dimension,
      backgroundColor: svg ? '' : 'primary.d_20',
    };

    if (svg) {
      rootProps.dangerouslySetInnerHTML = {
        __html: decodeURI(svg),
      };
    }

    return rootProps;
  };

  return (
    <Root
      flexShrink={0}
      {...getRootProps()}
      {...other}
    >
      {renderContent()}
    </Root>
  );
});

Avatar.displayName = 'Avatar';

export {
  Avatar,
};
