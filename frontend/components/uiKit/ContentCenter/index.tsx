import React from 'react';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TContentCenterProps = Partial<TFlexProps>;

const ContentCenter = (props: TContentCenterProps): React.ReactElement | null => (
  <Flex
    flexGrow={1}
    alignItems="center"
    justifyContent="center"
    {...props}
  />
);

export {
  ContentCenter,
};
