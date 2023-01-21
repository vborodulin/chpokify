import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Spacer } from '@components/uiKit/Spacer';
import { Text } from '@components/uiKit/Text';

const Root = styled(Box)<TBoxProps>`
align-items: center;
display: inline-flex;
user-select: none;
`;

export type TFormControlLabelProps = Partial<TBoxProps> & {
  label: React.ReactElement | string,
  children: React.ReactElement,
};

const FormControlLabel = (props: TFormControlLabelProps): React.ReactElement | null => {
  const {
    label,
    children,
    disabled,
    ...other
  } = props;

  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <Text
          fontSize={2}
          ml={2}
        >
          {label}
        </Text>
      );
    }

    return label;
  };

  const getProps = () => {
    const propsLocal = {
      cursor: 'pointer',
      ...other,
    };

    if (disabled) {
      propsLocal.cursor = 'not-allowed';
      propsLocal.opacity = '0.4';
    }

    return propsLocal;
  };

  return (
    <Root
      as="label"
      {...getProps()}
    >
      {children}

      <Spacer
        ml={2}
      >
        {renderLabel()}
      </Spacer>
    </Root>
  );
};

export {
  FormControlLabel,
};
