import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Text } from '@components/uiKit/Text';

export type TPaperHeaderProps = Partial<TBoxProps> & {
  children: React.ReactNode;
};

const PaperHeader = (props: TPaperHeaderProps): React.ReactElement | null => {
  const { children, ...other } = props;

  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <Text
          as="h3"
          fontSize={6}
          fontWeight={1}
        >
          {children}
        </Text>
      );
    }

    return children as React.ReactElement;
  };

  return (
    <Box
      mb={4}
      {...other}
    >
      {renderContent()}
    </Box>
  );
};

export {
  PaperHeader,
};
