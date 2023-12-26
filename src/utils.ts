import validator, { validateDate, validateTimezone } from "./validators";

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

export function convertToUTC(d: Date, tz: string): Date {
  const timezone = validator({
    value: tz,
    name: "timezone",
    rules: [{ type: "string", isTimezone: true }],
  });

  const date = validator({
    value: d,
    name: "date",
    defaultValue: new Date(),
    rules: [{ type: "date" }],
  });

  if (timezone) {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    const formatted = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

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

    return new Date(currentMillis + difference);
  }

  return date;
}

export function cloneDate(date: Date = new Date(), locale: boolean = false): Date {
  //TODO: Aggiungi controllo per data e locale

  let toReturn: Date = new Date();

  if (typeof date != "undefined" && date != null && date instanceof Date) {
    toReturn = new Date(date.getTime());
  }

  if (locale) {
    toReturn = dateToLocale(date);
  }

  return toReturn;
}

export function dateToLocale(date: Date): Date {
  validateDate(date);

  const offsetMinutes = date.getTimezoneOffset();

  // Calcola la data locale aggiungendo l'offset
  return new Date(date.getTime() - offsetMinutes * 60 * 1000);
}
