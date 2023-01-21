import React, { useState } from 'react';
import styled from 'styled-components';

import { IconLock, IconVisibilityOff, IconVisibilityOn } from '@components/uiKit/Icons';
import { Input, TInputProps } from '@components/uiKit/Input';

const SyledIconVisibility = styled.div`
cursor: pointer;
opacity: 0.4;

&:hover {
  opacity: 1;
}
`;

export type TInputPasswordProps = Partial<TInputProps>;

const InputPassword = (props: TInputPasswordProps): React.ReactElement | null => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevVal) => !prevVal);
  };

  const renderVisibilityIcon = () => {
    if (isPasswordVisible) {
      return (
        <SyledIconVisibility
          as={IconVisibilityOff}
          onClick={handleTogglePasswordVisibility}
        />
      );
    }

    return (
      <SyledIconVisibility
        as={IconVisibilityOn}
        onClick={handleTogglePasswordVisibility}
      />
    );
  };

  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      autoComplete="new-password"
      startAdornment={(
        <IconLock
          fill="font.d_30"
        />
      )}
      endAdornment={renderVisibilityIcon()}
      {...props}
    />
  );
};

export {
  InputPassword,
};
