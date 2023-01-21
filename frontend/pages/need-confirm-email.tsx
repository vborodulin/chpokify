import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { NeedConfirmEmail } from '@components/domains/auth/NeedConfirmEmail';
import { Footer } from '@components/domains/layouts/Footer';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

import { auth } from '@lib/auth';

const NeedConfirmEmailPage: TAppPage<{ }, {}> = () => (
  <>
    <PageLayout>
      <ContentCenter>
        <NeedConfirmEmail />
      </ContentCenter>
    </PageLayout>

    <Footer />
  </>
);

export const getServerSideProps = reduxWrapper.getServerSideProps(() => async (ctx) =>
  ({
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  }));

export default auth.withAuthSync(NeedConfirmEmailPage, {
  needConfirmEmail: false,
});
