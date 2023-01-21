import React from 'react';

import { Divider, TDividerProps } from '@components/uiKit/Divider';

export type TListItemDividerProps = Partial<TDividerProps>;

const ListItemDivider = (props: TListItemDividerProps): React.ReactElement | null => (
  <Divider
    my={0}
    {...props}
  />
);

export {
  ListItemDivider,
};
