import { TEntityID } from '@chpokify/models-types';
import Cookies from 'js-cookie';

import { COOKIES_KEYS } from '@components/domains/core/types';

const setMark = (spaceId: TEntityID) => {
  Cookies.set(COOKIES_KEYS.CURRENT_SPACE_ID, spaceId.toString(), {
    expires: 10 * 365,
  });
};

const getMark = () => Cookies.get(COOKIES_KEYS.CURRENT_SPACE_ID);

export const lastSpaceMarker = {
  setMark,
  getMark,
};
