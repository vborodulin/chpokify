import React from 'react';

import { PageLayout, TPageLayoutProps } from '@components/uiKit/PageLayout';

const PageLayoutNarrow = (props: TPageLayoutProps) => (
  <PageLayout
    maxWidth="900px"
    {...props}
  />
);

export {
  PageLayoutNarrow,
};
