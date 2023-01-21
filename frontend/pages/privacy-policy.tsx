import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { reduxWrapper } from '@Redux/lib/configureStore';

import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';

import { PageLayoutNarrow } from '@components/uiKit/PageLayoutNarrow';
import { PageTitle } from '@components/uiKit/PageTitle';

import { LOCALE, TRANS } from '@components/utils/types';

const PrivacyPolicyPage = () => {
  const absoluteUrl = useSelector(configSelectors.getAbsoluteUrl)(
    routing.getPrivacyPolicyUrl()
  );

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <>
      <ChpokifyHelmet
        page="privacy"
      >
        <link
          rel="canonical"
          href={absoluteUrl}
        />
      </ChpokifyHelmet>

      <Header />

      <PageLayoutNarrow>
        <PageTitle>
          {t('privacyPolicyPage.title')}
        </PageTitle>

        <iframe
          title="privacy-policy"
          width="100%"
          style={{
            flexGrow: 1,
          }}
          /* eslint-disable-next-line max-len */
          src="https://docs.google.com/document/d/e/2PACX-1vRm5ssWj5mDgGE2yZVga-foCHuBsFpv5gjhArBPdXbY5taQ_pzZH6cG6iGAnvnsyLYzUntyNt5ke_rm/pub?embedded=true"
        />
      </PageLayoutNarrow>

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

export default PrivacyPolicyPage;
