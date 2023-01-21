import { createSelector } from '@reduxjs/toolkit';
import { first } from 'lodash';
import compact from 'lodash/compact';

import { TStateError } from '@Redux/domains/asyncInfo/rejected/reducers';

import { asyncInfoSelectors } from '../selectors';

/**
 * helpers
 *
 */

const getFieldErrMsg = (error: TStateError, field: string): string => {
  if (!error) {
    return '';
  }

  let message = '';
  error.details.forEach((item) => {
    if (item.path.join('.')
      .replace('body.', '') === field) {
      message = item.message;
    }
  });

  return message;
};

const getFieldsErrDetails = (
  error: TStateError,
  formFields: string[]
): Record<string, string> => {
  const res: Record<string, string> = {};

  formFields.forEach((field) => {
    res[field] = getFieldErrMsg(error, field);
  });

  return res;
};

const getGlobalErrMsg = (
  error: TStateError,
  formFields: string[]
): string => {
  if (!error) {
    return '';
  }

  const defaultMessage = 'Oops, something went wrong. Please reload the page or try again it later.';

  if (!error.details.length) {
    if (error.code >= 500) {
      return defaultMessage;
    }

    return error.message || defaultMessage;
  }

  const notFormErrorDetails = error.details.find((item) => !formFields.find(
    (field) => field === item.path.join('.')
      .replace('body.', '')
  ));

  if (notFormErrorDetails) {
    return notFormErrorDetails.message;
  }

  return '';
};

/**
 * selectors
 *
 */

const createErrorSelector = createSelector(
  asyncInfoSelectors.getRejected,
  (asyncRejected) => (actionNames: string[] = []): TStateError => {
    const errors = actionNames
      .map((actionName) => actionName.replace(/\/(pending|fulfilled|rejected)$/, ''))
      .map((actionName) => asyncRejected[actionName]);

    return first(compact(errors));
  }
);

const getAsyncRejectedActionByCode = createSelector(
  asyncInfoSelectors.getRejected,
  (asyncRejected) => (code: number) =>
    Object.entries(asyncRejected)
      .find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, asyncError]) => asyncError?.code === code
      )
);

export const asyncRejectedSelectors = {
  getFieldErrMsg,
  getFieldsErrDetails,
  getGlobalErrMsg,
  createErrorSelector,
  getAsyncRejectedActionByCode,
};
