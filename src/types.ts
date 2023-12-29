export type NextRenewType = "day" | "week" | "month" | "year";

export type NextRenewReturn = {
  date: Date;
  list: Date[];
};

export type NextRenewOptions = {
  /**
   *  Indicates the total number of renewals that should occur.
   */
  numberOfRenewals?: number;

  /**
   * Specifies an end date for the renewals.
   */
  end_date?: Date;

  month?: number;
  monthDay?: number;
  weekDay?: number;
} & (
  | Typed<DailyRenewOptions, "day">
  | Typed<WeeklyRenewOptions, "week">
  | Typed<MonthlyRenewOptions, "month">
  | Typed<YearlyRenewOptions, "year">
);

type Typed<T, E extends string> = T & { type: E };

export type DailyRenewOptions = {
  interval?: number;
  from?: Date;
  hours?: number;
  minutes?: number;
  timezone?: string;
  useLocale?: boolean;
};

export type WeeklyRenewOptions = {
  interval?: number;
  from?: Date;
  hours?: number;
  minutes?: number;
  weekDay: number;
  timezone?: string;
  useLocale?: boolean;
};

export type MonthlyRenewOptions = {
  interval?: number;
  from?: Date;
  hours?: number;
  minutes?: number;
  monthDay: number;
  timezone?: string;
  useLocale?: boolean;
};

export type YearlyRenewOptions = {
  interval?: number;
  from?: Date;
  hours?: number;
  minutes?: number;
  monthDay: number;
  month: number;
  timezone?: string;
  useLocale?: boolean;
};

export type ValidatorOptions = {
  value: any;
  defaultValue?: any;
  name: string;
  rules: Rule[];
};

type Rule = StringRule | NumberRule | DateRule | BooleanRule;

type StringRule = {
  type: "string";
  isTimezone?: boolean;
};
type NumberRule = {
  type: "number";
  min?: number;
  max?: number;
  integerOnly?: boolean;
};

type DateRule = {
  type: "date";
};

type BooleanRule = {
  type: "boolean";
};
