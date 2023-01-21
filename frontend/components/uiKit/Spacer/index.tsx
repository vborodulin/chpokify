import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

import { StyledChildren } from '@components/uiKit/utils/StyledChildren';

export type TSpacerProps = SpaceProps;

const Spacer = styled(StyledChildren)<TSpacerProps>`
${space}
`;

export {
  Spacer,
};
