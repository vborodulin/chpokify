import { SUCCESS_VOID_RESULT } from '@chpokify/api-schemas/coreSchemas';
import * as fastCsvFormat from '@fast-csv/format';

import { TAppRequest, TAppResponse } from '@core/types';

import { SpaceModel } from '@models/space';

import { StatsService } from '@stats/services';

const getAdmins = async (
  req: TAppRequest,
  res: TAppResponse
) => {
  const pipeline = StatsService.getStatAdminsPipeline();

  res.locals.result = SUCCESS_VOID_RESULT;
  res.setHeader('Content-disposition', `attachment; filename=admins-${new Date().toDateString()}.csv`);
  res.setHeader('Content-Type', 'text/csv');

  const csvStream = fastCsvFormat.format({
    headers: true,
    objectMode: true,
  });

  const aggregation = SpaceModel.aggregate(pipeline).sort({ lastPokerSessionDate: -1 });

  aggregation.cursor()
    .pipe(csvStream)
    .pipe(res);
};

const getSpaces = async (
  req: TAppRequest,
  res: TAppResponse
) => {
  const pipeline = StatsService.getStatSpacesPipeline();

  res.locals.result = SUCCESS_VOID_RESULT;
  res.setHeader('Content-disposition', `attachment; filename=spaces-${new Date().toDateString()}.csv`);
  res.setHeader('Content-Type', 'text/csv');

  const csvStream = fastCsvFormat.format({
    headers: true,
    objectMode: true,
  });

  const aggregation = SpaceModel.aggregate(pipeline);

  aggregation.cursor()
    .pipe(csvStream)
    .pipe(res);
};

const statsController = {
  getAdmins,
  getSpaces,
};

export {
  statsController,
};
