import {
  find, indexOf, get, isEmpty,
} from 'lodash';

const isEmptyArr = <T>(arr: T[]) => isEmpty(arr);

const upsert = <T>(arr: T[], key: string, newVal: T) => {
  const match = find(arr, key);

  if (match) {
    const index = indexOf(arr, find(arr, key));
    arr.splice(index, 1, newVal);
  } else {
    arr.push(newVal);
  }
};

const normalizeArr = (arr: Record<string, any>[], field: string) => arr.reduce((acc, obj) => {
  const key = get(obj, field);
  acc[key] = obj;
  return acc;
}, {});

const getRandomIndex = (len: number) => Math.floor(Math.random() * len);

export const arrayHelpers = {
  upsert,
  normalizeArr,
  getRandomIndex,
  isEmptyArr,
};
