import styled from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TListItemEndAdornmentProps = TFlexProps;

const ListItemEndAdornment = styled(Flex)<TListItemEndAdornmentProps>`
flex-grow: 0;
flex-shrink: 0;
margin-left: ${({ theme }) => theme.space[2]};
`;

export {
  ListItemEndAdornment,
};
