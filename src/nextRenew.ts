import { Type } from "./types.js";
import { days, giorniDiDistanza, numDays } from "./utils.js";

export default class NextRenew {
  private date: Date = new Date();
  private interval: number = 1;
  private type: Type = "month";
  //
  private weekDay: number;
  private monthDay: number;
  private month: number;

  constructor(interval: number = 1, type: Type = "month") {
    this.interval = interval;
    this.type = type;
  }

  private validateMonthDay(monthDay: number) {
    if (typeof monthDay == "undefined" || monthDay == null || typeof monthDay != "number") {
      throw "monthDay must be a valid number";
    }

    if (monthDay < 1 || monthDay > 31) {
      throw "monthDay must be between 1 and 31";
    }
  }

  //#region SET
  public setInterval(inverval: number) {
    this.interval = inverval;
    return this;
  }
  public setType(type: Type) {
    this.type = type;
    return this;
  }
  public setWeekDay(weekDay: number) {
    this.weekDay = weekDay;
    return this;
  }
  public setMonthDay(monthDay: number) {
    this.validateMonthDay(monthDay);

    this.monthDay = monthDay;
    return this;
  }
  public setMonth(month: number) {
    this.month = month;
    return this;
  }
  public setDate(date: Date) {
    this.date = date;
    return this;
  }
  //#endregion

  public nextRenew() {
    let toReturn: number;
    const dateInMillis = this.date.getTime();

    if (this.type == "day") {
      this.date.setDate(this.date.getDate() + this.interval);
      toReturn = this.date.getTime();
    }

    if (this.type == "week") {
      const startDay = this.date.getDay();
      const endDay = this.weekDay;
      toReturn = dateInMillis + days(giorniDiDistanza(startDay, endDay) * this.interval);
    }

    if (this.type == "month") {
      this.validateMonthDay(this.monthDay);

      const monthAdder = this.date.getDate() < this.monthDay ? 0 : this.interval;

      this.date.setUTCDate(1);
      this.date.setUTCMonth(this.date.getMonth() + monthAdder);

      const currentMonth = this.date.getMonth();
      const currentYear = this.date.getFullYear();

      const currentMonthDays = numDays(currentYear, currentMonth);

      this.date.setUTCDate(this.monthDay > currentMonthDays ? currentMonthDays : this.monthDay);

      toReturn = this.date.getTime();
    }

    if (this.type == "year") {
      const renewDate = new Date(this.date.getFullYear(), this.month, this.monthDay);

      if (this.date.getTime() < renewDate.getTime()) {
        // Ancora da passare, il prossimo rinnovo sarà la data
        toReturn = renewDate.getTime();
      } else {
        this.date.setUTCFullYear(this.date.getFullYear() + this.interval);
        this.date.setUTCDate(this.monthDay);
        this.date.setUTCMonth(this.month);

        toReturn = this.date.getTime();
      }
    }

    return toReturn;
  }
}
