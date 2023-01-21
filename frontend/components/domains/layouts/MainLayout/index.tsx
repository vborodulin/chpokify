import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { AfterLoginRedirectProcessor } from '@components/domains/auth/utils/AfterLoginRedirectProcessor';
import { DocumentHiddenProcessor } from '@components/domains/core/utils/DocumentHiddenProcessor';
import { MobileOverlay } from '@components/domains/layouts/MobileOverlay';
import { SideBar } from '@components/domains/layouts/SideBar';
import { AcceptCookiesBanner } from '@components/domains/marketing/AcceptCookiesBanner';
import { AddToHomeScreen } from '@components/domains/marketing/AddToHomeScreen';
import { BannerContainer } from '@components/domains/marketing/BannerContainer';
import { TagManagerInniter } from '@components/domains/marketing/TagManagerInniter';
import { GoogleAnaliticsUserProcessor } from '@components/domains/marketing/utils/GoogleAnaliticsUserProcessor';
import { CurrUserSocketSubscriber } from '@components/domains/user/utils/CurrUserSocketSubscriber';

import { ModalProcessor } from '@components/utils/ModalProcessor';
import { SentryScopeProcessor } from '@components/utils/SentryScopeProcessor';
import { SocketProvider } from '@components/utils/socket/SocketProvider';
import { ViewHeightProcessor } from '@components/utils/ViewHeightProcessor';

import { SyncLogoutProcessor } from '@lib/auth';

export type TMainLayoutProps = {
  children: React.ReactNode;
}

const MainLayout = (props: TMainLayoutProps): React.ReactElement | null => {
  const {
    children,
  } = props;

  const currUserId = useSelector(authSelectors.getCurrUserId);

  return (
    <SocketProvider
      currUserId={currUserId}
    >
      <>
        <TagManagerInniter />
        <ViewHeightProcessor />
        <AfterLoginRedirectProcessor />
        <SyncLogoutProcessor />
        <ModalProcessor />
        <BannerContainer>
          <AcceptCookiesBanner />
        </BannerContainer>
        <AddToHomeScreen />
        <CurrUserSocketSubscriber />
        <DocumentHiddenProcessor />
        <SentryScopeProcessor />
        <GoogleAnaliticsUserProcessor />
        <SideBar />
        {children}
        <MobileOverlay />
      </>
    </SocketProvider>
  );
};

export {
  MainLayout,
};
