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

  return distanza;
}

export function numDays(y: number, m: number): number {
  return new Date(y, m + 1, 0).getDate();
}
