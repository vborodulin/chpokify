import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import {
  compose, layout, LayoutProps, space, SpaceProps, typography, TypographyProps,
} from 'styled-system';

import { reactHelpers } from '@helpers/React';

export type TInputStealthProps = React.InputHTMLAttributes<any> &
  TypographyProps &
  SpaceProps &
  LayoutProps & {
  isResizable?: boolean;
};

const inputDisabledMixin = css`
&:hover, &:focus {
  background-color: transparent;
}
`;

const StyledInput = styled.input<TInputStealthProps>`
${compose(typography, space, layout)};

background-color: transparent;
border: none;
font-family: ${({ theme }) => theme.fontFamily};

&:hover {
  background-color: ${({ theme }) => theme.colors.base.a_20};
  border: none;
  outline: none;
}

&:focus {
  background-color: ${({ theme }) => theme.colors.base.a_20};
  border: none;
  outline: none;
}

${({ disabled }) => (disabled ? inputDisabledMixin : '')};
`;

const InputStealth = React.forwardRef<any, TInputStealthProps>((props, ref) => {
  const {
    value,
    isResizable,
    onChange,
    ...other
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleResize = () => {
    const input = inputRef.current;

    if (!input || !isResizable) {
      return;
    }

    input.style.width = `${Math.max(input.value.length, 2)}ch`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleResize();

    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    handleResize();
  }, [inputRef.current, value]);

  return (
    <StyledInput
      ref={reactHelpers.mergeRefs([inputRef, ref])}
      value={value}
      onChange={handleChange}
      {...other}
    />
  );
});

InputStealth.displayName = 'InputStealth';

export {
  InputStealth,
};
