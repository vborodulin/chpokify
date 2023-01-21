import { urlJoin } from 'lib/urlJoin';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

import { seoHelpers } from '@components/domains/marketing/helpers/seo';

const OG_DEFAULT_IMG_URL = '/images/cover.png';

export type TOGProps = {
  title: string;
  description: string;
  imgUrl?: string;
};

const useOGSchema = (props: TOGProps) => {
  const {
    title,
    description,
    imgUrl,
  } = props;

  const router = useRouter();

  const baseUrl = useSelector(configSelectors.getBaseUrl);

  const contentUrl = urlJoin(baseUrl, router.asPath);

  const ogDefaultImgAbsoluteUrl = baseUrl + OG_DEFAULT_IMG_URL;

  return [
    <meta
      key="og:type"
      property="og:type"
      content="website"
    />,
    <meta
      key="og:url"
      property="og:url"
      content={contentUrl}
    />,
    <meta
      key="og:title"
      property="og:title"
      content={seoHelpers.enhanceOgTitle(title)}
    />,
    <meta
      key="og:description"
      property="og:description"
      content={seoHelpers.enhanceOgDescription(description)}
    />,
    <meta
      key="og:image"
      property="og:image"
      content={imgUrl || ogDefaultImgAbsoluteUrl}
    />,
    <meta
      key="og:image:width"
      property="og:image:width"
      content="1200"
    />,
    <meta
      key="og:image:height"
      property="og:image:height"
      content="630"
    />,
    <meta
      key="fb:profile_id"
      property="fb:profile_id"
      content="https://www.facebook.com/Chpokify/about/"
    />,
    <meta
      key="og:locale"
      property="og:locale"
      content="en_US"
    />,
    <meta
      key="og:site_name"
      property="og:site_name"
      content="Chpokify"
    />,
    <meta
      key="og:see_also_1"
      property="og:see_also"
      content="https://www.youtube.com/channel/UCNUYYqX4UiohLcvLB536Bqw"
    />,
    <meta
      key="og:see_also_2"
      property="og:see_also"
      content="https://www.linkedin.com/company/chpokify/"
    />,
    <meta
      key="og:see_also_3"
      property="og:see_also"
      content="https://www.facebook.com/Chpokify"
    />,
    <meta
      key="og:see_also_4"
      property="og:see_also"
      content="https://twitter.com/chpokify"
    />,
    <meta
      key="twitter:card"
      name="twitter:card"
      content="summary_large_image"
    />,
    <meta
      key="twitter:site"
      name="twitter:site"
      content="@chpokify"
    />,
    <meta
      key="twitter:creator"
      name="twitter:creator"
      content="@chpokify"
    />,
  ];
};

export {
  useOGSchema,
};
