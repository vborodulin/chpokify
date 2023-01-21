import { routing } from '@chpokify/routing';
import React from 'react';
import { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { LinkComponent } from '@components/uiKit/Link';
import { Text } from '@components/uiKit/Text';

export type TNotFoundProps = Partial<TBoxProps>;

const NotFound = (props: TNotFoundProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <ContentCenter>
      <Box
        maxWidth="400px"
        {...other}
      >
        <Text
          fontSize={11}
          fontWeight={1}
          textAlign="center"
          mb={2}
        >
          404
        </Text>

        <Text
          fontSize={3}
          textAlign="center"
          mb={2}
        >
          Sorry, we couldn't find this page.
        </Text>

        <LinkComponent
          css={css`display: block`}
          href={routing.getIndexUrl()}
          fontSize={3}
          textAlign="center"
        >
          Homepage
        </LinkComponent>
      </Box>
    </ContentCenter>
  );
};

export {
  NotFound,
};
