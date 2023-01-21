import { lightenize, darkenize } from './utils';

const colorSurface = '#141414';
const colorBase = '#141414';
const colorBaseInvert = '#FFFFFF';
const colorPrimary = '#FFB84D';
const colorFont = '#FFFFFF';
const colorFontInvert = '#141414';
const colorFontPrimary = '#FFB84D';
const colorPositive = '#15E844';
const colorNegative = '#ff6060';
const colorWarning = '#FFB84D';
const colorAccent = '#9147FF';

const lightColorSurface = (amount: number) => lightenize(colorSurface, amount);
const darkColorSurface = (amount: number) => darkenize(colorSurface, amount);

const surface = {
  normal: colorSurface,
  a_10: lightColorSurface(0.12),
  a_20: lightColorSurface(0.24),
  d_10: darkColorSurface(0.04),
  d_20: darkColorSurface(0.08),
  d_30: darkColorSurface(0.12),
};

const lightColorBase = (amount: number) => lightenize(colorBase, amount);
const darkColorBase = (amount: number) => darkenize(colorBase, amount);

const base = {
  normal: colorBase,
  a_10: lightColorBase(0.20),
  a_20: lightColorBase(0.28),
  a_30: lightColorBase(0.48),
  a_40: lightColorBase(0.56),
  a_50: lightColorBase(0.64),
  a_60: lightColorBase(0.80),
  d_10: darkColorBase(0.08),
};

const lightColorPrimary = (amount: number) => lightenize(colorPrimary, amount);
const darkColorPrimary = (amount: number) => darkenize(colorPrimary, amount);

const primary = {
  normal: colorPrimary,
  a_10: lightColorPrimary(0.24),
  a_20: lightColorPrimary(0.40),
  d_10: darkColorPrimary(0.12),
  d_20: darkColorPrimary(0.24),
  d_30: darkColorPrimary(0.48),
  d_40: darkColorPrimary(0.60),
};

const lightColorPositive = (amount: number) => lightenize(colorPositive, amount);

const positive = {
  normal: colorPositive,
  a_10: lightColorPositive(0.16),
  a_20: lightColorPositive(0.32),
};

const lightColorNegative = (amount: number) => lightenize(colorNegative, amount);

const negative = {
  normal: colorNegative,
  a_10: lightColorNegative(0.16),
  a_20: lightColorNegative(0.32),
};

const darkColorFont = (amount: number) => darkenize(colorFont, amount);
const lightColorFontPrimary = (amount: number) => lightenize(colorFontPrimary, amount);
const darkColorFontPrimary = (amount: number) => darkenize(colorFontPrimary, amount);

const font = {
  normal: colorFont,
  d_10: darkColorFont(0.08),
  d_20: darkColorFont(0.16),
  d_30: darkColorFont(0.24),
  d_40: darkColorFont(0.32),
  invert: colorFontInvert,
  primary: colorFontPrimary,
  primary_a_10: lightColorFontPrimary(0.04),
  primary_a_20: lightColorFontPrimary(0.08),
  primary_d_10: darkColorFontPrimary(0.16),
  primary_d_20: darkColorFontPrimary(0.24),
  negative: colorNegative,
  positive: colorPositive,
};

const baseInvert = {
  normal: colorBaseInvert,
};

const lightColorWarning = (amount: number) => lightenize(colorWarning, amount);
const darkColorWarning = (amount: number) => darkenize(colorWarning, amount);

const warning = {
  normal: colorWarning,
  a_10: lightColorWarning(0.12),
  a_20: lightColorWarning(0.24),
  a_30: lightColorWarning(0.48),
  a_40: lightColorWarning(0.60),
  d_10: darkColorWarning(0.12),
  d_20: darkColorWarning(0.24),
  d_30: darkColorWarning(0.48),
  d_40: darkColorWarning(0.60),
};

const lightColorAccent = (amount: number) => lightenize(colorAccent, amount);
const darkColorAccent = (amount: number) => darkenize(colorAccent, amount);

const accent = {
  normal: colorAccent,
  a_10: darkColorAccent(0.2),
  a_20: darkColorAccent(0.56),
  d_10: lightColorAccent(0.2),
  d_20: lightColorAccent(0.56),
};

const colorsDark = {
  surface,
  font,
  base,
  baseInvert,
  primary,
  positive,
  negative,
  warning,
  accent,
  transparent: 'transparent',
};

export {
  colorsDark,
};
