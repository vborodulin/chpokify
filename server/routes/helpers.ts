import url from 'url';

import { TAppRequest } from '@core/types';

const getUrl = (path: string) => process.env.CLIENT_DOMAIN + path;

const getReqBaseUrl = (req: TAppRequest): string => url.format({
  protocol: req.protocol,
  host: req.get('host'),
});

const getReqFullUrl = (req: TAppRequest): string => url.format({
  protocol: req.protocol,
  host: req.get('host'),
  pathname: req.originalUrl,
});

const routesHelpers = {
  getUrl,
  getReqBaseUrl,
  getReqFullUrl,
};

export {
  routesHelpers,
};
