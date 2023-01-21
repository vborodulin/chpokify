import addSeconds from 'date-fns/addSeconds';
import format from 'date-fns/format';

const hrtimeToMs = (hr: [number, number]) => Math.ceil(hr[0] * 1e3 + hr[1] / 1e6);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fmtSecondsToMinutes = (amount: number): string => {
  const withSeconds = addSeconds(new Date('2020-01-01T00:00:00'), amount);
  return format(withSeconds, 'mm:ss');
};

export const timeHelpers = {
  hrtimeToMs,
  delay,
  fmtSecondsToMinutes,
};
