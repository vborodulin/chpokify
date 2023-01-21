import { get, set } from 'lodash';

import { TAppNext, TAppRequest, TAppResponse } from '@core/types';

export type TControllerHandler = (
  req: TAppRequest,
  res: TAppResponse,
  next: TAppNext,
) => Promise<void> | void;

const createHandler = (handler: TControllerHandler) => async (
  req: TAppRequest,
  res: TAppResponse,
  next: TAppNext
) => {
  if (res.locals?.result) {
    next();
    return;
  }

  //  @ts-ignore
  res.locals = res.locals || {};

  res.locals.set = (key: string, value: any) => {
    set(res.locals, `data.${key}`, value);
  };

  res.locals.get = (key: string) => get(res.locals, `data.${key}`);

  try {
    await handler(req, res, next);
    next();
  } catch (err) {
    next(err);
  }
};

export {
  createHandler,
};
