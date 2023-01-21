import { dateHelpers } from './date';

const getExportFilename = (title?: string): string => title || dateHelpers.getCurrentDateUTC().toDateString();

const retroSessionHelpers = {
  getExportFilename,
};

export {
  retroSessionHelpers,
};
