import { WeeklyRenewOptions } from "../types";
import { cloneDate, convertToUTC, daysToMillis, weekDayDistance } from "../utils";
import validator from "../validators";

/**
 * @return date
 */

const defaultOptions: WeeklyRenewOptions = {
  weekDay: 0,
};

export default function weeklyRenew(options: WeeklyRenewOptions = defaultOptions): Date {
  try {
    const date = cloneDate(options.from, options.useLocale);

    date.setUTCSeconds(0, 0);

    const interval = validator({
      value: options.interval,
      defaultValue: 1,
      name: "interval",
      rules: [{ type: "number", min: 1, integerOnly: true }],
    });

    const weekDay = validator({
      value: options.weekDay,
      defaultValue: 0,
      name: "weekDay",
      rules: [{ type: "number", min: 0, max: 6, integerOnly: true }],
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
    const currentDay = date.getUTCDay();

    const millis = daysToMillis(weekDay, hours, minutes);
    const currentMillis = daysToMillis(currentDay, currentHours, currentMinutes);

    let difference: number;

    if (currentMillis >= millis) {
      difference = weekDayDistance(currentDay, weekDay) + 7 * (interval - 1);
    } else {
      if (weekDay != currentDay) {
        difference = weekDayDistance(currentDay, weekDay);
      }
    }

    if (difference) date.setUTCDate(currentDate + difference);

    date.setUTCHours(hours, minutes);

    if (options.timezone) {
      convertToUTC(date, options.timezone);
    }

    return date;
  } catch (error) {
    console.error(error);
  }
}
