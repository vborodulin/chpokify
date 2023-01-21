import mix from 'polished/lib/color/mix';

const makeOverlay = (overlayColorStr: string, alpha: number, colorStr: string) =>
  mix(alpha, overlayColorStr, colorStr);

const darkenize = (colorStr: string, amount: number): string => makeOverlay(
  'rgb(20, 20, 20)',
  amount,
  colorStr
);

const lightenize = (colorStr: string, amount: number): string => makeOverlay(
  'rgb(255, 255, 255)',
  amount,
  colorStr
);

export {
  darkenize,
  lightenize,
};
