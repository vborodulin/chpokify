import { errorsHelpers, ExtensibleError } from '@chpokify/helpers';

import { TAppActionMeta } from '@Redux/types';

import { ErrorAdapter, TAppError } from '@lib/errors';

export type TRejectedActionPayload = {
  error: TAppError
}

const createErrorAction = <RA>(
  rejectedActionName: RA,
  errorData: any,
  ...args: [TAppActionMeta]
) => {
  let error = null;

  if (errorsHelpers.getIsError(errorData)) {
    error = errorData;
  } else {
    try {
      const msg = JSON.stringify(errorData);
      error = new ExtensibleError(msg);
    } catch (_) {
      error = new ExtensibleError('Internal error');
    }
  }

  const payload: TRejectedActionPayload = {
    error: new ErrorAdapter(error).parse() as TAppError,
  };

  return {
    type: rejectedActionName,
    payload,
    meta: args[0],
  };
};

export { createErrorAction };
