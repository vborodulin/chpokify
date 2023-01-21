import React from 'react';
import { css } from 'styled-components';

import { Paper, TPaperProps } from '@components/uiKit/Paper';

export type TTooltipProps = Partial<TPaperProps> & {
  children: React.ReactNode;
};

const Tooltip = React.forwardRef<any, TTooltipProps>((props, ref) => {
  const {
    children,
    ...other
  } = props;

  return (
    <Paper
      ref={ref}
      variant="tooltip"
      borderRadius={2}
      p={0}
      py={2}
      px={3}
      width="unset"
      maxWidth="280px"
      css={css`z-index: 4`}
      {...other}
    >
      {children}
    </Paper>
  );
});

Tooltip.displayName = 'Tooltip';

export {
  Tooltip,
};
