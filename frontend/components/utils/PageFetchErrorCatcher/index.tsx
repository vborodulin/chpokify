import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';

import { log } from '@lib/logger';

import { config } from './config';

export type TPageErrorFetchCatcher = {
  children: React.ReactElement
}

const PageFetchErrorCatcher = (props: TPageErrorFetchCatcher): React.ReactElement | null => {
  const { children } = props;

  const { asPath } = useRouter();

  const match = Object.keys(config).find((key) => {
    const regexp = new RegExp(key);
    return regexp.test(asPath);
  }) || '';

  const rule = config[match];

  const fetchError = useSelector(
    asyncRejectedSelectors.createErrorSelector
  )(rule?.actionsNames);

  if (fetchError) {
    log.error(fetchError);
    throw fetchError;
  }

  return children;
};

export {
  PageFetchErrorCatcher,
};
