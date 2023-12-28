import { deflateSync } from "zlib";
import { MonthlyRenewOptions } from "../types";
import { cloneDate, convertToUTC, daysToMillis, numDays } from "../utils";
import validator from "../validators";
const defaultOptions: MonthlyRenewOptions = {
  monthDay: 1,
};
export default function monthlyRenew(options: MonthlyRenewOptions = defaultOptions): Date {
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

    const millis = daysToMillis(monthDay, hours, minutes);
    const currentMillis = daysToMillis(currentDate, currentHours, currentMinutes);

    const monthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());
    //const isLastDayOfMonth = currentDate === monthDays;

    date.setUTCDate(1);

    if (currentMillis >= millis) {
      //Incrementa il mese

      date.setUTCMonth(date.getUTCMonth() + interval);

      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < md) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(md);
      }
    } else {
      //Rimane lo stesso mese
      const currentMonthDays = numDays(date.getUTCFullYear(), date.getUTCMonth());

      if (currentMonthDays < md) {
        date.setUTCDate(currentMonthDays);
      } else {
        date.setUTCDate(md);
      }
    }

    if (options.timezone) {
      convertToUTC(date, options.timezone);
    }

    date.setUTCHours(hours, minutes);

    return date;
  } catch (error) {
    console.error(error);
  }
}
