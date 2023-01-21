import { dateHelpers } from '@chpokify/helpers';
import { BASE_URL_PROD, PROJECT_NAME } from '@chpokify/models-types';
import { CONTACT_TEL, SUPPORT_EMAIL } from '@chpokify/models-types/info';
import { routing, ROUTING_EXTERNAL } from '@chpokify/routing';

import { urlJoin } from '@lib/urlJoin';

const getWebApp = () => ({
  '@context': 'http://schema.org',
  '@type': 'WebApplication',
  '@id': BASE_URL_PROD,
  name: PROJECT_NAME,
  url: BASE_URL_PROD,
  applicationCategory: 'BusinessApplication',
  applicationSuite: PROJECT_NAME,
  operatingSystem: 'all',
  browserRequirements: 'Requires Javascript and HTML5 support',
  isAccessibleForFree: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '11',
  },
});

const getWebPageCreator = () => ({
  '@id': `${BASE_URL_PROD}#creator`,
  '@type': 'Organization',
  image: {
    '@type': 'ImageObject',
    height: '630',
    url: 'https://chpokify.com/images/cover.png',
    width: '1200',
  },
  logo: {
    '@type': 'ImageObject',
    height: '60',
    url: 'https://chpokify.com/pwa-assets/apple-touch-icon.png',
    width: '60',
  },
  name: PROJECT_NAME,
  url: BASE_URL_PROD,
  email: SUPPORT_EMAIL,
  telephone: CONTACT_TEL,
});

const getWebPageOrganization = () => ({
  '@id': 'https://chpokify.com#organization',
  '@type': 'Organization',
  image: {
    '@type': 'ImageObject',
    height: '630',
    url: 'https://chpokify.com/images/cover.png',
    width: '1200',
  },
  logo: {
    '@type': 'ImageObject',
    height: '60',
    url: 'https://chpokify.com/pwa-assets/apple-touch-icon.png',
    width: '60',
  },
  name: PROJECT_NAME,
  sameAs: [
    ROUTING_EXTERNAL.TWITTER_URL,
    ROUTING_EXTERNAL.FACEBOOK_URL,
    ROUTING_EXTERNAL.LINKEDIN_URL,
    ROUTING_EXTERNAL.YOUTUBE_URL,
  ],
  url: BASE_URL_PROD,
});

export type SchemaOrgWebPage = {
  url: string,
  name: string,
  description: string,
  imageUrl?: string;
}

const getWebPage = ({
  url,
  name,
  description,
}: SchemaOrgWebPage) => ({
  '@context': 'http://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      author: {
        '@id': 'https://chpokify.com#organization',
      },
      copyrightHolder: {
        '@id': 'https://chpokify.com#organization',
      },
      copyrightYear: new Date().getFullYear(),
      creator: {
        '@id': 'https://chpokify.com#creator',
      },
      dateModified: dateHelpers.formatAppointmentDateTime(new Date()),
      datePublished: dateHelpers.formatAppointmentDateTime(new Date()),
      description,
      headline: name,
      image: {
        '@type': 'ImageObject',
        url: 'https://chpokify.com/images/cover.png',
      },
      inLanguage: 'en-us',
      mainEntityOfPage: BASE_URL_PROD,
      name,
      publisher: {
        '@id': `${BASE_URL_PROD}#creator`,
      },
      url,
    },
    getWebPageCreator(),
    getWebPageOrganization(),
  ],
});

const getBreadcrumbsIndex = () => ({
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  description: 'Breadcrumbs list',
  itemListElement: [{
    '@type': 'ListItem',
    item: BASE_URL_PROD,
    name: 'Homepage',
    position: 1,
  }],
  name: 'Breadcrumbs',
});

const getBreadcrumbsPricing = () => ({
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  description: 'Breadcrumbs list',
  itemListElement: [{
    '@type': 'ListItem',
    item: BASE_URL_PROD,
    name: 'Homepage',
    position: 1,
  }, {
    '@type': 'ListItem',
    item: urlJoin(BASE_URL_PROD, routing.getPricingUrl()),
    name: 'Chpokify Pricing',
    position: 2,
  },
  ],
  name: 'Breadcrumbs',
});

const schemaOrgHelpers = {
  getWebApp,
  getWebPage,
  getBreadcrumbsIndex,
  getBreadcrumbsPricing,
};

export {
  schemaOrgHelpers,
};
