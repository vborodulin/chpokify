import React from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { CircularProgress } from '@components/uiKit/CircularProgress';
import { TIconProps } from '@components/uiKit/Icons/Icon';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TButtonVariant =
  'base'
  | 'info'
  | 'primary'
  | 'primary-outline'
  | 'positive'
  | 'negative'
  | 'negative-outline'
  | 'warning'
  | 'shadow'
  | 'accent'
  | 'secondary'
  | 'base-shadow';

type TButtonRootProps = TBoxProps & {
  fullWidth: boolean;
  variant: TButtonVariant;
  isLoading: boolean;
  isActive: boolean;
};

const disabledBtnMixin = css`
&:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
const variantBaseActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.base.a_50};
`;

const variantBaseMixin = css`
  background-color: ${({ theme }) => theme.colors.base.a_20};

  & > * {
    color: ${({ theme }) => theme.colors.font.normal} !important;
    fill: ${({ theme }) => theme.colors.font.normal} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.base.a_30};
  }

  &:not([data-disabled="true"]):active {
    ${variantBaseActiveMixin};
  }

  ${disabledBtnMixin};
`;

const variantPrimaryActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.primary.a_20};
`;

const variantPrimaryMixin = css`
  background-color: ${({ theme }) => theme.colors.primary.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.primary.a_10};
  }

  &:not([data-disabled="true"]):active {
    ${variantPrimaryActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantNegativeActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.negative.a_20};
`;

const variantNegativeMixin = css`
  background-color: ${({ theme }) => theme.colors.negative.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.negative.a_10};
  }

  &:not([data-disabled="true"]):active {
    ${variantNegativeActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantAccentActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.accent.a_20};
`;

const variantAccentMixin = css`
  background-color: ${({ theme }) => theme.colors.accent.normal};

  & > * {
    color: ${({ theme }) => theme.colors.base.normal} !important;
    fill: ${({ theme }) => theme.colors.base.normal} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.accent.d_10};

    & > * {
      color: ${({ theme }) => theme.colors.font.invert} !important;
      fill: ${({ theme }) => theme.colors.font.invert} !important;
    }
  }

  &:not([data-disabled="true"]):active {
    ${variantAccentActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantWarningActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.warning.a_20};
`;

const variantWarningMixin = css`
  background-color: ${({ theme }) => theme.colors.warning.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.warning.a_10};
  }

  &:not([data-disabled="true"]):active {
    ${variantWarningActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantShadowActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.primary.a_20};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary.a_20};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }
`;

const variantShadowMixin = css`
  background-color: ${({ theme }) => theme.colors.transparent};

  & > * {
    color: ${({ theme }) => theme.colors.font.primary} !important;
    fill: ${({ theme }) => theme.colors.font.primary} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.primary.a_10};

    & > * {
      color: ${({ theme }) => theme.colors.font.invert} !important;
      fill: ${({ theme }) => theme.colors.font.invert} !important;
    }
  }

  &:not([data-disabled="true"]):active {
    ${variantShadowActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantNegativeOutlineActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.negative.a_20};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.negative.a_20};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }
`;

const variantNegativeOutlineMixin = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.negative.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.negative} !important;
    fill: ${({ theme }) => theme.colors.font.negative} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.negative.a_10};
    box-shadow: none;
     & > * {
       color: ${({ theme }) => theme.colors.font.invert} !important;
       fill: ${({ theme }) => theme.colors.font.invert} !important;
     }
  }

  &:not([data-disabled="true"]):active {
    ${variantNegativeOutlineActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantPrimaryOutlineActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.primary.a_20};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary.a_20};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }
`;

const variantPrimaryOutlineMixin = css`
  background-color: ${({ theme }) => theme.colors.transparent};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.primary.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.primary} !important;
    fill: ${({ theme }) => theme.colors.font.primary} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.primary.a_10};
    box-shadow: none;

    & > * {
      color: ${({ theme }) => theme.colors.font.invert} !important;
      fill: ${({ theme }) => theme.colors.font.invert} !important;
    }
  }

  &:not([data-disabled="true"]):active {
    ${variantPrimaryOutlineActiveMixin};
  }

   ${disabledBtnMixin};
`;

const variantPositiveActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.positive.a_20};
`;

const variantPositiveMixin = css`
  background-color: ${({ theme }) => theme.colors.positive.normal};

  & > * {
    color: ${({ theme }) => theme.colors.font.invert} !important;
    fill: ${({ theme }) => theme.colors.font.invert} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.positive.a_10};
  }

  &:not([data-disabled="true"]):active {
    ${variantPositiveActiveMixin};
  }

  ${disabledBtnMixin};
`;

const variantInfoActiveMixin = variantShadowActiveMixin;

const variantInfo = css`
  ${variantShadowMixin};
  background-color: ${({ theme }) => theme.colors.base.a_20};
}
`;

const variantSecondaryActiveMixin = css`
  background-color: ${({ theme }) => theme.colors.base.a_50};
`;

const variantSecondaryMixin = css`
  background-color: ${({ theme }) => theme.colors.base.a_20};

  & > * {
    color: ${({ theme }) => theme.colors.font.d_20} !important;
    fill: ${({ theme }) => theme.colors.font.d_20} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.base.a_30};
  }

  &:not([data-disabled="true"]):active {
    ${variantSecondaryActiveMixin};
  }

  ${disabledBtnMixin};
`;

const variantBaseShadowActiveMixin = css`
  & > * {
    color: ${({ theme }) => theme.colors.font.normal} !important;
    fill: ${({ theme }) => theme.colors.font.normal} !important;
  }
`;

const variantBaseShadowMixin = css`
  background-color: ${({ theme }) => theme.colors.transparent};

  & > * {
    color: ${({ theme }) => theme.colors.font.primary} !important;
    fill: ${({ theme }) => theme.colors.font.primary} !important;
  }

  &:not([data-disabled="true"]):hover {
    background-color: ${({ theme }) => theme.colors.primary.d_40};
  }

  &:not([data-disabled="true"]):active {
    ${variantBaseActiveMixin};
  }

  ${disabledBtnMixin};
`;

const setButtonVariantActiveMixin = (props: TButtonRootProps) => {
  switch (props.variant) {
    case 'base':
      return variantBaseActiveMixin;
    case 'info':
      return variantInfoActiveMixin;
    case 'primary':
      return variantPrimaryActiveMixin;
    case 'primary-outline':
      return variantPrimaryOutlineActiveMixin;
    case 'positive':
      return variantPositiveActiveMixin;
    case 'negative':
      return variantNegativeActiveMixin;
    case 'warning':
      return variantWarningActiveMixin;
    case 'shadow':
      return variantShadowActiveMixin;
    case 'accent':
      return variantAccentActiveMixin;
    case 'negative-outline':
      return variantNegativeOutlineActiveMixin;
    case 'secondary':
      return variantSecondaryActiveMixin;
    case 'base-shadow':
      return variantBaseShadowActiveMixin;
    default:
      return variantBaseActiveMixin;
  }
};

const setButtonVariantMixin = (props: TButtonRootProps) => {
  switch (props.variant) {
    case 'base':
      return variantBaseMixin;
    case 'info':
      return variantInfo;
    case 'primary':
      return variantPrimaryMixin;
    case 'primary-outline':
      return variantPrimaryOutlineMixin;
    case 'positive':
      return variantPositiveMixin;
    case 'negative':
      return variantNegativeMixin;
    case 'warning':
      return variantWarningMixin;
    case 'shadow':
      return variantShadowMixin;
    case 'accent':
      return variantAccentMixin;
    case 'negative-outline':
      return variantNegativeOutlineMixin;
    case 'secondary':
      return variantSecondaryMixin;
    case 'base-shadow':
      return variantBaseShadowMixin;
    default:
      return variantBaseMixin;
  }
};

const buttonLoadingMixin = css`
  cursor: not-allowed;
