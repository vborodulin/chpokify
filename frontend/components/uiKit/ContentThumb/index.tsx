import React from 'react';

import { Flex } from '@components/uiKit/Flex';
import { TIconProps } from '@components/uiKit/Icons/Icon';
import { Text } from '@components/uiKit/Text';

export type TContentThumbProps = {
  Icon: React.FunctionComponent<TIconProps>;
  title?: string;
  description?: string;
  button?: React.ReactElement;
  iconProps?: Partial<TIconProps>;
}

const ContentThumb = (props: TContentThumbProps): React.ReactElement | null => {
  const {
    Icon: IconComponent,
    title,
    description,
    button,
    iconProps,
  } = props;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      maxWidth="400px"
    >
      <IconComponent
        width="48px"
        height="48px"
        mb={5}
        {...iconProps}
      />

      {
        !!title && (
          <Text
            fontSize={5}
            fontWeight={1}
            color="font.d_10"
            textAlign="center"
            mb={5}
          >
            {title}
          </Text>
        )
      }

      {
        !!description && (
          <Text
            fontSize={2}
            color="font.d_20"
            textAlign="center"
            whiteSpace="pre-line"
            mb={5}
          >
            {description}
          </Text>
        )
      }

      {button}
    </Flex>
  );
};

export {
  ContentThumb,
};
