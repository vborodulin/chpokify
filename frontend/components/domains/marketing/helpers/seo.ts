import { stringHelpers } from '@chpokify/helpers/rbac/string';
import { trimEnd, trimStart } from 'lodash';

import { CHPOKIFY_END_SIGN, CHPOKIFY_START_SIGN } from '@components/domains/marketing/types';

const TITLE_LENGTH = 65;
const DESCRIPTION_LENGH = 165;

const OG_TITLE_LENGTH = 55;
const OG_DESCRIPTION_LENGTH = 150;

const trimChpokifySign = (str: string) => {
  const trimmedStart = trimStart(str, CHPOKIFY_START_SIGN);
  const trimmedEnd = trimEnd(trimmedStart, CHPOKIFY_END_SIGN);
  return trimmedEnd.trim();
};

const enhanceTitle = (title: string) => stringHelpers.makeEllipses(title, TITLE_LENGTH);

const enhanceOgTitle = (title: string) =>
  stringHelpers.makeEllipses(title, OG_TITLE_LENGTH);

const enhanceOgDescription = (description: string) =>
  stringHelpers.makeEllipses(description, OG_DESCRIPTION_LENGTH);

const enhanceDescription = (description: string) =>
  stringHelpers.makeEllipses(description, DESCRIPTION_LENGH);

const seoHelpers = {
  trimChpokifySign,
  enhanceTitle,
  enhanceDescription,
  enhanceOgTitle,
  enhanceOgDescription,
};

export {
  seoHelpers,
};
