import { colors } from './colors';
import { stylesHelpers } from './helpers';

const breakpoints: [string, string, string, string] = [
  '600px', '960px', '1280px', '1920px',
];

const mediaQueries = {
  sm: `@media screen and (min-width: ${breakpoints[0]})`,
  md: `@media screen and (min-width: ${breakpoints[1]})`,
  lg: `@media screen and (min-width: ${breakpoints[2]})`,
  xl: `@media screen and (min-width: ${breakpoints[2]})`,
};

const baseTheme = {
  sizes: stylesHelpers.getArraySizes(),
  space: stylesHelpers.getArraySizes(),
  gap: stylesHelpers.getArraySizes(),
  radii: ['0', '4px', '8px', '12px', '16px', '24px', '32px', '64px', '9999px', '50%', '100%'],
  borderWidths: ['0px', '1px'],
  fontFamily: [
    'IBM Plex Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
  ],
  fontSizes: ['11px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '50px', '54px'],
  fontWeights: [400, 600],
  lineHeights: [1.45],
  letterSpacings: [],
  shadows: {
    card: '0 1px 2px rgba(0, 0, 0, 0.24)',
    popover: '0 4px 8px rgba(0, 0, 0, 0.24)',
    modal: '0 16px 32px rgba(0, 0, 0, 0.16)',
    bottomSlide: '0px -16px 32px rgba(0, 0, 0, 0.16)',
  },
  transitions: ['all 0.2s ease'],
  zIndices: [0, 1, 2, 3, 4],
  breakpoints,
  mediaQueries,
};

export enum THEME_TYPES {
  LIGHT = 'light',
  DARK = 'dark'
}

const getTheme = (themeType: THEME_TYPES) => ({
  ...baseTheme,
  colors: colors[themeType],
});

type TTheme = ReturnType<typeof getTheme>;

export type { TTheme };
export { getTheme };
