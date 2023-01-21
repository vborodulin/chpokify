import React from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

import { stylesMixins } from '@styles';

const Checkmark = styled.div`
border: 3px solid ${({ theme }) => theme.colors.primary.normal};
border-radius: ${({ theme }) => theme.radii[1]};
fill: ${({ theme }) => theme.colors.primary.normal};
height: 14px;
width: 14px;

svg {
  border-radius: 50%;
  transform: scale(0);
}
`;

const Input = styled.input`
${stylesMixins.hideElement()};

&:checked + ${Checkmark} {
  svg {
    transform: scale(1);
    border-radius: 0;
  }
}

&:disabled + ${Checkmark} {
   opacity: 0.4;
   cursor: default;
 }
}
`;

const rootDisabledMixin = css`
  cursor: not-allowed;
  opacity: 0.4;
`;

type TRootProps = TBoxProps & {
  disabled: boolean;
}

const Root = styled(Box)<TRootProps>`
cursor: pointer;

&:hover {
  ${Input}:checked + ${Checkmark}  {
    border-color: ${({ theme }) => theme.colors.primary.a_10};
    fill: ${({ theme }) => theme.colors.primary.a_10};
  }
}

&:active {
  ${Input}:checked + ${Checkmark} {
    border-color: ${({ theme }) => theme.colors.primary.a_20};
    fill: ${({ theme }) => theme.colors.primary.a_20};
  }
}

${(props) => (props.disabled ? rootDisabledMixin : '')}
`;

type TCheckboxProps = Partial<TBoxProps> & {
  name: string;
  inputRef?: React.Ref<any>;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: string;
};

const Checkbox = React.forwardRef<any, TCheckboxProps>((props, ref) => {
  const {
    name,
    inputRef,
    value,
    checked,
    defaultChecked,
    disabled = false,
    onChange,
    ...other
  } = props;

  return (
    <Root
      ref={ref}
      as="label"
      disabled={disabled}
      {...other}
    >
      <Input
        ref={inputRef}
        type="checkbox"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />

      <Checkmark>
        <svg
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            /* eslint-disable-next-line max-len */
            d="M5.70711 11.2929C5.31658 11.6834 4.68342 11.6834 4.29289 11.2929L0.705491 7.70549C0.315859 7.31586 0.315859 6.68414 0.705492 6.29451C1.09474 5.90526 1.7257 5.90482 2.11549 6.29353L5 9.17L11.8804 2.28961C12.2719 1.89811 12.9074 1.89963 13.2975 2.29251C13.6857 2.68343 13.6849 3.31506 13.2954 3.70461L5.70711 11.2929ZM14 0H0V14H14V0Z"
          />
        </svg>
      </Checkmark>
    </Root>
  );
});

Checkbox.displayName = 'Checkbox';

export {
  Checkbox,
};
