import React from 'react';
import styled from 'styled-components';
import { grid, GridProps, system } from 'styled-system';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TGridProps = TBoxProps & GridProps & {
  justifyContent?: React.CSSProperties['justifyContent'] | React.CSSProperties['justifyContent'][]
  alignItems?: React.CSSProperties['alignItems'] | React.CSSProperties['alignItems'][]
};

const Grid = styled(Box)<TGridProps>`
display: grid;
${grid};
${system({
    display: {
      property: 'display',
    },
    justifyContent: {
      property: 'justifyContent',
    },
    justifyItems: {
      property: 'justifyItems',
    },
    alignItems: {
      property: 'alignItems',
    },
    alignContent: {
      property: 'alignContent',
    },
    gridAutoFlow: {
      property: 'gridAutoFlow',
    },
  })};
`;

export {
  Grid,
};
