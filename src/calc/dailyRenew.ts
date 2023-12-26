import { time } from "console";
import { DailyRenewOptions } from "../types";
import { cloneDate, convertToUTC, dateToLocale } from "../utils";
import validator, {
  validateHours,
  validateInterval,
  validateMinutes,
  validateTimezone,
} from "../validators";

/**
 * @return date
 */

export default function dailyRenew(options: DailyRenewOptions = {}): Date {
  try {
    const date = cloneDate(options.from, options.useLocale);
    //Set the seconds and milliseconds at 0

    date.setUTCSeconds(0, 0);

    const interval = validator({
      value: options.interval,
      defaultValue: 1,
      name: "interval",
      rules: [{ type: "number", min: 1, integerOnly: true }],
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
    const float = hours + minutes / 100;
    const currentFloat = currentHours + currentMinutes / 100;

    if (currentFloat >= float) {
      //
      date.setUTCDate(currentDate + interval);
    }

    date.setUTCHours(hours, minutes);

    if (options.timezone) {
      return convertToUTC(date, options.timezone);
    }

    return date;
  } catch (error) {
    console.error(error);
  }
}