`;

const Root = styled(Box)<TButtonRootProps>`
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor: pointer;
  flex-shrink: 0;
  justify-content: center;
  outline: none;
  overflow: hidden;
  position: relative;
  user-select: none;
  vertical-align: middle;

  & > * {
    pointer-events: none;
  }

  &:not([data-disabled="true"]):active {
    transform: scale(0.96);
  }

  ${(props) => (props.isLoading ? buttonLoadingMixin : '')}
  ${setButtonVariantMixin};
  ${(props) => (props.isActive ? setButtonVariantActiveMixin : '')};
`;

export type TButtonProps = TBoxProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TButtonVariant;
  fullWidth?: boolean;
  StartIcon?: React.FunctionComponent<TIconProps>;
  startIcon?: React.ReactNode;
  EndIcon?: React.FunctionComponent<TIconProps>,
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  isMobileReady?: boolean;
  isTabletReady?: boolean;
  isActive?: boolean;
  textProps?: Partial<TTextProps>;
  children?: React.ReactNode;
};

const Button = React.forwardRef<any, TButtonProps>((props, ref) => {
  const {
    variant = 'base',
    type = 'button',
    fullWidth = false,
    StartIcon = null,
    startIcon,
    EndIcon = null,
    endIcon,
    disabled = false,
    isLoading = false,
    isMobileReady = false,
    isTabletReady = false,
    isActive = false,
    textProps,
    children = '',
    ...other
  } = props;

  const renderStartIcon = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (startIcon) {
      return startIcon;
    }

    if (StartIcon) {
      return <StartIcon />;
    }

    return null;
  };

  const renderEndIcon = () => {
    if (endIcon) {
      return endIcon;
    }

    if (EndIcon) {
      return <EndIcon />;
    }

    return null;
  };

  const getTextDisplay = () => {
    if (isMobileReady) {
      return ['none', 'initial'];
    }

    if (isTabletReady) {
      return ['none', null, 'initial'];
    }

    return 'initial';
  };

  const renderText = () => {
    if (!children) {
      return;
    }

    return (
      <Text
        as="span"
        fontSize={2}
        fontWeight={1}
        verticalAlign="middle"
        mr={EndIcon ? 2 : 0}
        ml={StartIcon || isLoading ? 2 : 0}
        ellipses
        display={getTextDisplay()}
        {...textProps}
      >
        {children}
      </Text>
    );
  };

  const getRootPaddingLeft = () => {
    if (!children) {
      return 2;
    }

    if (isTabletReady && StartIcon) {
      return [2, null, 3];
    }

    if (isTabletReady && !StartIcon) {
      return [2, null, 4];
    }

    if (isMobileReady && StartIcon) {
      return [2, 3];
    }

    if (isMobileReady && !StartIcon) {
      return [2, 4];
    }

    if (StartIcon) {
      return 3;
    }

    return 4;
  };

  const getRootPaddingRight = () => {
    if (!children) {
      return 2;
    }

    if (isTabletReady && EndIcon) {
      return [2, null, 3];
    }

    if (isTabletReady && !EndIcon) {
      return [2, null, 4];
    }

    if (isMobileReady && EndIcon) {
      return [2, 3];
    }

    if (isMobileReady && !EndIcon) {
      return [2, 4];
    }

    if (EndIcon) {
      return 2;
    }

    return 4;
  };

  return (
    <Root
      ref={ref}
      as="button"
      type={type}
      pl={getRootPaddingLeft()}
      pr={getRootPaddingRight()}
      py={0}
      height="40px"
      display="inline-flex"
      variant={variant}
      fullWidth={fullWidth}
      isLoading={isLoading}
      data-disabled={disabled || isLoading}
      disabled={disabled}
      isActive={isActive}
      width={fullWidth ? '100%' : 'auto'}
      {...other}
    >
      {renderStartIcon()}
      {renderText()}
      {renderEndIcon()}
    </Root>
  );
});

Button.displayName = 'Button';

export {
  Button,
};
