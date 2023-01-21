import React from 'react';

import { Grid, TGridProps } from '@components/uiKit/Grid';

export type TPaperActionsProps = Partial<TGridProps>;

const PaperActions = (props: TPaperActionsProps): React.ReactElement | null => {
  const { children, ...other } = props;

  if (!children) {
    return null;
  }

  return (
    <Grid
      justifyContent="flex-end"
      gridGap={4}
      gridAutoFlow="column"
      {...other}
    >
      {children}
    </Grid>
  );
};

export {
  PaperActions,
};
