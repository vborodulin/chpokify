import React from 'react';
import styled from 'styled-components';

import { YouBadge } from '@components/domains/user/YouBadge';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { BoxAr, TBoxArProps } from '@components/uiKit/BoxAr';

export type TCardBaseProps = TBoxArProps & {
  isMe?: boolean;
};

const StyledYouLabel = styled(YouBadge)`
border: 2px solid ${({ theme }) => theme.colors.base.normal};
bottom: 0;
left: 50%;
position: absolute;
transform: translate3d(-50%, 40%, 0);
`;

const Card = styled(BoxAr)<TBoxArProps>`
align-items: center;
border-radius: ${({ theme }) => theme.radii[3]};
justify-content: center;
`;

const Root = styled(Box)<TBoxProps>`
position: relative;
`;

const CardBase = (props: TCardBaseProps): React.ReactElement | null => {
  const {
    isMe,
    ...other
  } = props;

  return (
    <Root>
      <Card
        ar={106 / 72}
        bg="base.a_20"
        {...other}
      />

      {
        isMe && (
          <StyledYouLabel />
        )
      }
    </Root>
  );
};

export {
  CardBase,
};
