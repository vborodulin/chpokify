import React from 'react';
import styled from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';

type TBannerContainerProps = Partial<TBoxProps>

const RootBanner = styled(Box)<TBoxProps>`
bottom: 0;
position: fixed;
width: 100%;
z-index: 5;
`;

const BannerContainer = (props: TBannerContainerProps): React.ReactElement | null => {
  const {
    children,
    ...other
  } = props;

  return (
    <RootBanner
      {...other}
    >
      {children}
    </RootBanner>
  );
};

export {
  BannerContainer,
};
