import { ValidatorOptions } from "./types";

export default function validator(options: ValidatorOptions) {
  const { value, name, defaultValue, rules } = options;
  let isValid: boolean = true;

  if (typeof value == "undefined" || value == null) {
    isValid = false;
  }

  if (isValid) {
    for (const rule of rules) {
      switch (rule.type) {
        case "number":
          if (typeof value !== "number") {
            isValid = false;
          }

          if (typeof rule.min != "undefined" && value < rule.min) {
            isValid = false;
          }
          if (typeof rule.max != "undefined" && value > rule.max) {
            isValid = false;
          }
          if (rule.integerOnly && !Number.isInteger(value)) {
            isValid = false;
          }

          break;
        case "string":
          if (typeof value !== "string") {
            isValid = false;
          }

          if (rule.isTimezone) {
            isValid = isValidTimeZone(value);
          }

          break;
        case "date":
          if (!(value instanceof Date)) {
            isValid = false;
          }
          break;
      }

      if (!isValid) {
        break; // Interrompi la verifica di ulteriori regole una volta trovata una violazione
      }
    }
  }

  return isValid ? value : defaultValue;
}

export function validateMonthDay(monthDay: number) {
  if (typeof monthDay == "undefined" || monthDay == null || typeof monthDay != "number") {
    throw "monthDay must be a valid number";
  }

  if (monthDay < 1 || monthDay > 31) {
    throw "monthDay must be between 1 and 31";
  }
}

export function validateWeekDay(weekDay: number) {
  if (typeof weekDay == "undefined" || weekDay == null || typeof weekDay != "number") {
    throw "weekDay must be a valid number";
  }

  if (weekDay < 0 || weekDay > 6) {
    throw "weekDay must be between 0 and 6";
  }
}

export const isValidTimeZone = (tz: unknown): boolean => {
  try {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      return false;
    }

    if (typeof tz !== "string") {
      return false;
    }

    // throws an error if timezone is not valid
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch (error) {
    return false;
  }
};

export function validateDate(date: Date) {
  if (date instanceof Date) {
    return;
  }

  throw "date is not valid";
}

export function validateInterval(interval: number) {
  if (typeof interval == "undefined") {
    throw "interval can't be undefined";
  }

  if (interval == null) {
    throw "interval can't be null";
  }

  if (typeof interval != "number") {
    throw "interval must be a number";
  }

  if (interval < 1) {
    throw "interval must be greater than or equal to 1";
  }
}

export function validateMonth(month: number) {
  if (typeof month == "undefined") {
    throw "month can't be undefined";
  }

  if (month == null) {
    throw "month can't be null";
  }

  if (typeof month != "number") {
    throw "month must be a number";
  }

  if (month < 0 || month > 11) {
    throw "month must be between 0 and 11";
  }
}

export function validateNumberOfRenewals(numberOfRenewals: number) {
  if (typeof numberOfRenewals == "undefined") {
    throw "numberOfRenewals can't be undefined";
  }

  if (numberOfRenewals == null) {
    throw "numberOfRenewals can't be null";
  }

  if (typeof numberOfRenewals != "number") {
    throw "numberOfRenewals must be a number";
  }
}

export function validateHours(hours: number) {
  let message: string;

  if (typeof hours === "undefined") {
    message = `hours can't be undefined`;
  }

  if (hours === null) {
    message = "hours can't be null";
  }

  if (typeof hours !== "number") {
    message = "hours must be a number";
  }

  if (hours < 0 || hours > 23) {
    message = "hours must be between 0 and 23";
  }

  if (message) {
    console.warn(message, `received: ${hours}`);
    hours = 0;
  }
}

export function validateMinutes(minutes: number) {
  if (typeof minutes === "undefined") {
    throw "minutes can't be undefined";
  }

  if (minutes === null) {
    throw "minutes can't be null";
  }

  if (typeof minutes !== "number") {
    throw "minutes must be a number";
  }

  if (minutes < 0 || minutes > 59) {
    throw "minutes must be between 0 and 59";
  }
}

export function validateTimezone(timezone: string) {
  if (typeof timezone === "undefined") {
    throw "timezone can't be undefined";
  }

  if (timezone === null) {
    throw "timezone can't be null";
  }

  if (typeof timezone !== "string") {
    throw "timezone must be a string";
  }

  if (timezone.trim() === "") {
    throw "timezone can't be an empty string";
  }
}
