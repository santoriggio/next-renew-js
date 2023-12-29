import nextRenew from "./nextRenew";
/**
 * Utils
 */
export {
  daysToMillis,
  monthsToMillis,
  cloneDate,
  convertToLocale,
  convertToUTC,
  hoursToMillis,
  minutesToMillis,
  numDays,
  weekDayDistance,
} from "./utils";
/**
 * Types
 */
export type {
  NextRenewReturn,
  NextRenewOptions,
  DailyRenewOptions,
  WeeklyRenewOptions,
  MonthlyRenewOptions,
  YearlyRenewOptions,
  NextRenewType,
} from "./types";

/**
 * Consts
 */
export const MONTH = 2629746000; // Approximate milliseconds in a month
export const DAY = 86400000; // Milliseconds in a day (24 hours)
export const HOUR = 3600000; // Milliseconds in an hour
export const MINUTE = 60000; // Milliseconds in a minute

/**
 * Default function
 */

export default nextRenew;
