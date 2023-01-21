import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';
import { reduxWrapper } from '@Redux/lib/configureStore';
import { TAppPage } from '@Redux/types';

import IndexTildaMeta from '@components/domains/Index/IndexTilda/index-meta.html';
import IndexTilda from '@components/domains/Index/IndexTilda/index.html';
import IndexTildaRu from '@components/domains/Index/IndexTilda/ru-index.html';
import { Footer } from '@components/domains/layouts/Footer';
import { Header } from '@components/domains/layouts/Header';
import { ChpokifyHelmet } from '@components/domains/marketing/ChpokifyHelmet';
import { schemaOrgHelpers } from '@components/domains/marketing/helpers/shemaOrg';
import { LDJson } from '@components/domains/marketing/LDJson';
import { spaceHelpers } from '@components/domains/space/helpers';

import { Box } from '@components/uiKit/Box';

import { TildaLayout } from '@components/utils/TildaLayout';
import { LOCALE, TRANS } from '@components/utils/types';

const HomePage: TAppPage<{}, {}> = () => {
  const baseUrl = useSelector(configSelectors.getBaseUrl);

  const { t } = useTranslation(TRANS.SEO);

  const { locale } = useRouter();

  const renderContent = () => {
    if (locale === LOCALE.RU) {
      return (
        <Box
          dangerouslySetInnerHTML={{
            __html: IndexTildaMeta + IndexTildaRu,
          }}
        />
      );
    }

    return (
      <Box
        dangerouslySetInnerHTML={{ __html: IndexTildaMeta + IndexTilda }}
      />
    );
  };

  return (
    <>
      <ChpokifyHelmet>
        <link
          rel="canonical"
          href={baseUrl}
        />
      </ChpokifyHelmet>

      <LDJson
        schema={schemaOrgHelpers.getWebPage({
          name: t('index.title'),
          description: t('index.description'),
          url: baseUrl,
        })}
      />

      <LDJson
        schema={schemaOrgHelpers.getBreadcrumbsIndex()}
      />

      <Header />

      <TildaLayout
        tildaProps={{
          'data-tilda-export': 'yes',
          'data-hook': 'block-collection-content-node',
          'data-tilda-lazy': 'yes',
        }}
      >
        {
          renderContent()
        }
      </TildaLayout>

      <Footer />
    </>
  );
};

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { locale } = ctx;
    const currLocale = locale || LOCALE.EN;
    const redirectTo = spaceHelpers.redirectPageToLastSpace(store, ctx);

    if (redirectTo) {
      return redirectTo;
    }

    return {
      props: {
        ...(await serverSideTranslations(currLocale, [TRANS.MAIN, TRANS.SEO])),
      },
    };
  }
);

export default HomePage;
