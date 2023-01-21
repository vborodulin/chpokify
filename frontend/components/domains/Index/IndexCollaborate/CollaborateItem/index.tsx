import React from 'react';
import { css } from 'styled-components';

import { Box } from '@components/uiKit/Box';
import { Grid } from '@components/uiKit/Grid';
import { Image, TImageProps } from '@components/uiKit/Image';
import { Text } from '@components/uiKit/Text';

export type TCollaborateItemProps = {
  title: string;
  description: string;
  img: TImageProps;
};

const CollaborateItem = (props: TCollaborateItemProps): React.ReactElement | null => {
  const {
    title,
    description,
    img,
  } = props;

  return (
    <Grid
      gridAutoFlow="column"
      alignItems="center"
      gridGap={6}
    >
      <Image
        width="118px"
        height="152px"
        layout="intrinsic"
        css={css`transform: rotate(10deg)`}
        {...img}
      />

      <Box>
        <Text
          as="h3"
          fontSize={5}
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
      </Box>
    </Grid>
  );
};

export {
  CollaborateItem,
};
