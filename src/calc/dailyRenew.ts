import { DailyRenewOptions } from "../types";
import { cloneDate, convertToUTC, dateToLocale } from "../utils";
import { validateHours, validateInterval, validateMinutes, validateTimezone } from "../validators";

/**
 * @return date
 */

export default function dailyRenew(options: DailyRenewOptions = {}): Date {
  try {
    const date = cloneDate(options.from, options.locale);
    //Set the seconds and milliseconds at 0

    date.setUTCSeconds(0, 0);

    const interval = options.interval || 1;

    //Create and validate hours and minutes
    const hours = options.hours || 0;
    const minutes = options.minutes || 0;

    validateInterval(interval);
    validateHours(hours);
    validateMinutes(minutes);

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

    if (typeof options.timezone != "undefined") {
      validateTimezone(options.timezone);
      return convertToUTC(date, options.timezone);
    }

    return date;
  } catch (error) {
    console.error(error);
  }
}
