import validator, { validateDate } from "./validators";

export function monthsToMillis(months: number, days?: number, hours?: number, minutes?: number) {
  const d = daysToMillis(days, hours, minutes);

  return months * 2629746000 + d;
}
export function daysToMillis(days: number, hours?: number, minutes?: number) {
  const h = hoursToMillis(hours, minutes);

  return days * 24 * 60 * 60 * 1000 + h;
}
export function hoursToMillis(hours: number, minutes?: number) {
  const m = minutesToMillis(minutes);
  return hours * 60 * 60 * 1000 + m;
}
export function minutesToMillis(minutes: number) {
  return minutes * 60 * 1000;
}

/**
 * Calculates the day distance in a week.
 *
 * @param  from Starting day (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @param to Ending day (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @returns  Number of days between the two days, or null if input values are invalid.
 */
export function weekDayDistance(from: number, to: number): number | null {
  // Ensure days are within the valid range of 0 to 6 (Sunday to Saturday)
  try {
    const validFrom = validator({
      value: from,
      name: "from",
      rules: [{ type: "number", min: 0, max: 6, integerOnly: true }],
    });

    const validTo = validator({
      value: to,
      name: "to",
      rules: [{ type: "number", min: 0, max: 6, integerOnly: true }],
    });

    if (typeof validFrom == "undefined" || typeof validTo == "undefined") {
      return null;
    }

    from = (from + 7) % 7;
    to = (to + 7) % 7;

    // Calculate the day distance
    let distance = (to - from + 7) % 7;

    // If the distance is zero, consider it a full week (7 days)
    if (distance === 0) distance = 7;

    return distance;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Calculates the number of days in a month for a given year and month.
 * @param year  The year.
 * @param month  The month (0 for January, 1 for February, ..., 11 for December).
 * @returns The number of days in the specified month.
 */
export function numDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Converts the provided date to Coordinated Universal Time (UTC) based on the specified timezone.
 * This function ensures the accurate representation of the original date and time in the context
 * of the given timezone, allowing flexibility for scenarios such as scheduling events or renewals
 * at specific times regardless of the original hour.
 *
 *
 * @param date - The date to be converted.
 * @param timezone - The target timezone in the format "Area/Location" (e.g., "America/New_York").
 *
 * @example
 * // Original date and time of a user renewal in "America/New_York" timezone
 * const userRenewalDate = new Date("2023-01-15T00:00:00");
 * const userTimezone = "America/New_York";
 *
 * //Convert the date into "2023-01-15T05:00:00"
 * convertToUTC(userRenewalDate, userTimezone);
 * // Now userRenewalDate contains the accurate UTC date and time, ready for scheduling the event. When this UTC date is triggered, the user in "America/New_York" timezone will experience the renewal at the original scheduled time.
 */
export function convertToUTC(date: Date, timezone: string): void {
  try {
    const validTimezone = validator({
      value: timezone,
      name: "timezone",
      rules: [{ type: "string", isTimezone: true }],
    });

    const validDate = validator({
      value: date,
      name: "date",
      rules: [{ type: "date" }],
    });

    if (validDate && validTimezone) {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: validTimezone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      const formatted = Intl.DateTimeFormat("en-US", options).formatToParts(date);

      let obj = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      };

      formatted.forEach((x) => {
        if (typeof obj[x.type] != "undefined") {
          obj[x.type] = x.value;
        }
      });

      const currentMillis = date.getTime();

      const nextMillis = Date.UTC(
        obj.year,
        obj.month - 1,
        obj.day,
        obj.hour == 24 ? 0 : obj.hour,
        obj.minute,
        obj.second
      );

      const difference = currentMillis - nextMillis;

      date.setTime(currentMillis + difference);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Creates a clone of the provided date.
 *
 * @param  date The date to be cloned.
 * @param  locale  Optional. If true, adjusts the clone to the local timezone.
 * @returns   The cloned date.
 */
export function cloneDate(date: Date, locale: boolean = false): Date {
  try {
    const validDate: Date = validator({
      value: date,
      name: "date",
      defaultValue: new Date(),
      rules: [{ type: "date" }],
    });

    const toReturn = new Date(validDate);

    const validLocale = validator({
      value: locale,
      name: "locale",
      rules: [{ type: "boolean" }],
    });

    if (validLocale) {
      convertToLocale(toReturn);
    }

    return toReturn;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * Adjusts the provided date to the local timezone based on machine offset.
 * This function modifies the input date directly and does not return a new date.
 *
 * @param date  The date to be converted to the local timezone.
 */
export function convertToLocale(date: Date): void {
  try {
    const validDate = validator({
      value: date,
      name: "date",
      rules: [{ type: "date" }],
    });

    if (validDate) {
      const offsetMinutes = date.getTimezoneOffset();
      const offsetMillis = date.getTime() - offsetMinutes * 60 * 1000;

      date.setTime(offsetMillis);
    }
  } catch (error) {
    console.error(error);
  }
}
