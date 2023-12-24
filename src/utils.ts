export function days(days: number) {
  return days * 24 * 60 * 60 * 1000;
}
export function hours(hours: number) {
  return hours * 60 * 60 * 1000;
}
export function minutes(minutes: number) {
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

export function convertToUTC(inputDate: Date, inputTimeZone: string): Date {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: inputTimeZone,
    hour12: false,
    dateStyle: "short",
    timeStyle: "medium",
  });

  let obj = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };

  formatter.formatToParts(inputDate).forEach((x) => {
    if (typeof obj[x.type] != "undefined") {
      obj[x.type] = x.value;
    }
  });

  const formatted = new Date(Number("20" + obj.year), obj.month - 1, obj.day, obj.hour, obj.minute);

  return formatted;
}
