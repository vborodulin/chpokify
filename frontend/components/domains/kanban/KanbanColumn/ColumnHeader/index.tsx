import React from 'react';

import { Layout, TLayoutProps } from './Layout';

export type TColumnHeaderProps = TLayoutProps;

const ColumnHeader = (props: TColumnHeaderProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <Layout
      {...other}
    />
  );
};

export {
  ColumnHeader,
};
