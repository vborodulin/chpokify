import { TAppNext, TAppRequest, TAppResponse } from '@core/types';

export const localeMiddleware = (req: TAppRequest, res: TAppResponse<{}>, next: TAppNext) => {
  try {
    req.locale = req.cookies && req.cookies.accept_language;
    next();
  } catch (err) {
    next(err);
  }
};
