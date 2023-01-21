import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';

import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import { ResetPassword } from '@components/domains/auth/ResetPassword';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { PageLayout } from '@components/uiKit/PageLayout';

import { LOCALE, TRANS } from '@components/utils/types';

const ResetPasswordPage: TAppPage<{}, {}> = () => {
  const router = useRouter();

  const { token } = router.query as { token: string };

  return (
    <>
      <Header />

      <PageLayout>
        <ContentCenter>
          <ResetPassword
            token={token}
          />
        </ContentCenter>
      </PageLayout>

      <Footer />
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(() => async (ctx) =>
  ({
    props: {
      ...(await serverSideTranslations(ctx.locale || LOCALE.EN, [TRANS.MAIN, TRANS.SEO])),
    },
  }));

export default ResetPasswordPage;
