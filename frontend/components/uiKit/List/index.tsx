import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TListProps = TBoxProps;

const Root = styled(Box)<TListProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`;

const List = (props: TListProps): React.ReactElement | null => (
  <Root
    {...props}
  />
);

export {
  List,
};
