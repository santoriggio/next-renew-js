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
        case "boolean":
          if (typeof value !== "boolean") {
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
