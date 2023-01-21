import { TRejectedActionPayload } from '@Redux/lib/createErrorAction';
import { TAppAction, TAppOperationReturnType, TAppOperationReturnTypeRejected } from '@Redux/types';

export const getIsRejectedActionPayload = (payload: TAppAction['payload'] = {}): payload is TRejectedActionPayload =>
  // @ts-ignore
  'error' in payload;

export const getIsRejectedOperation = (result: TAppOperationReturnType): result is TAppOperationReturnTypeRejected =>
  !!result && ('err' in result);

export const matchActionType = (type: TAppAction['type']) =>
  /(.*)\/(pending|rejected|fulfilled)/.exec(type);
