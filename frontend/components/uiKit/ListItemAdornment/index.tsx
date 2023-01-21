import styled from 'styled-components';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TListItemAdornmentProps = Partial<TFlexProps>;

const ListItemAdornment = styled(Flex)<TListItemAdornmentProps>`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.space[2]};
`;

export {
  ListItemAdornment,
};
