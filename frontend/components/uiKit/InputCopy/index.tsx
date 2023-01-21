import React from 'react';

import { Input, TInputProps } from '@components/uiKit/Input';

export type TInputCopyProps = TInputProps;

const InputCopy = (props: TInputCopyProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const handleFocus = (event: React.FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.select();
  };

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
  };

  return (
    <Input
      onFocus={handleFocus}
      onChange={handleChange}
      {...other}
    />
  );
};

export {
  InputCopy,
};
