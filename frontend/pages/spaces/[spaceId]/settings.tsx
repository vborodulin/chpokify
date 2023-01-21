import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { spaceHelpers } from '@components/domains/space/helpers';
import { SpaceProvider } from '@components/domains/space/SpaceProvider';
import { SpaceSettings } from '@components/domains/space/SpaceSettings';

import { PageLayoutNarrow } from '@components/uiKit/PageLayoutNarrow';

import { TRANS } from '@components/utils/types';

import { getInitialPropsSpaceSettingsPage } from '@Next/ssr';

const SettingsPage: TAppPage<{}, {}> = () => (
  <SpaceProvider>
    <PageLayoutNarrow
      maxWidth="1000px"
    >
      <SpaceSettings />
    </PageLayoutNarrow>
  </SpaceProvider>
);

export const getServerSideProps = reduxWrapper.getServerSideProps((store) => async (ctx) => {
  spaceHelpers.initPage(store, ctx);
  await getInitialPropsSpaceSettingsPage(store);

  const { locale } = ctx;
  const currLocale = locale || 'en';

  return {
    props: {
      ...(await serverSideTranslations(currLocale, [TRANS.MAIN, TRANS.SEO])),
    },
  };
});

export default SettingsPage;
