const trimPhraseStart = (str: string, phrase: string) =>
  str.replace(new RegExp(`^${phrase}`), '');

const trimPhraseEnd = (str: string, phrase: string) =>
  str.replace(new RegExp(`${phrase}&`), '');

const makeEllipses = (str: string, length: number) => {
  if (str.length <= length) {
    return str;
  }

  return `${str.slice(0, length - 3)}...`;
};

const stringHelpers = {
  trimPhraseStart,
  trimPhraseEnd,
  makeEllipses,
};

export {
  stringHelpers,
};
