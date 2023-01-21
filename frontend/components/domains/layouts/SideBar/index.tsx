import React from 'react';
import { useSelector } from 'react-redux';

import { uiSelectors } from '@Redux/domains/ui/selectors';

import { SIDE_BAR_TYPE } from '@components/domains/layouts/SideBar/types';
import { StorySliderBar } from '@components/domains/stories/StorySideBar';

const SideBar = (): React.ReactElement | null => {
  const sideBar = useSelector(uiSelectors.getSideBar);

  switch (sideBar?.type) {
    case SIDE_BAR_TYPE.STORY:
      return <StorySliderBar />;
    default:
      return null;
  }
};

export {
  SideBar,
};
