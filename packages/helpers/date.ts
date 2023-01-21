import { format, formatDistance, Locale } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const getIANATimezone = () =>
  Intl.DateTimeFormat()
    .resolvedOptions().timeZone;

const getCurrentDateUTC = () =>
  zonedTimeToUtc(new Date(), getIANATimezone());

const formatSeconds = (durationSeconds: number) => {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds - hours * 3600) / 60);
  const seconds = durationSeconds - hours * 3600 - minutes * 60;

  const hoursView = hours < 10 ? `0${hours}` : hours;
  const minutesView = minutes < 10 ? `0${minutes}` : minutes;
  const secondsView = seconds < 10 ? `0${seconds}` : seconds;

  if (hours) {
    return `${hoursView}:${minutesView}:${secondsView}`;
  }

  return `${minutesView}:${secondsView}`;
};

const formatAppointmentDateTime = (
  dateUTC: Date | number,
  tz: string = getIANATimezone(),
  formatDate = 'dd/MM/yyyy HH:mm'
) => {
  const zonedDate = utcToZonedTime(dateUTC, tz);
  return format(zonedDate, formatDate);
};

const formatAppointmentDate = (
  dateUTC: Date | number,
  tz: string = getIANATimezone(),
  formatDate = 'dd/MM/yyyy'
) => {
  const zonedDate = utcToZonedTime(dateUTC, tz);
  return format(zonedDate, formatDate);
};

const formatAppointmentRangeDate = (
  utcStartAt: string | Date,
  utcStartEnd: string | Date,
  tz: string = getIANATimezone()
) => {
  const zStartAt = utcToZonedTime(utcStartAt, tz);
  const zEndAt = utcToZonedTime(utcStartEnd, tz);
  const timeStart = format(zStartAt, 'MMMM dd, HH:mm');
  const timeEnd = format(zEndAt, 'HH:mm');

  return `${timeStart} - ${timeEnd}`;
};

const formatDistanceInWordsBetween = (startDate: Date, endDate: Date) => formatDistance(
  startDate,
  endDate,
  {
    addSuffix: true,
  }
);

const formatDistanceInWordsBetweenWithLocale = (startDate: Date, endDate: Date, locale: Locale) => formatDistance(
  startDate,
  endDate,
  {
    addSuffix: true,
    locale,
  }
);

const dateHelpers = {
  formatSeconds,
  getIANATimezone,
  getCurrentDateUTC,
  formatAppointmentDateTime,
  formatAppointmentDate,
  formatAppointmentRangeDate,
  formatDistanceInWordsBetween,
  formatDistanceInWordsBetweenWithLocale,
};

export {
  dateHelpers,
};
