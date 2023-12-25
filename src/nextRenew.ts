import { NextRenewOptions, NextRenewReturn, NextRenewType } from "./types";

import { convertToUTC, days, giorniDiDistanza, numDays } from "./utils";
import {
  validateDate,
  validateHours,
  validateInterval,
  validateMinutes,
  validateMonth,
  validateMonthDay,
  validateNumberOfRenewals,
  validateTimezone,
  validateWeekDay,
} from "./validators";

export default function nextRenew(options: NextRenewOptions): NextRenewReturn {
  const numberOfRenewals = options.numberOfRenewals || 10;
  validateNumberOfRenewals(numberOfRenewals);

  let date = new Date(calculate(options));

  date.setUTCHours(0, 0, 0, 0);

  // if (typeof options.hours != "undefined") {
  //   validateHours(options.hours);
  //   date.setUTCHours(options.hours);
  // }
  // if (typeof options.minutes != "undefined") {
  //   validateMinutes(options.minutes);
  //   date.setUTCMinutes(options.minutes);
  // }

  let list: Date[] = [date];

  for (let i = 1; i < numberOfRenewals; i++) {
    const prevDate = list[i - 1];
    const nextDate = new Date(calculate({ ...options, from: new Date(prevDate.getTime()) }));

    if (typeof options.end_date != "undefined") {
      validateDate(options.end_date);

      if (options.end_date < nextDate) {
        break;
      }
    }

    list.push(nextDate);
  }

  if (typeof options.timezone != "undefined") {
    validateTimezone(options.timezone);
    date = convertToUTC(date, options.timezone);
    list = list.map((d) => {
      return (d = convertToUTC(d, options.timezone));
    });
  }

  return {
    date,
    list,
  };
}

function calculate(options: NextRenewOptions): number {
  /**
   * //TODO: Spiegare perchè viene creato un nuovo oggetto new Date(options.from)
   * in pratica viene presa la referenza quindi va a modificare anche la data principale
   */
  const date = options.from ? new Date(options.from) : new Date();

  // date.setUTCHours(0, 0, 0, 0);

  const interval = options.interval || 1;

  validateDate(date);
  validateInterval(interval);

  let toReturnMillis: number;
  const dateInMillis = date.getTime();

  if (options.type == "day") {
    date.setUTCDate(date.getUTCDate() + interval);
    toReturnMillis = date.getTime();
  }

  if (options.type == "week") {
    validateWeekDay(options.weekDay);

    const startDay = date.getUTCDay();
    const endDay = options.weekDay;

    if (startDay < endDay) {
      //TODO: Commenti, se l'inizio è minore della fine significa che deve ancora arrivare,
      // quindi bypassa l'intervallo
      toReturnMillis = dateInMillis + days(giorniDiDistanza(startDay, endDay));
    } else {
      toReturnMillis = dateInMillis + days(giorniDiDistanza(startDay, endDay) + 7 * (interval - 1));
    }
  }

  if (options.type == "month") {
    validateMonthDay(options.monthDay);

    const currentYear = date.getUTCFullYear();
    const currentMonth = date.getUTCMonth();
    const currentMonthDays = numDays(currentYear, currentMonth);

    const currentDate = date.getUTCDate();

    let renewalDate: number;

    if (options.monthDay > currentMonthDays) {
      renewalDate = currentMonthDays;
    } else {
      renewalDate = options.monthDay;
    }

    if (currentDate < renewalDate) {
      date.setUTCDate(renewalDate);
    } else {
      //Se maggiore o uguale
      date.setUTCDate(1);
      date.setUTCMonth(currentMonth + interval);

      const nextYear = date.getUTCFullYear();
      const nextMonth = date.getUTCMonth();
      const nextMonthDays = numDays(nextYear, nextMonth);

      if (options.monthDay > nextMonthDays) {
        renewalDate = nextMonthDays;
      } else {
        renewalDate = options.monthDay;
      }

      date.setUTCDate(renewalDate);
    }

    toReturnMillis = date.getTime();
  }

  if (options.type == "year") {
    validateMonthDay(options.monthDay);
    validateMonth(options.month);

    const currentYear = date.getUTCFullYear();
    const currentMonth = date.getUTCMonth();
    const currentDate = date.getUTCDate();
    let isPassed: boolean = false;

    if (currentMonth > options.month) {
      isPassed = true;
    }

    if (currentMonth == options.month) {
      const currentMonthDays = numDays(currentYear, currentMonth);

      if (options.monthDay > currentMonthDays) {
        if (currentDate == currentMonthDays) {
          isPassed = true;
        } else {
          isPassed = false;
        }
      }

      if (currentDate >= options.monthDay) {
        isPassed = true;
      }
    }

    if (isPassed) {
      date.setUTCDate(1);
      date.setUTCFullYear(currentYear + interval, options.month);

      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < options.monthDay) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(options.monthDay);
      }
    } else {
      date.setUTCDate(1);
      date.setUTCMonth(options.month);

      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < options.monthDay) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(options.monthDay);
      }
    }

    toReturnMillis = date.getTime();
  }

  return toReturnMillis;
}

