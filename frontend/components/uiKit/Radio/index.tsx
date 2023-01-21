import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { IconRadiobuttonChecked, IconRadiobuttonUnchecked } from '@components/uiKit/Icons';

import { stylesMixins } from '@styles';

const Input = styled.input`
${stylesMixins.hideElement()}
`;

const Checkmark = styled.span`
fill: ${({ theme }) => theme.colors.primary.normal};
`;

const rootDisabledMixin = css`
  cursor: not-allowed;
  opacity: 0.4;
`;

type TRootProps = TBoxProps & {
  checked: boolean;
  disabled: boolean;
}

const Root = styled(Box)<TRootProps>`
cursor: pointer;

&:hover svg {
  fill: ${({ theme }) => theme.colors.primary.a_10};
}

&:active svg {
  fill: ${({ theme }) => theme.colors.primary.a_20};
}

${(props) => (props.disabled ? rootDisabledMixin : '')}
`;

type TCheckboxProps = TBoxProps & {
  name: string;
  checked: boolean;
  value: string;
  onChange: (event: ChangeEvent) => void;
  disabled?: boolean;
  inputRef?: React.Ref<any>;
};

const Radio: React.FunctionComponent<TCheckboxProps> = (props) => {
  const {
    name,
    checked,
    value,
    onChange,
    disabled = false,
    inputRef,
    ...other
  } = props;

  const renderCheckmark = () => {
    const Component = checked ? IconRadiobuttonChecked : IconRadiobuttonUnchecked;
    return (
      <Checkmark
        as={Component}
      />
    );
  };

  return (
    <Root
      as="label"
      checked={checked}
      disabled={disabled}
      {...other}
    >
      <Input
        ref={inputRef}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {renderCheckmark()}
    </Root>
  );
};

export {
  Radio,
};
