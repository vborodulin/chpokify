import React from 'react';

import { TLayoutProps } from '@components/domains/retro/RetroSession/RetroSessionCard/Layout';

import { Box } from '@components/uiKit/Box';
import { TFlexProps } from '@components/uiKit/Flex';
import { IconNote } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

type TCardTitleProps = Partial<TFlexProps> & Pick<TLayoutProps, 'title' | 'hasDescription'>

const CardTitle = (props: TCardTitleProps): React.ReactElement | null => {
  const {
    title,
    hasDescription,
    ...other
  } = props;

  const renderIconDescription = () => {
    if (!hasDescription) {
      return null;
    }

    return (
      <IconNote
        fill="font.d_20"
        width="16px"
        height="16px"
        top="2px"
        mr={1}
        float="left"
      />
    );
  };

  return (
    <Box
      {...other}
    >
      {
        renderIconDescription()
      }
      <Text
        fontSize={2}
        whiteSpace="pre-line"
      >
        {title}
      </Text>
    </Box>
  );
};

export {
  CardTitle,
};
