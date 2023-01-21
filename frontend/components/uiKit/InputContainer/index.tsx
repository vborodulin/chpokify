import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TInputContainerProps = TBoxProps & {
  disabled?: boolean;
  multiline?: boolean;
}

const InputContainer = styled(Box)<TInputContainerProps>`
align-items: center;
display: flex;
height: ${({ multiline }) => (multiline ? 'unset' : '40px')};
max-width: 100%;
position: relative;
width: 100%;
`;

export {
  InputContainer,
};
