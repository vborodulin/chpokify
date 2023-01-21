import React from 'react';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@components/domains/layouts/HeaderContainer';

import { Divider } from '@components/uiKit/Divider';
import { Paper, TPaperProps } from '@components/uiKit/Paper';

import { SideBarEstimation } from './SideBarEstimation';
import { SideBarHeader } from './SideBarHeader';

export type TStorySliderBarProps = {};

const Root = styled(Paper)<TPaperProps>`
  bottom: 0;
  position: fixed;
  right: 0;
  top: ${HEADER_HEIGHT};
  z-index: 0;
`;

const StorySliderBar = (props: TStorySliderBarProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  return (
    <Root
      forwardedAs="aside"
      borderRadius={0}
      width="290px"
      bg="surface.normal"
      variant="popover"
      p={0}
      {...other}
    >
      <SideBarHeader />
      <Divider />
      <SideBarEstimation />
    </Root>
  );
};

export {
  StorySliderBar,
};
