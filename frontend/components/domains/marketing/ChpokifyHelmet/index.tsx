import { ENVIRONMENT } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import getConfig from 'next/config';
import Head from 'next/head';
import React from 'react';

import { seoHelpers } from '@components/domains/marketing/helpers/seo';
import { useOGSchema } from '@components/domains/marketing/hooks/useOGSchema';

import { TRANS } from '@components/utils/types';

const {
  publicRuntimeConfig,
} = getConfig();

const isProduction = publicRuntimeConfig.ENV === ENVIRONMENT.PRODUCTION;

export type TChpokifyHelmentProps = {
  page?: string;
  imgUrl?: string;
  children?: React.ReactNode;
};

const ChpokifyHelmet = (props: TChpokifyHelmentProps): React.ReactElement | null => {
  const {
    page,
    imgUrl,
    children,
  } = props;

  const { t, ready } = useTranslation(TRANS.SEO);

  const titleDefault = 'Chpokify | Planning Poker | Essential Sprint Planning Kit';
  const descDefault = 'Chpokify is a digital poker card game designed to help agile and scrum development teams '
    + 'effectively set their sprint goals through planning';

  let title = (page && t(`${page}.title`)) || t('index.title') as string;
  let description = (page && t(`${page}.description`)) || t('index.description') as string;

  if (!ready) {
    title = titleDefault;
    description = descDefault;
  }

  const ogSchema = useOGSchema({
    title,
    description,
    imgUrl,
  });

  return (
    <Head>
      <title>
        {seoHelpers.enhanceTitle(title)}
      </title>

      <meta
        name="description"
        content={seoHelpers.enhanceDescription(description)}
      />
      <meta
        charSet="utf-8"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta
        httpEquiv="Accept-CH"
        content="DPR"
      />
      <meta
        name="copyright"
        content="© Chpokify"
      />
      <meta
        name="robots"
        content={isProduction ? 'index, follow' : 'noindex, nofollow'}
      />
      <link
        href="https://www.facebook.com/Chpokify"
        rel="author"
      />
      {ogSchema}

      {children}
    </Head>
  );
};

export {
  ChpokifyHelmet,
};
