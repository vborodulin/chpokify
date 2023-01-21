const path = require('path');

module.exports = {
  stories: [
    path.resolve(__dirname, '../components/**/*.story.tsx')
  ],
  typescript: {
    check: true,
    checkOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
    }
  },
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: { parser: 'typescript' },
      include: path.resolve(__dirname, '../components'),
      enforce: 'pre',
    },
    path.resolve(__dirname, './decorators/themeProvider/register.js')
  ]
};
