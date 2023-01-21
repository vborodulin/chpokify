import React from 'react';

import { TBoxProps } from '@components/uiKit/Box';
import { Text, TTextProps } from '@components/uiKit/Text';

export type TFormLabel = TTextProps & TBoxProps;

const FormLabel = (props: TFormLabel): React.ReactElement | null => {
  const { disabled } = props;

  const getTextProps = () => {
    let property = {
      ...props,
      fontSize: 1,
      mb: 2,
    };

    if (disabled) {
      property = Object.assign(property, {
        pointerEvents: 'none',
        opacity: '0.4',
      });
    }

    return property;
  };

  return (
    <Text
      {...getTextProps()}
    />
  );
};

export {
  FormLabel,
};
