module.exports = {
  presets: [
    [
      '@babel/preset-typescript',
      {
        allowNamespaces: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@auth': './server/domains/auth',
        '@domains': './server/domains',
        '@core': './server/core',
        '@queue': './server/queue',
        '@mail': './server/domains/mail',
        '@metrics': './server/domains/metrics',
        '@models': './server/models',
        '@pokerSessions': './server/domains/pokerSessions',
        '@pokerCardDecks': './server/domains/pokerCardDecks',
        '@routes': './server/routes',
        '@config': './server/config',
        '@spaces': './server/domains/spaces',
        '@stats': './server/domains/stats',
        '@users': './server/domains/users',
        '@socket': './server/socket',
        '@chpokify': './packages',
      },
    }],
  ],
};
