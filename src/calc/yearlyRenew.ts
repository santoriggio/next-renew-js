import { deflateSync } from "zlib";
import { YearlyRenewOptions } from "../types";
import { cloneDate, convertToUTC, daysToMillis, monthsToMillis, numDays } from "../utils";
import validator from "../validators";

const defaultOptions: YearlyRenewOptions = {
  monthDay: 1,
  month: 0,
};
export default function yearlyRenew(options: YearlyRenewOptions = defaultOptions) {
  try {
    const date = cloneDate(options.from, options.useLocale);
    date.setUTCSeconds(0, 0);

    const interval = validator({
      value: options.interval,
      defaultValue: 1,
      name: "interval",
      rules: [{ type: "number", min: 1, integerOnly: true }],
    });

    const md = validator({
      value: options.monthDay,
      defaultValue: 1,
      name: "monthDay",
      rules: [{ type: "number", min: 1, max: 31, integerOnly: true }],
    });

    const cmd = numDays(date.getUTCFullYear(), date.getUTCMonth());
    const monthDay = cmd < md ? cmd : md;

    const month = validator({
      value: options.month,
      defaultValue: 0,
      name: "month",
      rules: [{ type: "number", min: 0, max: 11, integerOnly: true }],
    });

    const hours = validator({
      value: options.hours,
      defaultValue: 0,
      name: "hours",
      rules: [{ type: "number", min: 0, max: 23, integerOnly: true }],
    });

    const minutes = validator({
      value: options.minutes,
      defaultValue: 0,
      name: "minutes",
      rules: [{ type: "number", min: 0, max: 59, integerOnly: true }],
    });

    const currentHours = date.getUTCHours();
    const currentMinutes = date.getUTCMinutes();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth();

    const millis = monthsToMillis(month, monthDay, hours, minutes);
    const currentMillis = monthsToMillis(currentMonth, currentDate, currentHours, currentMinutes);

    const monthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());
    const isLastDayOfMonth = currentDate === monthDays;

    date.setUTCDate(1);

    if (currentMillis >= millis) {
      //Incrementa il anno

      date.setUTCFullYear(date.getUTCFullYear() + interval);
      date.setUTCMonth(month);

      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < md) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(md);
      }
    } else {
      //Rimane lo stesso anno

      date.setUTCMonth(month);

      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < md) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(md);
      }
    }

    if (options.timezone) {
      return convertToUTC(date, options.timezone);
    }

    date.setUTCHours(hours, minutes);

    return date;
  } catch (error) {
    console.error(error);
  }
}
