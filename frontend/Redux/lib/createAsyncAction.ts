import { TSuccessResponse } from '@chpokify/api-schemas';
import { ExtensibleError } from '@chpokify/helpers';
import { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import shortId from 'shortid';

import { createErrorAction } from '@Redux/lib/createErrorAction';
import { TAppActionMeta } from '@Redux/types';

type TFetcherReturnType<F> = F extends (...args: any) =>
  Promise<AxiosResponse<TSuccessResponse<infer R>>> ? R : never;

const createAsyncActionCreator = <TPendingActionType extends string,
  TFulfilledActionType extends string,
  TRejectedActionType extends string,
  TFetcher extends (...args: any[]) => Promise<any>,
  >(
    pendingActionType: TPendingActionType,
    fulfilledActionType: TFulfilledActionType,
    rejectedActionType: TRejectedActionType,
    fetcher: TFetcher
  ) => {
  const pendingActionCreator = (...args: [TAppActionMeta, ...any[]]) => ({
    type: pendingActionType,
    payload: {
      args: args.slice(1),
    },
    meta: args[0],
  }) as const;

  const fulfilledActionCreator = (payload: TFetcherReturnType<TFetcher>, ...args: [TAppActionMeta]) => ({
    type: fulfilledActionType,
    payload,
    meta: args[0],
  }) as const;

  const rejectedActionCreator = (error: ExtensibleError, ...args: [TAppActionMeta]) =>
    createErrorAction(rejectedActionType, error, ...args);

  const thunk = (...args: Parameters<TFetcher>) => async (dispatch: ThunkDispatch<any, any, any>) => {
    const meta: TAppActionMeta = {
      requestId: shortId(),
      args,
    };

    const start = Date.now();

    dispatch(pendingActionCreator(meta, ...args));

    try {
      const resp = await fetcher(...args);
      return dispatch(fulfilledActionCreator(resp.data.result, {
        ...meta,
        timeMS: Date.now() - start,
      }));
    } catch (err: any) {
      return dispatch(rejectedActionCreator(err, {
        ...meta,
        timeMS: Date.now() - start,
      }));
    }
  };

  thunk.pending = pendingActionCreator;
  thunk.fulfilled = fulfilledActionCreator;
  thunk.rejected = rejectedActionCreator;

  return thunk;
};

export {
  createAsyncActionCreator,
};
