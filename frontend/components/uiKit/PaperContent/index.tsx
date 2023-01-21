import React from 'react';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Text } from '@components/uiKit/Text';

export type TPaperContentProps = Partial<TBoxProps>;

const PaperContent = (props: TPaperContentProps): React.ReactElement | null => {
  const { children, ...other } = props;

  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <Text
          fontSize={2}
          {...other}
        >
          {children}
        </Text>
      );
    }

    return children as React.ReactElement;
  };

  if (!children) {
    return null;
  }

  return (
    <Box
      flexGrow={1}
      overflowY="auto"
      {...other}
    >
      {renderContent()}
    </Box>
  );
};

export {
  PaperContent,
};
