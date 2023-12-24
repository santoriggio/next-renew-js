export type NextRenewType = "day" | "week" | "month" | "year";

export type NextRenewReturn = {
  date: Date;
  list: Date[];
};
export type NextRenewOptions = {
  /**
   * Represents the interval in which the renewal occurs.
   * @type {number}
   * @example
   *   An interval of 2 means the renewal occurs every two days, weeks, months, or years.
   */
  interval?: number;

  /**
   * Specifies the starting date from which the renewal should begin.
   */
  from?: Date;

  /**
   *  Indicates the total number of renewals that should occur.
   */
  numberOfRenewals?: number;

  /**
   * Specifies an end date for the renewals.
   */
  end_date?: Date;

  /**
   * Specifies the hours at which the renewal should take place.
   * By default, the renewal occurs at midnight (0 hours).
   * @type number
   * @default 0
   */
  hours?: number;

  /**
   * Specifies the minutes at which the renewal should take place.
   * By default, the renewal occurs at the beginning of the specified hour (0 minutes).
   * @type number
   * @default 0
   */
  minutes?: number;

  /**
   * Specifies the timezone in which the renewals should occur.
   * @type {string}
   * @example
   * If the renewal is scheduled for midnight on December 21, and the timezone is set to "America/New_York",
   * the returned value will be at 18:00 (6:00 PM) on the previous day, accounting for the -6-hour offset from UTC.
   */
  timezone?: string;
} & (NextRenewDay | NextRenewWeek | NextRenewMonth | NextRenewYear);

type NextRenewDay = {
  /**
   * Specifies that the renewal happens daily.
   */
  type: "day";
};

type NextRenewWeek = {
  /**
   * Specifies that the renewal happens weekly.
   */
  type: "week";

  /**
   * Specifies the day of the week (0 for Monday, and so on).
   * Accepted values are in the range between 0 and 6.
   * @type number
   */
  weekDay: number;
};

type NextRenewMonth = {
  /**
   * Specifies that the renewal happens monthly.
   */
  type: "month";

  /**
   * Specifies the day of the month when the renewal should happen.
   * Accepted values are in the range between 1 and 31.
   * @type number
   */
  monthDay: number;
};

type NextRenewYear = {
  /**
   *  Specifies that the renewal happens yearly.
   */
  type: "year";

  /**
   * Specifies the day of the month when the renewal should happen.
   * Accepted values are in the range between 1 and 31.
   * @type number
   */
  monthDay: number;

  /**
   * Specifies the month of the year when the yearly renewal should happen.
   * Accepted values are in the range between 0 and 11.
   * @type {number}
   */

  month: number;
};
