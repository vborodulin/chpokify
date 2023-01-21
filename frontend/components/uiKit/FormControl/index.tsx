import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { FormHelperText } from '@components/uiKit/FormHelperText';

const Root = styled(Box)<TBoxProps>`
&:last-of-type {
  margin-bottom: 0;
}
`;

type TFormControlProps = TBoxProps & {
  errorMessage?: React.ReactElement | string;
}

const FormControl: React.FunctionComponent<TFormControlProps> = (props) => {
  const {
    errorMessage,
    children,
    ...other
  } = props;

  const renderErrorMessage = () => {
    if (!errorMessage) {
      return null;
    }

    if (typeof errorMessage === 'string') {
      return (
        <FormHelperText
          variant="negative"
        >
          {errorMessage}
        </FormHelperText>
      );
    }

    return errorMessage;
  };

  return (
    <Root
      mb={4}
      {...other}
    >
      {children}

      {renderErrorMessage()}
    </Root>
  );
};

export {
  FormControl,
};
