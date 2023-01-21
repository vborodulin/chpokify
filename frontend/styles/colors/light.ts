import { lightenize, darkenize } from './utils';

const colorSurface = '#FFFFFF';
const colorBase = '#FFFFFF';
const colorBaseInvert = '#000000';
const colorPrimary = '#3D5AFE';
const colorFont = '#141414';
const colorFontInvert = '#FFFFFF';
const colorFontPrimary = '#3D5AFE';
const colorPositive = '#00C92C';
const colorNegative = '#ED4550';
const colorPink = '#FED4FF';
const colorAccent = '#9147FF';
const colorBlue = '#BBF7FF';
const colorWarning = '#FFB84D';

const blue = {
  normal: colorBlue,
};

const pink = {
  normal: colorPink,
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

const lightColorSurface = (amount: number) => lightenize(colorSurface, amount);
const darkColorSurface = (amount: number) => darkenize(colorSurface, amount);

const surface = {
  normal: colorSurface,
  a_10: lightColorSurface(0.12),
  a_20: lightColorSurface(0.16),
  d_10: darkColorSurface(0.04),
  d_20: darkColorSurface(0.08),
  d_30: darkColorSurface(0.12),
};

const lightColorBase = (amount: number) => lightenize(colorBase, amount);
const darkColorBase = (amount: number) => darkenize(colorBase, amount);

const base = {
  normal: colorBase,
  a_10: darkColorBase(0.04),
  a_20: darkColorBase(0.08),
  a_30: darkColorBase(0.12),
  a_40: darkColorBase(0.16),
  a_50: darkColorBase(0.32),
  a_60: darkColorBase(0.48),
  d_10: lightColorBase(0.08),
};

const lightColorPrimary = (amount: number) => lightenize(colorPrimary, amount);
const darkColorPrimary = (amount: number) => darkenize(colorPrimary, amount);

const primary = {
  normal: colorPrimary,
  a_10: darkColorPrimary(0.16),
  a_20: darkColorPrimary(0.40),
  d_10: lightColorPrimary(0.2),
  d_20: lightColorPrimary(0.56),
  d_30: lightColorPrimary(0.8),
  d_40: lightColorPrimary(0.92),
};

const lightColorPositive = (amount: number) => lightenize(colorPositive, amount);
const darkColorPositive = (amount: number) => darkenize(colorPositive, amount);

const positive = {
  normal: colorPositive,
  a_10: darkColorPositive(0.16),
  a_20: darkColorPositive(0.32),

  d_30: lightColorPositive(0.8),
};

const darkColorNegative = (amount: number) => darkenize(colorNegative, amount);
const lightColorNegative = (amount: number) => lightenize(colorNegative, amount);

const negative = {
  normal: colorNegative,
  a_10: darkColorNegative(0.16),
  a_20: darkColorNegative(0.32),
  d_10: lightColorNegative(0.2),
  d_20: lightColorNegative(0.48),
};

const lightColorFont = (amount: number) => lightenize(colorFont, amount);
const lightColorFontPrimary = (amount: number) => lightenize(colorFontPrimary, amount);
const darkColorFontPrimary = (amount: number) => darkenize(colorFontPrimary, amount);

const font = {
  normal: colorFont,
  d_10: lightColorFont(0.2),
  d_20: lightColorFont(0.48),
  d_30: lightColorFont(0.68),
  d_40: lightColorFont(0.84),
  invert: colorFontInvert,
  primary: colorFontPrimary,
  primary_a_10: darkColorFontPrimary(0.16),
  primary_a_20: darkColorFontPrimary(0.32),
  primary_d_10: lightColorFontPrimary(0.2),
  primary_d_20: lightColorFontPrimary(0.48),
  negative: colorNegative,
  positive: colorPositive,
  warning: colorWarning,
};

const baseInvert = {
  normal: colorBaseInvert,
};

const lightColorWarning = (amount: number) => lightenize(colorWarning, amount);
const darkColorWarning = (amount: number) => darkenize(colorWarning, amount);

const warning = {
  normal: colorWarning,
  a_10: darkColorWarning(0.16),
  a_20: darkColorWarning(0.32),
  a_30: darkColorWarning(0.48),
  a_40: darkColorWarning(0.64),
  d_10: lightColorWarning(0.2),
  d_20: lightColorWarning(0.56),
  d_30: lightColorWarning(0.8),
  d_40: lightColorWarning(0.92),
};

const colorsLight = {
  surface,
  font,
  base,
  baseInvert,
  primary,
  positive,
  negative,
  warning,
  blue,
  pink,
  accent,
  transparent: 'transparent',
};

export {
  colorsLight,
};
