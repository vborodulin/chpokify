import React from 'react';
import { useSelector } from 'react-redux';

import { persistSelectors } from '@Redux/domains/persist/selectors';

import { Header } from '@components/domains/layouts/Header';
import { SpaceSideBar } from '@components/domains/space/SpaceSideBar';
import {
  SPACE_SIDEBAR_WIDTH_COLLAPSED,
  SPACE_SIDEBAR_WIDTH_UN_COLLAPSED,
} from '@components/domains/space/SpaceSideBar/types';
import { SpaceKickProcessor } from '@components/domains/space/utils/SpaceKickProcessor';
import { SpaceLastMarkerProcessor } from '@components/domains/space/utils/SpaceLastMarkerProcessor';
import { SpaceSocketSubscriber } from '@components/domains/space/utils/SpaceSocketSubscriber';
import { SpaceUsersProcessor } from '@components/domains/space/utils/SpaceUsersProcessor';
import { SpaceVisibilitySyncProcessor } from '@components/domains/space/utils/SpaceVisibilitySyncProcessor';

import { Flex } from '@components/uiKit/Flex';

export type TSpaceProviderProps = {
  children: React.ReactNode;
}

const SpaceProvider = (props: TSpaceProviderProps): React.ReactElement => {
  const {
    children,
  } = props;

  const isSideBarOpen = useSelector(persistSelectors.getIsSideBarUncollapsed);

  return (
    <>
      <Header />

      <SpaceSideBar />

      <Flex
        flexDirection="column"
        flexGrow={1}
        ml={[
          '0px',
          `${SPACE_SIDEBAR_WIDTH_COLLAPSED}px`,
          null,
          isSideBarOpen ? `${SPACE_SIDEBAR_WIDTH_UN_COLLAPSED}px` : `${SPACE_SIDEBAR_WIDTH_COLLAPSED}px`,
        ]}
      >
        {children}
      </Flex>

      <SpaceSocketSubscriber />
      <SpaceUsersProcessor />
      <SpaceKickProcessor />
      <SpaceLastMarkerProcessor />
      <SpaceVisibilitySyncProcessor />
    </>
  );
};

export {
  SpaceProvider,
};
