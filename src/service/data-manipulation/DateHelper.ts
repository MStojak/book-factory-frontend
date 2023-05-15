import moment from 'moment';

export const DATE_FORMAT_STRING = 'DD.MM.YYYY';

export function convertToDate(stringToConvert: string | undefined) {
  if (stringToConvert === undefined) {
    return undefined;
  }
  const date = moment(stringToConvert, DATE_FORMAT_STRING);
  return date.toDate();
}

export function convertFromDate(dateToConvert: Date | undefined) {
  if (dateToConvert === undefined) {
    return undefined;
  }
  const date = moment(dateToConvert).format(DATE_FORMAT_STRING);
  if (date === 'Invalid date') {
    return undefined;
  }
  return date;
}

export function isTodayDateInBetween(startDate: Date, endDate: Date): boolean {
  return moment().isBetween(startDate, endDate);
}
