import React from 'react';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TFormGroupProps = Partial<TFlexProps> & {
  children: React.ReactNode;
  row?: boolean;
};

const FormGroup = React.forwardRef<any, TFormGroupProps>((props, ref) => {
  const {
    row = false,
    ...other
  } = props;

  return (
    <Flex
      ref={ref}
      flexDirection={row ? 'row' : 'column'}
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="flex-start"
      {...other}
    />
  );
});

FormGroup.displayName = 'FormGroup';

export {
  FormGroup,
};
