import React from 'react';

import { useWindowScrollTop } from '@components/domains/core/hooks/useWindowScrollTop';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TPageLayoutProps = Partial<TFlexProps>;

export const PAGE_MAX_WIDTH = '1366px';

const PageLayout = (props: TPageLayoutProps): React.ReactElement | null => {
  useWindowScrollTop();

  return (
    <Flex
      px={[3, null, 6]}
      pt={0}
      pb={6}
      flexGrow={1}
      flexDirection="column"
      width="100%"
      maxWidth={PAGE_MAX_WIDTH}
      mx="auto"
      {...props}
    />
  );
};

export {
  PageLayout,
};
