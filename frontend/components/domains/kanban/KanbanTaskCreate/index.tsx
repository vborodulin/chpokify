import React from 'react';

import { Layout, TLayoutProps } from './Layout';

export type TKanbanTaskCreateProps = TLayoutProps;

const KanbanTaskCreate = (props: TKanbanTaskCreateProps): React.ReactElement | null => {
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
  KanbanTaskCreate,
};
