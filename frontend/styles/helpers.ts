const getArrayWithStep4 = <T>(size: number, getVal: (currVal: number) => T) =>
  new Array(size).fill(0).map((_, index) => getVal(index * 4));

const getArraySizes = () => getArrayWithStep4<string>(256, (val) => `${val}px`);

export const stylesHelpers = {
  getArrayWithStep4,
  getArraySizes,
};
