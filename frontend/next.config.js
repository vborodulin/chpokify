// const { withSentryConfig } = require('@sentry/nextjs');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')([
  '@chpokify/helpers',
  '@chpokify/api-schemas',
  '@chpokify/models-types',
  '@chpokify/routing',
]);
const { compose } = require('redux');
const shortid = require('shortid');

const { i18n } = require('./next-i18next.config');

const BUILD_ID = shortid();

const nextConfig = {
  webpack: (config) => {
    config.output.globalObject = '(typeof self !== \'undefined\' ? self : this)';

    config.module.rules.push({
      test: /\.worker\.*/,
      loader: 'worker-loader',
      options: {
        filename: 'static/[hash].worker.js',
        publicPath: '/_next/',
      },
    });
    return config;
  },
};

const withCustomExtends = (
  providedExports
) => {
  const config = {
    ...providedExports,
    i18n,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    generateBuildId: async () => BUILD_ID,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
      ENV: process.env.ENV,
    },
    env: {
      BASE_API_SSR_URL: process.env.BASE_API_SSR_URL,
      BASE_API_CLIENT_URL: process.env.BASE_API_CLIENT_URL,
      APP_COOKIE_SESSION_NAME: process.env.APP_COOKIE_SESSION_NAME,
      CLIENT_SENTRY_DSN: process.env.CLIENT_SENTRY_DSN,
      BUILD_ID,
    },
    images: {
      deviceSizes: [600, 960, 1280, 1920],
      domains: [
        'storage.googleapis.com',
        'lh1.googleusercontent.com',
        'lh2.googleusercontent.com',
        'lh3.googleusercontent.com',
        'lh4.googleusercontent.com',
        'lh5.googleusercontent.com',
        'lh6.googleusercontent.com',
      ],
    },
    workboxOpts: {
      swDest: process.env.NEXT_EXPORT
        ? 'service-worker.js'
        : 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /\.(png|jpg|jpeg|svg|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 200,
            },
          },
        },
        {
          urlPattern: /\.(eot|woff|woff2|ttf)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxEntries: 200,
            },
          },
        },
        {
          urlPattern: /\/api\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'offlineCache',
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
        {
          source: '/socket.worker.js',
          destination: '/_next/socket.worker.js',
        },
      ];
    },
  };

  return config;
};

// for all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
// const sentryWebpackPluginOptions = {
//   release: BUILD_ID,
// };

const exportConfig = compose(withTM, withOffline, withCustomExtends)(nextConfig);

module.exports = exportConfig;
