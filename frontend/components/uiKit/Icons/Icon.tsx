import styled from 'styled-components';
import { system } from 'styled-system';

import { Box, TBoxProps } from '@components/uiKit/Box';

export type TIconProps = TBoxProps & {
  fill?: string
};

const Icon = styled(Box)<TIconProps>`
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  vertical-align: middle;

  ${system({
    fill: {
      property: 'fill',
      scale: 'colors',
    },
  })}
`;

Icon.defaultProps = {
  width: '24px',
  height: '24px',
  fill: 'font.d_10',
  as: 'span',
};

export default Icon;
