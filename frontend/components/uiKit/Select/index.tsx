import React from 'react';
import styled from 'styled-components';

import { InputContainer, TInputContainerProps } from '@components/uiKit/InputContainer';

export type TSelectOption = {
  label: string;
  value: string;
};

export type TSelectProps = TInputContainerProps & {
  options: TSelectOption[];
  inputRef?: React.Ref<any>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Option = styled.option`
font-weight: ${({ theme }) => theme.fontWeights[0]};
`;

/*eslint-disable */
const Root = styled(InputContainer)<TInputContainerProps>`
appearance: none;
background-color: ${({ theme }) => theme.colors.base.a_10};
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath fill='%23141414' d='M15.88 9.29L12 13.17 8.11998 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L11.3 15.29c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z'/%3E%3Cpath fill='%23fff' fill-opacity='.48' d='M15.88 9.29L12 13.17 8.11998 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L11.3 15.29c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z'/%3E%3C/svg%3E");
background-position: right ${({ theme }) => theme.space[4]} top 50%;
background-repeat: no-repeat;
background-size: ${({ theme }) => theme.sizes[6]} ${({ theme }) => theme.sizes[6]};
border: 2px solid ${({ theme }) => theme.colors.base.a_10};
border-radius: ${({ theme }) => theme.radii[2]};
color: ${({ theme }) => theme.colors.font.normal};
cursor: pointer;
font-family: ${({ theme }) => theme.fontFamily[0]};
font-size: ${({ theme }) => theme.fontSizes[2]};
font-weight: ${({ theme }) => theme.fontWeights[0]};
line-height: ${({ theme }) => theme.lineHeights[0]};
padding-left: ${({ theme }) => theme.space[4]};
padding-right: ${({ theme }) => theme.space[12]};

&::placeholder {
  color: ${({ theme }) => theme.colors.font.d_30};
}

&:not([disabled]):hover {
  background-color: ${({ theme }) => theme.colors.base.a_20};
  border-color: ${({ theme }) => theme.colors.base.a_20};
}

&:not([disabled]):focus {
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary.normal};
}

&:disabled {
  opacity: 0.4;
  pointer-events: none;
}
`;
/* eslint-enable */

const Select = (props: TSelectProps): React.ReactElement | null => {
  const {
    options,
    inputRef,
    ...other
  } = props;

  return (
    <Root
      ref={inputRef}
      as="select"
      {...other}
    >
      {options.map(({
        label,
        value,
      }) => (
        <Option
          key={value}
          value={value}
        >
          {label}
        </Option>
      ))}
    </Root>
  );
};

export {
  Select,
};
