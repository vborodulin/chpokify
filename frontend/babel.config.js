module.exports = {
  presets: ['next/babel'],
  plugins: [
    'inline-react-svg',
    'macros',
    ['styled-components', { ssr: true }],
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@api': './api',
        '@config': './config',
        '@Redux': './Redux',
        '@components': './components',
        '@helpers': './helpers',
        '@lib': './lib',
        '@constants': './constants.ts',
        '@styles': './styles',
        '@pages': './pages',
        '@Next': './Next',
      },
    }],
  ],
};
