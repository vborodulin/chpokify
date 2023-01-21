module.exports = {
  i18n: {
    defaultNS: 'main',
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: true,
    reloadOnPrerender: process.env.ENV === 'development',
  },
};
