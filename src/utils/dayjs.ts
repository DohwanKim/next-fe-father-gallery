import dayjsModules from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

const dayjs = dayjsModules;

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

declare module 'dayjs' {
  interface Dayjs {
    weekday(): number;
    isoWeekday(): number;
    isBetween(): boolean;
    customParseFormat(): string;
    isSameOrAfter(day: Dayjs, format: string): boolean;
    isSameOrBefore(day: Dayjs, format: string): boolean;
    local(): Dayjs;
  }
}

export default dayjs;

type KoWeekName = '일' | '월' | '화' | '수' | '목' | '금' | '토' | null;

export const dayOfWeekNumberToKoName = (weekNumber: number): KoWeekName => {
  let weekKoName: KoWeekName;

  switch (weekNumber) {
    case 0:
      weekKoName = '일';
      break;
    case 1:
      weekKoName = '월';
      break;
    case 2:
      weekKoName = '화';
      break;
    case 3:
      weekKoName = '수';
      break;
    case 4:
      weekKoName = '목';
      break;
    case 5:
      weekKoName = '금';
      break;
    case 6:
      weekKoName = '토';
      break;
    default:
      console.error('error');
      weekKoName = null;
      break;
  }

  return weekKoName;
};

type WeekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const weekOfDayNameToNumber = (name: string): WeekNumber => {
  const formatName = `${name}`.toUpperCase();
  let weekOfDayNumber: WeekNumber;

  switch (formatName) {
    case 'SUNDAY':
      weekOfDayNumber = 0;
      break;
    case 'MONDAY':
      weekOfDayNumber = 1;
      break;
    case 'TUESDAY':
      weekOfDayNumber = 2;
      break;
    case 'WEDNESDAY':
      weekOfDayNumber = 3;
      break;
    case 'THURSDAY':
      weekOfDayNumber = 4;
      break;
    case 'FRIDAY':
      weekOfDayNumber = 5;
      break;
    case 'SATURDAY':
      weekOfDayNumber = 6;
      break;
    default:
      weekOfDayNumber = 0;
      break;
  }

  return weekOfDayNumber;
};
