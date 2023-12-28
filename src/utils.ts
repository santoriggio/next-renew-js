import validator, { validateDate } from "./validators";

export function monthsToMillis(months: number, days?: number, hours?: number, minutes?: number) {
  const d = daysToMillis(days, hours, minutes);

  return months * 2629746000 + d;
}

export function daysToMillis(days: number, hours?: number, minutes?: number) {
  const h = hoursToMillis(hours, minutes);

  return days * 24 * 60 * 60 * 1000 + h;
}
export function hoursToMillis(hours: number = 0, minutes?: number) {
  const m = minutesToMillis(minutes);
  return hours * 60 * 60 * 1000 + m;
}
export function minutesToMillis(minutes: number = 0) {
  return minutes * 60 * 1000;
}

export function giorniDiDistanza(giornoPartenza: number, giornoArrivo: number): number {
  // Assicurati che i giorni siano compresi tra 0 e 6
  giornoPartenza = (giornoPartenza + 7) % 7;
  giornoArrivo = (giornoArrivo + 7) % 7;

  // Calcola la distanza
  let distanza = (giornoArrivo - giornoPartenza + 7) % 7;

  //TODO: Aggiungere spiegazione di questo codice
  if (distanza === 0) distanza = 7;

  return distanza;
}

export function numDays(y: number, m: number): number {
  return new Date(y, m + 1, 0).getDate();
  // date.setUTCDate(1);

  // date.setUTCFullYear(y);
  // date.setUTCMonth(m + 1);

  // date.setUTCDate(0);

  // return date.getUTCDate();
}

export function convertToUTC(date: Date, timezone: string) {
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

export function convertToLocale(date: Date) {
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
