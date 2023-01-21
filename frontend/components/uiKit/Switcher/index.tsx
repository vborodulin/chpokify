import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

const TRANSITION_MS = 400;

const Slider = styled.span`
background-color: ${({ theme }) => theme.colors.primary.normal};
border-radius: ${({ theme }) => theme.radii[1]};
height: ${({ theme }) => theme.sizes[4]};
transform: translateX(2px);
transition: transform ${TRANSITION_MS}ms ease-in-out;
width: ${({ theme }) => theme.sizes[4]};
`;

const Input = styled.input`
height: 0;
margin: 0;
opacity: 0;
width: 0;
`;

const rootCheckedMixin = css`
background-color: ${({ theme }) => theme.colors.primary.normal};
transition: background-color ${TRANSITION_MS}ms ease-in-out;

${Slider} {
  background-color: ${({ theme }) => theme.colors.base.normal};
  transform: translateX(18px);
}

&:hover {
  background-color: ${({ theme }) => theme.colors.primary.a_10};
  border-color: ${({ theme }) => theme.colors.primary.a_10};

  ${Slider} {
    background-color: ${({ theme }) => theme.colors.base.normal};
  }
}

&:active {
  background-color: ${({ theme }) => theme.colors.primary.a_20};
  border-color: ${({ theme }) => theme.colors.primary.a_20};

  ${Slider} {
    background-color: ${({ theme }) => theme.colors.base.normal};
  }
}
`;

const rootDisabledMixin = css`
cursor: not-allowed;
opacity: 0.4;
`;

type TRootProps = TBoxProps & {
  checked: boolean,
  disabled: boolean
};

const Root = styled(Box)<TRootProps>`
align-items: center;
background-color: ${({ theme }) => theme.colors.transparent};
border: 2px solid ${({ theme }) => theme.colors.primary.normal};
border-radius: ${({ theme }) => theme.radii[2]};
cursor: pointer;
display: inline-flex;
height: 24px;
position: relative;
width: 40px;

&:hover {
  border-color: ${({ theme }) => theme.colors.primary.a_10};

  ${Slider} {
    background-color: ${({ theme }) => theme.colors.primary.a_10};
  }
}

&:active {
  border-color: ${({ theme }) => theme.colors.primary.a_20};

  ${Slider} {
    background-color: ${({ theme }) => theme.colors.primary.a_20};
  }
}

${(props) => (props.checked ? rootCheckedMixin : '')};
${(props) => (props.disabled ? rootDisabledMixin : '')};
`;

export type TSwitcherProps = TBoxProps & {
  name: string
  checked: boolean;
  onChange: (event: ChangeEvent) => void;
  id?: string;
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<any> & {
    ref?: React.Ref<any>;
  };
};

const Switcher: React.FunctionComponent<TSwitcherProps> = (props) => {
  const {
    name,
    checked,
    onChange,
    id,
    disabled = false,
    inputProps,
    ...other
  } = props;

  return (
    <Root
      as="label"
      checked={checked}
      disabled={disabled}
      {...other}
    >
      <Input
        id={id}
        type="checkbox"
        role="switch"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...inputProps}
      />
      <Slider />
    </Root>
  );
};

export {
  Switcher,
};
