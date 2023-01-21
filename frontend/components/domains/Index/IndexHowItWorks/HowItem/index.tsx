import React from 'react';

import { IndexActionBtn } from '@components/domains/Index/IndexActionBtn';

import { Box } from '@components/uiKit/Box';
import { Grid } from '@components/uiKit/Grid';
import { Image, TImageProps } from '@components/uiKit/Image';
import { Text } from '@components/uiKit/Text';

export type THowItemProps = {
  title: string;
  description: string;
  actionTitle: string;
  img: TImageProps;
  order: 'asc' | 'desc',
};

const HowItem = (props: THowItemProps): React.ReactElement | null => {
  const {
    title,
    description,
    actionTitle,
    img,
    order,
  } = props;

  return (
    <Grid
      gridGap={8}
      justifyContent={['center', 'space-between']}
      gridAutoFlow={['row', 'column']}
      alignItems="center"
    >
      <Box
        order={[1, order === 'asc' ? 1 : 2]}
      >
        <Text
          as="h3"
          fontSize={6}
          fontWeight={1}
          mb={3}
        >
          {title}
        </Text>

        <Text
          fontSize={3}
        >
          {description}
        </Text>

        <IndexActionBtn
          variant="primary"
          mt={8}
        >
          {actionTitle}
        </IndexActionBtn>
      </Box>

      <Box
        order={[2, order === 'asc' ? 2 : 1]}
      >
        <Image
          {...img}
        />
      </Box>
    </Grid>
  );
};

export {
  HowItem,
};
