import styled from 'styled-components';
import { variant } from 'styled-system';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

export type TSurfaceProps = TFlexProps & {
  variant: 'flat' | 'card' | 'modal' | 'popover' | 'tooltip'
};

const Surface = styled(Flex)<TSurfaceProps>`
overflow: hidden;
${variant({
    variants: {
      flat: {
        backgroundColor: 'surface.normal',
      },
      card: {
        backgroundColor: 'surface.a_10',
        boxShadow: 'card',
      },
      modal: {
        backgroundColor: 'surface.a_10',
        boxShadow: 'modal',
      },
      popover: {
        backgroundColor: 'surface.a_20',
        boxShadow: 'popover',
        zIndex: 2,
      },
      tooltip: {
        backgroundColor: 'baseInvert.normal',
        zIndex: 3,
      },
      bottomSlide: {
        backgroundColor: 'surface.a_10',
        boxShadow: 'bottomSlide',
        zIndex: 5,
      },
    },
  })};
`;

export {
  Surface,
};
