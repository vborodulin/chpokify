import React from 'react';

import { Surface, TSurfaceProps } from '@components/uiKit/Surface';

export type TPaperProps = TSurfaceProps;

const Paper = React.forwardRef<any, TPaperProps>(({ as, ...other }, ref) => (
  <Surface
    ref={ref}
    p={[4, 6]}
    width="100%"
    flexDirection="column"
    overflowY="auto"
    borderRadius={3}
    forwardedAs={as}
    {...other}
  />
));

Paper.displayName = 'Paper';

export {
  Paper,
};
