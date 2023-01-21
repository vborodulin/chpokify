import React from 'react';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TTooltipTitleProps = Partial<TTextProps> & {
  children: React.ReactNode
};

const TooltipDescription = (props: TTooltipTitleProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <Text
      fontSize={2}
      color="font.invert"
      {...other}
    >
      {children}
    </Text>
  );
};

export {
  TooltipDescription,
};
