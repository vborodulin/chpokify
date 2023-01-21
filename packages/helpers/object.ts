import { pickBy, isUndefined, isEmpty } from 'lodash';

export const isEmptyObject = (obj: Record<string, any>) => isEmpty(obj);
export const compactObject = (obj: Record<string, any>) =>
  pickBy(obj, (value) => !isUndefined(value));

const toJSON = (obj: Record<string, any>) => {
  const res: Record<string, any> = {};

  Object.getOwnPropertyNames(obj).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    res[key] = descriptor?.value;
  });

  return res;
};

const objectHelpers = {
  compactObject,
  isEmptyObject,
  toJSON,
};

export {
  objectHelpers,
};
