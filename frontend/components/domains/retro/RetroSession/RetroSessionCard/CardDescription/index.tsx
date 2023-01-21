import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { TLayoutProps } from '@components/domains/retro/RetroSession/RetroSessionCard/Layout';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

type TCardDescriptionProps = Partial<TFlexProps> & Pick<TLayoutProps, 'description'>

const CardDescription = (props: TCardDescriptionProps): React.ReactElement | null => {
  const {
    description,
    ...other
  } = props;

  const isHiddenDescription = useSelector(retroSessionsSelectors.getIsHiddenDescriptionCards);

  if (isHiddenDescription || !description) {
    return null;
  }

  return (
    <Flex
      flex={1}
      flexDirection="column"
      mb={2}
      {...other}
    >
      <Text
        fontSize={1}
        whiteSpace="pre-line"
        color="font.d_10"
      >
        {description}
      </Text>
    </Flex>
  );
};

export {
  CardDescription,
};
